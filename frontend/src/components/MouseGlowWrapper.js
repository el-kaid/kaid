'use client';

import React, { useState, useEffect } from 'react';

export default function MouseGlowWrapper({ children }) {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [glowColor, setGlowColor] = useState('rgba(255, 255, 255, 0.015)');

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Determine screen coordinates to shift glow color dynamically
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            
            // Check if cursor is in the second half of the page where ELKAID Sourcing and Gold accents are located
            // (e.g. scroll position + cursor position is near the gold sectors)
            const absoluteY = scrollY + e.clientY;
            
            // ELKAID Trade spec bento card and gold sectors start roughly after 1600px
            if (absoluteY > 1200 && absoluteY < 2400) {
                // Gold sector
                setGlowColor('rgba(212, 175, 55, 0.025)');
            } else {
                // Monochrome software sector
                setGlowColor('rgba(255, 255, 255, 0.015)');
            }
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
