import Navbar from "../../../components/Navbar";
import LeadCtaSection from "../../../components/LeadCtaSection";
import Link from "next/link";

export const metadata = {
  title: "Reporting Dashboard Feature | EL KAID",
  description:
    "Get real-time reporting dashboards for finance, operations, and leadership visibility with EL KAID.",
  alternates: { canonical: "/features/reporting-dashboard" },
};

export default function ReportingDashboardFeaturePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Feature: Reporting Dashboard</h1>
        <p className="text-gray-300 text-lg">
          Turn fragmented reports into one leadership-ready dashboard with near real-time operational and
          financial insights.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What decision-makers get</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- Faster access to branch, team, and process-level metrics</li>
            <li>- Better anomaly detection and performance tracking</li>
            <li>- Cleaner monthly and quarterly planning cycles</li>
          </ul>
        </section>
        <p className="text-gray-300">
          See also{" "}
          <Link href="/erp-software" className="underline">
            ERP Software
          </Link>{" "}
          and{" "}
          <Link href="/use-cases/manufacturing" className="underline">
            Manufacturing Use Case
          </Link>
          .
        </p>
        <LeadCtaSection title="Want better dashboards for leadership decisions?" />
      </article>
    </main>
  );
}
