import Navbar from "../../../components/Navbar";
import LeadCtaSection from "../../../components/LeadCtaSection";
import Link from "next/link";

export const metadata = {
  title: "Retail ERP Use Case | EL KAID",
  description:
    "How retail businesses use EL KAID to unify billing, branch operations, inventory visibility, and reporting.",
  alternates: { canonical: "/use-cases/retail" },
};

export default function RetailUseCasePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Use Case: Retail Operations</h1>
        <p className="text-gray-300 text-lg">
          EL KAID helps retail teams unify store-level activity, billing, and leadership reporting in
          one platform.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Common retail problems</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- Branch-level data inconsistency and delayed reporting</li>
            <li>- Manual reconciliation between billing and finance teams</li>
            <li>- Slow visibility into margin and demand shifts</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">How EL KAID helps</h2>
          <p className="text-gray-300">
            Centralized process flows, real-time reporting, and role-based controls improve execution
            quality across branches and back-office teams.
          </p>
        </section>
        <p className="text-gray-300">
          Related capabilities:{" "}
          <Link href="/features/multi-branch-management" className="underline">
            Multi-Branch Management
          </Link>
          ,{" "}
          <Link href="/features/reporting-dashboard" className="underline">
            Reporting Dashboard
          </Link>
          .
        </p>
        <LeadCtaSection title="Want this for your retail network?" />
      </article>
    </main>
  );
}
