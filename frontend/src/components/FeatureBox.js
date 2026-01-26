'use client';

import React, { useState, useRef } from 'react';

const FeatureBox = ({ title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const boxRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={boxRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative h-full flex flex-col border border-white/10 hover:border-white/30 transition-colors duration-500 bg-black/50 overflow-hidden group"
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />

            <div className="p-8 sm:p-12 flex flex-col h-full relative z-10">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed text-justify flex-grow">{description}</p>
            </div>
        </div>
    );
};

export default FeatureBox;
