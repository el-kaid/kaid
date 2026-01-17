import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send,
  Headphones, Users, Building2, Globe, CheckCircle,
  ArrowRight, Calendar, FileText, HelpCircle,
  Zap, Shield, Rocket, Code, Smartphone, Database, Brain,
  AlertCircle, X
} from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

// Custom CSS for radial gradients and animations
const customStyles = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  
  .project-card-hover {
    transition: all 0.3s ease;
  }
  .project-card-hover:hover {
    transform: translateY(-8px);
  }
  
  /* Scroll Animation Styles */
  .scroll-animate {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .scroll-animate:not(.animate-in) {
    opacity: 0;
    transform: translateY(50px);
  }
  
  .scroll-animate.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .scroll-animate-delay-1 {
    transition-delay: 0.1s;
  }
  
  .scroll-animate-delay-2 {
    transition-delay: 0.2s;
  }
  
  .scroll-animate-delay-3 {
    transition-delay: 0.3s;
  }
  
  /* ================= GLOW BUTTON ================= */
  .glow-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 2.5rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(168, 85, 247, 0.3);
    color: #ffffff;
    font-weight: 500;
    font-size: 1.125rem;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .glow-button:hover {
    background: rgba(168, 85, 247, 0.1);
    border-color: rgba(168, 85, 247, 0.5);
  }

  .button_inner {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .glow {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.35), transparent 70%);
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.4s ease, transform 0.4s ease;
    z-index: 1;
  }

  .glow-button:hover .glow {
    opacity: 1;
    transform: scale(1.05);
    animation: glowMove 3s ease-in-out infinite alternate;
  }

  @keyframes glowMove {
    0% { background-position: 50% 50%; }
    50% { background-position: 60% 40%; }
    100% { background-position: 50% 50%; }
  }

  @keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}

.success-popup {
  animation: fadeInOut 4s ease-in-out forwards;
}

