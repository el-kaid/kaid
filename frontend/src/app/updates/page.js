'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import {
    Mail, Phone, Clock, Send,
    Users, Building2, CheckCircle,
    Calendar, FileText, HelpCircle,
    Zap, Shield, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

const UpdatesPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'billing'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, success, error

    const supportCategories = [
        {
            icon: <HelpCircle className="w-6 h-6 text-white" />,
            title: 'General Support',
            description: 'Questions about features, active B1 billing structures, or company profile.',
            responseTime: '< 2 hours'
        },
        {
            icon: <Zap className="w-6 h-6 text-white" />,
            title: 'Technical Issues',
            description: 'Database syncs, desktop .exe installer errors, or custom CRM integrations.',
            responseTime: '< 1 hour'
        },
        {
            icon: <Building2 className="w-6 h-6 text-white" />,
            title: 'Enterprise Solutions',
            description: 'Custom configurations, multi-branch setups, or high-availability data infrastructure.',
            responseTime: 'Same day'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmissionStatus('success');
            setFormData({
                name: '', email: '', company: '', phone: '', subject: '', message: '', inquiryType: 'billing'
            });
            setTimeout(() => setSubmissionStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-inter pt-36">
            <Navbar />

            {/* === HERO SECTION === */}
            <section className="max-w-6xl mx-auto px-6 md:px-12 mb-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto z-10">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] uppercase tracking-widest font-mono">
                      Contact & Care
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold mt-6 mb-8 font-outfit tracking-tighter leading-none text-white">
                      Support Hub
                    </h1>
                    <p className="text-neutral-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
                      Get in touch with our team for standard B1 platform configurations, custom enterprise accounting, or hardware and system integration queries.
                    </p>
                </div>
            </section>

            {/* === PHONE & EMAIL CHANNELS === */}
            <section className="py-12 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        
                        {/* Phone Card */}
                        <div className="glass-card p-10 rounded-[2rem] flex flex-col justify-between min-h-[320px] relative overflow-hidden group">
                            <div>
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white bg-white/5 border border-white/10">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 tracking-wide uppercase font-outfit">Phone Support</h3>
                                <p className="text-neutral-400 text-sm mb-6">Speak directly with our technical support team</p>
                                <p className="text-2xl font-bold text-white mb-2 font-mono">+91-81484-12764</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">24/7 Availability for Enterprise</p>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="glass-card p-10 rounded-[2rem] flex flex-col justify-between min-h-[320px] relative overflow-hidden group">
                            <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
                            <div>
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white bg-white/5 border border-white/10">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 tracking-wide uppercase font-outfit text-white">Email Support</h3>
                                <p className="text-neutral-400 text-sm mb-6">Get detailed documentation help via email</p>
                                <p className="text-xl font-bold text-white mb-2 font-mono underline decoration-white/30 underline-offset-4">support@elkaid.com</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Response within 2 business hours</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* === CONTACT FORM & CATEGORIES === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

                        {/* Form Section */}
                        <div className="lg:col-span-3 glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                            <h2 className="text-3xl font-bold mb-8 font-outfit">Send us a message</h2>
                            {submissionStatus === 'success' ? (
                                <div className="flex flex-col items-center justify-center h-[350px] text-center text-white">
                                    <CheckCircle className="w-16 h-16 mb-4 text-white" />
                                    <h3 className="text-2xl font-bold text-white mb-2 font-outfit">Message Sent!</h3>
                                    <p className="text-neutral-400 text-sm">We will get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 font-mono">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 font-mono">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 font-mono">Company</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 font-mono">Inquiry Type</label>
                                            <select
                                                name="inquiryType"
                                                value={formData.inquiryType}
                                                onChange={handleInputChange}
                                                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer font-mono"
                                            >
                                                <option value="billing">B1 Accounting & Billing</option>
                                                <option value="taxation">Taxation & Compliance</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="other">Other Inquiry</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 font-mono">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none font-mono"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 transition-colors rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-white disabled:opacity-50 cursor-pointer shadow-xl shadow-black/20"
                                    >
                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Categories & Info Section */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 font-outfit">Support Categories</h2>
                                <p className="text-neutral-400 text-sm mb-8 leading-relaxed">Choose the appropriate category to route your query directly to our specialists.</p>
                                <div className="space-y-4">
                                    {supportCategories.map((category, index) => (
                                        <div key={index} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/15 transition-all flex items-start gap-4">
                                            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl shrink-0">
                                                {category.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-base text-white font-outfit mb-1">{category.title}</h3>
                                                <p className="text-neutral-400 text-xs leading-relaxed mb-2">{category.description}</p>
                                                <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{category.responseTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4 font-outfit uppercase tracking-widest text-neutral-400">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest">
                                    <a
                                        href="/book-demo"
                                        className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-neutral-300 hover:text-white"
                                    >
                                        <Calendar className="w-4 h-4 text-neutral-400" />
                                        <span>Book Demo</span>
                                    </a>
                                    <a
                                        href="https://b1.elkaid.com/docs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-neutral-300 hover:text-white"
                                    >
                                        <FileText className="w-4 h-4 text-neutral-400" />
                                        <span>B1 Docs</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* === PROMISE === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-neutral-500 tracking-widest uppercase text-xs font-semibold mb-3">Enterprise Guarantee</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">Our Support Promise</h2>
                    <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mb-16 leading-relaxed">
                        We avoid standard corporate templates and focus on delivering active engineering and operational resolutions that keep your platforms running.
                    </p>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center space-y-4">
                            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold font-outfit">Fast Execution</h3>
                            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                                Continuous tracking and direct email response logs averaged under 2 business hours.
                            </p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold font-outfit">Focused Specialists</h3>
                            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                                Direct interaction with technical engineers and database system architects who own the platforms.
                            </p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold font-outfit">Reliable Continuity</h3>
                            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                                Escalated 24/7 priority pathways for enterprise system integrations and production cluster rollouts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UpdatesPage;
