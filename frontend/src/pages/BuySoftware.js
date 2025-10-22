import React, { useState, useEffect } from 'react';
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
  Download,
  Award,
  ArrowRight,
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';

const customStyles = `
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
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

  .glow-button.download-btn {
    border-color: rgba(34, 197, 94, 0.3);
  }

  .glow-button.download-btn:hover {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.5);
  }

  .button_inner {
    position: relative;
    z-index: 2;
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
  }

  .glow-button.download-btn .glow {
    background: radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.35), transparent 70%);
  }

  /* ================= NOTIFICATION ANIMATION ================= */
  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const BuySoftware = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [detectedOS, setDetectedOS] = useState('');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac os') || userAgent.includes('macintosh')) {
      setDetectedOS('macOS');
    } else if (userAgent.includes('windows')) {
      setDetectedOS('Windows');
    } else {
      setDetectedOS('Unknown');
    }
  }, []);
  

  const handleDownload = (os) => {
    let fileUrl = '';
    let fileName = '';
  
    if (os === 'macOS') {
      fileUrl = '/downloads/B-1-Software-mac.dmg';
      fileName = 'B-1-Software-mac.dmg';
    } else if (os === 'Windows') {
      fileUrl = '/downloads/B-1-Software-windows.exe';
      fileName = 'B-1-Software-windows.exe';
    } else {
      fileUrl = '/downloads/B-1-Software-windows.exe';
      fileName = 'B-1-Software-windows.exe';
    }
  
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };
  
  
  

  const softwareProduct = {
    name: 'B-1 Software',
    description: 'Download our powerful B-1 desktop software for advanced financial management and offline accounting.',
    features: [
      'Offline capability',
      'Advanced data processing',
      'Custom reporting tools',
      'Bulk operations support',
      'Import/Export functionality',
      'One-time download',
      'Free updates for 1 year',
      'Community support forum'
    ],
    maxUsers: 'Unlimited',
    storage: 'Local Storage',
    support: 'Community'
  };

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
      icon: <Zap className="w-6 h-6" />,
      maxUsers: 'Unlimited',
      storage: 'Unlimited',
      support: '24/7 Phone & Chat'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'What is B-1 Software and how is it different from cloud plans?',
      answer: 'B-1 Software is our desktop application that runs entirely on your local computer. Unlike our cloud plans, it doesn\'t require internet connectivity for daily operations and stores all data locally. It\'s perfect for users who prefer offline work or have limited internet access.'
    },
    {
      id: 2,
      question: 'Can I switch plans at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference immediately. When downgrading, the change will take effect at your next billing cycle.'
    },
    {
      id: 3,
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 30-day free trial for all cloud plans. No credit card required to start your trial. The B-1 Software is completely free to download and use with community support.'
    },
    {
      id: 4,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our encrypted payment system.'
    },
    {
      id: 5,
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. There are no cancellation fees or long-term contracts. Your account will remain active until the end of your current billing period.'
    },
    {
      id: 6,
      question: 'Is my data secure and backed up?',
      answer: 'Absolutely. For cloud plans, we use bank-level encryption for all data transmission and storage. Your data is automatically backed up multiple times daily. For B-1 Software, data is stored locally on your computer, and we recommend regular manual backups.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CFO',
      content: 'EL KAID has transformed our financial operations. The automation features alone have saved us countless hours and improved our productivity by 300%.',
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
      content: 'Switching to EL KAID was seamless. The support team helped us migrate all our data without any issues.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <section className="pt-16 pb-16 px-4 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:200px_200px] opacity-20" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-36">
          <div className="relative mb-12 pt-8">
            {/* Subtle glow effect behind text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-4xl md:text-6xl font-semibold opacity-25 blur-md"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  background: "linear-gradient(to bottom, #60a5fa, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  letterSpacing: '0.05em'
                }}
              >
                Choose Your Perfect Plan
              </div>
            </div>
            <h1 
              className="text-4xl md:text-6xl font-semibold mb-8 relative text-white" 
              style={{ 
                fontFamily: 'Montserrat, sans-serif', 
                fontWeight: 600, 
                letterSpacing: '0.05em', 
                textShadow: '0 0 15px rgba(96, 165, 250, 0.35)' 
              }}
            >
              Choose Your Perfect Plan
            </h1>
            
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-lg mb-12">
              Start your free trial today and discover why thousands of businesses trust EL KAID 
              for their financial management needs.
            </p>
          </div>
        </div>
      </section>

      {/* Software Download Section */}
      <section className="py-20 px-4 bg-black pt-40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Download our free desktop application for powerful offline accounting capabilities.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <Cloud className="w-4 h-4" />
                  <span>Free Download</span>
                </div>
              </div>
              
              <div className="glass-effect rounded-3xl p-8 border-green-500/50 shadow-2xl shadow-green-500/20">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                      <Download className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{softwareProduct.name}</h3>
                  <p className="text-gray-400 mb-6">{softwareProduct.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">Free</span>
                  </div>



<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <button
    onClick={() => handleDownload('Windows')}
    className={`glow-button download-btn w-full sm:w-auto ${
      detectedOS === 'Windows' ? 'ring-2 ring-green-400' : ''
    }`}
  >
    <div className="button_inner"><p>Download for Windows (.exe)</p></div>
    <div className="glow"></div>
  </button>

  <button
    onClick={() => handleDownload('macOS')}
    className={`glow-button download-btn w-full sm:w-auto ${
      detectedOS === 'macOS' ? 'ring-2 ring-green-400' : ''
    }`}
  >
    <div className="button_inner"><p>Download for macOS (.dmg)</p></div>
    <div className="glow"></div>
  </button>
</div>

                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center py-4 border-t border-b border-green-500/10">
                    <div>
                      <div className="text-white font-semibold">{softwareProduct.maxUsers}</div>
                      <div className="text-gray-400 text-sm">Users</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{softwareProduct.storage}</div>
                      <div className="text-gray-400 text-sm">Storage</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{softwareProduct.support}</div>
                      <div className="text-gray-400 text-sm">Support</div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {softwareProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Subscription Plans
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the perfect cloud plan for your business needs with flexible pricing options.
            </p>
          </div>

          <div className="flex items-center justify-center mb-20">
            <div className="glass-effect rounded-full p-2">
              <div className="flex items-center space-x-4">
                <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-3 rounded-full font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}>
                  Monthly
                </button>
                <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-3 rounded-full font-medium flex items-center space-x-2 transition-all ${billingCycle === 'yearly' ? 'bg-white text-black' : 'text-gray-300 hover:text-white'}`}>
                  <span>Yearly</span>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Save 17%</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className={`glass-effect rounded-3xl p-8 h-full transition-all duration-300 hover:bg-white/10 ${plan.popular ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 md:scale-105' : 'hover:border-purple-500/30'}`}>
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-5xl font-bold text-white">₹{plan.price}</span>
                        <span className="text-gray-400">{plan.period}</span>
                      </div>
                      {plan.originalPrice && (
                        <div className="text-gray-500 line-through text-lg mt-1">
                          ₹{plan.originalPrice}{plan.period}
                        </div>
                      )}
                    </div>

                    <button className="glow-button w-full">
                      <div className="button_inner">
                        <p>Start Free Trial</p>
                      </div>
                      <div className="glow"></div>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center py-4 border-t border-b border-purple-500/10">
                      <div>
                        <div className="text-white font-semibold text-xs">{plan.maxUsers}</div>
                        <div className="text-gray-400 text-xs">Users</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xs">{plan.storage}</div>
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See exactly what's included in each plan to make the best choice for your business.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block glass-effect rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/10">
                    <th className="text-left p-6 text-white font-semibold">Features</th>
                    <th className="text-center p-6 text-white font-semibold">Starter</th>
                    <th className="text-center p-6 text-white font-semibold">
                      Professional
                    </th>
                    <th className="text-center p-6 text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Core Features */}
                  <tr>
                    <td colSpan={4} className="p-6 bg-purple-500/10">
                      <h3 className="text-lg font-semibold text-white">Core Features</h3>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Invoicing & Billing</td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Expense Tracking</td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Financial Reports</td>
                    <td className="p-4 text-center">
                      <span className="text-gray-300 text-sm">Basic</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-400 text-sm font-semibold">Advanced</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-purple-400 text-sm font-semibold">Custom</span>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Bank Reconciliation</td>
                    <td className="p-4 text-center">
                      <span className="text-gray-300 text-sm">Manual</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-400 text-sm font-semibold">Automated</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-purple-400 text-sm font-semibold">Advanced</span>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Multi-Currency Support</td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-gray-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Inventory Management</td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-gray-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>

                  {/* Collaboration */}
                  <tr>
                    <td colSpan={4} className="p-6 bg-purple-500/10">
                      <h3 className="text-lg font-semibold text-white">Collaboration</h3>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">User Accounts</td>
                    <td className="p-4 text-center">
                      <span className="text-gray-300 text-sm">5 users</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-400 text-sm font-semibold">25 users</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-purple-400 text-sm font-semibold">Unlimited</span>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Role Permissions</td>
                    <td className="p-4 text-center">
                      <span className="text-gray-300 text-sm">Basic</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-400 text-sm font-semibold">Advanced</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-purple-400 text-sm font-semibold">Custom</span>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Team Collaboration</td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-gray-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Project Tracking</td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-gray-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>

                  {/* Support & Security */}
                  <tr>
                    <td colSpan={4} className="p-6 bg-purple-500/10">
                      <h3 className="text-lg font-semibold text-white">Support & Security</h3>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Customer Support</td>
                    <td className="p-4 text-center">
                      <span className="text-gray-300 text-sm">Email</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-400 text-sm font-semibold">Email & Chat</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-purple-400 text-sm font-semibold">24/7 All Channels</span>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Data Backup</td>
                    <td className="p-4 text-center">
                      <span className="text-gray-300 text-sm">Daily</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-400 text-sm font-semibold">Real-time</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-purple-400 text-sm font-semibold">Real-time + Redundancy</span>
                    </td>
                  </tr>
                  <tr className="border-b border-purple-500/10 hover:bg-white/5">
                    <td className="p-4 text-gray-300">Security Features</td>
                    <td className="p-4 text-center">
                      <span className="text-gray-300 text-sm">Standard</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-green-400 text-sm font-semibold">Advanced</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-purple-400 text-sm font-semibold">Enterprise-grade</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Comparison */}
          <div className="lg:hidden space-y-6">
            <div className="text-center mb-6">
              <p className="text-gray-400">Compare features across all plans</p>
            </div>
            
            {/* Mobile Cards */}
            <div className="space-y-4">
              {[
                { category: 'Core Features', items: [
                  { name: 'Invoicing & Billing', starter: true, professional: true, enterprise: true },
                  { name: 'Expense Tracking', starter: true, professional: true, enterprise: true },
                  { name: 'Financial Reports', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
                  { name: 'Bank Reconciliation', starter: 'Manual', professional: 'Automated', enterprise: 'Advanced' },
                  { name: 'Multi-Currency', starter: false, professional: true, enterprise: true },
                  { name: 'Inventory Management', starter: false, professional: true, enterprise: true }
                ]},
                { category: 'Collaboration', items: [
                  { name: 'User Accounts', starter: '5', professional: '25', enterprise: 'Unlimited' },
                  { name: 'Role Permissions', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
                  { name: 'Team Collaboration', starter: false, professional: true, enterprise: true },
                  { name: 'Project Tracking', starter: false, professional: true, enterprise: true }
                ]},
                { category: 'Support & Security', items: [
                  { name: 'Customer Support', starter: 'Email', professional: 'Email & Chat', enterprise: '24/7 All Channels' },
                  { name: 'Data Backup', starter: 'Daily', professional: 'Real-time', enterprise: 'Real-time + Redundancy' },
                  { name: 'Security Features', starter: 'Standard', professional: 'Advanced', enterprise: 'Enterprise-grade' }
                ]}
              ].map((category) => (
                <div key={category.category} className="glass-effect rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
                  
                  {category.items.map((item, index) => (
                    <div key={index} className="mb-4 pb-4 border-b border-purple-500/10 last:border-b-0">
                      <h4 className="text-white font-medium mb-3">{item.name}</h4>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Starter</div>
                          <div className="flex justify-center">
                            {item.starter === true ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : item.starter === false ? (
                              <X className="w-4 h-4 text-gray-500" />
                            ) : (
                              <span className="text-gray-300 text-xs">{item.starter}</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Professional</div>
                          <div className="flex justify-center">
                            {item.professional === true ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : item.professional === false ? (
                              <X className="w-4 h-4 text-gray-500" />
                            ) : (
                              <span className="text-gray-300 text-xs">{item.professional}</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Enterprise</div>
                          <div className="flex justify-center">
                            {item.enterprise === true ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : item.enterprise === false ? (
                              <X className="w-4 h-4 text-gray-500" />
                            ) : (
                              <span className="text-gray-300 text-xs">{item.enterprise}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what our customers have to say about their experience with EL KAID.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
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
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="glass-effect rounded-2xl overflow-hidden">
                <button onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)} className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors">
                  <span className="text-white font-semibold">{faq.question}</span>
                  {expandedFAQ === faq.id ? <Minus className="w-5 h-5 text-purple-400 flex-shrink-0" /> : <Plus className="w-5 h-5 text-purple-400 flex-shrink-0" />}
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
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your data security is our top priority. We use industry-leading security measures to protect your business.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl glass-effect hover:bg-white/10 transition-all">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">SSL Encryption</h3>
              <p className="text-gray-400 text-sm">Bank-level 256-bit SSL encryption for all data transmission</p>
            </div>
            <div className="text-center p-6 rounded-2xl glass-effect hover:bg-white/10 transition-all">
              <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Data Backup</h3>
              <p className="text-gray-400 text-sm">Automated daily backups with 99.9% uptime guarantee</p>
            </div>
            <div className="text-center p-6 rounded-2xl glass-effect hover:bg-white/10 transition-all">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Compliance</h3>
              <p className="text-gray-400 text-sm">SOC 2, GDPR, and industry compliance standards</p>
            </div>
            <div className="text-center p-6 rounded-2xl glass-effect hover:bg-white/10 transition-all">
              <Headphones className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Round-the-clock customer support and monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-blue-500/40 via-sky-600/25 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have already made the switch to EL KAID. 
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Schedule Demo
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            30-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </section>

      {/* Download Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl border border-green-400/30 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Download Started!</h4>
                <p className="text-xs opacity-90">B-1 Software is downloading to your device</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuySoftware;