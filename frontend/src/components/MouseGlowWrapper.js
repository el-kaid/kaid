'use client';

import React, { useState, useEffect } from 'react';

export default function MouseGlowWrapper({ children }) {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [glowColor, setGlowColor] = useState('rgba(255, 255, 255, 0.015)');

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setGlowColor('rgba(255, 255, 255, 0.015)');
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Global floating background radial blur following cursor */}
            <div 
                className="pointer-events-none fixed inset-0 z-0 transition-all duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 85%)`
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
