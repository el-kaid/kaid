import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/our-work', label: 'Our Work' },
    { path: '/updates', label: 'Updates' },
    { path: '/buy-software', label: 'Buy Software' },
    { path: '/career', label: 'Career' }
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out">
      <div 
        className={`
          relative w-full px-6 py-4 rounded-full transition-all duration-500 ease-out
          ${isScrolled 
            ? 'bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-500/10' 
            : 'bg-black/10 backdrop-blur-lg border border-white/5 shadow-xl shadow-cyan-500/5'
          }
          hover:bg-black/30 hover:border-white/15 hover:shadow-2xl hover:shadow-cyan-500/15
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div className="text-white font-bold text-xl tracking-tight">
              KAID
            </div>
          </div>

          {/* Navigation Items - Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative text-sm font-medium transition-all duration-300 ease-out
                  ${activeItem === item.path
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                  }
                  hover:scale-105
                `}
              >
                <span className="relative z-10">
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {activeItem === item.path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Contact Button - Right */}
          <div className="flex items-center space-x-4">
            <Link
              to="/contact"
              className="liquid-glass-btn liquid-glass-btn-white px-6 py-2.5 font-medium text-sm rounded-full"
            >
              Contact us
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => {/* Add mobile menu toggle logic */}}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (hidden by default) */}
        <div className="md:hidden mt-4 pt-4 border-t border-white/10 hidden">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  text-sm font-medium transition-colors duration-200
                  ${activeItem === item.path
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Border glow */}
        <div className="absolute inset-0 rounded-full border border-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </nav>
  );
};

export default Navbar;