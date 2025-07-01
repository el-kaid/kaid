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
    <nav className="fixed top-4 left-4 right-4 z-50 transition-all duration-700 ease-out">
      <div 
        className={`
          navbar-enhanced relative w-full px-8 py-5 rounded-2xl transition-all duration-700 ease-out
          ${isScrolled 
            ? 'bg-slate-900/80 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-purple-500/25' 
            : 'bg-slate-900/70 backdrop-blur-xl border border-white/15 shadow-xl shadow-cyan-500/20'
          }
          hover:bg-slate-900/85 hover:border-white/25 hover:shadow-3xl hover:shadow-purple-500/30
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 group">
            <div className="relative logo-glow">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-white font-bold text-2xl tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
             THE KAID
            </div>
          </div>

          {/* Navigation Items - Center */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out rounded-xl group overflow-hidden
                  ${activeItem === item.path
                    ? 'text-white bg-white/10 shadow-lg shadow-purple-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="relative z-20">
                  {item.label}
                </span>
                
                {/* Active indicator with enhanced design */}
                {activeItem === item.path && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl"></div>
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                  </>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </Link>
            ))}
          </div>

          {/* Contact Button - Right */}
          <div className="flex items-center space-x-4">
            <Link
              to="/contact"
              className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <span className="relative z-10">Contact us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
              onClick={() => {/* Add mobile menu toggle logic */}}
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <div className="lg:hidden mt-6 pt-6 border-t border-white/20 hidden">
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-xl group overflow-hidden
                  ${activeItem === item.path
                    ? 'text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg shadow-purple-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="relative z-10">{item.label}</span>
                {activeItem === item.path && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Enhanced glow effects */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/15 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        {/* Animated border glow */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm"></div>
        
        {/* Inner highlight */}
        <div className="absolute inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
        
        {/* Floating particles effect */}
        <div className="floating-particle absolute top-2 left-10 w-1 h-1 bg-cyan-400 rounded-full opacity-60"></div>
        <div className="floating-particle absolute top-4 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-40"></div>
        <div className="floating-particle absolute bottom-3 left-1/3 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-50"></div>
      </div>
    </nav>
  );
};

export default Navbar;