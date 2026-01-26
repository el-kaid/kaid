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
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 bg-onyx text-soft-white overflow-hidden">
            {/* Background Grid - Subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <motion.div
                className="relative z-10 text-center max-w-[90vw] px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2 variants={itemVariants} className="text-sm md:text-base font-semibold tracking-[0.3em] text-slate-grey mb-8 uppercase">
                    The Future is Monolithic
                </motion.h2>

                {/* MASSIVE HERO TEXT - Revolut Style */}
                <motion.h1 variants={itemVariants} className="text-[12vw] sm:text-[14vw] font-medium tracking-tighter mb-8 leading-[0.85] text-white">
                    EL KAID
                </motion.h1>

                <motion.p variants={itemVariants} className="text-slate-grey text-lg md:text-2xl max-w-3xl mx-auto mb-16 font-normal tracking-wide leading-relaxed">
                    Where vision meets intelligence. A minimalist ecosystem for the builders of tomorrow.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <ButtonAnimatedGradient text="Start Your Journey" onClick={() => router.push('/register')} />
                    <button
                        onClick={() => router.push('/our-work')}
                        className="px-10 py-5 text-sm tracking-[0.2em] font-bold uppercase bg-transparent text-white border border-white/20 rounded-full hover:bg-white/10 transition-all"
                    >
                        Explore Features
                    </button>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
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
