import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureBox from "../components/FeatureBox";
import HowToStartBitcoinBW from "../components/HowToStartBitcoinBW";
import ElKaidVsTraditionalFinancesBW from "../components/ElKaidVsTraditionalFinancesBW";

export default function Home() {
  const features = [
    {
      title: "AI-Powered Solutions",
      description: "Leverage cutting-edge artificial intelligence to automate complex processes and boost productivity."
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security protocols protect your data with end-to-end encryption and compliance standards."
    },
    {
      title: "Lightning Fast",
      description: "Optimized performance delivers results in milliseconds, not minutes. Experience the speed difference."
    },
    {
      title: "Custom Development",
      description: "Tailored software solutions built to your exact specifications and business requirements."
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-montserrat">
      <Navbar />

      <Hero />

      {/* === FEATURES SECTION === */}
      <section className="py-16 px-6 relative border-t border-white/10 bg-onyx">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Capabilities</h2>
            <div className="h-1 w-24 bg-white"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {features.map((feature, idx) => (
              <FeatureBox key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* === COMPARISON SECTION === */}
      <section className="py-16 px-6 bg-white text-black relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Evolution</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Traditional finance is opaque and slow. El Kaid is transparent, instant, and borderless. We strip away the noise to focus on signal.
            </p>
            {/* Note: In Next.js we use standard elements or Link components, not useNavigate unless interactive */}
            <Link href="/buy-software" className="inline-block px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 uppercase tracking-widest font-semibold">
              Compare Models
            </Link>
          </div>
          <div className="flex-1 w-full flex justify-center">
            {/* Abstract Graphic */}
            <div className="relative w-64 h-64 border border-black/20 rotate-45 animate-pulse">
              <div className="absolute inset-4 border border-black/40"></div>
              <div className="absolute inset-8 border border-black/60 bg-black/5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* === SCROLL SECTIONS === */}
      <HowToStartBitcoinBW />

      <ElKaidVsTraditionalFinancesBW />

    </main>
  );
}
