import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowToStartBitcoin = () => {
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

      // === Neon progress line ===
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

      // === Glow sweep ===
      gsap.fromTo(
        ".progress-glow",
        { opacity: 0, x: 0 },
        {
          opacity: 1,
          x: "100%",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".horizontal-scroll-wrapper",
            start: "top top",
            end: "+=200",
            scrub: true,
          },
        }
      );

      // === Dots: appear only when the line tip reaches them ===
      const dots = gsap.utils.toArray(".step-dot");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".horizontal-scroll-wrapper",
          scrub: 1,
          start: "top top",
          end: `+=${totalScroll}`,
        },
      });

      // map each dot's progress (0 → 1)
      dots.forEach((dot, i) => {
        const progress = i / (dots.length - 1);

        tl.fromTo(
          dot,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1.2,
            borderColor: "#9B8AFB",
            boxShadow: "0 0 25px rgba(155,138,251,0.9)",
            ease: "back.out(1.7)",
          },
          progress // 👈 triggers exactly when progress-line reaches that percentage
        ).to(
          dot,
          {
            scale: 1,
            boxShadow: "0 0 15px rgba(155,138,251,0.6)",
            duration: 0.3,
          },
          progress + 0.05
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Manage Capital in One Space",
      description:
        "B1 allows users to handle all financial operations — accounts, ledgers, billing, and analytics — from one dashboard. Track cash flow, revenue, and transactions in real time. No manual entries — your data syncs automatically with every action.",
    },
    {
      title: "Smart Transactions & Secure Payments",
      description:
        "Send, receive, and record payments instantly. AI verifies, records, and reconciles each transaction with full transparency. You can customize approval limits, roles, and permissions for your team. Everything is secured with blockchain-grade encryption.",
    },
    {
      title: "Plan, Build, and Collaborate",
      description:
        "B2 is where finance meets productivity. Teams can create workspaces for projects, budgeting, and performance tracking. Each workspace connects directly with B1's financial data — so every project has live cost visibility. Manage teams, assign roles, and automate reporting from one place.",
    },
    {
      title: "The Flow Connector — Sync Everything",
      description:
        "Flow bridges B1 and B2, making every decision connected. When a transaction happens in B1, B2 instantly updates your workspace insights — budgets, forecasts, and performance metrics. No need to switch tools — finance and operations move together. You work smarter, faster, and with full clarity.",
    },
  ];

  return (
    <div className="bg-black text-white">
      <section className="horizontal-scroll-wrapper relative bg-black h-screen overflow-hidden">
        {/* Title */}
        <div className="absolute top-16 left-0 right-0 z-20 px-[10vw] text-center pointer-events-none">
          <p className="text-[#9B8AFB] text-sm uppercase tracking-wider mb-4">
            Guide
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold"
            style={{
              background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '0.05em',
            }}
          >
            How to start using bitcoin
          </h2>
        </div>

        {/* Progress bar */}
        <div className="absolute top-[55%] left-[10vw] w-[80vw] z-30 pointer-events-none">
          <div className="relative w-full h-1 overflow-visible">
            {/* Background line */}
            <div className="bg-line absolute w-full h-full bg-gray-700 rounded-full opacity-30 z-0"></div>

            {/* Line behind circles */}
            <div className="progress-line absolute w-full h-full bg-[#9B8AFB] origin-left rounded-full shadow-[0_0_25px_#9B8AFB] z-0"></div>

            {/* Glow sweep */}
            <div className="progress-glow absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 mix-blend-screen pointer-events-none z-10"></div>

            {/* Hollow circles (above line) */}
            {[0, 33.33, 66.66, 100].map((pos, i) => (
              <div
                key={i}
                className="step-dot absolute w-10 h-10 rounded-full border-2 border-transparent bg-black z-20"
                style={{
                  left: `${pos}%`,
                  top: "-18px",
                  transform:
                    pos === 0
                      ? "translateX(0)"
                      : pos === 100
                      ? "translateX(-100%)"
                      : "translateX(-50%)",
                  opacity: 0,
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
              className="horizontal-section w-screen h-full flex-shrink-0 px-[10vw] flex items-center justify-start"
            >
              <div className="max-w-2xl mt-64 md:mt-80">
                <h3
                  className="text-3xl md:text-4xl font-bold mb-3"
                  style={{
                    background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    letterSpacing: '0.05em',
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-[50ch]">
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

export default HowToStartBitcoin;
