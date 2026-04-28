import Navbar from "../../components/Navbar";
import LeadCtaSection from "../../components/LeadCtaSection";
import Link from "next/link";

export const metadata = {
  title: "Data Center vs Cloud: What Should You Choose?",
  description:
    "Compare private data center and cloud approaches for reliability, control, cost, and scalability in Indian business environments.",
  alternates: { canonical: "/data-center-vs-cloud" },
};

export default function DataCenterVsCloudPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Data Center vs Cloud</h1>
        <p className="text-gray-300 text-lg">
          Both models can deliver strong outcomes when designed correctly. The best choice depends on
          workload criticality, compliance posture, latency needs, and internal operating maturity.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-2xl font-semibold mb-2">Data center model</h2>
            <p className="text-gray-300">
              Greater direct control and custom infrastructure decisions, often with higher ownership and
              management responsibility.
            </p>
          </div>
          <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-2xl font-semibold mb-2">Cloud model</h2>
            <p className="text-gray-300">
              Elastic scale, faster provisioning, and lower upfront hardware investment with strong
              operational discipline still required.
            </p>
          </div>
        </div>
        <p className="text-gray-300">
          If your core systems are ERP-driven, review{" "}
          <Link href="/data-center-solutions" className="underline">
            data center solutions
          </Link>{" "}
          and{" "}
          <Link href="/disaster-recovery" className="underline">
            disaster recovery planning
          </Link>{" "}
          together.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">When to choose EL KAID</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- You need architecture guidance tied to business risk</li>
            <li>- You are balancing uptime, compliance, and growth goals</li>
            <li>- You want integrated planning across infra and DR</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Limitations of alternatives</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- Pure on-prem models can increase management overhead</li>
            <li>- Pure cloud adoption can overlook workload-specific constraints</li>
            <li>- Isolated decisions can break continuity during incidents</li>
          </ul>
        </section>
        <LeadCtaSection title="Get an architecture recommendation for your stack" />
      </article>
    </main>
  );
}
