import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, MessageSquare, 
  Headphones, Users, Building2, Globe, CheckCircle,
  ArrowRight, Calendar, Video, FileText, HelpCircle,
  Zap, Shield, Rocket, Code, Smartphone, Database, Brain,
  AlertCircle, X
} from 'lucide-react';

// Custom CSS for radial gradients
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
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [estimatedResponseTime, setEstimatedResponseTime] = useState('');

  // Updated API URL - make sure this matches your backend URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const offices = [
    {
      id: 'new-york',
      city: 'New York',
      country: 'United States',
      address: '123 Business Ave, Suite 500, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'ny@accountpro.com',
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
      email: 'london@accountpro.com',
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
      email: 'singapore@accountpro.com',
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
      contact: '+1 (555) 123-4567',
      availability: '24/7 for Enterprise customers',
      action: 'Call Now'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get detailed help via email',
      contact: 'support@accountpro.com',
      availability: 'Response within 2 hours',
      action: 'Send Email'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our team in real-time',
      contact: 'Available on website',
      availability: 'Mon-Fri: 9 AM - 6 PM EST',
      action: 'Start Chat'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Video Call',
      description: 'Schedule a personalized demo',
      contact: 'Book online meeting',
      availability: 'Flexible scheduling',
      action: 'Schedule Call'
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
    // Clear any previous errors when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setEstimatedResponseTime(data.estimatedResponseTime || '< 2 hours');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      } else {
        // Handle validation errors or other API errors
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl"></div>
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
            className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Send Another Message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Section */}
      <section className="pt-40 pb-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <span className="text-purple-400 text-sm font-medium">📞 Contact Us</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Get In
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Have questions about AccountPro? Need help getting started? Our expert team is here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How Can We Help?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the best way to reach us. We're committed to providing fast, helpful support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="group cursor-pointer project-card-hover">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-full hover:bg-slate-800/70 transition-all duration-300 group-hover:border-purple-500/30">
                  <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{method.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="text-white font-medium">{method.contact}</div>
                    <div className="text-gray-400 text-sm">{method.availability}</div>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                    <span>{method.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Support Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {/* Error message display */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-red-300 text-sm">{submitError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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

                <div className="grid md:grid-cols-2 gap-6">
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
                    <option value="general">General Support</option>
                    <option value="technical">Technical Issues</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="enterprise">Enterprise Solutions</option>
                    <option value="billing">Billing Questions</option>
                    <option value="partnership">Partnership Opportunities</option>
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
                  className="w-full bg-white text-slate-900 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
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
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300 project-card-hover">
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
                  <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Demo</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 border border-slate-700 text-white py-3 rounded-xl font-medium hover:bg-slate-800/70 transition-colors">
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
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our Support Promise
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            We're committed to providing exceptional support that helps your business succeed.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 via-slate-900 to-purple-900/30 relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-pink-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Ready to
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Transform Your Business?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to learn how AccountPro can streamline your accounting workflow.
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
      </section>
    </div>
  );
};

export default Contact;