import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowToStartBitcoin = () => {
  useEffect(() => {
    const gsapCtx = gsap.context(() => {
      const container = document.querySelector(".horizontal-container");
      const sections = gsap.utils.toArray(".horizontal-section");
      
      if (!container || !sections.length) return;

      // Calculate the total scroll distance needed
      const scrollWidth = container.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-scroll-wrapper",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth * 1.5}`, // Increased multiplier for smoother scroll
          invalidateOnRefresh: true,
        },
      });

      // Animate the progress line
      gsap.fromTo(".progress-line", 
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-scroll-wrapper",
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollWidth * 1.5}`,
          },
        }
      );

      // Animate dots with proper timing
      const dots = gsap.utils.toArray(".step-dot");
      dots.forEach((dot, i) => {
        const progress = i / (dots.length - 1); // 0, 0.33, 0.66, 1
        const startScroll = scrollWidth * 1.5 * progress;
        
        gsap.fromTo(dot,
          {
            scale: 1,
            backgroundColor: "#4B5563",
          },
          {
            scale: 1.5,
            backgroundColor: "#9B8AFB",
            ease: "none",
            scrollTrigger: {
              trigger: ".horizontal-scroll-wrapper",
              scrub: 1,
              start: "top top",
              end: () => `top+=${startScroll} top`,
            },
          }
        );
      });

    });

    return () => gsapCtx.revert();
  }, []);

  const steps = [
    {
      number: 1,
      title: "Inform yourself",
      description: "Bitcoin is different than what you know and use every day. Before you start using Bitcoin, there are a few things that you need to know in order to use it securely and avoid common pitfalls."
    },
    {
      number: 2,
      title: "Choose your wallet",
      description: "You can install an app on your mobile device for everyday use or you can have a wallet only for online payments on your computer. In any case, choosing a wallet is easy and can be done in minutes."
    },
    {
      number: 3,
      title: "Spend Bitcoin",
      description: "There are a growing number of services and merchants accepting Bitcoin all over the world. Use Bitcoin to pay them and rate your experience to help them gain more visibility."
    },
    {
      number: 4,
      title: "Get Bitcoin",
      description: "You can get Bitcoin by accepting it as a payment for goods and services. There are also several ways you can buy Bitcoin."
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Intro section */}
      <section className="min-h-screen px-[10vw] flex flex-col justify-center">
        <div className="max-w-4xl">
          <p className="text-[#9B8AFB] text-sm uppercase tracking-wider mb-4">Guide</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">How to start using bitcoin</h2>
        </div>
      </section>

      {/* Horizontal scroll wrapper */}
      <section className="horizontal-scroll-wrapper relative bg-black h-screen overflow-hidden">
        {/* Progress bar with dots - Fixed position */}
        <div className="absolute top-20 left-[10vw] w-[80vw] z-30 pointer-events-none">
          <div className="relative w-full h-1">
            {/* Background line */}
            <div className="absolute w-full h-full bg-gray-700 rounded-full"></div>
            {/* Progress line */}
            <div className="progress-line absolute w-full h-full bg-[#9B8AFB] origin-left rounded-full"></div>
            
            {/* Step dots */}
            {[0, 33.33, 66.66, 100].map((position, index) => (
              <div
                key={index}
                className="step-dot absolute w-5 h-5 rounded-full bg-gray-600 border-4 border-black transition-all duration-300"
                style={{
                  left: `${position}%`,
                  top: '-8px',
                  transform: position === 0 ? 'translateX(0)' : position === 100 ? 'translateX(-100%)' : 'translateX(-50%)'
                }}
              ></div>
            ))}
          </div>
          
          {/* Step labels */}
          <div className="flex justify-between mt-6">
            {steps.map((step, index) => (
              <div key={index} className="text-gray-500 text-sm font-medium">
                Step {step.number}
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal container */}
        <div className="horizontal-container flex h-full">
          {steps.map((step, index) => (
            <section
              key={index}
              className="horizontal-section w-screen h-full flex-shrink-0 px-[10vw] flex items-center justify-start"
            >
              <div className="max-w-2xl pt-32">
                <div className="mb-4 text-[#9B8AFB] text-lg font-semibold">Step {step.number}</div>
                <h3 className="text-5xl md:text-6xl font-bold mb-6">{step.title}</h3>
                <p className="text-gray-300 text-xl leading-relaxed max-w-[50ch]">
                  {step.description}
                </p>
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* Continue section */}
      <section className="min-h-screen px-[10vw] flex items-center">
        <div className="max-w-4xl">
          
        </div>
      </section>
    </div>
  );
};

export default HowToStartBitcoin;