import React from 'react';
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Link from "next/link";

const B1WorkflowHorizontal = dynamic(
  () => import("../components/B1WorkflowHorizontal")
);
const ElKaidVsTraditionalContrast = dynamic(
  () => import("../components/ElKaidVsTraditionalContrast")
);

export const metadata = {
  title: "ERP, B2B Sourcing and Business Website Platform | EL KAID",
  description:
    "EL KAID delivers next-generation ERP systems, secure B1 billing software, high-performance business websites, and India-to-GCC B2B sourcing coordination.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "EL KAID | Enterprise Software and Trade Coordination",
    description:
      "Seamless ERP systems, B1 billing software, lead-conversion business websites, and India-to-GCC B2B sourcing coordination.",
    url: "/",
    images: ["/assets/hero-real.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EL KAID | Enterprise Software and Trade Coordination",
    description:
      "Seamless ERP systems, B1 billing software, lead-conversion business websites, and India-to-GCC B2B sourcing coordination.",
    images: ["/assets/hero-real.png"],
  },
};

export default function Home() {
  const uniqueFeatures = [
    {
      title: "Global Connectivity",
      description: "Access your software and trade analytics from anywhere in the world. EL KAID bridges operational gaps across borders, allowing seamless international oversight."
    },
    {
      title: "AI-Driven Insights",
      description: "Make informed operational decisions with real-time analytics. Our smart workflows process key data points to provide active business intelligence."
    },
    {
      title: "Bank-Grade Security",
      description: "Your operational integrity is our priority. We employ state-of-the-art encryption and rigorous compliance controls to keep your enterprise data protected."
    },
    {
      title: "Unified Ecosystem",
      description: "Stop juggling fragmented utilities. We integrate strategy, software development, documentation coordination, and infrastructure support into one cohesive platform."
    }
  ];

  return (
    <main className="min-h-screen -mt-8 pt-8 bg-onyx text-white selection:bg-white selection:text-black font-inter">
      <Navbar />

      <Hero />

      {/* ================= OVERVIEW SECTION (REDESIGNED TO PREMIUM 2-COLUMN) ================= */}
      <section className="relative py-20 sm:py-24 md:py-28 px-6 md:px-12 overflow-hidden bg-black border-t border-white/10 flex flex-col items-center">
        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-8">
          
          {/* Left Column: Heading */}
          <div className="text-left flex flex-col justify-start">
            <p className="text-neutral-500 tracking-widest uppercase text-xs font-semibold mb-3">Overview</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight font-outfit">
              Architecting the <br />
              Future of B2B <br />
              Commerce & <br />
              Intelligence.
            </h2>
            <div className="flex justify-start mt-8 sm:mt-10 md:mt-12">
              <Link
                href="/updates"
                aria-label="Go to support hub to contact EL KAID"
                className="relative group overflow-hidden px-8 py-3.5 bg-transparent border border-white/30 text-white uppercase tracking-widest font-semibold text-xs transition-all duration-300 rounded-full hover:border-white hover:bg-white hover:text-black"
              >
                Talk to Sales
              </Link>
            </div>
          </div>

          {/* Right Column: Copy & Division Details */}
          <div className="text-left flex flex-col justify-center gap-8">
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              EL KAID Software & Tech Innovation Private Limited is a unified enterprise bridging high-availability software platforms with international B2B commerce. We structure operations around two core pillars designed for modular scaling and absolute reliability.
            </p>
            <div className="space-y-6">
              <div className="border-l-2 border-white pl-4">
                <h4 className="text-white font-bold text-base font-outfit mb-1">I. Digital Systems & B1 Platform</h4>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  Next-generation ERP software, smart bookkeeping, analytics, and business website engineering focused on automated precision, robust compliance, and custom lead generation.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <h4 className="text-gold font-bold text-base font-outfit mb-1">II. B2B Trade & Sourcing Coordination</h4>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  India-to-GCC product sourcing coordination, commercial documentation structuring, and supplier alignment through licensed partner networks (UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain).
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FLAGSHIP DIVISIONS SHOWCASE ================= */}
      <section className="relative py-20 sm:py-24 md:py-28 px-6 md:px-12 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-neutral-500 tracking-widest uppercase text-xs mb-3">Enterprise Divisions</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-outfit">
              Our Core Pillars of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Division 1: B1 Software (Monochrome Minimalist) */}
            <div className="glass-card p-8 md:p-10 rounded-[2rem] flex flex-col justify-between min-h-[460px] relative overflow-hidden group">
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-4">/ 01 — SOFTWARE</span>
                <h3 className="text-3xl font-bold text-white mb-4 font-outfit">B1 Software Ecosystem</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  Hardened digital architecture for modern operations. Experience the power of an offline-first integrated billing & accounting desktop application designed for businesses that demand zero friction.
                </p>
                <ul className="space-y-3 mb-8 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                    <span>Smart Billing, Bookkeeping & CRM</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                    <span>Real-Time Business Analytics & Live Graph</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                    <span>Secure Windows Native Setup (.exe)</span>
                  </li>
                </ul>
              </div>
              <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">b1.elkaid.com</span>
                <a
                  href="https://b1.elkaid.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-200 transition-all rounded-full flex items-center gap-2"
                >
                  Visit Portal &rarr;
                </a>
              </div>
            </div>

            {/* Division 2: ELKAID Trade (Gold Accent) */}
            <div className="glass-card-gold p-8 md:p-10 rounded-[2rem] flex flex-col justify-between min-h-[460px] relative overflow-hidden group">
              {/* Subtle Gold light flare back effect */}
              <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-gold/5 blur-3xl pointer-events-none group-hover:bg-gold/10 transition-all duration-700"></div>
              
              <div>
                <span className="text-xs font-mono text-gold/60 uppercase tracking-widest block mb-4">/ 02 — COMMERCE</span>
                <h3 className="text-3xl font-bold text-gold mb-4 font-outfit">ELKAID B2B Sourcing</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  Connecting B2B procurement channels across international borders. Structured supplier coordination and complete documentation workflows supporting seamless trade alignment from India to the GCC corridor.
                </p>
                <ul className="space-y-3 mb-8 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                    <span>India-to-GCC Supplier Identification (UAE, Saudi Arabia)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                    <span>Trade Invoice & Packing List Documentation Coordination</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                    <span>Key Categories: Agro, Packaging, Industrial Supplies</span>
                  </li>
                </ul>
              </div>
              <div className="border-t border-gold/15 pt-6 flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold/60 font-mono">trade.elkaid.com</span>
                <a
                  href="https://trade.elkaid.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-transparent border border-gold text-gold font-bold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all rounded-full flex items-center gap-2"
                >
                  Visit Trade Desk &rarr;
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US SECTION ================= */}
      <section className="relative py-20 sm:py-24 md:py-28 px-6 md:px-12 overflow-hidden bg-onyx border-t border-white/10">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-neutral-500 tracking-widest uppercase text-xs mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-outfit">
              What Makes EL KAID Unique?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {uniqueFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-outfit">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SCROLL SECTIONS === */}
      <B1WorkflowHorizontal />
      <ElKaidVsTraditionalContrast />
      
      

    </main>
  );
}
