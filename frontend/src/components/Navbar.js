import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeItem, setActiveItem] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top
      if (currentScrollY < 20) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setActiveItem(location.pathname);
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/our-work', label: 'Innovation' },
    { path: '/buy-software', label: 'Buy Software' },
    { path: '/career', label: 'Work With Us' },
    { path: '/updates', label: 'Support Hub' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-700 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="relative w-full px-4 py-3 sm:px-8 sm:py-5">
        <div className="flex items-center justify-center relative">
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

          {/* Mobile menu button */}
          <div className="absolute right-0 flex items-center space-x-2 sm:space-x-4">
            <button 
              className="lg:hidden p-2 sm:p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 mt-4 pt-4 border-t border-white/20' : 'max-h-0'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-xl group overflow-hidden text-center
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
      </div>
    </nav>
  );
};

export default Navbar;