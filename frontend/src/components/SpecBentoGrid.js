'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Layers, ShieldCheck, Database, Navigation, CheckCircle } from 'lucide-react';

export default function SpecBentoGrid() {
    // Active tabs for B1 Software Dashboard
    const [b1Tab, setB1Tab] = useState('ledger');
    // Active destination for Sourcing Route Simulator
    const [tradeDest, setTradeDest] = useState('uae');

    // Refs for cursor border glow tracking
    const b1CardRef = useRef(null);
    const tradeCardRef = useRef(null);

    // Mouse positions for card spotlights
    const [b1Mouse, setB1Mouse] = useState({ x: 0, y: 0, opacity: 0 });
    const [tradeMouse, setTradeMouse] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e, cardRef, setMouse) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMouse({ x, y, opacity: 1 });
    };

    const handleMouseLeave = (setMouse) => {
        setMouse(prev => ({ ...prev, opacity: 0 }));
    };

    // B1 Dashboard Data
    const b1Data = {
        ledger: {
            title: "Smart Ledger Engine",
            stats: [
                { label: "AUTO MATCH RATE", val: "99.8%" },
                { label: "RECON VELOCITY", val: "0.1 SEC" },
                { label: "DAILY INVOICES", val: "4,120+" }
            ],
            path: "M 0 60 C 50 20, 100 80, 150 10 C 200 80, 250 30, 300 40 L 300 100 L 0 100 Z"
        },
        crm: {
            title: "Bookkeeping CRM Sync",
            stats: [
                { label: "SYNC LATENCY", val: "INSTANT [LOCAL]" },
                { label: "PROFILE DATABASE", val: "12,450" },
                { label: "RETENTION SCORING", val: "98.4%" }
            ],
            path: "M 0 80 C 40 40, 80 90, 120 30 C 160 50, 200 10, 240 70 C 270 40, 290 20, 300 10 L 300 100 L 0 100 Z"
        },
        analytics: {
            title: "Data Studio Engine",
            stats: [
                { label: "ACTIVE LEDGER HUBS", val: "42 NODES" },
                { label: "CORRELATION COEFF", val: "0.94" },
                { label: "MONTHLY VOLUME CAP", val: "UNLIMITED" }
            ],
            path: "M 0 40 C 60 70, 120 10, 180 80 C 220 30, 260 20, 300 5 L 300 100 L 0 100 Z"
        }
    };

    // Trade corridor data
    const tradeData = {
        uae: {
            port: "DUBAI (JEBEL ALI) / ABU DHABI",
            transit: "4-5 DAYS EX-INDIA",
            check: [
                "INVOICE ATTESTATION: DUBAI CHAMBER",
                "CUSTOMS DUTY CODE: VERIFIED ACTIVE",
                "REEFER FREIGHT SYNC: STABLE CONNECTED"
            ],
            lineOffset: 0
        },
        ksa: {
            port: "RIYADH DRY PORT / JEDDAH",
            transit: "6-8 DAYS EX-INDIA",
            check: [
                "SABER CERTIFICATE: COMPLIANT APPROVED",
                "ORIGIN INVOICE PROCESS: MOFA SIGNED",
                "EXPORTER D-U-N-S NO: RECORD MATCHED"
            ],
            lineOffset: 120
        },
        qatar: {
            port: "DOHA (HAMAD PORT)",
            transit: "5-6 DAYS EX-INDIA",
            check: [
                "CHAMBER LEGALIZATION: COMPLETE",
                "HEALTH & AGRO SEAL: CERTIFIED MATCH",
                "TRANSIT TELEMENTRY: STABLE ACTIVE"
            ],
            lineOffset: 240
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* ================= B1 SOFTWARE CARD (MONOCHROME BENTO + MOUSE SPOTLIGHT) ================= */}
            <div 
                ref={b1CardRef}
                onMouseMove={(e) => handleMouseMove(e, b1CardRef, setB1Mouse)}
                onMouseLeave={() => handleMouseLeave(setB1Mouse)}
                className="lg:col-span-6 glass-card p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[520px] relative overflow-hidden group hover:scale-[1.02] duration-500 ease-out border border-white/10"
            >
                {/* Dynamic Mouse Spotlight Border overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
                    style={{
                        opacity: b1Mouse.opacity,
                        background: `radial-gradient(350px circle at ${b1Mouse.x}px ${b1Mouse.y}px, rgba(255,255,255,0.06), transparent 80%)`
                    }}
                />

                {/* Micro tech grid backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

                <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                            / 01 — SOFTWARE DASHBOARD
                        </span>
                        <span className="px-3 py-1 bg-white/10 border border-white/10 text-white rounded-full text-[9px] font-mono tracking-widest uppercase">
                            B1 Platform
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-3xl sm:text-4xl font-bold text-white font-outfit tracking-tight">
                            B1 Software Engine
                        </h3>
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light max-w-md">
                            Hardened offline-first architecture providing zero sync-lag ledgers. Experience click-interactive specs directly in the mockup below.
                        </p>
                    </div>

                    {/* LIVE INTERACTIVE REACT DASHBOARD */}
                    <div className="bg-neutral-950/80 rounded-2xl border border-white/5 p-5 space-y-5 relative overflow-hidden">
                        {/* Selector Tabs */}
                        <div className="flex gap-2 border-b border-white/5 pb-3">
                            {['ledger', 'crm', 'analytics'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setB1Tab(tab)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                                        b1Tab === tab 
                                            ? 'bg-white text-black font-bold' 
                                            : 'text-neutral-400 hover:text-white bg-white/5'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Interactive display */}
                        <div className="grid grid-cols-3 gap-4 items-center">
                            {/* SVG Mini Vector line chart */}
                            <div className="col-span-2 h-20 relative overflow-hidden bg-neutral-900/50 rounded-xl border border-white/5">
                                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2"/>
                                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                    {/* Filled grid */}
                                    <path 
                                        d={b1Data[b1Tab].path} 
                                        fill="url(#chartGlow)"
                                        className="transition-all duration-700 ease-in-out"
                                    />
                                    {/* Vector Line */}
                                    <path 
                                        d={b1Data[b1Tab].path.split(' L ')[0]} 
                                        fill="none" 
                                        stroke="#ffffff" 
                                        strokeWidth="2"
                                        className="transition-all duration-700 ease-in-out"
                                    />
                                </svg>
                                <span className="absolute top-2 left-3 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                                    {b1Data[b1Tab].title}
                                </span>
                            </div>

                            {/* Status light */}
                            <div className="text-right flex flex-col justify-center gap-1.5 pl-2">
                                <span className="text-[7px] font-mono text-neutral-500 block uppercase">ENGINE STATUS</span>
                                <div className="flex items-center gap-1.5 justify-end">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                                    <span className="text-[9px] font-mono text-white font-bold">ONLINE</span>
                                </div>
                            </div>
                        </div>

                        {/* Specs stats grid */}
                        <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                            {b1Data[b1Tab].stats.map((item, idx) => (
                                <div key={idx} className="p-2 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[7px] font-mono text-neutral-500 block uppercase tracking-wider mb-1">
                                        {item.label}
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-mono text-white font-semibold block">
                                        {item.val}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/5 flex justify-between items-center mt-6">
                    <span className="text-[10px] font-semibold tracking-wider text-neutral-500 font-mono">b1.elkaid.com</span>
                    <a
                        href="https://b1.elkaid.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-200 transition-all rounded-full shadow-lg shadow-white/5"
                    >
                        Launch Ecosystem &rarr;
                    </a>
                </div>
            </div>

            {/* ================= ELKAID TRADE CARD (GOLD BENTO + MOUSE SPOTLIGHT) ================= */}
            <div 
                ref={tradeCardRef}
                onMouseMove={(e) => handleMouseMove(e, tradeCardRef, setTradeMouse)}
                onMouseLeave={() => handleMouseLeave(setTradeMouse)}
                className="lg:col-span-6 glass-card-gold p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[520px] relative overflow-hidden group hover:scale-[1.02] duration-500 ease-out border border-gold/10"
            >
                {/* Dynamic Mouse Spotlight Border overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
                    style={{
                        opacity: tradeMouse.opacity,
                        background: `radial-gradient(350px circle at ${tradeMouse.x}px ${tradeMouse.y}px, rgba(212,175,55,0.08), transparent 80%)`
                    }}
                />

                {/* Glowing light flare backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3702_1px,transparent_1px),linear-gradient(to_bottom,#d4af3702_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>
                <div className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-gold/5 blur-[80px] pointer-events-none group-hover:bg-gold/10 transition-all duration-700"></div>

                <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest block">
                            / 02 — TRANSNATIONAL COMMERCE
                        </span>
                        <span className="px-3 py-1 bg-gold/10 border border-gold/20 text-gold rounded-full text-[9px] font-mono tracking-widest uppercase">
                            B2B Trade Desk
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gold font-outfit tracking-tight text-glow-gold">
                            ELKAID B2B Sourcing
                        </h3>
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light max-w-md">
                            Direct supplier routing and customs attestation across key GCC countries. Select a destination port below to trigger transit simulation path.
                        </p>
                    </div>

                    {/* LIVE INTERACTIVE SHIPPING ROUTER */}
                    <div className="bg-neutral-950/80 rounded-2xl border border-gold/10 p-5 space-y-5 relative overflow-hidden">
                        {/* Selector Tabs */}
                        <div className="flex gap-2 border-b border-gold/10 pb-3">
                            {['uae', 'ksa', 'qatar'].map(dest => (
                                <button
                                    key={dest}
                                    onClick={() => setTradeDest(dest)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                                        tradeDest === dest 
                                            ? 'bg-gold text-black font-bold' 
                                            : 'text-gold/60 hover:text-gold bg-gold/5'
                                    }`}
                                >
                                    {dest.toUpperCase()} PORT
                                </button>
                            ))}
                        </div>

                        {/* Route Simulation Visual */}
                        <div className="relative h-20 bg-neutral-900/50 rounded-xl border border-gold/5 p-4 flex flex-col justify-center overflow-hidden">
                            {/* Abstract Shipping Transit Track SVG */}
                            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 320 80">
                                <path 
                                    d="M 20 40 Q 160 10, 300 40" 
                                    fill="none" 
                                    stroke="rgba(212,175,55,0.1)" 
                                    strokeWidth="2.5"
                                    strokeDasharray="4 4"
                                />
                                {/* Pulsing shipping pathway */}
                                <path 
                                    d="M 20 40 Q 160 10, 300 40" 
                                    fill="none" 
                                    stroke="#D4AF37" 
                                    strokeWidth="2.5"
                                    strokeDasharray="60 300"
                                    strokeDashoffset={-tradeData[tradeDest].lineOffset}
                                    className="animate-[dash_12s_linear_infinite]"
                                    style={{
                                        animation: 'dash 10s linear infinite',
                                    }}
                                />
                                <style>{`
                                    @keyframes dash {
                                        to {
                                            stroke-dashoffset: -360;
                                        }
                                    }
                                `}</style>
                                <circle cx="20" cy="40" r="4.5" fill="#ffffff" />
                                <circle cx="300" cy="40" r="4.5" fill="#D4AF37" className="animate-pulse" />
                            </svg>

                            <div className="relative z-10 flex justify-between items-center text-[10px] font-mono">
                                <div>
                                    <span className="text-neutral-500 block text-[7px] uppercase tracking-wider">ORIGIN</span>
                                    <span className="text-white font-semibold">INDIA HUB</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-neutral-500 block text-[7px] uppercase tracking-wider">TRANSIT VELOCITY</span>
                                    <span className="text-gold font-bold text-glow-gold">{tradeData[tradeDest].transit}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-neutral-500 block text-[7px] uppercase tracking-wider">PORT OF ARRIVAL</span>
                                    <span className="text-gold font-bold text-glow-gold">{tradeDest.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Specs checkpoints */}
                        <div className="space-y-2.5 pt-1 text-left">
                            <span className="text-[7px] font-mono text-neutral-500 block uppercase tracking-widest pl-1">
                                CUSTOMS RECONCILIATION BLUEPRINT
                            </span>
                            <div className="grid grid-cols-1 gap-2">
                                {tradeData[tradeDest].check.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-gold/5 rounded-lg border border-gold/5 text-[9px] font-mono text-neutral-300">
                                        <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-gold/10 flex justify-between items-center mt-6">
                    <span className="text-[10px] font-semibold tracking-wider text-gold/60 font-mono">trade.elkaid.com</span>
                    <a
                        href="https://trade.elkaid.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 bg-transparent border border-gold/45 text-gold font-bold text-[10px] uppercase tracking-widest hover:border-gold hover:bg-gold hover:text-black transition-all rounded-full text-glow-gold"
                    >
                        Access Desk &rarr;
                    </a>
                </div>
            </div>

        </div>
    );
}
