import React from 'react';
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Link from "next/link";
import MouseGlowWrapper from "../components/MouseGlowWrapper";
import SpecBentoGrid from "../components/SpecBentoGrid";

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
    <main className="min-h-screen -mt-8 pt-8 bg-onyx text-white selection:bg-white selection:text-black font-inter relative">
      <Navbar />

      <MouseGlowWrapper>
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

        {/* ================= FLAGSHIP DIVISIONS SHOWCASE (APPLE BENTO SPECS) ================= */}
        <section className="relative py-24 md:py-32 px-6 md:px-12 bg-black border-t border-white/10 overflow-hidden">
          {/* Subtle background ambient lights */}
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-neutral-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-500 text-[10px] uppercase tracking-widest font-mono">
                Enterprise Pillars
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-outfit mt-4 leading-none">
                Flagship Core Divisions
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-light leading-relaxed">
                EL KAID operates two distinct modular business arms, engineered to standardise transaction ledgers and coordinate transnational trade corridors.
              </p>
            </div>

            {/* Click-Interactive Spec Bento Grid (B1 Software Dashboard and Trade Route Simulator) */}
            <SpecBentoGrid />
          </div>
        </section>

      {/* ================= WHY CHOOSE US SECTION (ASYMMETRICAL BENTO GRID) ================= */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-onyx border-t border-white/10">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-500 text-[10px] uppercase tracking-widest font-mono">
              The Edge
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-outfit mt-4 leading-none">
              Engineered Differently
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-light leading-relaxed">
              We design our products around speed, robust security guarantees, and seamless multi-branch visibility.
            </p>
          </div>

          {/* Asymmetric Apple-style Bento Grid Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Bento Card 1: Global Connectivity (Spans 2 columns on desktop for wide visual impact) */}
            <div className="md:col-span-2 glass-card p-8 md:p-10 rounded-[2.5rem] min-h-[300px] relative overflow-hidden group hover:scale-[1.01] duration-500 ease-out flex flex-col justify-between">
              {/* Background glowing CSS world coordinate layout */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none z-0"></div>
              
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-outfit tracking-tight">
                  Global Sourcing Connectivity
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">
                  Coordinate international supplier channels and monitor shipping milestones in real time. EL KAID provides a transnational bridge ensuring your accounting registers sync perfectly with physical commercial corridors across India and the GCC countries.
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                <span>Transnational Network</span>
                <span>Active Channels UAE / KSA</span>
              </div>
            </div>

            {/* Bento Card 2: AI-Driven Insights (1 column) */}
            <div className="glass-card p-8 md:p-10 rounded-[2.5rem] min-h-[300px] relative overflow-hidden group hover:scale-[1.02] duration-500 ease-out flex flex-col justify-between">
              {/* Glowing visual mini-chart built in HTML/CSS */}
              <div className="absolute top-8 right-8 flex items-end gap-1.5 h-16 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity">
                <div className="w-1.5 bg-neutral-700 h-1/2 rounded-full"></div>
                <div className="w-1.5 bg-neutral-600 h-3/4 rounded-full"></div>
                <div className="w-1.5 bg-white h-2/3 rounded-full"></div>
                <div className="w-1.5 bg-white h-full rounded-full"></div>
              </div>
              
              <div className="relative z-10 pt-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-outfit tracking-tight">
                  AI-Driven Ledger Insights
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                  Process billing ledgers and export documents to highlight margin bottlenecks and automatically flags transnational compliance anomalies.
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                <span>Autonomous Analysis</span>
              </div>
            </div>

            {/* Bento Card 3: Bank-Grade Security (1 column) */}
            <div className="glass-card p-8 md:p-10 rounded-[2.5rem] min-h-[300px] relative overflow-hidden group hover:scale-[1.02] duration-500 ease-out flex flex-col justify-between">
              {/* Glowing coordinate lines backdrop in CSS representing security grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(255,255,255,0.03)_95%)] bg-[size:100%_12px] pointer-events-none z-0"></div>
              
              <div className="relative z-10">
                <span className="text-[9px] font-mono text-green-400 tracking-widest uppercase block mb-3 font-semibold">
                  [ PIPELINE SECURED ]
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-outfit tracking-tight">
                  Bank-Grade Encryption
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                  Military-grade AES-256 local database encryption and multi-party cryptographic signature protocols keep your audit trail safe from external tampering.
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                <span>Local Ledger Locks</span>
              </div>
            </div>

            {/* Bento Card 4: Unified Ecosystem (1 column, accented with Gold outlines) */}
            <div className="md:col-span-2 glass-card-gold p-8 md:p-10 rounded-[2.5rem] min-h-[300px] relative overflow-hidden group hover:scale-[1.01] duration-500 ease-out flex flex-col justify-between">
              {/* Glowing coordinates lines backdrop */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-gold mb-4 font-outfit tracking-tight text-glow-gold">
                  Unified Transnational Ecosystem
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">
                  Why settle for fragmented components? Under EL KAID, we weave strategy, localized software engineering, secure bookkeeping databases, custom conversion-optimized business web design, and India-to-GCC sourcing coordinates into one monolithic corporate ecosystem.
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-gold/10 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-gold/60 text-glow-gold">
                <span>Modular Architecture</span>
                <span>Audit-Ready Standardisation</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === SCROLL SECTIONS === */}
      <B1WorkflowHorizontal />
      <ElKaidVsTraditionalContrast />
      
      </MouseGlowWrapper>
    </main>
  );
}
