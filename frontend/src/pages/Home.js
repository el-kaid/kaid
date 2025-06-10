import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Star } from 'lucide-react';
import SplineScene from '../components/SplineScene';

// Custom CSS for radial gradients
const customStyles = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}



const Home = () => {
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

  const stats = [
    { number: "10K+", label: "Happy Clients" },
    { number: "99.9%", label: "Uptime" },
    { number: "50+", label: "Countries" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
   {/* Bottom gradient glow effect */}
    <div className="absolute inset-0">
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-pink-500/30 via-purple-600/20 to-transparent rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[600px] h-[400px] bg-gradient-radial from-purple-500/40 via-pink-500/20 to-transparent rounded-full blur-2xl"></div>
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[400px] h-[300px] bg-gradient-radial from-pink-400/50 via-purple-400/30 to-transparent rounded-full blur-xl"></div>
  </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
                <span className="text-purple-400 text-sm font-medium">🚀 Innovation Meets Excellence</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KAID
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Transforming businesses through cutting-edge software solutions and innovative technology that drives real results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Get Started Free
              </button>
              <button className="border-2 border-purple-400/50 text-purple-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-400/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <SplineScene />
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute top-20 right-1/4 w-[500px] h-[300px] bg-gradient-radial from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[250px] bg-gradient-radial from-cyan-500/20 via-purple-500/10 to-transparent rounded-full blur-2xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium">⚡ Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose KAID?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built for businesses that need powerful technology solutions without the complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 hover:bg-slate-800/50 transition-all duration-300 group hover:scale-105">
                <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform text-4xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-1000"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-gradient-radial from-pink-500/25 via-purple-500/15 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <span className="text-cyan-400 text-sm font-medium">💎 Premium Experience</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Transform Your Business Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join thousands of businesses that have streamlined their operations 
                with our innovative software solutions.
              </p>
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
                  <p className="text-gray-300">No credit card required • 30-day free trial</p>
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

                <button className="w-full bg-white text-slate-900 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 mt-6 shadow-xl hover:scale-105">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
              <span className="text-green-400 text-sm font-medium">🌟 Client Success</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what industry leaders have to say about KAID.
            </p>
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
                  "KAID transformed our entire workflow. The AI-powered features saved us countless hours and improved our productivity by 300%."
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
      <section className="py-20 px-4 relative overflow-hidden">
      
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-pink-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-radial from-purple-500/50 via-pink-500/30 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
            <span className="text-pink-400 text-sm font-medium">🎉 Ready to Get Started?</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform 
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses already using KAID to streamline operations, 
            boost productivity, and accelerate growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Your Free Trial
            </button>
            <button className="border-2 border-purple-400/50 text-purple-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-400/10 transition-all duration-300">
              Schedule Demo
            </button>
          </div>

          <div className="text-gray-400 text-sm">
            No credit card required • 30-day free trial • Cancel anytime
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">KAID</div>
              <p className="text-gray-400 mb-4">
                Transforming businesses through cutting-edge software solutions.
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

export default Home;