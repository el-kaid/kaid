'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowToStartBitcoinBW from "../components/HowToStartBitcoinBW";
import ButtonAnimatedGradient from "../components/ButtonAnimatedGradient";

import ElKaidVsTraditionalFinancesBW from "../components/ElKaidVsTraditionalFinancesBW";

export default function Home() {
  const router = useRouter();

  const uniqueFeatures = [
    {
      title: "Global Connectivity",
      description: "Access your financial data from anywhere in the world. EL KAID breaks down borders, allowing seamless management of international assets and transactions."
    },
    {
      title: "AI-Driven Insights",
      description: "Make informed decisions with real-time analytics. Our intelligent algorithms process millions of data points to provide actionable financial intelligence."
    },
    {
      title: "Bank-Grade Security",
      description: "Your trust is our currency. We employ state-of-the-art encryption and security protocols to ensure your sensitive financial data remains impenetrable."
    },
    {
      title: "Unified Ecosystem",
      description: "Stop juggling multiple apps. B1 integrates billing, bookkeeping, banking, and tax management into one cohesive, powerful platform."
    }
  ];

  return (
    <main className="min-h-screen -mt-8 pt-8 bg-onyx text-white selection:bg-white selection:text-black font-montserrat">
      <Navbar />

      <Hero />

      {/* ================= OVERVIEW SECTION ================= */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden bg-black flex flex-col items-center text-center">
        {/* Section content */}
        <div className="relative z-10 max-w-4xl mx-auto pt-8 sm:pt-12 md:pt-16 lg:pt-20">
          <p className="text-gray-500 tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">Overview</p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 px-2 tracking-tight text-white"
          >
            What is EL&nbsp;Kaid?
          </h2>
          <p className="text-gray-400 max-w-full mx-auto leading-normal text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6 md:px-8 text-justify" style={{ maxWidth: '1400px', lineHeight: '1.6' }}>
            EL KAID is the next evolution of financial intelligence — a unified platform that blends AI-powered automation with precise manual control to simplify modern business management. From billing, bookkeeping, taxation, banking, asset tracking, and B1M (Business-1 Messenger), everything flows seamlessly through a single, integrated system.
            <br /><br />
            With globally connected financial data and cutting-edge automation, EL KAID transforms the way businesses operate — creating a virtual office ecosystem that works anytime, anywhere. We're redefining the fintech landscape by giving individuals and businesses the power to manage their finances effortlessly — without relying on consultants. EL KAID isn't just a platform, it's the new era of business and financial management.
          </p>

          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
            <ButtonAnimatedGradient text="Buy Software" onClick={() => router.push('/buy-software')} />
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US SECTION ================= */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden bg-onyx">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <p className="text-gray-500 tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">Why Choose Us</p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 px-2 tracking-tight text-white"
            >
              What Makes EL KAID Unique?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {uniqueFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SCROLL SECTIONS === */}
      <HowToStartBitcoinBW />
      <ElKaidVsTraditionalFinancesBW />

    </main>
  );
}
