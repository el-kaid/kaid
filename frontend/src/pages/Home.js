import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import ScrollDown from "../components/ScrollDown"; // ✅ Correct import

// Custom CSS for radial gradients and laptop effects
const customStyles = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  
  .laptop-shadow {
    filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25)) drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1));
  }
  
  .screen-glow {
    box-shadow: 
      0 0 50px rgba(147, 51, 234, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .metric-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .progress-bar {
    background: linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc);
  }
  
  .chart-bar {
    background: linear-gradient(180deg, #8b5cf6, #a855f7);
  }
  
  .feature-box-glow {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.15), 0 0 16px rgba(255, 255, 255, 0.05);
  }
  
  .floating-elements {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
  
  .pulse-dot {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  /* Scroll Animation Styles */
  .scroll-animate {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .scroll-animate:not(.animate-in) {
    opacity: 0;
    transform: translateY(50px);
  }
  
  .scroll-animate.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .scroll-animate-delay-1 {
    transition-delay: 0.1s;
  }
  
  .scroll-animate-delay-2 {
    transition-delay: 0.2s;
  }
  
  .scroll-animate-delay-3 {
    transition-delay: 0.3s;
  }
  
  /* ================= GLOW BUTTON ================= */
.glow-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 2.5rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(168, 85, 247, 0.3);
  color: #ffffff;
  font-weight: 500;
  font-size: 1.125rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.glow-button:hover {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.5);
}

.button_inner {
  position: relative;
  z-index: 2;
  pointer-events: none;
}

.glow {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.35), transparent 70%);
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.4s ease, transform 0.4s ease;
  z-index: 1;
}

.glow-button:hover .glow {
  opacity: 1;
  transform: scale(1.05);
  animation: glowMove 3s ease-in-out infinite alternate;
}

@keyframes glowMove {
  0% { background-position: 50% 50%; }
  50% { background-position: 60% 40%; }
  100% { background-position: 50% 50%; }
}

/* ================= HERO AURORA ANIMATION ================= */
@keyframes heroAurora {
  0% { transform: translate(-50%, -1%) rotate(0deg); }
  25% { transform: translate(-50%, -1%) rotate(-7deg); }
  50% { transform: translate(-50%, -1%) rotate(0deg); }
  75% { transform: translate(-50%, -1%) rotate(7deg); }
  100% { transform: translate(-50%, -1%) rotate(0deg); }
}

@keyframes pulse {
  0%,100% { opacity: 0.2; }
  50% { opacity: 0.3; }
}

`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const Home = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState({});

  // Scroll animation effect (your original)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections with scroll-animate class
    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // ✅ Additional reveal effect that directly toggles the class (no IDs required)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = document.querySelectorAll('.scroll-animate');
    els.forEach(el => io.observe(el));

    return () => io.disconnect();
  }, []);

  // Fireflies canvas animation
  useEffect(() => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Firefly class
    class Firefly {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Update opacity with pulse
        this.opacity = 0.2 + Math.sin(this.pulsePhase) * 0.3;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Create glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.5)');
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core firefly
        ctx.globalAlpha = this.opacity * 1.5;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create fireflies
    const fireflies = [];
    for (let i = 0; i < 50; i++) {
      fireflies.push(new Firefly());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Solutions",
      description: "Leverage cutting-edge artificial intelligence to automate complex processes and boost productivity."
    },
    {
      icon: "🛡️",
      title: "Enterprise Security",
      description: "Bank-grade security protocols protect your data with end-to-end encryption and compliance standards."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance delivers results in milliseconds, not minutes. Experience the speed difference."
    },
    {
      icon: "💻",
      title: "Custom Development",
      description: "Tailored software solutions built to your exact specifications and business requirements."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Seamless collaboration tools that keep your team connected and productive from anywhere."
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Comprehensive insights and reporting to drive data-driven decisions for your business."
    },
    {
      icon: "🚀",
      title: "Rapid Deployment",
      description: "Get up and running in minutes with our streamlined setup process and guided onboarding."
    },
    {
      icon: "🌐",
      title: "Global Scale",
      description: "Built to scale from startups to enterprises with worldwide infrastructure and support."
    }
  ];

  const benefits = [
    "99.9% uptime guarantee",
    "24/7 expert support",
    "Free data migration",
    "No setup fees",
    "Cancel anytime",
    "Regular updates included"
  ];

  return (
    <div className="min-h-screen bg-black">
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-center">
  {/* === Background Canvas (Fireflies) === */}
  <canvas id="heroCanvas" className="absolute inset-0 w-full h-full opacity-40"></canvas>

  {/* === Rotating Aurora Layers === */}
  <div className="hero_aurora absolute inset-1/2 w-[160vw] aspect-square rounded-full blur-[3rem] bg-[radial-gradient(circle_at_50%_20%,rgba(224,203,224,0.15),rgba(76,69,165,0.1),rgba(76,69,165,0))] animate-[heroAurora_14s_ease-in-out_infinite]"></div>
  <div className="hero_aurora absolute inset-1/2 w-[160vw] aspect-square rounded-full blur-[4rem] opacity-20 bg-[radial-gradient(circle_at_50%_20%,rgba(224,203,224,0.15),rgba(76,69,165,0.1),rgba(76,69,165,0))] animate-[heroAurora_14s_ease-in-out_infinite_reverse]"></div>

  {/* === Triangular Light Overlay === */}
  <svg viewBox="0 0 622 705" className="absolute w-full h-[80vh] text-white opacity-5 blur-[9vw] animate-[pulse_6s_infinite_ease-in-out]">
    <path d="M311 0L621.037 704.25H0.962891L311 0Z" fill="currentColor" />
  </svg>

  {/* === Main Heading - Centered === */}
  <div className="absolute inset-0 flex items-center justify-center z-10">
    <h1 className="text-5xl md:text-7xl font-bold uppercase bg-gradient-to-b from-white via-white/90 to-purple-200 bg-clip-text text-transparent tracking-wide">
      EL KAID
    </h1>
  </div>

  {/* === Minimalist Glowing Arc === */}
  <div className="absolute bottom-20 left-0 right-0 h-32 z-10">
    <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      {/* Outer glow arc */}
      <path d="M 0 400 Q 500 0 1000 400" stroke="url(#arcGlowOuter)" strokeWidth="40" fill="none" opacity="0.4" style={{ filter: 'blur(12px)' }} />
      {/* Middle glow arc */}
      <path d="M 0 400 Q 500 0 1000 400" stroke="url(#arcGlowMiddle)" strokeWidth="24" fill="none" opacity="0.7" style={{ filter: 'blur(6px)' }} />
      {/* Main arc */}
      <path d="M 0 400 Q 500 0 1000 400" stroke="url(#arcGradient)" strokeWidth="12" fill="none" />
      <defs>
        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="arcGlowMiddle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="25%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#e9d5ff" />
          <stop offset="75%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="arcGlowOuter" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#c4b5fd" />
          <stop offset="70%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  {/* === Scroll Down - Bottom === */}
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
    <ScrollDown />
  </div>
</section>



      {/* ================= OVERVIEW SECTION ================= */}
      <section className="relative py-32 px-4 overflow-hidden bg-black flex flex-col items-center text-center scroll-animate">

        {/* 🟣 Section content */}
        <div className="relative z-10 max-w-4xl mx-auto pt-20">
          <p className="text-[#9B8AFB] tracking-widest uppercase text-sm mb-4">Overview</p>
          <h2
            className="text-4xl md:text-6xl font-bold mb-8"
            style={{
              background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '0.05em',
            }}
          >
            What is EL&nbsp;Kaid?
            </h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-lg mb-12">
            EL&nbsp;Kaid represents the next generation of intelligent systems — blending AI precision,
            real-time analytics, and seamless digital finance integration. It operates with no central
            authority, empowering innovation and transparency. Every process is automated, secure, and
            open for collaboration — redefining how people and businesses interact with technology.
          </p>

          {/* ✨ Get Started Button */}
          <button type="button" className="glow-button" data-glow-attached="true">
  <div className="button_inner">
    <p>Get Started</p>
          </div>
  <div className="glow"></div>
                          </button>

        </div>

      </section>

      {/* ================= WHAT MAKES EL KAID UNIQUE SECTION ================= */}
      <section className="relative py-32 px-4 overflow-hidden bg-black scroll-animate">

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-[#9B8AFB] tracking-widest uppercase text-sm mb-4">Why Choose Us</p>
            <h2
              className="text-4xl md:text-6xl font-bold mb-8"
              style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '0.05em',
              }}
            >
              What Makes EL&nbsp;KAID Unique?
            </h2>
          </div>

          {/* Unique Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group relative scroll-animate scroll-animate-delay-1">
              <div className="bg-black backdrop-blur-sm border-2 border-purple-500/40 p-16 rounded-2xl transition-all duration-300 h-64 feature-box-glow">
                <h3 className="text-xl font-bold text-white mb-6 text-center">AI-First Architecture</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  Built from the ground up with artificial intelligence at its core, not as an afterthought. 
                  Every feature leverages advanced machine learning for optimal performance.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative scroll-animate scroll-animate-delay-2">
              <div className="bg-black backdrop-blur-sm border-2 border-purple-500/40 p-16 rounded-2xl transition-all duration-300 h-64 feature-box-glow">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Quantum-Safe Security</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  Next-generation encryption protocols that protect against both current and future threats, 
                  ensuring your data remains secure for decades to come.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative scroll-animate scroll-animate-delay-1">
              <div className="bg-black backdrop-blur-sm border-2 border-purple-500/40 p-16 rounded-2xl transition-all duration-300 h-64 feature-box-glow">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Real-Time Processing</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  Process millions of operations per second with sub-millisecond latency. 
                  Experience true real-time performance that scales with your business.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative scroll-animate scroll-animate-delay-2">
              <div className="bg-black backdrop-blur-sm border-2 border-purple-500/40 p-16 rounded-2xl transition-all duration-300 h-64 feature-box-glow">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Decentralized Network</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  No single point of failure. Our distributed architecture ensures maximum uptime 
                  and resilience across global infrastructure.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative scroll-animate scroll-animate-delay-3">
              <div className="bg-black backdrop-blur-sm border-2 border-purple-500/40 p-16 rounded-2xl transition-all duration-300 h-64 feature-box-glow">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Predictive Analytics</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  Advanced forecasting capabilities that predict trends and opportunities 
                  before they happen, giving you a competitive edge.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative scroll-animate scroll-animate-delay-3">
              <div className="bg-black backdrop-blur-sm border-2 border-purple-500/40 p-16 rounded-2xl transition-all duration-300 h-64 feature-box-glow">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Zero-Config Setup</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  Get started in minutes, not weeks. Our intelligent auto-configuration 
                  adapts to your environment without manual intervention.
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 relative overflow-hidden scroll-animate">

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Transform Your Business Today
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-purple-400 text-lg">✓</span>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 p-8 rounded-3xl relative overflow-hidden scroll-animate scroll-animate-delay-2">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Start Your Free Trial</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-400 text-lg">⏱️</span>
                      <span className="text-gray-300">Setup in 5 minutes</span>
                    </div>
                    <span className="text-purple-400 text-lg">✓</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-400 text-lg">💰</span>
                      <span className="text-gray-300">Cancel anytime</span>
                    </div>
                    <span className="text-purple-400 text-lg">✓</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-400 text-lg">⭐</span>
                      <span className="text-gray-300">24/7 support included</span>
                    </div>
                    <span className="text-purple-400 text-lg">✓</span>
                  </div>
                </div>

                {/* <button className="w-full bg-white text-slate-900 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 mt-6 shadow-xl hover:scale-105">
                  Get Started Now
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Home;