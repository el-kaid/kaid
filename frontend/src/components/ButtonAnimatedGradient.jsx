import React, { useRef, useState } from "react";

const ButtonAnimatedGradient = ({ text = "Get Started", onClick }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div className="relative inline-flex">
      {/* Outer glow layer - Indigo to light purple */}
      <div
        className="pointer-events-none absolute -inset-4 opacity-0 blur-lg transition-opacity duration-500"
        style={{
          opacity: opacity * 0.2,
          background: `radial-gradient(180px circle at ${position.x}px ${position.y}px, #6366f1, #c4b5fd 50%, transparent 70%)`,
        }}
      />

      {/* Middle glow layer - Purple to lavender */}
      <div
        className="pointer-events-none absolute -inset-3 opacity-0 blur-md transition-opacity duration-500"
        style={{
          opacity: opacity * 0.3,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, #8b5cf6, #e9d5ff 50%, transparent 70%)`,
        }}
      />

      {/* Main glow layer - Purple to white center */}
      <div
        className="pointer-events-none absolute -inset-2 opacity-0 blur-sm transition-opacity duration-400"
        style={{
          opacity: opacity * 0.4,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, #7c3aed, rgba(255, 255, 255, 0.4) 40%, transparent 65%)`,
        }}
      />

      <button
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="group relative inline-flex h-10 sm:h-12 items-center justify-center rounded-md bg-black px-4 sm:px-6 md:px-8 font-medium text-white shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-950 z-10 text-sm sm:text-base"
      >
        <span className="relative z-20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-semibold">
          {text}
        </span>
      </button>
    </div>
  );
};

export default ButtonAnimatedGradient;