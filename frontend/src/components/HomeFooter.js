import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonAnimatedGradient from './ButtonAnimatedGradient';

export default function HomeFooter() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/buy-software');
  };
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* === Minimalist Glowing Arc === */}
      <div className="absolute bottom-16 sm:bottom-24 md:bottom-32 -right-16 sm:-right-24 md:-right-32 h-[400px] sm:h-[600px] md:h-[800px] lg:h-[1000px] w-[400px] sm:w-[600px] md:w-[800px] lg:w-[1000px] z-0" style={{ transform: 'rotate(-15deg)', transformOrigin: 'bottom right' }}>
        <svg className="w-full h-full" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer glow half circle */}
          <path d="M 0 1100 A 1100 1100 0 0 1 1200 1100" stroke="url(#arcGlowOuter)" strokeWidth="40" fill="none" opacity="0.4" style={{ filter: 'blur(12px)' }} />
          {/* Middle glow half circle */}
          <path d="M 0 1100 A 1100 1100 0 0 1 1200 1100" stroke="url(#arcGlowMiddle)" strokeWidth="24" fill="none" opacity="0.7" style={{ filter: 'blur(6px)' }} />
          {/* Main half circle */}
          <path d="M 0 1100 A 1100 1100 0 0 1 1200 1100" stroke="url(#arcGradient)" strokeWidth="12" fill="none" />
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

      {/* Main content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl">
          {/* Small header text */}
          <div className="mb-4 sm:mb-6">
            <span className="text-purple-400 text-xs sm:text-sm md:text-base font-light tracking-tight uppercase">
              Dive into the future
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight mb-6 sm:mb-8 md:mb-12 leading-tight">
            Start Your Journey Now
          </h1>

          {/* Description text */}
          <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-full sm:max-w-xl mb-6 sm:mb-8 leading-relaxed -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10">
            Where vision meets intelligence, and finance evolves without limits.
            Join the ecosystem that empowers thinkers, builders, and leaders of tomorrow.
            Enter EL KAID — Built for Progress.
          </p>

          {/* CTA Button */}
          <ButtonAnimatedGradient text="Buy B1 & B2" onClick={handleButtonClick} />
        </div>
      </div>

      {/* Additional ambient effects */}
      <div className="absolute top-10 sm:top-16 md:top-20 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 sm:bottom-1/3 left-1/4 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
    </div>
  );
}

