import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { CheckCircle } from "lucide-react";

const posts = {
  "what-is-erp-software": {
    title: "What is ERP Software?",
    description:
      "A complete guide to ERP software, implementation models, and outcomes for growing businesses in India.",
    category: "ERP",
    datePublished: "2026-04-20",
    content: [
      "Enterprise Resource Planning (ERP) software is a unified system that connects core business functions such as finance, operations, procurement, billing, reporting, and workflow approvals. Instead of scattered tools and disconnected data, ERP provides one source of truth for decision-making. When leaders ask for current margins, receivables, productivity, or inventory exposure, teams can answer quickly because all critical processes share a common data model.",
      "Many Indian organizations start with spreadsheets and niche point tools. That approach works in the early stage but creates friction as complexity grows. Sales closes faster than billing can process invoices. Operations teams track fulfillment in one place while finance reconciles transactions in another. Management reporting becomes a manual effort every month. ERP addresses these pain points by integrating operational data with financial logic.",
      "At a functional level, ERP software usually includes modules for accounting, billing, procurement, inventory, workflow management, reporting, and role-based controls. Industry-specific implementations may add service delivery workflows, project tracking, compliance checkpoints, and audit trails. The exact module mix depends on business priorities, but the objective remains the same: improve control, speed, and accountability.",
      "For businesses in India, ERP value is closely linked to local realities. Teams often operate across cities, states, or branch structures with different process maturity levels. Tax handling, approval hierarchies, and documentation discipline can vary across units. A well-designed ERP implementation standardizes what must be consistent while allowing workflow flexibility where operations need it.",
      "The strongest ERP projects start with business outcomes, not software features. Before implementation, organizations should define what success means: shorter closing cycles, lower reconciliation effort, better cash flow visibility, faster quote-to-cash, or stronger compliance reporting. This clarity helps prioritize rollout phases and avoids over-customization.",
      "Implementation success also depends on data readiness and adoption discipline. Clean master data, ownership assignments, user training, and phased go-live plans are essential. When teams skip these steps, ERP may launch technically but underperform operationally. A practical path is pilot-first deployment with measurable checkpoints, then expansion by function or business unit.",
      "Security and governance are another major ERP advantage. Role-based access, approval logs, and controlled data changes improve audit confidence. In regulated or financially sensitive environments, this governance foundation can reduce risk substantially. Leadership can see not only what changed, but who changed it and why.",
      "Modern ERP systems increasingly include analytics and automation. Dashboards can highlight collection delays, branch-level anomalies, or process bottlenecks in near real time. Automated workflows can route approvals, trigger alerts, and reduce repetitive data entry. Over time, these improvements compound into better operational quality.",
      "If your company is also modernizing infrastructure, ERP planning should align with uptime and resilience architecture. High-value ERP workflows depend on stable hosting, monitoring, and recovery capability. You can explore this in our service pages for ERP architecture, data center solutions, and disaster recovery planning.",
      "ERP software is not a one-time project; it is a strategic operating platform. Organizations that treat it as a continuous improvement system see stronger returns. They evolve workflows, optimize reports, and refine automation as business needs change. That long-term mindset is what separates basic digitization from true operational transformation.",
    ],
    stats: [
      "A Panorama Consulting benchmark shows many ERP projects target measurable process standardization and visibility improvements across departments.",
      "Industry studies consistently report that manual reconciliation and duplicate data entry are among the top drivers for ERP modernization.",
    ],
    examples: [
      "A multi-branch services firm replaces spreadsheet-based approvals with ERP workflows and cuts month-end closing delays.",
      "A distribution business connects billing and collections data in one ERP dashboard, improving cash visibility for leadership.",
    ],
    faqs: [
      {
        q: "What is ERP software used for?",
        a: "ERP software is used to connect finance, operations, and reporting workflows in one system.",
      },
      {
        q: "Is ERP only for large enterprises?",
        a: "No. Many Indian MSMEs adopt ERP in phases to improve process quality as they scale.",
      },
    ],
  },
  "how-data-centers-work": {
    title: "How Data Centers Work",
    description:
      "Understand modern data center architecture, uptime design, security controls, and operations for enterprise workloads.",
    category: "Data Center",
    datePublished: "2026-04-18",
    content: [
      "A data center is the physical and logical environment where critical digital workloads run. It includes compute servers, networking systems, storage infrastructure, power and cooling layers, security controls, and operating procedures. For businesses that depend on digital operations, the data center is not just an IT asset; it is the backbone of service continuity.",
      "To understand how data centers work, start with workload flow. Applications run on compute resources. Those applications depend on storage for data persistence and network paths for communication between services, users, and external systems. If any one layer fails without redundancy, customer-facing performance can degrade or stop.",
      "This is why high availability architecture is central. Redundancy is built into critical components so no single failure causes prolonged disruption. Multiple network links, replicated storage, clustered services, and resilient power design all contribute to uptime. Availability targets should be mapped to business impact, not guessed.",
      "Power and cooling are often overlooked by non-technical stakeholders, but they are essential to reliability. Compute hardware generates heat and must run in controlled conditions. Data center facilities use structured cooling approaches and power distribution models to prevent hardware stress and unexpected outages.",
      "Network architecture determines performance and resiliency under load. A robust network design includes segmented traffic paths, secure edge controls, bandwidth planning, and clear observability. As businesses scale in India across multiple offices and operational zones, low-latency access and secure connectivity become increasingly important.",
      "Security in data center operations spans both physical and digital domains. Physical controls include facility access restrictions and surveillance. Digital controls include identity governance, privileged access policies, segmentation, encryption, firewall strategy, and incident response workflows.",
      "Operational monitoring is what turns architecture into dependable service delivery. Real-time metrics and alerting help teams detect anomalies early. Good observability includes infrastructure telemetry, service health indicators, and runbook-linked alerting so response actions are fast and consistent.",
      "Modern data center models are often hybrid. Some workloads remain in private environments while others run in cloud platforms for elasticity. Hybrid design can improve agility, but only when governance standards stay consistent across environments. Without shared operating principles, complexity grows quickly.",
      "Data centers also need recovery strategy. Backups alone are not enough. Organizations should define failover patterns, restoration steps, and decision ownership for incident scenarios. This is where data center operations connect directly with disaster recovery planning and business continuity strategy.",
      "In practice, the best data center programs treat architecture, security, monitoring, and recovery as one integrated system. Teams that review these dimensions together can scale with confidence, reduce downtime risk, and support mission-critical applications such as ERP platforms and customer transaction systems.",
    ],
    stats: [
      "Uptime Institute trend reports repeatedly show operational discipline and capacity planning as core factors in downtime reduction.",
      "Industry outage analyses consistently highlight power, network, and change-management failures among common outage contributors.",
    ],
    examples: [
      "A SaaS team adds multi-path network redundancy and improves service resilience during traffic spikes.",
      "An operations platform introduces runbook-linked alerting and reduces incident response ambiguity across teams.",
    ],
    faqs: [
      {
        q: "How do data centers maintain uptime?",
        a: "Through redundancy, monitoring, disciplined operations, and tested recovery procedures.",
      },
      {
        q: "Can cloud replace all data center decisions?",
        a: "No. Cloud still requires architecture, security, and continuity strategy.",
      },
    ],
  },
  "disaster-recovery-explained": {
    title: "Disaster Recovery Explained",
    description:
      "A practical explanation of disaster recovery strategy: RTO, RPO, backups, failover, and testing for resilient operations.",
    category: "Disaster Recovery",
    datePublished: "2026-04-16",
    content: [
      "Disaster recovery (DR) is the discipline of restoring critical services after outages, cyber incidents, or infrastructure failures. It is broader than backup. Backup protects data copies, while DR ensures complete service restoration including systems, dependencies, connectivity, and operational readiness.",
      "The foundation of DR planning is workload prioritization. Not every system needs the same recovery objective. Revenue-critical systems, financial workflows, and customer access services usually require tighter recovery targets than internal support tools. This prioritization guides both architecture and investment decisions.",
      "Two key metrics define recovery expectations: Recovery Time Objective (RTO) and Recovery Point Objective (RPO). RTO is how quickly a service must return after disruption. RPO is the maximum tolerable data loss measured in time. Clear RTO/RPO definitions prevent ambiguity during incidents and help teams design fit-for-purpose controls.",
      "Once targets are defined, organizations design replication and backup strategies. This may include scheduled backups, continuous data replication, cross-region copies, and immutable backup layers. The objective is to ensure that data restoration and service restoration can happen within target windows.",
      "Failover design is equally important. During a major incident, teams need clear activation criteria and decision ownership. Automated failover can reduce response time, but human escalation paths must be defined for edge cases and business-impact decisions.",
      "Runbooks are the execution layer of DR. A runbook should include scenario triggers, role responsibilities, command sequences, validation checks, and communication protocols. Without documented runbooks, teams often lose valuable recovery time coordinating basic actions.",
      "Testing is what separates theoretical DR from practical resilience. Tabletop exercises, controlled failover drills, and post-incident reviews reveal blind spots before real disruptions occur. Testing should be continuous, especially after platform releases or architecture changes.",
      "For Indian organizations with distributed operations, DR strategy should account for branch connectivity, regional workloads, remote teams, and multi-environment dependencies. Recovery plans should be practical under real operating constraints, not ideal lab conditions.",
      "DR should also be integrated with data center operations and core business platforms like ERP. If your transaction and reporting systems are central to daily execution, recovery planning must include those systems end-to-end. Partial recovery can still create business paralysis if upstream or downstream dependencies are missing.",
      "A mature DR program is not a static document. It is an operating capability that evolves with business growth, architecture changes, and risk posture. Teams that review RTO/RPO assumptions, validate runbooks, and maintain disciplined testing cycles build long-term resilience that stakeholders can trust.",
    ],
    stats: [
      "Resilience research across industries shows recovery readiness improves significantly when organizations run scheduled failover drills.",
      "Post-incident reviews in many enterprises reveal that communication and ownership clarity are as critical as technical controls.",
    ],
    examples: [
      "A finance platform defines tiered RTO/RPO objectives and prioritizes recovery for billing-critical services first.",
      "A distributed operations team runs quarterly incident simulations and updates runbooks after each drill.",
    ],
    faqs: [
      {
        q: "What is the first step in disaster recovery planning?",
        a: "Start by identifying critical workloads and defining realistic RTO and RPO targets.",
      },
      {
        q: "How often should DR plans be tested?",
        a: "Critical systems should be exercised regularly, commonly every quarter.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elkaid.com";
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: {
      "@type": "Organization",
      name: "EL KAID",
    },
    publisher: {
      "@type": "Organization",
      name: "EL KAID",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/hero-real.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (post.faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-black text-white pt-36 pb-20 px-6 md:px-12 font-inter">
      <Navbar />

      <article className="max-w-3xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        {!!post.faqs?.length && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}

        <header className="mb-10 pb-6 border-b border-white/10">
          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
            {post.category} — {post.datePublished}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold font-outfit tracking-tighter leading-none text-white">
            {post.title}
          </h1>
        </header>

        {/* Content Paragraphs */}
        <div className="space-y-6 text-neutral-400 text-base sm:text-lg leading-relaxed">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Real-world examples */}
        <section className="mt-12 glass-card p-8 md:p-10 rounded-[2rem]">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 font-outfit uppercase tracking-wider">
            Real-world examples
          </h2>
          <ul className="space-y-4">
            {(post.examples || []).map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
                <CheckCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Data points */}
        <section className="mt-8 glass-card p-8 md:p-10 rounded-[2rem]">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 font-outfit uppercase tracking-wider">
            Data points
          </h2>
          <ul className="space-y-4">
            {(post.stats || []).map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
                <CheckCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQs */}
        <section className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 font-outfit uppercase tracking-wider pl-2">
            FAQs
          </h2>
          <div className="space-y-4">
            {(post.faqs || []).map((faq, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/15 transition-all">
                <h3 className="font-bold text-white text-base font-outfit">{faq.q}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Service Pages */}
        <div className="border-t border-white/10 mt-12 pt-8 space-y-4">
          <h2 className="text-xl font-bold text-white font-outfit uppercase tracking-widest text-neutral-400">
            Related Service Pages
          </h2>
          <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest pt-2">
            <Link href="/erp-software" className="px-4 py-2 border border-white/15 text-neutral-400 hover:border-white hover:text-white rounded-full transition-all">
              ERP Software Services
            </Link>
            <Link href="/data-center-solutions" className="px-4 py-2 border border-white/15 text-neutral-400 hover:border-white hover:text-white rounded-full transition-all">
              Data Center Solutions
            </Link>
            <Link href="/disaster-recovery" className="px-4 py-2 border border-white/15 text-neutral-400 hover:border-white hover:text-white rounded-full transition-all">
              Disaster Recovery Services
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
