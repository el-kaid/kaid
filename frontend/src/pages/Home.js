import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import ScrollDown from "../components/ScrollDown"; // ✅ Correct import
import ButtonAnimatedGradient from "../components/ButtonAnimatedGradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HowToStartBitcoin from "../components/HowToStartBitcoin";
import ElKaidVsTraditionalFinances from "../components/ElKaidVsTraditionalFinances";

gsap.registerPlugin(ScrollTrigger);


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

/* ================= ORIGINAL INSPECTED BUTTON ================= */
.button {
  white-space: nowrap;
  background-color: transparent;
  border-radius: 0.5rem;
  flex-flow: column;
  justify-content: center;
  align-items: stretch;
  padding: 0;
  line-height: 1;
  transition: box-shadow 0.3s;
  display: flex;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: none;
  color: #fff;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 1rem;
}

.button_inner {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;
}

.button_inner p {
  margin: 0;
  font-size: 1.1rem;
  color: white;
  letter-spacing: 0.05em;
}

.glow {
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.35), transparent 70%);
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.4s ease, transform 0.4s ease;
  z-index: 1;
}

.button:hover .glow {
  opacity: 1;
  transform: scale(1.05);
  animation: glowMove 3s ease-in-out infinite alternate;
}

.button:hover .button_inner {
  background: rgba(168, 85, 247, 0.15);
}

@keyframes glowMove {
  0% { background-position: 50% 50%; }
  50% { background-position: 60% 40%; }
  100% { background-position: 50% 50%; }
}

