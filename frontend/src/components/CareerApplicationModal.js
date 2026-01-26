import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import api, { endpoints } from '../services/api';

const countryPhoneCodes = {
    'Australia': '+61',
    'Bangladesh': '+880',
    'Dubai': '+971',
    'United Arab Emirates': '+971',
    'India': '+91',
    'Kuwait': '+965',
    'Malaysia': '+60',
    'New Zealand': '+64',
    'Oman': '+968',
    'Qatar': '+974',
    'Saudi Arabia': '+966',
    'Singapore': '+65',
    'Sri Lanka': '+94',
    'United States': '+1',
    'United Kingdom': '+44',
    'Canada': '+1',
    'Germany': '+49',
    'France': '+33',
    'Other': '+'
};

const CareerApplicationModal = ({ isOpen, onClose, role }) => {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        country: "",
        pancard: "",
        linkedIn: "",
        portfolio: ""
    });

    const [modalPhoneCode, setModalPhoneCode] = useState('+1');
    const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCountryChange = (e) => {
        const country = e.target.value;
        const code = countryPhoneCodes[country] || '+1';
        setModalPhoneCode(code);
        setFormData((prev) => ({ ...prev, country }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');
        setMessage('');

        try {
            // Logic from old Career.js mostly, adapted for axios
            const payload = { ...formData };

            // If role is passed, maybe append to address or something if backend doesn't support 'role'
            // But we'll just send formData as is based on schema + dob/role

            const response = await api.post(endpoints.sellers, payload);

            if (response.data.success) {
                setSubmissionStatus('success');
                setMessage('Application submitted successfully!');
                setTimeout(() => {
                    onClose();
                    setSubmissionStatus('idle');
                    setMessage('');
                    setFormData({
                        name: "",
                        dob: "",
                        phone: "",
                        email: "",
                        address: "",
                        country: "",
                        pancard: "",
                        linkedIn: "",
                        portfolio: ""
                    });
                }, 2500);
            } else {
                setSubmissionStatus('error');
                setMessage(response.data.message || 'Submission failed');
            }
        } catch (error) {
            console.error("Form submission failed:", error);
            setSubmissionStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative bg-onyx border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-onyx/95 backdrop-blur border-b border-white/5">
                            <h2 className="text-2xl font-bold text-white">
                                {role ? `Apply for ${role}` : "General Application"}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8">
                            {submissionStatus === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-green-400">
                                    <div className="w-16 h-16 mb-4 rounded-full bg-green-400/10 flex items-center justify-center border border-green-400/20">
                                        <Send className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Application Received!</h3>
                                    <p className="text-gray-400">We'll be in touch shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {message && submissionStatus === 'error' && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                                            {message}
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleFormChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Date of Birth *</label>
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    value={formData.dob}
                                                    onChange={handleFormChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all [color-scheme:dark]"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Country *</label>
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleCountryChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled className="bg-onyx text-gray-400">Select Country</option>
                                                    {Object.keys(countryPhoneCodes).map(country => (
                                                        <option key={country} value={country} className="bg-onyx text-white">{country}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number *</label>
                                                <div className="flex">
                                                    <div className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 border-r-0 rounded-l-xl text-gray-400 font-medium min-w-[60px]">
                                                        {modalPhoneCode}
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleFormChange}
                                                        required
                                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-r-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                        placeholder="234 567 8900"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Address *</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleFormChange}
                                                required
                                                rows={2}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                                                placeholder="Full Address"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">LinkedIn Profile *</label>
                                                <input
                                                    type="url"
                                                    name="linkedIn"
                                                    value={formData.linkedIn}
                                                    onChange={handleFormChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                    placeholder="https://linkedin.com/in/..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Portfolio (Optional)</label>
                                                <input
                                                    type="url"
                                                    name="portfolio"
                                                    value={formData.portfolio}
                                                    onChange={handleFormChange}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">PAN Card Number *</label>
                                            <input
                                                type="text"
                                                name="pancard"
                                                value={formData.pancard}
                                                onChange={handleFormChange}
                                                required
                                                maxLength="10"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all uppercase"
                                                placeholder="ABCDE1234F"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F</p>
                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submissionStatus === 'loading'}
                                        className="w-full bg-white text-black py-4 rounded-xl text-lg font-bold hover:bg-gray-200 transition-all duration-300 shadow-xl shadow-white/5 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submissionStatus === 'loading' ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Submit Application</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CareerApplicationModal;
