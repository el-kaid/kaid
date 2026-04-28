import Navbar from "../../../components/Navbar";
import LeadCtaSection from "../../../components/LeadCtaSection";
import Link from "next/link";

export const metadata = {
  title: "Accounting Automation Feature | EL KAID",
  description:
    "Automate accounting workflows with EL KAID for cleaner books, faster closing, and better financial visibility.",
  alternates: { canonical: "/features/accounting-automation" },
};

export default function AccountingAutomationFeaturePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Feature: Accounting Automation</h1>
        <p className="text-gray-300 text-lg">
          Reduce manual accounting effort with workflow automation, structured controls, and real-time
          financial visibility.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What it does</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- Automates repetitive accounting tasks and approvals</li>
            <li>- Improves consistency in records and transaction trails</li>
            <li>- Speeds up monthly reporting and reconciliation cycles</li>
          </ul>
        </section>
        <p className="text-gray-300">
          Related pages:{" "}
          <Link href="/erp-software" className="underline">
            ERP Software
          </Link>{" "}
          and{" "}
          <Link href="/use-cases/startups" className="underline">
            Startup Use Case
          </Link>
          .
        </p>
        <LeadCtaSection title="Want to automate accounting workflows?" />
      </article>
    </main>
  );
}
