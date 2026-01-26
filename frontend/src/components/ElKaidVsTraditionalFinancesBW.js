'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

// --- Main Component ---
const ElKaidVsTraditionalFinancesBW = () => {
    const sectionRef = useRef(null);
    const [activePointIndex, setActivePointIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const section = sectionRef.current;
            const windowHeight = window.innerHeight;
            const sectionHeight = section.offsetHeight;

            const currentScroll = window.scrollY - section.offsetTop;
            const totalScroll = sectionHeight - windowHeight;

            let progress = 0;
            if (totalScroll > 0) {
                progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
            }

            // Map progress 0-1 to index 0-4
            const idx = Math.min(4, Math.floor(progress * 5));
            setActivePointIndex(idx);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const traditionalPoints = [
        'Limited Operating Hours',
        'Rooted in legacy.',
        'Restricted boundaries.',
        'Built to maintain.',
        'Static motion.'
    ];

    const bitcoinPoints = [
        '24/7 Uninterrupted Access',
        'Driven by intelligence.',
        'Global flow.',
        'Built to evolve.',
        'Dynamic precision.'
    ];

    const labels = ['Accessibility', 'Vision', 'Reach', 'Evolution', 'Flow'];

    return (
        <section
            ref={sectionRef}
            className="relative bg-white text-onyx"
            style={{ height: '300vh' }} // Reduced height for better feel
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden px-4 md:px-6">

                {/* Minimal Header */}
                <div className="mb-12 md:mb-24 text-center relative z-10 shrink-0">
                    <h2 className="text-[12vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter text-gray-100 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0">
                        DIFFERENT
                    </h2>
                    <h2 className="relative z-10 text-4xl md:text-7xl font-bold tracking-tight text-onyx">
                        Built Different.
                    </h2>
                </div>

                {/* Cards Container */}
                <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center perspective-1000">

                    {/* Left: Traditional (Subtle, Light) */}
                    <div className="flex justify-center md:justify-end order-2 md:order-1">
                        {/* Static but styled cleanly */}
                        <div className="w-full max-w-xs md:max-w-md p-6 md:p-10 rounded-[2rem] bg-gray-50/50 border border-gray-100/50 backdrop-blur-sm flex flex-col items-center text-center min-h-[220px] md:min-h-[320px] justify-center transition-all duration-500 shadow-sm">
                            <h3 className="text-[10px] md:text-xs font-bold text-gray-400 mb-4 md:mb-6 uppercase tracking-[0.2em]">Traditional</h3>
                            <p className="text-xl md:text-3xl font-medium text-gray-300 leading-tight">
                                {traditionalPoints[activePointIndex]}
                            </p>
                        </div>
                    </div>

                    {/* Right: El Kaid (3D, Premium, Dark) */}
                    <div className="flex justify-center md:justify-start order-1 md:order-2">
                        <TiltCard className="w-full max-w-xs md:max-w-md p-6 md:p-10 rounded-[2rem] bg-[#0A0A0A] text-white shadow-2xl shadow-black/20 flex flex-col items-center text-center min-h-[220px] md:min-h-[320px] justify-center relative overflow-hidden group border border-white/5">

                            {/* Noise Texture Overlay */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                            </div>

                            {/* Lighting Effect */}
                            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />

                            <h3 className="text-[10px] md:text-xs font-bold text-white/40 mb-6 md:mb-8 uppercase tracking-[0.2em]">El Kaid</h3>

                            <motion.p
                                key={activePointIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl md:text-5xl font-bold text-white leading-tight mb-6 md:mb-8"
                            >
                                {bitcoinPoints[activePointIndex]}
                            </motion.p>

                            <div className="px-4 py-1.5 md:px-5 rounded-full bg-white/10 border border-white/5 backdrop-blur-md text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/70">
                                {labels[activePointIndex]}
                            </div>
                        </TiltCard>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ElKaidVsTraditionalFinancesBW;
