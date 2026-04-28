import Link from "next/link";
import LeadCtaSection from "../../components/LeadCtaSection";
import Navbar from "../../components/Navbar";

export const metadata = {
  title: "Disaster Recovery Services and Business Continuity",
  description:
    "Disaster recovery services for Indian organizations: RTO/RPO planning, failover testing, backup strategy, and business continuity execution.",
  alternates: { canonical: "/disaster-recovery" },
};

export default function DisasterRecoveryPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12">
      <Navbar />
      <article className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Disaster Recovery Services for Always-On Operations
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            EL KAID disaster recovery services help Indian organizations stay resilient under outages,
            cyber incidents, and infrastructure failures. This page outlines a practical recovery model:
            define RTO/RPO, build failover paths, test continuously, and align continuity decisions with
            business risk.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">Why Disaster Recovery Is Mission-Critical</h2>
          <p className="text-gray-300 leading-relaxed">
            Downtime is expensive in every industry. Revenue impact is only one part; customer trust,
            operational momentum, and brand credibility can also suffer. A strong disaster recovery plan
            ensures your most critical systems can recover quickly with minimal data loss and clearly
            defined ownership during high-pressure events.
          </p>
          <p className="text-gray-300 leading-relaxed">
            In India, organizations often run mixed environments across cloud, on-premise workloads, and
            branch-linked processes. Recovery plans must account for this reality. A playbook written once
            and not tested will fail in production. Recovery strategy should be active, measurable, and
            regularly rehearsed.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">Core Components of a Strong DR Program</h2>
          <h3 className="text-2xl font-semibold">1) RTO and RPO Definition</h3>
          <p className="text-gray-300 leading-relaxed">
            Recovery Time Objective (RTO) defines how fast a service must return. Recovery Point
            Objective (RPO) defines acceptable data loss. Both must be set per workload class, not
            globally. Critical finance and customer systems usually need tighter targets than internal
            support tools.
          </p>
          <h3 className="text-2xl font-semibold">2) Replication and Backup Strategy</h3>
          <p className="text-gray-300 leading-relaxed">
            Recovery readiness depends on resilient data movement. Use layered backups, replication
            controls, and immutable retention policies where appropriate. Ensure restore procedures are
            tested with real scenarios.
          </p>
          <h3 className="text-2xl font-semibold">3) Automated Failover and Runbooks</h3>
          <p className="text-gray-300 leading-relaxed">
            Runbooks should include activation criteria, command ownership, communication paths, and
            validation steps. Automation reduces manual delay, but teams still need clear escalation logic
            and decision authority.
          </p>
          <h3 className="text-2xl font-semibold">4) Testing and Continuous Improvement</h3>
          <p className="text-gray-300 leading-relaxed">
            A recovery plan is only trustworthy if tested. Conduct scheduled drills, capture gaps, and
            update runbooks after architecture or release changes. Treat DR testing as operational quality
            assurance.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">Disaster Recovery for ERP and Data Platforms</h2>
          <p className="text-gray-300 leading-relaxed">
            ERP and financial systems require especially careful recovery design because they support
            billing, reporting, compliance, and day-to-day execution. To reduce business disruption,
            continuity planning should be integrated with your{" "}
            <Link href="/erp-software" className="underline hover:text-gray-200">
              ERP software architecture
            </Link>{" "}
            and your{" "}
            <Link href="/data-center-solutions" className="underline hover:text-gray-200">
              data center operations model
            </Link>
            .
          </p>
          <p className="text-gray-300 leading-relaxed">
            This integrated approach ensures availability design is not isolated from application behavior.
            For example, restoring a database quickly is not enough if dependencies, API gateways, or
            identity services are not included in the recovery workflow.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">India-Focused DR Considerations</h2>
          <p className="text-gray-300 leading-relaxed">
            Indian enterprises often need continuity plans that account for distributed teams, regional
            operations, variable network conditions, and rapid growth cycles. A useful strategy includes
            workload tiering, cross-region availability design, role-based access during incident mode,
            and frequent communication drills for leadership and operations.
          </p>
          <p className="text-gray-300 leading-relaxed">
            For regulated sectors or financially sensitive businesses, continuity governance should align
            with audit requirements and documented evidence of testing.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Key Features</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/features/accounting-automation" className="underline hover:text-gray-200">
                Accounting Automation
              </Link>
            </li>
            <li>
              <Link href="/features/multi-branch-management" className="underline hover:text-gray-200">
                Multi-Branch Management
              </Link>
            </li>
            <li>
              <Link href="/features/reporting-dashboard" className="underline hover:text-gray-200">
                Reporting Dashboard
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">FAQs: Disaster Recovery</h2>
          <h3 className="text-2xl font-semibold">What is disaster recovery?</h3>
          <p className="text-gray-300 leading-relaxed">
            Disaster recovery is the set of systems, procedures, and team actions used to restore
            critical services after disruptions.
          </p>
          <h3 className="text-2xl font-semibold">What is the difference between backup and DR?</h3>
          <p className="text-gray-300 leading-relaxed">
            Backup stores data copies. Disaster recovery covers the full service restoration process,
            including systems, dependencies, and operations.
          </p>
          <h3 className="text-2xl font-semibold">How often should DR drills happen?</h3>
          <p className="text-gray-300 leading-relaxed">
            Critical systems should be tested at least quarterly, with focused tests after major release
            or architecture changes.
          </p>
          <h3 className="text-2xl font-semibold">Can small and mid-size companies implement DR?</h3>
          <p className="text-gray-300 leading-relaxed">
            Yes. Start with workload prioritization, realistic RTO/RPO targets, and staged automation.
            You can scale sophistication as the business grows.
          </p>
        </section>

        <section className="border-t border-white/10 pt-10">
          <h2 className="text-3xl font-bold mb-4">Deep Dive Articles</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/blog/disaster-recovery-explained" className="underline hover:text-gray-200">
                Disaster Recovery Explained
              </Link>
            </li>
            <li>
              <Link href="/blog/how-data-centers-work" className="underline hover:text-gray-200">
                How Data Centers Work
              </Link>
            </li>
            <li>
              <Link href="/blog/what-is-erp-software" className="underline hover:text-gray-200">
                What is ERP Software?
              </Link>
            </li>
          </ul>
        </section>
        <LeadCtaSection />
      </article>
    </main>
  );
}
