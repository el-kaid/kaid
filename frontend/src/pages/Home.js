import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Star } from 'lucide-react';
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
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black scroll-animate">
  {/* === Starry Background === */}
        <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:200px_200px] opacity-20" />
        </div>

  {/* === Pure Black Background === */}

{/* === Minimalist Glowing Arc === */}
<div className="absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-visible translate-y-[-15%]" style={{ height: '50%' }}>
    <svg 
      className="w-full h-full" 
      viewBox="0 0 1000 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
       {/* Outer glow arc */}
       <path
         d="M 0 400 Q 500 50 1000 400"
         stroke="url(#arcGlowOuter)"
         strokeWidth="10"
         fill="none"
         opacity="0.4"
         style={{ filter: 'blur(12px)' }}
       />
       {/* Middle glow arc */}
       <path
         d="M 0 400 Q 500 50 1000 400"
         stroke="url(#arcGlowMiddle)"
         strokeWidth="6"
         fill="none"
         opacity="0.7"
         style={{ filter: 'blur(6px)' }}
       />
       {/* Main arc */}
       <path
         d="M 0 400 Q 500 50 1000 400"
         stroke="url(#arcGradient)"
         strokeWidth="3"
         fill="none"
       />
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

  {/* === Centered Title === */}
  <div className="relative z-10 text-center">
    {/* Subtle glow effect behind text */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-6xl md:text-8xl font-normal uppercase tracking-wide opacity-25 blur-md"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 400,
          background: "linear-gradient(to bottom, #60a5fa, #3b82f6)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        EL&nbsp;KAID
      </div>
    </div>

    <h1
      className="text-6xl md:text-8xl font-normal uppercase tracking-wide relative text-white"
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 400,
        letterSpacing: '0.05em',
        textShadow: "0 0 15px rgba(96, 165, 250, 0.3)",
      }}
    >
      EL&nbsp;KAID
    </h1>
        </div>

        {/* Scroll indicator */}
        <ScrollDown />
      </section>



      {/* ================= OVERVIEW SECTION ================= */}
      <section className="relative py-32 px-4 overflow-hidden bg-black flex flex-col items-center text-center scroll-animate">
        {/* 🌙 Arc line on top */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[300px] h-[150px]">
          <svg viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M0 150 C75 0 225 0 300 150"
              stroke="url(#grad)"
              strokeWidth="1.5"
              fill="none"
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#C084FC" />
              </linearGradient>
            </defs>
          </svg>
        </div>

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

            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 p-8 rounded-3xl relative overflow-hidden">
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
          </div> 

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 p-6 rounded-2xl hover:bg-slate-800/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "EL KAID transformed our entire workflow. The AI-powered features saved us countless hours and improved our productivity by 300%."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {index === 0 ? 'S' : index === 1 ? 'M' : 'R'}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {index === 0 ? 'Sarah Johnson' : index === 1 ? 'Michael Chen' : 'Rachel Davis'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {index === 0 ? 'CEO, TechStart' : index === 1 ? 'CTO, InnovateCorp' : 'Director, GrowthLab'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-black scroll-animate">
      
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] lg:w-[1000px] h-[300px] sm:h-[450px] lg:h-[600px] bg-gradient-radial from-blue-500/40 via-sky-600/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[525px] lg:w-[700px] h-[200px] sm:h-[300px] lg:h-[400px] bg-gradient-radial from-sky-500/50 via-blue-500/30 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform 
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h2>
          

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Your Free Trial
            </button>
            <button className="border-2 border-blue-400/50 text-blue-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-400/10 transition-all duration-300">
              Schedule Demo
            </button>
          </div>

        </div>

        {/* Floating elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-sky-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-sky-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

    </div>
  );
};

export default Home;
