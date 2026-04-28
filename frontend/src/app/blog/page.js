import Link from "next/link";
import Navbar from "../../components/Navbar";
import LeadCtaSection from "../../components/LeadCtaSection";

const posts = [
  {
    slug: "what-is-erp-software",
    title: "What is ERP Software?",
    excerpt:
      "A complete guide to ERP software, modules, implementation strategy, and business outcomes for Indian companies.",
    publishedAt: "2026-04-20",
    category: "ERP",
  },
  {
    slug: "how-data-centers-work",
    title: "How Data Centers Work",
    excerpt:
      "Understand the architecture behind modern data centers, from power and cooling to networking and security.",
    publishedAt: "2026-04-18",
    category: "Data Center",
  },
  {
    slug: "disaster-recovery-explained",
    title: "Disaster Recovery Explained",
    excerpt:
      "A practical DR guide covering RTO, RPO, backups, failover testing, and continuity planning.",
    publishedAt: "2026-04-16",
    category: "Disaster Recovery",
  },
];

export const metadata = {
  title: "Blog: ERP, Business Website, Data Center and DR Insights",
  description:
    "Read EL KAID insights on ERP strategy, business website growth, resilient data center operations, and disaster recovery planning.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
        <p className="text-gray-400 mb-12 text-lg">
          Expert notes on ERP systems, business website growth, data infrastructure, and business continuity.
        </p>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border border-white/10 rounded-2xl p-6 bg-white/5">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                {post.category} - {post.publishedAt}
              </p>
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-300">{post.excerpt}</p>
            </article>
          ))}
        </div>
        <LeadCtaSection title="Want these strategies for your business?" />
      </section>
    </main>
  );
}
