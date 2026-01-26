'use client';

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowToStartBitcoinBW = () => {
    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = document.querySelector(".horizontal-container");
            const sections = gsap.utils.toArray(".horizontal-section");
            if (!container || !sections.length) return;

            const scrollWidth = container.scrollWidth - window.innerWidth;
            const totalScroll = scrollWidth * 1.5;

            // === Horizontal Scroll ===
            gsap.to(container, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: ".horizontal-scroll-wrapper",
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: `+=${totalScroll}`,
                    invalidateOnRefresh: true,
                },
            });

            // === Progress line ===
            gsap.fromTo(
                ".progress-line",
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    transformOrigin: "left center",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".horizontal-scroll-wrapper",
                        scrub: 1,
                        start: "top top",
                        end: `+=${totalScroll}`,
                    },
                }
            );

            // === Dots ===
            const dots = gsap.utils.toArray(".step-dot");
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".horizontal-scroll-wrapper",
                    scrub: 1,
                    start: "top top",
                    end: `+=${totalScroll}`,
                },
            });

            dots.forEach((dot, i) => {
                const progress = i / (dots.length - 1);

                tl.fromTo(
                    dot,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        borderColor: "#ffffff",
                        backgroundColor: "#ffffff", // Fill white on activation
                        boxShadow: "0 0 0 rgba(0,0,0,0)",
                        ease: "power2.out",
                    },
                    progress
                );
            });
        });
        return () => ctx.revert();
    }, []);

    const steps = [
        {
            title: "One Dashboard.",
            description:
                "Manage all financial operations from a single point of truth. Track cash flow, revenue, and transactions in real time. No manual entries — your data syncs automatically."
        },
        {
            title: "Smart Payments.",
            description:
                "Send, receive, and record payments instantly. AI verifies, records, and reconciles each transaction. Customize approval limits and roles for your team."
        },
        {
            title: "Collaborate.",
            description:
                "Where finance meets productivity. Create workspaces for projects, budgeting, and performance tracking. Automate reporting from one place."
        },
        {
            title: "Sync.",
            description:
                "Ensure every decision is fully synchronized. When a transaction happens, your workspace insights update instantly. Work smarter, faster, and with full clarity."
        },
    ];

    return (
        <div className="bg-onyx text-soft-white font-montserrat">
            <section className="horizontal-scroll-wrapper relative bg-onyx min-h-screen md:h-screen overflow-hidden">
                {/* Title */}
                <div className="absolute top-16 sm:top-24 left-0 right-0 z-20 px-6 md:px-[10vw] pointer-events-none">
                    <h2 className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight">
                        How to Start.
                    </h2>
                </div>

                {/* Progress bar - Moved down to 40% to give more space from title */}
                <div className="absolute top-[40%] left-0 right-0 w-full z-30 pointer-events-none px-6 md:px-[10vw]">
                    <div className="relative w-full h-[2px] overflow-visible">
                        {/* Background line */}
                        <div className="bg-line absolute w-full h-full bg-white/10 z-0"></div>

                        {/* Active Line - Solid White */}
                        <div className="progress-line absolute w-full h-full bg-white origin-left z-0"></div>

                        {/* Dots */}
                        {[0, 33.33, 66.66, 100].map((pos, i) => (
                            <div
                                key={i}
                                className="step-dot absolute w-4 h-4 rounded-full border-2 border-white/30 bg-onyx z-20"
                                style={{
                                    left: `${pos}%`,
                                    top: "-7px",
                                    transform:
                                        pos === 0
                                            ? "translateX(0)"
                                            : pos === 100
                                                ? "translateX(-100%)"
                                                : "translateX(-50%)",
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Horizontal content */}
                <div className="horizontal-container flex h-full">
                    {steps.map((step, index) => (
                        <section
                            key={index}
                            className="horizontal-section w-screen h-full flex-shrink-0 px-6 md:px-[10vw] flex items-center justify-start"
                        >
                            <div className="max-w-2xl mt-[50vh] sm:mt-[45vh]"> {/* Pushed content down relative to viewport height */}
                                <h3 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-8 text-white tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-slate-grey text-lg sm:text-xl md:text-2xl leading-relaxed max-w-[45ch]">
                                    {step.description}
                                </p>
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HowToStartBitcoinBW;
