'use client';

import React, { useRef, useEffect, useState } from 'react';

// EL KAID VS TRADITIONAL FINANCES Section Component
const ElKaidVsTraditionalFinancesBW = () => {
    const sectionRef = useRef(null);
    const [activePointIndex, setActivePointIndex] = useState(0);

    // Simplified logic for brevity in this redesign - focus on UI
    // In a real scenario, we'd keep the scroll logic but apply it to the new design.
    // For this "Revolut" look, a clean tabbed or sticky interface is often better, 
    // but I will adapt the existing scroll logic to the new aesthetic.

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = section.offsetHeight;

            const currentScroll = window.scrollY - section.offsetTop;
            const totalScroll = sectionHeight - windowHeight;

            let progress = 0;
            if (totalScroll > 0) {
                progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
            }

            setScrollProgress(progress);

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
            className="relative bg-white text-onyx py-24" // Switching to White bg for contrast against Onyx sections
            style={{ height: '300vh' }}
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden px-6">

                {/* Minimal Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-[10vw] sm:text-[12vw] leading-[0.85] font-medium tracking-tighter text-black/10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0">
                        COMPARISON
                    </h2>
                    <h2 className="relative z-10 text-4xl md:text-6xl font-medium tracking-tight text-onyx">
                        Built Different.
                    </h2>
                </div>

                {/* Comparison Cards - Revolut Style: Clean, Shadow, Rounded */}
                <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Traditional (The Old) */}
                    <div className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center h-[300px] justify-center transition-all duration-500">
                        <h3 className="text-xl font-medium text-gray-400 mb-6 uppercase tracking-widest">Traditional</h3>
                        <p className="text-3xl md:text-4xl text-gray-300 font-medium leading-tight">
                            {traditionalPoints[activePointIndex]}
                        </p>
                    </div>

                    {/* El Kaid (The New) */}
                    <div className="p-10 rounded-[3rem] bg-onyx text-white shadow-2xl flex flex-col items-center text-center h-[350px] justify-center transform scale-105 transition-all duration-500 relative overflow-hidden">
                        {/* Subtle gradient blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                        <h3 className="text-xl font-medium text-white/50 mb-6 uppercase tracking-widest">El Kaid</h3>
                        <p className="text-3xl md:text-5xl text-white font-medium leading-tight">
                            {bitcoinPoints[activePointIndex]}
                        </p>
                        <div className="mt-8 px-4 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-white">
                            {labels[activePointIndex]}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ElKaidVsTraditionalFinancesBW;
