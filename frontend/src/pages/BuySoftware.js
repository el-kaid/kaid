import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Star, 
  Users, 
  Building2, 
  Zap, 
  Shield, 
  Headphones, 
  Database, 
  Cloud, 
  CreditCard, 
  Lock, 
  Award,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';

// Custom CSS for radial gradients
const customStyles = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const BuySoftware = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 29 : 290,
      originalPrice: billingCycle === 'monthly' ? undefined : 348,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Perfect for small businesses and freelancers getting started with professional accounting.',
      features: [
        'Up to 5 users',
        '10GB cloud storage',
        'Basic invoicing & billing',
        'Expense tracking',
        'Financial reports',
        'Email support',
        'Mobile app access',
        'Bank reconciliation'
      ],
      limitations: [
        'Limited integrations',
        'Basic reporting only',
        'No advanced automation'
      ],
      popular: false,
      cta: 'Start Free Trial',
      icon: <Users className="w-6 h-6" />,
      maxUsers: '5 users',
      storage: '10GB',
      support: 'Email'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 79 : 790,
      originalPrice: billingCycle === 'monthly' ? undefined : 948,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Ideal for growing businesses that need advanced features and better collaboration.',
      features: [
        'Up to 25 users',
        '100GB cloud storage',
        'Advanced invoicing & billing',
        'Multi-currency support',
        'Advanced financial reports',
        'Priority email & chat support',
        'Mobile & desktop apps',
        'Automated bank reconciliation',
        'Inventory management',
        'Project tracking',
        'Custom fields & workflows',
        'API access'
      ],
      popular: true,
      cta: 'Start Free Trial',
      icon: <Building2 className="w-6 h-6" />,
      maxUsers: '25 users',
      storage: '100GB',
      support: 'Email & Chat'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 199 : 1990,
      originalPrice: billingCycle === 'monthly' ? undefined : 2388,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Comprehensive solution for large organizations with complex accounting needs.',
      features: [
        'Unlimited users',
        'Unlimited cloud storage',
        'Enterprise-grade invoicing',
        'Multi-company management',
        'Advanced analytics & BI',
        '24/7 phone & chat support',
        'All platform access',
        'Advanced automation',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced security features',
        'Custom reporting',
        'Audit trails',
        'Role-based permissions'
      ],
      popular: false,
      cta: 'Contact Sales',
      icon: <Zap className="w-6 h-6" />,
      maxUsers: 'Unlimited',
      storage: 'Unlimited',
      support: '24/7 Phone & Chat'
    }
  ];

  const features = [
    {
      category: 'Core Features',
      items: [
        { name: 'Invoicing & Billing', starter: true, professional: true, enterprise: true },
        { name: 'Expense Tracking', starter: true, professional: true, enterprise: true },
        { name: 'Financial Reports', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
        { name: 'Bank Reconciliation', starter: 'Manual', professional: 'Automated', enterprise: 'Advanced' },
        { name: 'Multi-Currency', starter: false, professional: true, enterprise: true },
        { name: 'Inventory Management', starter: false, professional: true, enterprise: true }
      ]
    },
    {
      category: 'Collaboration',
      items: [
        { name: 'User Accounts', starter: '5', professional: '25', enterprise: 'Unlimited' },
        { name: 'Role Permissions', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
        { name: 'Team Collaboration', starter: false, professional: true, enterprise: true },
        { name: 'Project Tracking', starter: false, professional: true, enterprise: true }
      ]
    },
    {
      category: 'Integrations',
      items: [
        { name: 'Banking Integration', starter: true, professional: true, enterprise: true },
        { name: 'Payment Gateways', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
        { name: 'Third-party Apps', starter: '5', professional: '25', enterprise: 'Unlimited' },
        { name: 'API Access', starter: false, professional: true, enterprise: true }
      ]
    },
    {
      category: 'Support & Security',
      items: [
        { name: 'Customer Support', starter: 'Email', professional: 'Email & Chat', enterprise: '24/7 All Channels' },
        { name: 'Data Backup', starter: 'Daily', professional: 'Real-time', enterprise: 'Real-time + Redundancy' },
        { name: 'Security Features', starter: 'Standard', professional: 'Advanced', enterprise: 'Enterprise-grade' },
        { name: 'Compliance', starter: 'Basic', professional: 'Advanced', enterprise: 'Full Compliance Suite' }
      ]
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'Can I switch plans at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference immediately. When downgrading, the change will take effect at your next billing cycle.'
    },
    {
      id: 2,
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 30-day free trial for all plans. No credit card required to start your trial. You can explore all features and decide which plan works best for your business.'
    },
    {
      id: 3,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our encrypted payment system.'
    },
    {
      id: 4,
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. There are no cancellation fees or long-term contracts. Your account will remain active until the end of your current billing period.'
    },
    {
      id: 5,
      question: 'Do you offer discounts for non-profits?',
      answer: 'Yes, we offer a 25% discount for qualified non-profit organizations. Please contact our sales team with your non-profit documentation to apply for this discount.'
    },
    {
      id: 6,
      question: 'Is my data secure and backed up?',
      answer: 'Absolutely. We use bank-level encryption for all data transmission and storage. Your data is automatically backed up multiple times daily and stored in secure, geographically distributed data centers.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CFO',
      content: 'Kaid has transformed our financial operations. The automation features alone have saved us 20+ hours per week.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Chen',
      company: 'Growth Ventures',
      role: 'Founder',
      content: 'The best investment we\'ve made for our business. The reporting features give us insights we never had before.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emily Rodriguez',
      company: 'Creative Agency Co.',
      role: 'Operations Manager',
      content: 'Switching to Kaid was seamless. The support team helped us migrate all our data without any issues.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const renderFeatureValue = (value) => {
    if (value === true) return <Check className="w-5 h-5 text-green-400" />;
    if (value === false) return <X className="w-5 h-5 text-gray-500" />;
    return <span className="text-gray-300 text-sm">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Section - Matching OurWork design */}
      <section className="pt-16 pb-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
        {/* Background gradient glow - Same as OurWork */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-12">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium">💎 Pricing Plans</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Choose Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Start your free trial today and discover why thousands of businesses trust Kaid 
              for their financial management needs.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/10 rounded-full p-2">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-slate-900 shadow-xl'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                    billingCycle === 'yearly'
                      ? 'bg-white text-slate-900 shadow-xl'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>Yearly</span>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Save 17%</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative group ${plan.popular ? 'lg:-mt-8' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className={`bg-slate-800/50 border rounded-3xl p-8 h-full transition-all duration-300 hover:bg-slate-800/70 ${
                  plan.popular 
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 lg:scale-105' 
                    : 'border-slate-700 hover:border-purple-500/30'
                }`}>
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-300 text-sm mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-5xl font-bold text-white">${plan.price}</span>
                        <span className="text-gray-400">{plan.period}</span>
                      </div>
                      {plan.originalPrice && (
                        <div className="text-gray-500 line-through text-lg mt-1">
                          ${plan.originalPrice}{plan.period}
                        </div>
                      )}
                    </div>

                    <button 
                      className={`w-full py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                        plan.popular
                          ? 'bg-white text-slate-900 hover:bg-gray-100 shadow-2xl'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.cta}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center py-4 border-t border-b border-purple-500/10">
                      <div>
                        <div className="text-white font-semibold">{plan.maxUsers}</div>
                        <div className="text-gray-400 text-xs">Users</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{plan.storage}</div>
                        <div className="text-gray-400 text-xs">Storage</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xs">{plan.support}</div>
                        <div className="text-gray-400 text-xs">Support</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations && plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center space-x-3 opacity-60">
                          <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See exactly what's included in each plan to make the best choice for your business.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-6 text-white font-semibold">Features</th>
                    <th className="text-center p-6 text-white font-semibold">Starter</th>
                    <th className="text-center p-6 text-white font-semibold relative">
                      Professional
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <Star className="w-4 h-4 text-yellow-400" />
                      </div>
                    </th>
                    <th className="text-center p-6 text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category) => (
                    <React.Fragment key={category.category}>
                      <tr>
                        <td colSpan={4} className="p-6 bg-purple-500/10">
                          <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                        </td>
                      </tr>
                      {category.items.map((item, index) => (
                        <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                          <td className="p-4 text-gray-300">{item.name}</td>
                          <td className="p-4 text-center">{renderFeatureValue(item.starter)}</td>
                          <td className="p-4 text-center">{renderFeatureValue(item.professional)}</td>
                          <td className="p-4 text-center">{renderFeatureValue(item.enterprise)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 via-slate-900 to-purple-900/30 relative overflow-hidden">
        {/* Background gradient glow - Same as OurWork */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-pink-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what our customers have to say about their experience with Kaid.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-800/70 transition-colors"
                >
                  <span className="text-white font-semibold">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <Minus className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your data security is our top priority. We use industry-leading security measures to protect your business.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">SSL Encryption</h3>
              <p className="text-gray-300 text-sm">Bank-level 256-bit SSL encryption for all data transmission</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
              <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Data Backup</h3>
              <p className="text-gray-300 text-sm">Automated daily backups with 99.9% uptime guarantee</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Compliance</h3>
              <p className="text-gray-300 text-sm">SOC 2, GDPR, and industry compliance standards</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
              <Headphones className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-300 text-sm">Round-the-clock customer support and monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 via-slate-900 to-purple-900/30 relative overflow-hidden">
        {/* Background gradient glow - Same as OurWork */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-pink-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have already made the switch to Kaid. 
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-purple-400/50 text-purple-400 hover:bg-purple-400/10 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Schedule Demo
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            30-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default BuySoftware;