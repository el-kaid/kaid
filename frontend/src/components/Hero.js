'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ButtonAnimatedGradient from './ButtonAnimatedGradient';
import ScrollDown from './ScrollDown';

const Hero = () => {
    const router = useRouter();

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
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } // Power4.out feel
        }
    };

    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center bg-onyx text-soft-white overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="flex-grow w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center content-center relative z-10 pt-28 md:pt-0">

                {/* Left Column: Text */}
                <motion.div
                    className="flex flex-col items-start text-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 variants={itemVariants} className="text-xs md:text-sm font-bold tracking-[0.3em] text-slate-grey mb-6 uppercase border-l-2 border-white pl-4">
                        The Future is Monolithic
                    </motion.h2>

                    <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mb-8 leading-[0.9] text-white">
                        EL KAID
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-slate-grey text-lg md:text-xl max-w-lg mb-12 font-normal leading-relaxed">
                        Where vision meets intelligence. A minimalist ecosystem for the builders of tomorrow.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-row gap-4 w-full sm:w-auto">
                        <ButtonAnimatedGradient text="Start Your Journey" onClick={() => window.location.href = 'https://b1.elkaid.com'} />
                    </motion.div>
                </motion.div>

                {/* Right Column: User Selected Image Placeholder */}
                <motion.div
                    className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-white/5 border border-white/10">
                        {/* 
                            USER INSTRUCTION: 
                            Replace 'hero-selected.png' in public/assets/ with your chosen image.
                            Recommended size: 1200x1600 or similar portrait/vertical aspect ratio.
                        */}
                        <img
                            src="/assets/hero-custom.jpg"
                            alt="El Kaid Lifestyle"
                            className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 hover:grayscale-0"
                            onError={(e) => {
                                console.error("Image failed to load:", e);
                            }}
                        />
                        {/* Gradient overlay for text readability if needed, mostly style */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Down - Stays at bottom naturally, no overlap */}
            <motion.div
                className="flex-shrink-0 pb-10 z-10 opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <ScrollDown />
            </motion.div>
        </section>
    );
};

export default Hero;
