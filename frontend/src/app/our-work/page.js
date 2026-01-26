'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import {
    Globe,
    Brain,
    Shield,
    Code,
    Calendar,
    Users,
    Smartphone,
    Rocket,
    ArrowRight
} from 'lucide-react';

const InnovationPage = () => {

    const posts = [
        {
            title: 'Scaling our OCR to millions of documents',
            date: 'Oct 2025',
            tag: 'Engineering',
            excerpt: 'How we re-architected our OCR pipeline for throughput and accuracy.',
        },
        {
            title: 'Designing for trust in fintech UIs',
            date: 'Sep 2025',
            tag: 'Design',
            excerpt: 'Principles behind our interface choices for clarity, safety and speed.',
        },
        {
            title: 'From MVP to enterprise readiness',
            date: 'Aug 2025',
            tag: 'Product',
            excerpt: 'Lessons learned while hardening EL KAID-B1 for larger orgs.',
        },
    ];

    const roadmap = [
        {
            name: 'EL KAID-B1 Desktop v1.0',
            eta: 'November 2025',
            highlight: 'Offline-first with secure sync',
            status: 'Planned',
        },
        {
            name: 'Banking Sync 2.0',
            eta: 'December 2025',
            highlight: 'Multi-bank webhooks and real-time reconciliation',
            status: 'In progress',
        },
        {
            name: 'OCR Accuracy Pack',
            eta: 'Q1 2026',
            highlight: 'New models for invoices and receipts',
            status: 'Research',
        },
    ];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-montserrat">
            <Navbar />

            {/* === HERO SECTION === */}
            <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto w-full z-10">
                    <motion.h1
                        className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        INNOVATION
                    </motion.h1>

                    <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                        <motion.div
                            className="h-1 w-24 bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: 96 }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                        />

                        <motion.p
                            className="text-lg md:text-2xl text-gray-400 max-w-2xl leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                        >
                            Building the next generation of intelligent software solutions.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* === PHILOSOPHY === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-4">Bridging Silicon and Software</h3>
                    </div>
                    <div className="col-span-2">
                        <p className="text-3xl md:text-4xl font-light leading-tight">
                            "At EL KAID-B1, innovation doesn’t stop at code — it extends to the circuits beneath it. We build comprehensive, intelligent systems designed to handle the complexities of modern engineering and financial management."
                        </p>
                    </div>
                </div>
            </section>

            {/* === INNOVATION AREAS === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Core Innovation Areas</h2>
                </div>

                {/* Software Intelligence */}
                <div className="max-w-7xl mx-auto mb-24">
                    <div className="mb-8">
                        <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">/ 01</span>
                        <h3 className="text-3xl font-bold mt-2 mb-4">Software Intelligence</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                        {[
                            { title: "Adaptive Platforms", desc: "Real-time accounting, analytics, and automation." },
                            { title: "Connected Ecosystems", desc: "Unified dashboards across web, desktop & mobile." },
                            { title: "Cognitive Engines", desc: "AI-led workflows, predictive reconciliation & OCR." },
                            { title: "Trust by Design", desc: "Role-based access, encryption, and compliance frameworks." }
                        ].map((item, i) => (
                            <div key={i} className="bg-black p-8 hover:bg-white/5 transition-colors duration-300">
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hardware Innovation */}
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">/ 02</span>
                        <h3 className="text-3xl font-bold mt-2 mb-4">Hardware Innovation</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                        {[
                            { title: "Smart Terminals", desc: "IoT billing nodes with secure financial sensors." },
                            { title: "Edge Compute Devices", desc: "Offline AI cores for autonomous processing." },
                            { title: "AI-on-Chip Systems", desc: "FPGA-driven parallel inference modules." },
                            { title: "Next-Gen R&D", desc: "Quantum-ready architecture & decentralized computation." }
                        ].map((item, i) => (
                            <div key={i} className="bg-black p-8 hover:bg-white/5 transition-colors duration-300">
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === KEY CAPABILITIES (Cards) === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Platform Capabilities</h2>
                </div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Cross-Platform</h3>
                        <p className="text-gray-400">Available on Web, Desktop (Windows/macOS), and Mobile (Android/iOS)</p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">AI-Powered</h3>
                        <p className="text-gray-400">OCR bill scanning, auto-reconciliation, and intelligent categorization</p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Secure & Compliant</h3>
                        <p className="text-gray-400">Role-based access with PAN/CA license authentication and GST compliance</p>
                    </div>
                </div>
            </section>

            {/* === IMPACT STATISTICS === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { value: "12+", label: "Modules Built", icon: Code },
                        { value: "2500+", label: "Engineering Hours", icon: Calendar },
                        { value: "8", label: "Team Innovators", icon: Users },
                        { value: "4", label: "Platforms Deployed", icon: Smartphone }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
                                <stat.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h4>
                            <p className="text-gray-500 uppercase tracking-widest text-xs md:text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* === BLOG & UPDATES === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Company</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">Blog & Updates</h2>
                        <p className="text-gray-400">What we're building, learning and shipping at EL KAID-B1.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {posts.map((post, i) => (
                            <article key={i} className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 p-8 flex flex-col gap-6 group">
                                <div className="flex items-center justify-between text-xs uppercase tracking-wider">
                                    <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300">{post.tag}</span>
                                    <span className="text-gray-500">{post.date}</span>
                                </div>
                                <h3 className="text-white font-bold text-xl leading-tight group-hover:text-gray-200 transition-colors">{post.title}</h3>
                                <p className="text-gray-400 text-sm flex-1 leading-relaxed">{post.excerpt}</p>
                                <div>
                                    <button className="text-white text-sm font-semibold hover:tracking-wide transition-all flex items-center gap-2">
                                        Read more <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* === ROADMAP === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Roadmap</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">Launches</h2>
                        <p className="text-gray-400">What we plan to launch next.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {roadmap.map((item, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                                    <span className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">{item.eta}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{item.highlight}</p>
                                <span className={`text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-semibold 
                                     ${item.status === 'In progress' ? 'bg-blue-500/20 text-blue-300' :
                                        item.status === 'Planned' ? 'bg-purple-500/20 text-purple-300' :
                                            'bg-yellow-500/20 text-yellow-300'}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA === */}
            <section className="py-32 px-6 md:px-12 bg-onyx border-t border-white/10 relative overflow-hidden text-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className="w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Experience EL KAID-B1
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Ready to experience the future of innovation? Join us in revolutionizing how technology transforms business operations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                            <Rocket className="w-5 h-5" />
                            Request Demo
                        </button>
                        <button className="px-8 py-4 border border-white/20 text-white rounded-full text-lg font-bold hover:bg-white/10 transition-all">
                            Download Beta
                        </button>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default InnovationPage;
