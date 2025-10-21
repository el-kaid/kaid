import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Star, ExternalLink, Github, Calendar, Users, Zap, Code, Smartphone, Globe, Database, Shield, Rocket, Receipt, Calculator, FileText, CreditCard, BarChart3, Brain } from 'lucide-react';

// Custom CSS matching Home.js theme
const customStyles = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  
  .project-card-hover {
    transition: all 0.3s ease;
  }
  
  .project-card-hover:hover {
    transform: translateY(-8px);
  }
  
  /* Scroll Animation Styles */
  .scroll-animate {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
  
  /* Glow Button */
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
  
  .floating-elements {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const OurWork = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  // Scroll animation effect matching Home.js
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

    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Additional reveal effect
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

  // EL KAID-B1 Software development phases and modules
  const projects = [
    {
      id: 1,
      title: "Core Accounting Engine",
      category: "backend",
      description: "Built the foundational accounting system with journal entries, ledger management, trial balance, and financial statements generation using Node.js and MongoDB.",
      technologies: ["Node.js", "MongoDB", "Express", "Mongoose"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      timeline: "3 months",
      team: "4 developers",
      results: "100% GST compliance achieved",
      status: "Completed",
      phase: "MVP"
    },
    {
      id: 2,
      title: "Multi-Platform Frontend",
      category: "frontend",
      description: "Developed responsive web interface, desktop app using ElectronJS, and mobile app with React Native for seamless cross-platform experience.",
      technologies: ["React", "Tailwind CSS", "ElectronJS", "React Native"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      timeline: "4 months",
      team: "5 developers",
      results: "Cross-platform compatibility",
      status: "Completed",
      phase: "MVP"
    },
    {
      id: 3,
      title: "AI-Powered OCR Engine",
      category: "ai",
      description: "Integrated OCR capabilities using Tesseract.js and Google Vision API for automatic bill scanning and data extraction.",
      technologies: ["Tesseract.js", "Google Vision API", "Python", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      timeline: "2.5 months",
      team: "3 developers",
      results: "95% OCR accuracy achieved",
      status: "Completed",
      phase: "Phase 2"
    },
    {
      id: 4,
      title: "Banking Integration Module",
      category: "integration",
      description: "Developed real-time bank synchronization using Setu and RazorpayX APIs for automated transaction reconciliation.",
      technologies: ["Setu API", "RazorpayX", "Node.js", "Webhooks"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      timeline: "3 months",
      team: "4 developers",
      results: "Real-time bank sync",
      status: "In Progress",
      phase: "Phase 2"
    },
    {
      id: 5,
      title: "GST & Tax Compliance Suite",
      category: "compliance",
      description: "Built comprehensive GST return filing, TDS management, and e-invoicing system compliant with Indian tax regulations.",
      technologies: ["GST API", "Digital Signature", "Node.js", "PDF Generation"],
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=400&fit=crop",
      timeline: "4 months",
      team: "5 developers",
      results: "Full GST compliance",
      status: "Completed",
      phase: "MVP"
    },
  ];

  const categories = [
    { id: 'all', name: 'All Modules', icon: Globe },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'frontend', name: 'Frontend', icon: Code },
    { id: 'ai', name: 'AI/ML', icon: Brain },
    { id: 'integration', name: 'Integration', icon: Zap },
    { id: 'compliance', name: 'Compliance', icon: FileText },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const stats = [
    { label: "Modules Developed", value: "12+", icon: Code },
    { label: "Development Hours", value: "2500+", icon: Calendar },
    { label: "Team Members", value: "8", icon: Users },
    { label: "Platforms Supported", value: "4", icon: Smartphone }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400';
      case 'Testing': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'MVP': return 'bg-purple-500/20 text-purple-400';
      case 'Phase 2': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Arc Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black scroll-animate">
        {/* Starry Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:200px_200px] opacity-20" />
        </div>

        {/* Centered Title */}
        <div className="relative z-10 text-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold uppercase tracking-wide opacity-25 blur-md"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                background: "linear-gradient(to bottom, #60a5fa, #3b82f6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              OUR WORK
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl font-bold uppercase tracking-wide relative text-white mb-6"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 100,
              letterSpacing: '0.05em',
              textShadow: "0 0 15px rgba(96, 165, 250, 0.3)",
            }}
          >
            OUR WORK
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Building the next generation of intelligent software solutions
          </p>
        </div>
      </section>

{/* OVERVIEW SECTION - Enhanced */}
<section className="relative py-32 px-4 overflow-hidden bg-black flex flex-col items-center text-center scroll-animate">
  <div className="relative z-10 max-w-6xl mx-auto pt-20">
    <p className="text-[#9B8AFB] tracking-widest uppercase text-sm mb-4">EL KAID-B1</p>
    <h2
      className="text-4xl md:text-6xl font-bold mb-8"
      style={{
        background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        letterSpacing: '0.05em',
      }}
    >
      Bridging Silicon and Software
    </h2>

    <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-lg mb-16">
      At <span className="text-white font-semibold">EL KAID-B1</span>, innovation doesn’t stop at code — it extends to the circuits beneath it. 
      We design <span className="text-white font-semibold">intelligent systems</span> that merge smart software with adaptive hardware, 
      creating an ecosystem where data, design, and devices evolve together.
    </p>

    {/* Split Grid */}
    <div className="grid md:grid-cols-2 gap-10 text-left">
      {/* SOFTWARE INTELLIGENCE */}
      <div className="bg-gradient-to-br from-purple-900/10 to-slate-800/20 backdrop-blur-sm border border-purple-500/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-300">
        <div className="flex items-center mb-4 space-x-3">
          <Code className="w-8 h-8 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">Software Intelligence</h3>
        </div>
        <p className="text-gray-400 mb-6">
          Cloud-native systems engineered for precision, scalability, and cognition.
        </p>
        <ul className="space-y-3 text-gray-300">
          <li>💻 <span className="text-white font-medium">Adaptive Platforms</span> — Real-time accounting, analytics, and automation.</li>
          <li>🌐 <span className="text-white font-medium">Connected Ecosystems</span> — Unified dashboards across web, desktop & mobile.</li>
          <li>🧠 <span className="text-white font-medium">Cognitive Engines</span> — AI-led workflows, predictive reconciliation & OCR.</li>
          <li>🔒 <span className="text-white font-medium">Trust by Design</span> — Role-based access, encryption, and compliance frameworks.</li>
        </ul>
      </div>

      {/* HARDWARE INNOVATION */}
      <div className="bg-gradient-to-br from-cyan-900/10 to-slate-800/20 backdrop-blur-sm border border-cyan-500/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300">
        <div className="flex items-center mb-4 space-x-3">
          <Rocket className="w-8 h-8 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">Hardware Innovation</h3>
        </div>
        <p className="text-gray-400 mb-6">
          Intelligent edge systems redefining how hardware senses, computes, and collaborates.
        </p>
        <ul className="space-y-3 text-gray-300">
          <li>⚙️ <span className="text-white font-medium">Smart Terminals</span> — IoT billing nodes with secure financial sensors.</li>
          <li>🔋 <span className="text-white font-medium">Edge Compute Devices</span> — Offline AI cores for autonomous processing.</li>
          <li>🤖 <span className="text-white font-medium">AI-on-Chip Systems</span> — FPGA-driven parallel inference modules.</li>
          <li>🛰️ <span className="text-white font-medium">Next-Gen R&D</span> — Quantum-ready architecture & decentralized computation.</li>
        </ul>
      </div>
    </div>

    {/* Stats Section */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
      {[
        { label: "Modules Built", value: "12+", icon: Code },
        { label: "Engineering Hours", value: "2500+", icon: Calendar },
        { label: "Team Innovators", value: "8", icon: Users },
        { label: "Platforms Deployed", value: "4", icon: Smartphone }
      ].map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
              <IconComponent className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        );
      })}
    </div>
  </div>
</section>



      {/* Key Features */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cross-Platform</h3>
              <p className="text-gray-400">Available on Web, Desktop (Windows/macOS), and Mobile (Android/iOS)</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered</h3>
              <p className="text-gray-400">OCR bill scanning, auto-reconciliation, and intelligent categorization</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors duration-300">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure & Compliant</h3>
              <p className="text-gray-400">Role-based access with PAN/CA license authentication and GST compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Project Modules</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-purple-500/30 border border-purple-500/50 text-white'
                      : 'bg-slate-800/30 border border-purple-500/10 text-gray-400 hover:bg-slate-800/50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/10 project-card-hover hover:border-purple-500/30 transition-all duration-300"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getPhaseColor(project.phase)}`}>
                      {project.phase}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.timeline}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.team}</span>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                    <div className="text-sm text-gray-400 mb-1">Achievement:</div>
                    <div className="text-green-400 font-semibold">{project.results}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 bg-purple-500/20 border border-purple-500/30 text-white hover:bg-purple-500/30 transition-all duration-300">
                      <Code className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button className="bg-slate-700/50 text-white p-2 rounded-lg hover:bg-slate-700 transition-all duration-300">
                      <Github className="w-4 h-4" />
                    </button>
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
            Experience
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              EL KAID-B1
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to experience the future of innovation? Join us in revolutionizing how technology transforms business operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" className="glow-button" data-glow-attached="true">
              <div className="button_inner">
                <p className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Request Demo</span>
                </p>
              </div>
              <div className="glow"></div>
            </button>
            <button className="border-2 border-blue-400/50 text-blue-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-400/10 transition-all duration-300">
              Download Beta
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

export default OurWork;