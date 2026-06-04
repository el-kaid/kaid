import Link from "next/link";
import Navbar from "../../components/Navbar";
import LeadCtaSection from "../../components/LeadCtaSection";

export const metadata = {
  title: "Why EL KAID | B1 Software and Tech Partner",
  description:
    "Discover why enterprises choose EL KAID for smart B1 billing software, modern business website engineering, and high-performance digital solutions.",
  alternates: { canonical: "/why-elkaid" },
};

export default function WhyElkaidPage() {
  const stats = [
    { value: "Offline-First", label: "B1 Core Architecture" },
    { value: "Hardened Apps", label: "Windows Native builds" },
    { value: "100%", label: "GST & Tax Reconciliation" },
    { value: "High-Availability", label: "Infrastructure & Uptime" },
  ];

  const softwarePillars = [
    {
      title: "B1 Software Ecosystem",
      desc: "Smart, offline-first bookkeeping, billing, ERP, and CRM platform designed to reduce manual overhead. Hardened desktop (.exe) builds ensure zero friction, automated reconciliations, and absolute operational speed.",
    },
    {
      title: "Custom Web Engineering",
      desc: "High-performance, SEO-optimized business websites and custom web applications. Engineered for optimal loading speeds, technical SEO compliance, and direct CRM/lead capture integrations.",
    },
    {
      title: "Infrastructure & Disaster Recovery",
      desc: "Enterprise data center design with built-in high-availability redundancy, active anomaly monitoring, and rigorous RTO/RPO drill planning to keep mission-critical workflows secure.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-36 font-inter">
      <Navbar />

      {/* === HERO SECTION === */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-20">
        <header className="max-w-4xl">
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] uppercase tracking-widest font-mono">
            Value Proposition
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mt-6 mb-8 font-outfit tracking-tighter leading-none">
            Why EL KAID
          </h1>
          <p className="text-neutral-400 text-lg md:text-2xl leading-relaxed font-light">
            EL KAID bridges modern technological innovation with high-performance digital architectures. We design and build enterprise billing setups, customizable ERP channels, and custom business websites that scale cleanly.
          </p>
        </header>
      </section>

      {/* === STATS STRIP === */}
      <section className="bg-neutral-950 border-y border-white/10 py-12 px-6 md:px-12 mb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-bold text-white font-outfit mb-1">{stat.value}</h4>
              <p className="text-neutral-500 text-xs uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === THE CORE DIVISION PILLARS === */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-28">
        <div className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all duration-300">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-4">/ PILLAR 01</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-outfit">Digital Systems & B1 Platform</h2>
          <p className="text-neutral-400 text-sm leading-relaxed mb-8">
            We design and deploy proprietary billing solutions, high-conversion brand sites, and hardened operational frameworks tailored for maximum data sovereignty and absolute uptime.
          </p>
          
          <div className="space-y-8">
            {softwarePillars.map((item, idx) => (
              <div key={idx} className="border-l border-white/20 pl-5">
                <h4 className="text-white font-bold text-base font-outfit mb-2">{item.title}</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-center text-xs">
            <span className="text-neutral-500 font-mono">b1.elkaid.com</span>
            <a
              href="https://b1.elkaid.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors"
            >
              Launch B1 Platform
            </a>
          </div>
        </div>
      </section>

      {/* === STRATEGIC OUTCOMES / COMPARISON === */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-28 border-t border-white/10 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-1">
            <p className="text-neutral-500 tracking-widest uppercase text-xs font-semibold mb-3">Enterprise Standard</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-outfit leading-tight">
              Practical Outcomes & Uptime
            </h2>
          </div>
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white font-outfit">Proof-Oriented Alignment</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We tie software modules and custom database pipelines directly to verifiable business KPIs: reduced ledger audit intervals, complete secure data trails, and real-time dashboard analytics.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-white font-outfit">Local Realities, Digital Flow</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Our operations coordinate technical parameters (GST updates, Windows offline-first databases, high-availability networks) so that billing transactions process seamlessly without lag or security leaks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SUBPAGES BACK NAVIGATION === */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-28 text-center bg-neutral-950 border border-white/10 rounded-[2rem] p-12">
        <h3 className="text-xl md:text-2xl font-bold text-white font-outfit mb-4">Explore our Engineering Depth</h3>
        <p className="text-neutral-400 text-sm max-w-lg mx-auto mb-6">
          Review details on our core technological infrastructure capabilities across ERP, storage, and disaster recovery profiles.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-xs font-semibold tracking-wider uppercase">
          <Link href="/erp-software" className="px-4 py-2 border border-white/20 text-neutral-300 hover:border-white hover:text-white transition-all rounded-full">
            ERP Software
          </Link>
          <Link href="/data-center-solutions" className="px-4 py-2 border border-white/20 text-neutral-300 hover:border-white hover:text-white transition-all rounded-full">
            Data Center
          </Link>
          <Link href="/disaster-recovery" className="px-4 py-2 border border-white/20 text-neutral-300 hover:border-white hover:text-white transition-all rounded-full">
            Disaster Recovery
          </Link>
        </div>
      </section>

      {/* === LEAD CTA & FOOTER === */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-20 pt-12">
        <LeadCtaSection
          title="See EL KAID with your own workflows"
          description="Book a guided demo and we will walk through your current process, pain points, and a realistic implementation path."
        />
      </section>

    </main>
  );
}
