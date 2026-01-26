'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import {
    Mail, Phone, MapPin, Clock, Send,
    Headphones, Users, Building2, Globe, CheckCircle,
    ArrowRight, Calendar, FileText, HelpCircle,
    Zap, Shield, Rocket, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock API endpoint for now, or use the one from config if available.
// Since we are migrating, we'll keep the logic but mock the fetch if API_ENDPOINTS is not readily imported or defined in new structure yet.
// We will try to rely on ../services/api if possible, but for page logic we'll standard fetch or mock.

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
    const [message, setMessage] = useState('');



    const supportCategories = [
        {
            icon: <HelpCircle className="w-8 h-8" />,
            title: 'General Support',
            description: 'Questions about features, billing, or account management',
            responseTime: '< 2 hours'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Technical Issues',
            description: 'Bug reports, integration problems, or technical difficulties',
            responseTime: '< 1 hour'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Sales Inquiry',
            description: 'Pricing questions, plan comparisons, or custom solutions',
            responseTime: '< 30 minutes'
        },
        {
            icon: <Building2 className="w-8 h-8" />,
            title: 'Enterprise Solutions',
            description: 'Custom implementations, integrations, or enterprise features',
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

        // Simulating API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmissionStatus('success');
            setFormData({
                name: '', email: '', company: '', phone: '', subject: '', message: '', inquiryType: 'billing'
            });
            setTimeout(() => setSubmissionStatus('idle'), 5000);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-montserrat">
            <Navbar />

            {/* === HERO SECTION === */}
            <section className="relative min-h-[60vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto w-full z-10 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        SUPPORT HUB
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        We're here to help. Get in touch with our team for any questions or support needs.
                    </motion.p>
                </div>
            </section>

            {/* === HOW CAN WE HELP === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">HOW CAN WE HELP?</h2>
                        <p className="text-gray-400 text-lg">Choose the best way to reach us. We're committed to providing fast, helpful support.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white bg-white/5">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 tracking-wide uppercase">Phone Support</h3>
                            <p className="text-gray-400 mb-6">Speak directly with our support team</p>
                            <p className="text-2xl font-bold text-white mb-2">+91 81484 12764</p>
                            <p className="text-sm text-gray-500 mb-8">24/7 for Enterprise customers</p>
                            <button className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
                                Call Anytime
                            </button>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white bg-white/5">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 tracking-wide uppercase">Email Support</h3>
                            <p className="text-gray-400 mb-6">Get detailed help via email</p>
                            <p className="text-xl font-bold text-white mb-2 underline decoration-white/20 underline-offset-4">support@elkaid.com</p>
                            <p className="text-sm text-gray-500 mb-8">Response within 2 hours</p>
                            <button className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
                                Email Anytime
                            </button>
                        </div>
                    </div>
                </div>
            </section>



            {/* === CONTACT FORM & CATEGORIES === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Form Section */}
                        <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
                            <h2 className="text-3xl font-bold mb-8">Send us a message</h2>
                            {submissionStatus === 'success' ? (
                                <div className="flex flex-col items-center justify-center h-96 text-center text-green-400">
                                    <CheckCircle className="w-16 h-16 mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-400">We'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400">Company</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400">Inquiry Type</label>
                                            <select
                                                name="inquiryType"
                                                value={formData.inquiryType}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="billing">Billing</option>
                                                <option value="bookkeeping">Bookkeeping</option>
                                                <option value="taxation">Taxation</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
                                    >
                                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Categories & Info */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Support Categories</h2>
                                <p className="text-gray-400 mb-8">Choose the right category for faster, more targeted support.</p>
                                <div className="space-y-4">
                                    {supportCategories.map((category, index) => (
                                        <div key={index} className="bg-onyx/50 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all flex items-start gap-4">
                                            <div className="text-white bg-white/5 p-3 rounded-lg">
                                                {category.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                                                <p className="text-gray-400 text-sm mb-2">{category.description}</p>
                                                <div className="flex items-center gap-2 text-xs text-white/60">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{category.responseTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors font-medium">
                                        <Calendar className="w-5 h-5" />
                                        <span>Book Demo</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors font-medium">
                                        <FileText className="w-5 h-5" />
                                        <span>Documentation</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* === PROMISE === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Support Promise</h2>
                    <p className="text-xl text-gray-400 mb-16">We're committed to providing exceptional support that helps your business succeed.</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Fast Response</h3>
                            <p className="text-gray-400">Average response time under 2 hours for all inquiries</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Expert Team</h3>
                            <p className="text-gray-400">Certified accounting and technical experts ready to help</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Always Available</h3>
                            <p className="text-gray-400">24/7 support for Enterprise customers, extended hours for all</p>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
};

export default UpdatesPage;
