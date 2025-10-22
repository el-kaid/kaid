import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-slate-800 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                EL KAID
              </span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Transforming accounting with AI-powered automation and intelligent business solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors"
              >
                <span className="text-purple-400 text-sm">T</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors"
              >
                <span className="text-purple-400 text-sm">L</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors"
              >
                <span className="text-purple-400 text-sm">G</span>
              </a>
            </div>
          </div>
          
          {/* Product Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/our-work" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/buy-software" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Security</a></li>
              <li><a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/career" className="hover:text-white transition-colors">Work With Us</Link></li>
              <li><Link to="/updates" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/updates" className="hover:text-white transition-colors">Support Hub</Link></li>
            </ul>
          </div>
          
          {/* Support Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EL KAID. All rights reserved.
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm">
            <a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
