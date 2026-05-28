'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollDown from './ScrollDown';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1, when: "beforeChildren", staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center bg-onyx text-soft-white overflow-hidden font-inter">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="flex-grow w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center content-center relative z-10 pt-28 md:pt-12">

                {/* Left Column: Text & Premium Actions */}
                <motion.div
                    className="flex flex-col items-start text-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 variants={itemVariants} className="text-xs md:text-sm font-bold tracking-[0.3em] text-neutral-500 mb-6 uppercase border-l-2 border-white pl-4 font-outfit">
                        The Future is Monolithic
                    </motion.h2>

                    <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mb-8 leading-[0.9] text-white font-outfit">
                        EL KAID
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-neutral-400 text-lg md:text-xl max-w-lg mb-12 font-light leading-relaxed">
                        Where vision meets operational intelligence. A minimalist ecosystem engineered for the builders of tomorrow.
                    </motion.p>

                    {/* Stacked on mobile, inline on desktop */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <a
                            href="https://b1.elkaid.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-200 transition-all text-center rounded-full shadow-lg shadow-white/5 border border-white"
                        >
                            Explore B1 Software
                        </a>
                        <a
                            href="https://trade.elkaid.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-transparent border border-gold/40 text-gold font-bold text-[10px] uppercase tracking-widest hover:border-gold hover:bg-gold hover:text-black transition-all text-center rounded-full text-glow-gold"
                        >
                            Access B2B Trade
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Column: Visual Showcase */}
                <motion.div
                    className="relative h-[45vh] md:h-[70vh] w-full flex items-center justify-center pointer-events-none mt-6 md:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/10 bg-neutral-950">
                        <img
                            src="/assets/hero-real.png"
                            alt="El Kaid Premium Visualization"
                            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 pointer-events-auto cursor-pointer"
                            onError={(e) => {
                                console.error("Image failed to load:", e);
                            }}
                        />
                        {/* Subtle bottom fade overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Down */}
            <motion.div
                className="flex-shrink-0 pb-10 z-10 opacity-40 hover:opacity-100 transition-opacity pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <ScrollDown />
            </motion.div>
        </section>
    );
};

export default Hero;