`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const Updates = () => {
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [estimatedResponseTime, setEstimatedResponseTime] = useState('');
  const [isVisible, setIsVisible] = useState({});

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);


  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Additional reveal effect
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = document.querySelectorAll('.scroll-animate');
    els.forEach(el => io.observe(el));

    return () => io.disconnect();
  }, []);

  const offices = [
    {
      id: 'new-york',
      city: 'New York',
      country: 'United States',
      address: '123 Business Ave, Suite 500, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'ny@elkaid.com',
      timezone: 'EST (UTC-5)',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'london',
      city: 'London',
      country: 'United Kingdom',
      address: '45 Financial District, London EC2V 8RF, UK',
      phone: '+44 20 7123 4567',
      email: 'london@elkaid.com',
      timezone: 'GMT (UTC+0)',
      hours: 'Mon-Fri: 9:00 AM - 5:30 PM',
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'singapore',
      city: 'Singapore',
      country: 'Singapore',
      address: '88 Business Hub, #12-34, Singapore 018956',
      phone: '+65 6123 4567',
      email: 'singapore@elkaid.com',
      timezone: 'SGT (UTC+8)',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+91 81484 12764',
      availability: '24/7 for Enterprise customers',
      action: 'Call Anytime',
      showArrow: false
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get detailed help via email',
      contact: 'support@elkaid.com',
      availability: 'Response within 2 hours',
      action: 'Email Anytime',
      showArrow: false
    }
  ];

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
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });


      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('✅ Message sent successfully! We’ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'billing'
        });
      } else {
        setSubmitError(data.message || 'Failed to submit your inquiry. Please try again.');
        if (data.errors && data.errors.length > 0) {
          setSubmitError(data.errors.join(', '));
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:200px_200px] opacity-20" />
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Thank You!
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 leading-relaxed">
            We've received your message and will get back to you within {estimatedResponseTime}.
            Our team is already reviewing your inquiry.
          </p>
          <p className="text-gray-400 mb-8">
            You'll receive a confirmation email shortly with your inquiry details.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="border-2 border-purple-400/50 text-purple-300 px-8 py-3 rounded-full font-semibold hover:bg-purple-400/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span>Send Another Message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black scroll-animate">
        {/* Starry Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:200px_200px] opacity-20" />
        </div>

        {/* Centered Title */}
        <div className="relative z-10 text-center">
          {/* Subtle glow effect behind text (match Home/Career) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-5xl md:text-7xl font-semibold uppercase tracking-wide opacity-25 blur-md"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                background: "linear-gradient(to bottom, #60a5fa, #3b82f6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                letterSpacing: '0.05em'
              }}
            >
              GET IN TOUCH
            </div>
          </div>

          <h1
            className="text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight relative"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 100,
              letterSpacing: '0.05em',
              textShadow: "0 0 15px rgba(96, 165, 250, 0.3)",
            }}
          >
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Need help getting started? Our expert team is here to help you succeed.
          </p>
        </div>

        {/* === Scroll Down - Bottom === */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <ScrollDown />
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How Can We Help?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the best way to reach us. We're committed to providing fast, helpful support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <div key={index} className="group cursor-pointer project-card-hover w-full max-w-sm">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 rounded-2xl p-6 h-full hover:bg-slate-800/50 transition-all duration-300 group-hover:border-purple-500/30">
                  <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-white font-medium">{method.contact}</div>
                    <div className="text-gray-400 text-sm">{method.availability}</div>
                  </div>
                  <button className="w-full py-2 rounded-full text-sm font-medium flex items-center justify-center space-x-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors">
                    <span>{method.action}</span>
                    {method.showArrow !== false && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Support Categories */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              {/* ✅ Success Popup */}
              {successMessage && (
                <div className="success-popup mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-green-300 text-sm">{successMessage}</div>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-red-300 text-sm">{submitError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="john@company.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Your Company"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="+1 (555) 123-4567"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    disabled={isSubmitting}
                  >
                    <option value="billing">Billing</option>
                    <option value="bookkeeping">Bookkeeping</option>
                    <option value="taxation">Taxation</option>
                    <option value="banking">Banking</option>
                    <option value="B1M">B1M</option>
                    <option value="asset management">Asset Management</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                    placeholder="How can we help you?"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                    placeholder="Please provide details about your inquiry..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full border-2 border-purple-400/50 text-purple-300 px-6 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? '' : 'hover:bg-purple-400/10'}`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-purple-300 border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>

            {/* Support Categories */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Support Categories</h2>
              <p className="text-gray-300 mb-8">
                Choose the right category for faster, more targeted support.
              </p>

              <div className="space-y-6">
                {supportCategories.map((category, index) => (
                  <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 project-card-hover">
                    <div className="flex items-start space-x-4">
                      <div className="text-purple-400 flex-shrink-0">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                        <p className="text-gray-300 mb-3">{category.description}</p>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300">Response time: {category.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center space-x-2 py-3 rounded-xl font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Demo</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 rounded-xl font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>View Docs</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Promise */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our Support Promise
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            We're committed to providing exceptional support that helps your business succeed.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fast Response</h3>
              <p className="text-gray-300">Average response time under 2 hours for all inquiries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
              <p className="text-gray-300">Certified accounting and technical experts ready to help</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Always Available</h3>
              <p className="text-gray-300">24/7 support for Enterprise customers, extended hours for all</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-black scroll-animate">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] lg:w-[1000px] h-[300px] sm:h-[450px] lg:h-[600px] bg-gradient-radial from-purple-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[525px] lg:w-[700px] h-[200px] sm:h-[300px] lg:h-[400px] bg-gradient-radial from-purple-500/50 via-purple-600/30 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Ready to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Transform Your Business?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to learn how EL KAID can streamline your accounting workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Request Demo</span>
            </button>
            <button className="border-2 border-purple-400/50 text-purple-400 hover:bg-purple-400/10 px-8 py-4 rounded-full font-semibold transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>
    </div>
  );
};

export default Updates;