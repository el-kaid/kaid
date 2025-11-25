import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeItem, setActiveItem] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [itemPositions, setItemPositions] = useState({});
  const location = useLocation();

  const handleNavItemMouseMove = (itemPath, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setItemPositions(prev => ({
      ...prev,
      [itemPath]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

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
      <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-5">
        <div className="flex items-center justify-center relative">
          {/* Navigation Items - Center */}
          <div className="hidden lg:flex items-center space-x-1 md:space-x-2">
            {navItems.map((item) => {
              const isHovered = hoveredItem === item.path;
              const position = itemPositions[item.path] || { x: 0, y: 0 };
              const isActive = activeItem === item.path;
              
              return (
                <div key={item.path} className="relative inline-flex">
                  {/* Outer glow layer */}
                  <div
                    className="pointer-events-none absolute -inset-4 opacity-0 blur-lg transition-opacity duration-500 rounded-xl"
                    style={{
                      opacity: isHovered ? 0.2 : 0,
                      background: `radial-gradient(180px circle at ${position.x}px ${position.y}px, #6366f1, #c4b5fd 50%, transparent 70%)`,
                    }}
                  />

                  {/* Middle glow layer */}
                  <div
                    className="pointer-events-none absolute -inset-3 opacity-0 blur-md transition-opacity duration-500 rounded-xl"
                    style={{
                      opacity: isHovered ? 0.3 : 0,
                      background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, #8b5cf6, #e9d5ff 50%, transparent 70%)`,
                    }}
                  />

                  {/* Main glow layer */}
                  <div
                    className="pointer-events-none absolute -inset-2 opacity-0 blur-sm transition-opacity duration-400 rounded-xl"
                    style={{
                      opacity: isHovered ? 0.4 : 0,
                      background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, #7c3aed, rgba(255, 255, 255, 0.4) 40%, transparent 65%)`,
                    }}
                  />

                  <Link
                    to={item.path}
                    onMouseMove={(e) => handleNavItemMouseMove(item.path, e)}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      setItemPositions(prev => ({ ...prev, [item.path]: { x: 0, y: 0 } }));
                    }}
                    className={`
                      relative px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300 ease-out rounded-xl group overflow-hidden z-10
                      ${isActive
                        ? 'text-white bg-black shadow-lg shadow-purple-500/20'
                        : 'text-gray-300 hover:text-white bg-black'
                      }
                    `}
                  >
                    <span className="relative z-20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {item.label}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                    )}
                  </Link>
                </div>
              );
            })}
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
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20' : 'max-h-0'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-xl group overflow-hidden text-center
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