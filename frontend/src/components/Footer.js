import React from 'react';
import ButtonAnimatedGradient from './ButtonAnimatedGradient';

export default function BitcoinHero() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* === Minimalist Glowing Arc === */}
      <div className="absolute bottom-32 -right-32 h-[1000px] w-[1000px] z-0" style={{ transform: 'rotate(-15deg)', transformOrigin: 'bottom right' }}>
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
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-20">
        <div className="max-w-7xl">
          {/* Small header text */}
          <div className="mb-6">
            <span className="text-purple-400 text-sm md:text-base font-light tracking-tight uppercase">
              Dive into the future
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight mb-12 leading-tight whitespace-nowrap">
            START YOUR JOURNEY
          </h1>

          {/* Large NOW text with gradient */}
          <div className="mb-16 -ml-1 md:-ml-2 lg:-ml-3 -mt-4 md:-mt-6 lg:-mt-8">
            <h2 className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-semibold leading-none bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent tracking-tighter">
              NOW!
            </h2>
          </div>

          {/* Description text */}
          <p className="text-gray-300 text-sm md:text-base max-w-xl mb-8 leading-relaxed -mt-6 md:-mt-8 lg:-mt-10">
            In order to start using bitcoin, you can buy<br />
            it on one of the exchanges below and be<br />
            one of the first, who will step into the future!
          </p>

          {/* CTA Button */}
          <ButtonAnimatedGradient text="Buy Bitcoin" />
        </div>
      </div>

      {/* Additional ambient effects */}
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
    </div>
  );
}