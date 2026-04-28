import Navbar from "../../../components/Navbar";
import LeadCtaSection from "../../../components/LeadCtaSection";
import Link from "next/link";

export const metadata = {
  title: "Multi-Branch Management Feature | EL KAID",
  description:
    "Run multiple branches with centralized visibility, role-based controls, and consistent operations using EL KAID.",
  alternates: { canonical: "/features/multi-branch-management" },
};

export default function MultiBranchManagementFeaturePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">Feature: Multi-Branch Management</h1>
        <p className="text-gray-300 text-lg">
          Manage branch operations from one control layer without sacrificing local execution speed.
        </p>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Key outcomes</h2>
          <ul className="text-gray-300 space-y-2">
            <li>- Standardized workflows across branches</li>
            <li>- Faster region-wise reporting and performance analysis</li>
            <li>- Better governance through role-based permissions</li>
          </ul>
        </section>
        <p className="text-gray-300">
          Best for{" "}
          <Link href="/use-cases/retail" className="underline">
            Retail
          </Link>{" "}
          and{" "}
          <Link href="/use-cases/manufacturing" className="underline">
            Manufacturing
          </Link>{" "}
          teams.
        </p>
        <LeadCtaSection title="Need branch-level control with central visibility?" />
      </article>
    </main>
  );
}