.petal {
  background: linear-gradient(180deg, #4c45a5, #bda6e0);
  border-radius: 0 7rem;
  transition: all 0.4s ease;
}

.petal.inverse {
  border-radius: 7rem 0;
}

.petals-circle {
  z-index: 2;
  background-image: linear-gradient(180deg, #4c45a5, #000 46%);
  border-radius: 50%;
  padding: 2px;
  position: relative;
  transition: transform 12s linear infinite;
  animation: spin 22s linear infinite;
}

.petals-circle_inner {
  background-color: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.petals-circle_text {
  opacity: 0;
  font-size: clamp(0.75rem, 3vw, 1rem);
  position: absolute;
  color: #aaa;
  transition: opacity 0.6s ease, transform 0.6s ease;
  will-change: opacity, transform;
}

.petal-texts_wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.wrapper {
  overflow-x: hidden;
  position: relative;
}
.container {
  display: flex;
}
.pin {
  height: 100vh;
}
.mask {
  width: 0;
}


`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

// Feature Box with Animated Gradient Component
const FeatureBoxWithGradient = ({ title, description, delay = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className={`relative scroll-animate ${delay} h-full flex flex-col`} ref={boxRef}>
      {/* Outer glow layer */}
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 blur-xl transition-opacity duration-500 rounded-2xl"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, #6366f1, #c4b5fd 50%, transparent 70%)`,
        }}
      />

      {/* Middle glow layer */}
      <div
        className="pointer-events-none absolute -inset-0.5 opacity-0 blur-lg transition-opacity duration-500 rounded-2xl"
        style={{
          opacity: isHovered ? 0.25 : 0,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, #8b5cf6, #e9d5ff 50%, transparent 70%)`,
        }}
      />

      {/* Main glow layer */}
      <div
        className="pointer-events-none absolute -inset-0 opacity-0 blur-md transition-opacity duration-400 rounded-2xl"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, #7c3aed, rgba(255, 255, 255, 0.4) 40%, transparent 65%)`,
        }}
      />

      {/* Box with animated border */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
      >
        {/* Animated border that appears only on hover and follows cursor */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(150px circle at ${position.x}px ${position.y}px, 
                  rgba(139, 92, 246, 1) 0%, 
                  rgba(124, 58, 237, 0.7) 25%, 
                  rgba(139, 92, 246, 0.4) 50%, 
                  transparent 75%)`
              : 'transparent',
            padding: '2px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        <div
          className="bg-black backdrop-blur-sm p-16 rounded-2xl transition-all duration-300 h-full min-h-[280px] feature-box-glow relative z-10 flex flex-col"
          style={{
            border: 'none',
          }}
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">{title}</h3>
          <p className="text-gray-300 leading-relaxed text-justify flex-grow">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Comparison rotating circle component
const ComparisonCircle = () => {
  const topics = [
    { label: 'Security', sub: 'Protection' },
    { label: 'Speed', sub: 'Throughput' },
    { label: 'Fees', sub: 'Cost' },
    { label: 'Accessibility', sub: 'Open' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % topics.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-white/15" />
      <div className="absolute inset-3 rounded-full border border-white/10" />
      <div className="absolute inset-6 rounded-full border border-white/5" />
      <div className="relative z-10 text-center">
        <p className="text-white/60 text-sm uppercase tracking-widest">Focus</p>
        <h3 className="text-white text-2xl md:text-3xl font-semibold">
          {topics[activeIndex].label}
        </h3>
        <p className="text-white/40 text-sm">{topics[activeIndex].sub}</p>
      </div>
    </div>
  );
};

// Comparison bullet list component
const ComparisonText = ({ texts = [] }) => {
  return (
    <ul className="space-y-3">
      {texts.map((text, i) => (
        <li key={i} className="text-white text-lg leading-relaxed flex items-start gap-3">
          <span className="mt-2 h-2 w-2 rounded-full bg-white/70"></span>
          <span className="text-white/90">{text}</span>
        </li>
      ))}
    </ul>
  );
};


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


  useEffect(() => {
    const track = document.getElementById("horizontal-track");
    const section = document.getElementById("how-to-start");

    if (!track || !section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const isInViewport = sectionTop < windowHeight && sectionBottom > 0;

      if (!isInViewport) {
        // Reset to initial position when out of viewport
        track.style.transform = 'translateX(0px)';
        return;
      }

      // Calculate progress from 0 to 1 as user scrolls through section
      const sectionHeight = section.offsetHeight;
      const scrollStart = sectionTop;
      const scrollEnd = sectionTop - windowHeight + sectionHeight;
      const currentScroll = window.scrollY;

      // When section first enters view, scroll is 0
      // When section exits view, we want full translation
      const scrollProgress = (sectionTop - rect.top) / (windowHeight + sectionHeight);
      const progress = Math.max(0, Math.min(1, scrollProgress));

      // Calculate max translation - move enough to show next cards
      // First 2 cards show initially, then scroll reveals cards 3 and 4
      const cardWidth = track.children[0]?.offsetWidth || 400;
      const gap = 24; // 6 * 4 (gap-6 = 1.5rem = 24px)
      const visibleCards = 2;
      const maxTranslate = cardWidth + gap; // Move one card width to reveal the next cards

      const translateX = -progress * maxTranslate;
      track.style.transform = `translateX(${translateX}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stages = document.querySelectorAll(".stage");
    const circles = [1, 2, 3, 4].map((i) =>
      document.getElementById(`circle-${i}`)
    );
    const progress = document.getElementById("progress-fill");

    const handleScroll = () => {
      let activeIndex = -1;
      if (!progress) return;
      if (!circles || circles.length === 0) return;

      stages.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const midPoint = windowHeight / 2;

        // stage considered “active” if its middle is in viewport
        if (rect.top <= midPoint && rect.bottom >= midPoint) {
          activeIndex = i;
        }
      });

      // highlight active paragraph
      stages.forEach((el, i) => {
        el.style.opacity = i === activeIndex ? "1" : "0.3";
        el.style.transform = i === activeIndex ? "translateY(0)" : "translateY(20px)";
        el.style.transition = "all 0.5s ease";
      });

      // fill / unfill progress line based on active index
      const progressPercent =
        activeIndex >= 0
          ? ((activeIndex + 1) / stages.length) * 100
          : 0;

      progress.style.height = `${progressPercent}%`;

      // glow circles up to activeIndex
      circles.forEach((c, i) => {
        if (i <= activeIndex) {
          c.style.background =
            "linear-gradient(90deg, #4c45a5, #e0cbe0)";
          c.style.boxShadow = "0 0 10px rgba(224,203,224,0.6)";
        } else {
          c.style.background = "black";
          c.style.boxShadow = "none";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize once
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-based rotation + text fade for "Bitcoin vs Traditional Finances"
  useEffect(() => {
    const circle = document.getElementById("petalsCircle");
    const texts = document.querySelectorAll(".petals-circle_text");
    if (!circle || texts.length === 0) return;

    let lastScrollY = window.scrollY;
    let rotation = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      rotation += delta * 0.15; // Rotation sensitivity
      circle.style.transform = `translate3d(0,0,0) rotate(${rotation}deg)`;

      // Determine which text should be visible
      const normalized = ((rotation % 360) + 360) % 360;
      const index = Math.floor(normalized / 72); // 360 / 5 = 72° per text
      const progress = (normalized % 72) / 72;

      texts.forEach((t, i) => {
        let opacity = 0;
        if (i === index) opacity = 1 - progress;
        else if (i === (index + 1) % 5) opacity = progress;
        t.style.opacity = opacity.toFixed(2);
        t.style.transform = `rotate(${i * 72}deg) translateY(-4.5rem) rotate(-${i * 72}deg) scale(${0.9 + opacity * 0.1})`;
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        <canvas id="heroCanvas" className="absolute inset-0 w-full h-full opacity-10"></canvas>

        {/* === Rotating Aurora Layers === */}
        <div className="hero_aurora absolute inset-1/2 w-[160vw] aspect-square rounded-full blur-[3rem] bg-[radial-gradient(circle_at_50%_20%,rgba(224,203,224,0.15),rgba(76,69,165,0.1),rgba(76,69,165,0))] animate-[heroAurora_14s_ease-in-out_infinite]"></div>
        <div className="hero_aurora absolute inset-1/2 w-[160vw] aspect-square rounded-full blur-[4rem] opacity-20 bg-[radial-gradient(circle_at_50%_20%,rgba(224,203,224,0.15),rgba(76,69,165,0.1),rgba(76,69,165,0))] animate-[heroAurora_14s_ease-in-out_infinite_reverse]"></div>

        {/* === Triangular Light Overlay === */}
        <svg viewBox="0 0 622 705" className="absolute w-full h-[80vh] text-white opacity-[0.02] blur-[9vw] animate-[pulse_6s_infinite_ease-in-out]">
          <path d="M311 0L621.037 704.25H0.962891L311 0Z" fill="currentColor" />
        </svg>

        {/* === Main Heading - Centered === */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative z-10 text-center">
            {/* Subtle glow effect behind text (match OurWork) */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateY(-10px)' }}>
              <div
                className="text-6xl md:text-8xl font-bold uppercase tracking-wide opacity-10 blur-md"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  background: "linear-gradient(to bottom, #60a5fa, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                EL KAID
              </div>
            </div>
            <h1
              className="text-6xl md:text-8xl font-bold uppercase relative text-white mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: '#ffffff',
              }}
            >
              EL KAID
            </h1>
            <p className="text-xl md:text-2xl mt-4 whitespace-nowrap uppercase font-semibold" style={{ 
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}>
              The Next Era of Financial System is Here
            </p>
          </div>
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
          <p className="text-gray-400 max-w-[95vw] mx-auto leading-normal text-lg mb-12 px-8 text-justify" style={{ maxWidth: '1400px', lineHeight: '1.6' }}>
            EL KAID is the next evolution of financial intelligence — a revolutionary system that blends AI-driven automation and manual precision to simplify and empower modern business management. From billing, bookkeeping, taxation, banking, asset tracking, and B1M (Business 1 Messenger), everything you need to run your business flows seamlessly through one unified fingertip access. With cutting-edge technology and globally connected financial data, EL KAID transforms the way businesses operate — creating a virtual office ecosystem that's accessible anytime, anywhere. We're redefining the fintech landscape by giving individuals and businesses the power to manage their finances effortlessly — without the need for consultants. EL KAID isn't just a platform it's the new era of business and financial management.
          </p>

          <div className="flex justify-center mt-12">
            <ButtonAnimatedGradient onClick={() => navigate('/buy-software')} />
          </div>




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
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Feature 1 */}
            <FeatureBoxWithGradient
              title="Next-Era Financial System"
              description="EL KAID redefines how businesses handle money — merging automation, intelligence, and real-time connectivity into one seamless platform. It’s not just finance management; it’s the future of digital finance in motion."
              delay="scroll-animate-delay-1"
            />

            {/* Feature 2 */}
            <FeatureBoxWithGradient
              title="AI-Driven Insights"
              description="Powered by advanced AI, EL KAID transforms raw financial data into clear, actionable insights. Make smarter decisions, faster — with predictive analytics guiding every transaction and trend."
              delay="scroll-animate-delay-2"
            />

            {/* Feature 3 */}
            <FeatureBoxWithGradient
              title="Universal Access"
              description="Your entire financial ecosystem — from billing to banking — available anytime, anywhere. Whether you're in the office or on the move, EL KAID keeps your business in sync across the globe."
              delay="scroll-animate-delay-1"
            />

            {/* Feature 4 */}
            <FeatureBoxWithGradient
              title="Trust and Security"
              description="Built on bank-grade encryption and verified protocols, EL KAID ensures your data remains safe, private, and tamper-proof. Transparency and trust are at the core of every transaction."
              delay="scroll-animate-delay-2"
            />

            {/* Feature 5 */}
            <FeatureBoxWithGradient
              title="Built for the New Era of Digital Finance"
              description="Designed for innovators and businesses ready to evolve, EL KAID brings the next generation of fintech infrastructure — faster, smarter, and fully adaptive to the digital economy."
              delay="scroll-animate-delay-3"
            />

            {/* Feature 6 */}
            <FeatureBoxWithGradient
              title="Seamless Experience"
              description="Every click, every action, every connection — crafted for effortless flow and intuitive control. EL KAID turns complex financial operations into a smooth, unified experience."
              delay="scroll-animate-delay-3"
            />
          </div>

          {/* Feature 7 - Worldwide Payments (Bottom/Centered) */}
          <div className="mt-8 flex justify-center">
            <div className="w-full md:w-1/2 h-full">
              <FeatureBoxWithGradient
                title="Worldwide Payments"
                description="Go borderless with instant global payments and smart currency handling. EL KAID connects you to the world's financial network — making international transactions as easy as local ones."
                delay="scroll-animate-delay-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= EL KAID VS TRADITIONAL FINANCES ================= */}
      <ElKaidVsTraditionalFinances />


{/* ================= METRICS SECTION ================= */}
<section className="relative py-32 px-4 overflow-hidden bg-black scroll-animate">
  <div className="max-w-6xl mx-auto relative z-10">
    {/* Section Header */}
    <div className="text-center mb-20">
      <p className="text-[#9B8AFB] tracking-widest uppercase text-sm mb-4">Metrics</p>
      <h2
        className="text-3xl md:text-5xl font-bold mb-16"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '0.05em',
        }}
      >
        WHAT DO THE NUMBERS SAY
      </h2>
    </div>

    {/* Metrics Display */}
    <div className="relative">
      {/* Top Row - Two Metrics */}
      <div className="grid md:grid-cols-2 gap-16 mb-16">
        {/* Left Metric */}
        <div className="text-center scroll-animate scroll-animate-delay-1">
          <div className="text-6xl md:text-7xl font-bold text-[#9B8AFB] mb-4">
            1.2M+
          </div>
          <p className="text-gray-400 text-lg">Active Businesses Powered by EL KAID</p>
        </div>

        {/* Right Metric */}
        <div className="text-center scroll-animate scroll-animate-delay-2">
          <div className="text-6xl md:text-7xl font-bold text-[#9B8AFB] mb-4">
            98%
          </div>
          <p className="text-gray-400 text-lg">Customer Retention & Satisfaction Rate</p>
        </div>
      </div>

      {/* Center Metric - Large Triangle */}
      <div className="relative flex justify-center items-center scroll-animate scroll-animate-delay-3">
        <div className="relative">
          <svg width="400" height="300" viewBox="0 0 400 300" className="mx-auto scroll-animate">
            {/* Outer Glow */}
            <path d="M 30 -20 L -20 380"
              fill="none"
              stroke="url(#triangleGlowOuter)"
              strokeWidth="3"
              opacity="0.3"
              style={{ filter: 'blur(8px)' }} />
            <path d="M 370 -20 L 420 380"
              fill="none"
              stroke="url(#triangleGlowOuter)"
              strokeWidth="3"
              opacity="0.3"
              style={{ filter: 'blur(8px)' }} />

            {/* Main Lines */}
            <path d="M 30 -20 L -20 380"
              fill="none"
              stroke="url(#triangleGradient)"
              strokeWidth="2" />
            <path d="M 370 -20 L 420 380"
              fill="none"
              stroke="url(#triangleGradient)"
              strokeWidth="2" />

            <defs>
              <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#4c45a5" />
              </linearGradient>
              <linearGradient id="triangleGlowOuter" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center -mt-8 scroll-animate">
              <div className="text-5xl md:text-6xl font-bold text-[#6B6B8B] mb-2">
                ₹5.8B+
              </div>
              <div className="text-gray-400 text-lg">
                Transactions Processed Securely
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      <HowToStartBitcoin />



      {/* ================= WHO CAN USE BITCOIN SECTION ================= */}
      <section className="relative py-32 px-4 overflow-hidden bg-black scroll-animate">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-right mb-10 w-full">
            <div className="ml-auto max-w-[45rem] flex flex-col items-end gap-1">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#4c45a5] to-[#e0cbe0] uppercase text-sm md:text-base tracking-widest">
                Options
              </p>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/95 text-4xl md:text-6xl font-light uppercase whitespace-nowrap">
                Who can use bitcoin
              </h2>
              <p className="text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-white max-w-[35rem] text-sm md:text-lg mt-1">
                With the technology of bitcoin, everyone<br />
                will be able to get what suits him best.
              </p>
            </div>
          </div>

          {/* Three Card Grid - Staircase Layout */}
          <div className="grid md:grid-cols-3 gap-0 relative" style={{ minHeight: '58rem' }}>

            {/* Card 1 - Businesses */}
            <div className="relative group self-start">
              <div
                className="absolute inset-0 rounded-tr-[7rem] rounded-bl-[7rem] p-[2px]"
                style={{
                  background: 'linear-gradient(130deg, black, #e0cbe0 54%, #4c45a5)',
                }}
              >
                <div className="bg-black rounded-tr-[7rem] rounded-bl-[7rem] h-full w-full flex flex-col justify-center items-center text-center p-20">
                  <h3
                    className="text-3xl font-bold mb-6 scroll-animate scroll-animate-delay-1"
                    style={{
                      background: 'linear-gradient(360deg, rgba(255,255,255,0.4), #FFFFFF 45%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Businesses
                  </h3>
                  <p
                    className="text-lg leading-relaxed scroll-animate scroll-animate-delay-2"
                    style={{
                      background: 'linear-gradient(360deg, rgba(255,255,255,0.5), #FFFFFF 50%, #FFFFFF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Bitcoin is a very secure and inexpensive way to handle payments.
                  </p>
                </div>
              </div>
              <div style={{ height: '20rem' }}></div>
            </div>

            {/* Card 2 - Individuals */}
            <div className="relative group self-center md:w-[96%] md:-ml-[0.1rem] md:mt-8">
              <div
                className="absolute inset-0 rounded-tr-[7rem] rounded-bl-[7rem] p-[2px]"
                style={{
                  background: 'linear-gradient(180deg, #5850aa, #4c45a5)',
                }}
              >
                <div className="bg-black rounded-tr-[7rem] rounded-bl-[7rem] h-full w-full flex flex-col justify-center items-center text-center p-20">
                  <h3
                    className="text-3xl font-bold mb-6 scroll-animate scroll-animate-delay-1"
                    style={{
                      background: 'linear-gradient(360deg, rgba(255,255,255,0.4), #FFFFFF 45%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Individuals
                  </h3>
                  <p
                    className="text-lg leading-relaxed scroll-animate scroll-animate-delay-2"
                    style={{
                      background: 'linear-gradient(360deg, rgba(255,255,255,0.5), #FFFFFF 50%, #FFFFFF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Bitcoin is the easiest way to transact at a very low cost.
                  </p>
                </div>
              </div>
              <div style={{ height: '20rem' }}></div>
            </div>

            {/* Card 3 - Developers (touching Individuals, no overlap) */}
            <div className="relative group self-end md:-ml-[1.1rem] md:w-[97%] md:mt-[10rem] md:translate-y-[2rem]">

              <div
                className="absolute inset-0 rounded-tr-[7rem] rounded-bl-[7rem] p-[2px]"
                style={{
                  background: 'linear-gradient(130deg, #4d46a5, #e0cbe0 54%, black)',
                }}
              >
                <div className="bg-black rounded-tr-[7rem] rounded-bl-[7rem] h-full w-full flex flex-col justify-center items-center text-center p-20">
                  <h3
                    className="text-3xl font-bold mb-6 scroll-animate scroll-animate-delay-1"
                    style={{
                      background: 'linear-gradient(360deg, rgba(255,255,255,0.4), #FFFFFF 45%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Developers
                  </h3>
                  <p
                    className="text-lg leading-relaxed scroll-animate scroll-animate-delay-2"
                    style={{
                      background: 'linear-gradient(360deg, rgba(255,255,255,0.5), #FFFFFF 50%, #FFFFFF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Learn Bitcoin and start building Bitcoin-based applications.
                  </p>
                </div>
              </div>
              <div style={{ height: '20rem' }}></div>
            </div>

          </div>

          {/* Mobile: Stack Vertically */}
          <style jsx>{`
      @media (max-width: 768px) {
        .grid.md\\:grid-cols-3 {
          grid-template-columns: 1fr;
          height: auto;
          gap: 1rem;
        }
        .self-start, .self-center, .self-end {
          align-self: start;
        }
      }
    `}</style>
        </div>
      </section>
    </div>
  );
};

export default Home;