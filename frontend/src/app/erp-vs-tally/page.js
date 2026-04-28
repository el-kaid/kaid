import Navbar from "../../components/Navbar";
import LeadCtaSection from "../../components/LeadCtaSection";
import Link from "next/link";

export const metadata = {
  title: "ERP vs Tally: Which is Better for Growth?",
  description:
    "Compare ERP software vs Tally for Indian businesses: scale, automation, reporting, controls, and long-term ROI.",
  alternates: { canonical: "/erp-vs-tally" },
};

export default function ErpVsTallyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">ERP vs Tally</h1>
        <p className="text-gray-300 text-lg">
          Tally is familiar and useful for accounting-first workflows. ERP is broader: it connects
          finance, operations, approvals, and analytics for scaling organizations.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-2xl font-semibold mb-2">Tally strengths</h2>
            <ul className="text-gray-300 space-y-2">
              <li>- Fast onboarding for basic accounting use cases</li>
              <li>- Familiar workflows for many Indian teams</li>
              <li>- Effective for smaller finance-centric setups</li>
            </ul>
          </div>
          <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <h2 className="text-2xl font-semibold mb-2">ERP strengths</h2>
            <ul className="text-gray-300 space-y-2">
              <li>- End-to-end process visibility across teams</li>
              <li>- Automation and role-based workflow controls</li>
              <li>- Better scale for multi-entity growth</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          If your business is moving from accounting-only tooling to integrated execution, ERP usually
          offers stronger long-term ROI. See our{" "}
          <Link href="/erp-software" className="underline">
            ERP software page
          </Link>{" "}
          for implementation guidance.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">When to choose EL KAID</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- You need multi-team workflows, not only accounting entries</li>
            <li>- You want leadership dashboards across departments</li>
            <li>- You are scaling branches, entities, or process complexity</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Limitations of alternatives</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- Accounting-first tools can become restrictive at scale</li>
            <li>- Cross-functional visibility may require manual workarounds</li>
            <li>- Workflow automation depth is often limited for broader operations</li>
          </ul>
        </section>
        <LeadCtaSection title="Need help deciding between ERP and Tally?" />
      </article>
    </main>
  );
}
