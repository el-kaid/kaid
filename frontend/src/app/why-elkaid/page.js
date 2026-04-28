import Link from "next/link";
import Navbar from "../../components/Navbar";
import LeadCtaSection from "../../components/LeadCtaSection";

export const metadata = {
  title: "Why EL KAID | ERP, Business Website, Infrastructure and DR Partner",
  description:
    "Why Indian businesses choose EL KAID for ERP delivery, business website development, infrastructure reliability, and disaster recovery execution.",
  alternates: { canonical: "/why-elkaid" },
};

export default function WhyElkaidPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Why EL KAID</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            EL KAID combines ERP product thinking, business website development, engineering execution,
            and infrastructure reliability to help Indian businesses scale with confidence.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Built for execution, not presentations</h2>
          <p className="text-gray-300 leading-relaxed">
            Many teams promise transformation. We focus on practical outcomes: faster billing cycles,
            cleaner reporting, better visibility for leadership, and uptime that supports daily
            operations. Our approach connects software delivery with data center and disaster recovery
            readiness so your critical workflows remain available.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          {[
            ["ERP Depth", "We design ERP workflows that reduce manual effort and improve control."],
            ["Business Website Delivery", "We build high-performance, SEO-ready business websites focused on conversions."],
            ["Infrastructure Discipline", "High-availability architecture and observability are built in."],
            ["Continuity by Design", "RTO/RPO planning and drill-ready runbooks protect core operations."],
            ["India Context", "Delivery is tuned for Indian operating realities and growth patterns."],
          ].map(([title, text]) => (
            <div key={title} className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-300">{text}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Proof-oriented delivery</h2>
          <p className="text-gray-300 leading-relaxed">
            Every engagement aligns technical changes with measurable business outcomes. Typical metrics
            include reduction in reconciliation effort, improved response times, cleaner compliance trails,
            and shorter resolution cycles during incidents.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Explore service pages:{" "}
            <Link href="/erp-software" className="underline">
              ERP Software
            </Link>
            ,{" "}
            <Link href="/data-center-solutions" className="underline">
              Data Center Solutions
            </Link>
            , and{" "}
            <Link href="/disaster-recovery" className="underline">
              Disaster Recovery
            </Link>
            .
          </p>
        </section>

        <LeadCtaSection
          title="See EL KAID with your own workflows"
          description="Book a guided demo and we will walk through your current process, pain points, and a realistic implementation path."
        />
      </article>
    </main>
  );
}
