import Navbar from "../../components/Navbar";
import BookDemoForm from "../../components/BookDemoForm";

export const metadata = {
  title: "Book a Demo | EL KAID",
  description:
    "Book an EL KAID demo for ERP software, data center strategy, and disaster recovery planning.",
  alternates: { canonical: "/book-demo" },
};

export default function BookDemoPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-6 md:px-12">
      <Navbar />
      <section className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            See How EL KAID Can Improve Operations in 30 Minutes
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Tell us your goals and get a tailored walkthrough focused on your current bottlenecks,
            team structure, and growth roadmap.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li>- Workflow assessment for ERP and finance operations</li>
            <li>- Infrastructure and reliability review</li>
            <li>- Clear implementation roadmap and milestones</li>
          </ul>
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold">What you will get</h2>
            <div className="grid gap-3">
              <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                1) Custom process walkthrough based on your current tools and gaps.
              </div>
              <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                2) Priority recommendations for ERP, reporting, and continuity planning.
              </div>
              <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                3) A practical rollout path with measurable milestones.
              </div>
            </div>
          </div>
          <div className="mt-8 p-5 border border-white/10 rounded-xl bg-white/5">
            <h3 className="font-semibold mb-2">Why teams trust EL KAID</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We combine product and implementation depth across ERP workflows, data infrastructure,
              and disaster recovery. Engagements are outcome-driven and designed for operational teams
              in India.
            </p>
          </div>
        </div>

        <BookDemoForm />
      </section>
    </main>
  );
}
