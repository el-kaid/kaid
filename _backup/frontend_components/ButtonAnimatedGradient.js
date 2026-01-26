import React, { useRef, useState } from 'react';

const ButtonAnimatedGradient = ({ text, onClick, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef(null);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={buttonRef}
            className={`relative group overflow-hidden px-10 py-5 bg-onyx border border-white/50 text-white uppercase tracking-[0.2em] font-bold text-sm transition-all duration-300 rounded-full hover:border-white ${className}`}
        >
            <span className={`relative z-10 transition-colors duration-300 ${isHovered ? 'text-onyx' : 'text-white'}`}>{text}</span>

            {/* Hover reveal effect - Fill from center or side */}
            <div
                className={`absolute inset-0 bg-white transform transition-transform duration-300 ease-out ${isHovered ? 'scale-100' : 'scale-0'} rounded-full`}
                style={{ zIndex: 0, transformOrigin: 'center' }}
            />
        </button>
    );
};

export default ButtonAnimatedGradient;
