import Link from "next/link";

export default function LeadCtaSection({
  title = "Ready to modernize your operations?",
  description = "Book a demo to see how EL KAID improves ERP workflows, infrastructure reliability, and business continuity.",
}) {
  return (
    <section className="border border-white/10 rounded-2xl p-8 md:p-10 bg-white/5 mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/book-demo"
          className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
        >
          Book Demo
        </Link>
        <Link
          href="/updates"
          className="px-6 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
        >
          Contact Team
        </Link>
      </div>
    </section>
  );
}
