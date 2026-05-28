import Link from "next/link";
import Navbar from "../../components/Navbar";

const posts = [
  {
    slug: "what-is-erp-software",
    title: "What is ERP Software?",
    excerpt:
      "A complete guide to ERP software, modular designs, integration patterns, and operational outcomes for scaling Indian companies.",
    publishedAt: "2026-04-20",
    category: "ERP",
  },
  {
    slug: "how-data-centers-work",
    title: "How Data Centers Work",
    excerpt:
      "Understand the systems behind modern data center architecture, spanning compute density, cooling loops, and privileged access security.",
    publishedAt: "2026-04-18",
    category: "Data Center",
  },
  {
    slug: "disaster-recovery-explained",
    title: "Disaster Recovery Explained",
    excerpt:
      "A practical disaster recovery explanation covering RTO, RPO targets, geographic data replication, and drill testing runbooks.",
    publishedAt: "2026-04-16",
    category: "Disaster Recovery",
  },
];

export const metadata = {
  title: "Blog: ERP, B2B Sourcing, Infrastructure & DR | EL KAID",
  description:
    "Read EL KAID insights on B1 billing software engineering, B2B trade sourcing coordination, resilient data centers, and disaster recovery.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 pb-20 px-6 md:px-12 font-inter">
      <Navbar />

      <section className="max-w-4xl mx-auto">
        <header className="mb-16">
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] uppercase tracking-widest font-mono">
            Knowledge & Insights
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mt-6 mb-8 font-outfit tracking-tighter leading-none text-white">
            Blog
          </h1>
          <p className="text-neutral-400 text-lg md:text-2xl leading-relaxed font-light">
            Expert notes on B1 Software platforms, B2B trade coordination, high-availability architecture, and disaster recovery.
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="glass-card p-8 md:p-10 rounded-[2rem] flex flex-col gap-4 relative group">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-mono text-neutral-500">
                <span>{post.category}</span>
                <span>{post.publishedAt}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white font-outfit group-hover:text-neutral-300 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-4">{post.excerpt}</p>

              <div className="border-t border-white/10 pt-4">
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:tracking-wider transition-all">
                  Read Article &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
