import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Star, ExternalLink, Github, Calendar, Users, Zap, Code, Smartphone, Globe, Database, Shield, Rocket, Receipt, Calculator, FileText, CreditCard, BarChart3, Brain } from 'lucide-react';

// Custom CSS for radial gradients
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

  // KAID-B1 Software development phases and modules
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
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'ai', name: 'AI/ML', icon: Brain },
    { id: 'integration', name: 'Integration', icon: Zap },
    { id: 'compliance', name: 'Compliance', icon: FileText },
    { id: 'inventory', name: 'Inventory', icon: BarChart3 },
    { id: 'analytics', name: 'Analytics', icon: Smartphone }
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
  <div className="min-h-screen bg-slate-900">  
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">        {/* Background gradient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 pt-12">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium">🚀 Our Latest Work</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                KAID-B1
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Development
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Building the next generation of billing and accounting software with AI-powered automation and cross-platform compatibility.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
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

      {/* Project Overview */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">KAID-B1 Software Overview</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              A comprehensive cross-platform billing and accounting solution designed for simplicity and power, 
              featuring AI-driven automation and multi-role access for businesses and chartered accountants.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cross-Platform</h3>
              <p className="text-gray-400">Available on Web, Desktop (Windows/macOS), and Mobile (Android/iOS)</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered</h3>
              <p className="text-gray-400">OCR bill scanning, auto-reconciliation, and intelligent categorization</p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
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
      <section className="py-12 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-slate-800/50 border-slate-700 text-gray-300 hover:border-purple-500 hover:text-white hover:bg-slate-800/70'
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 project-card-hover hover:border-purple-500/30 transition-all duration-300"
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
                    <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/25">
                      <Code className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors duration-300">
                      <Github className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Technology Stack</h2>
            <p className="text-gray-300">Modern technologies powering KAID-B1 software</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                <Code className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Frontend</h3>
              <p className="text-gray-400 text-sm">React, Tailwind CSS, ElectronJS, React Native</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors duration-300">
                <Database className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Backend</h3>
              <p className="text-gray-400 text-sm">Node.js, Express, NestJS, MongoDB Atlas</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">AI/ML</h3>
              <p className="text-gray-400 text-sm">Tesseract.js, Google Vision API, TensorFlow</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-orange-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors duration-300">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Integrations</h3>
              <p className="text-gray-400 text-sm">Setu API, RazorpayX, GST API, Banking APIs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 via-slate-900 to-purple-900/30 relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-pink-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Experience
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              KAID-B1
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to revolutionize your accounting workflow? Get early access to KAID-B1 and join the future of business automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Request Demo</span>
            </button>
            <button className="border-2 border-purple-400/50 text-purple-400 hover:bg-purple-400/10 px-8 py-4 rounded-full font-semibold transition-all duration-300">
              Download Beta
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  KAID
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming accounting with AI-powered automation and intelligent business solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors cursor-pointer">
                  <span className="text-purple-400 text-sm">T</span>
                </div>
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors cursor-pointer">
                  <span className="text-purple-400 text-sm">L</span>
                </div>
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors cursor-pointer">
                  <span className="text-purple-400 text-sm">G</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 KAID. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OurWork;