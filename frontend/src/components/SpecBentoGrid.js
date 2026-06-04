'use client';

import React, { useState, useRef } from 'react';
import { Layers } from 'lucide-react';

export default function SpecBentoGrid() {
    // Active tabs for B1 Software Dashboard
    const [b1Tab, setB1Tab] = useState('ledger');

    // Refs for cursor border glow tracking
    const b1CardRef = useRef(null);

    // Mouse positions for card spotlight
    const [b1Mouse, setB1Mouse] = useState({ x: 0, y: 0, opacity: 0 });

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

    return (
        <div className="max-w-4xl mx-auto">
            {/* ================= B1 SOFTWARE CARD (MONOCHROME BENTO + MOUSE SPOTLIGHT) ================= */}
            <div 
                ref={b1CardRef}
                onMouseMove={(e) => handleMouseMove(e, b1CardRef, setB1Mouse)}
                onMouseLeave={() => handleMouseLeave(setB1Mouse)}
                className="glass-card p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[520px] relative overflow-hidden group hover:scale-[1.01] duration-500 ease-out border border-white/10"
            >
                {/* Dynamic Mouse Spotlight Border overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
                    style={{
                        opacity: b1Mouse.opacity,
                        background: `radial-gradient(400px circle at ${b1Mouse.x}px ${b1Mouse.y}px, rgba(255,255,255,0.06), transparent 80%)`
                    }}
                />

                {/* Micro tech grid backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

                <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                            / SYSTEM ARCHITECTURE DASHBOARD
                        </span>
                        <span className="px-3 py-1 bg-white/10 border border-white/10 text-white rounded-full text-[9px] font-mono tracking-widest uppercase">
                            B1 Platform
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-3xl sm:text-4xl font-bold text-white font-outfit tracking-tight">
                            B1 Software Engine
                        </h3>
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light max-w-2xl">
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            {/* SVG Mini Vector line chart */}
                            <div className="md:col-span-2 h-24 relative overflow-hidden bg-neutral-900/50 rounded-xl border border-white/5">
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
                            <div className="text-right flex flex-col justify-center gap-1.5 pl-2 md:border-l md:border-white/5 h-full">
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
        </div>
    );
}
