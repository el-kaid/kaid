import Navbar from "../../../components/Navbar";
import LeadCtaSection from "../../../components/LeadCtaSection";
import Link from "next/link";

export const metadata = {
  title: "Manufacturing ERP Use Case | EL KAID",
  description:
    "How manufacturers use EL KAID for process control, finance visibility, and multi-location coordination.",
  alternates: { canonical: "/use-cases/manufacturing" },
};

export default function ManufacturingUseCasePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Use Case: Manufacturing</h1>
        <p className="text-gray-300 text-lg">
          EL KAID gives manufacturing teams better production, costing, and reporting control across
          departments and locations.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Common manufacturing pain points</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- Fragmented reporting between operations and finance</li>
            <li>- Delayed decision-making during demand and supply fluctuations</li>
            <li>- Inconsistent process governance across plants or units</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">EL KAID outcomes</h2>
          <p className="text-gray-300">
            Unified operational and financial workflows, faster reporting, and stronger leadership
            visibility for planning and performance management.
          </p>
        </section>
        <p className="text-gray-300">
          Explore{" "}
          <Link href="/features/accounting-automation" className="underline">
            Accounting Automation
          </Link>{" "}
          and{" "}
          <Link href="/features/reporting-dashboard" className="underline">
            Reporting Dashboard
          </Link>
          .
        </p>
        <LeadCtaSection title="Need an ERP plan for your manufacturing operations?" />
      </article>
    </main>
  );
}
