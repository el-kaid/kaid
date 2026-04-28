import Navbar from "../../../components/Navbar";
import LeadCtaSection from "../../../components/LeadCtaSection";
import Link from "next/link";

export const metadata = {
  title: "Startup ERP Use Case | EL KAID",
  description:
    "How startups use EL KAID to replace spreadsheets, improve reporting speed, and scale operations with control.",
  alternates: { canonical: "/use-cases/startups" },
};

export default function StartupUseCasePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Use Case: Startups</h1>
        <p className="text-gray-300 text-lg">
          EL KAID helps startups move from tool sprawl to structured operations without slowing growth.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Early-stage challenges</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- Spreadsheet dependency and duplicate manual effort</li>
            <li>- Leadership visibility gaps during rapid growth</li>
            <li>- Weak process controls as team size increases</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Why startups choose EL KAID</h2>
          <p className="text-gray-300">
            Fast implementation, practical automation, and a growth-ready foundation for finance and
            operational workflows.
          </p>
        </section>
        <p className="text-gray-300">
          Compare options on{" "}
          <Link href="/erp-vs-tally" className="underline">
            ERP vs Tally
          </Link>{" "}
          and{" "}
          <Link href="/cloud-erp-vs-traditional-erp" className="underline">
            Cloud ERP vs Traditional ERP
          </Link>
          .
        </p>
        <LeadCtaSection title="Scaling startup operations? Book a focused demo." />
      </article>
    </main>
  );
}
