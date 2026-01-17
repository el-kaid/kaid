import React, { useState, useEffect } from 'react';
import { 
  CheckCircle,
  Building2,
  Briefcase,
  HardDrive,
  Cloud,
  ArrowRight,
  ArrowLeft,
  Users,
  FileText,
  BookOpen,
  Receipt,
  TrendingUp
} from 'lucide-react';
import ScrollDown from "../components/ScrollDown";

const customStyles = `
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* Scroll Animation Styles */
  .scroll-animate {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const BuySoftware = () => {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); // 'B1' or 'B2'
  const [selectedStorage, setSelectedStorage] = useState(null); // 'drive' or 'cloud'
  const [billingCycle, setBillingCycle] = useState('lifetime'); // 'lifetime' or 'monthly'
  const [isVisible, setIsVisible] = useState({});

  // Scroll animation effect matching Home.js
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

  // Pricing data based on the text file
  const pricingData = {
    lifetime: {
      starter: {
        price: 15000,
        lifetime: '5 years',
        amc: 2999,
        cloudStorage: '?',
        features: [
          'Billing',
          'All updates',
          'Users: 1 main user, 5 sub users'
        ]
      },
      plus: {
        price: 30000,
        lifetime: '7 years',
        amc: 3999,
        cloudStorage: '?',
        features: [
          'Billing',
          'Book keeping',
          'All updates',
          'Users: 1 main user, 10 sub users'
        ]
      },
      pro: {
        price: 50000,
        lifetime: '10 years',
        amc: 4999,
        cloudStorage: '?',
        features: [
          'Billing',
          'Book keeping',
          'Taxation',
          'B1M',
          'All updates',
          'Users: 1 main user, 25 sub users'
        ]
      }
    },
    monthly: {
      starter: {
        price: 599,
        cloudStorage: 799,
        features: [
          'Billing',
          'All updates',
          'Users: 1 main user, 5 sub users'
        ]
      },
      plus: {
        price: 799,
        cloudStorage: 999,
        features: [
          'Billing',
          'Book keeping',
          'All updates',
          'Users: 1 main user, 10 sub users'
        ]
      },
      pro: {
        price: 1299,
        cloudStorage: 1499,
        features: [
          'Billing',
          'Book keeping',
          'Taxation',
          'B1M',
          'All updates',
          'Users: 1 main user, 25 sub users'
        ]
      }
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSelectedStorage('drive'); // Set default to drive
    setStep(2); // Go directly to plans page
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
    // Plans will update automatically based on storage selection
  };

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
    // Plans will update automatically based on billing cycle
  };

  const resetSelection = () => {
    setStep(1);
    setSelectedProduct(null);
    setSelectedStorage(null);
    setBillingCycle('lifetime');
  };

  const renderStep1 = () => (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Choose Your Product
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Select the product that best fits your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        <div
          onClick={() => handleProductSelect('B1')}
          className="glass-effect rounded-3xl p-8 sm:p-10 cursor-pointer hover:bg-white/10 transition-all duration-300 border-2 border-transparent hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 group"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white mb-3 text-center">B1</h3>
          <p className="text-xl font-semibold text-purple-300 mb-6 text-center">Built for Business</p>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300 text-sm sm:text-base">Comprehensive business management solution</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300 text-sm sm:text-base">Billing, bookkeeping & taxation tools</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300 text-sm sm:text-base">Perfect for growing businesses</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-purple-400 group-hover:text-purple-300 transition-colors">
            <span className="font-medium">View Plans</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => handleProductSelect('B2')}
          className="glass-effect rounded-3xl p-8 sm:p-10 cursor-pointer hover:bg-white/10 transition-all duration-300 border-2 border-transparent hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 group"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white mb-3 text-center">B2</h3>
          <p className="text-xl font-semibold text-blue-300 mb-6 text-center">Built for Smart Workspace</p>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300 text-sm sm:text-base">Advanced workspace management platform</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300 text-sm sm:text-base">Enhanced collaboration & productivity</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300 text-sm sm:text-base">Ideal for modern teams</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-blue-400 group-hover:text-blue-300 transition-colors">
            <span className="font-medium">View Plans</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const plans = pricingData[billingCycle];
    const planKeys = ['starter', 'plus', 'pro'];
    const planNames = {
      starter: 'Starter',
      plus: 'Plus',
      pro: 'Pro'
    };
    const planIcons = {
      starter: <Users className="w-6 h-6" />,
      plus: <FileText className="w-6 h-6" />,
      pro: <TrendingUp className="w-6 h-6" />
    };

    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <button
            onClick={() => setStep(1)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            {selectedProduct} • {selectedStorage === 'drive' ? 'Drive Storage' : 'Cloud Storage'} • {billingCycle === 'lifetime' ? 'Lifetime' : 'Monthly'}
          </p>
          
          {/* Storage Toggle */}
          <div className="flex items-center justify-center mb-6">
            <div className="glass-effect rounded-full p-2">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleStorageSelect('drive')}
                  className={`px-8 py-4 rounded-full font-medium transition-all flex items-center space-x-2 ${
                    selectedStorage === 'drive'
                      ? 'bg-white text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <HardDrive className="w-5 h-5" />
                  <span>Drive</span>
                </button>
                <button
                  onClick={() => handleStorageSelect('cloud')}
                  className={`px-8 py-4 rounded-full font-medium transition-all flex items-center space-x-2 ${
                    selectedStorage === 'cloud'
                      ? 'bg-white text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Cloud className="w-5 h-5" />
                  <span>Cloud</span>
                </button>
              </div>
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="glass-effect rounded-full p-2">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleBillingCycleChange('lifetime')}
                  className={`px-8 py-4 rounded-full font-medium transition-all ${
                    billingCycle === 'lifetime'
                      ? 'bg-white text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Lifetime
                </button>
                <button
                  onClick={() => handleBillingCycleChange('monthly')}
                  className={`px-8 py-4 rounded-full font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-black'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {planKeys.map((planKey, index) => {
            const plan = plans[planKey];
            const isPopular = planKey === 'plus';
            
            return (
              <div key={planKey} className={`relative ${isPopular ? 'md:-mt-8' : ''}`}>
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`glass-effect rounded-3xl p-8 h-full transition-all duration-300 hover:bg-white/10 ${
                  isPopular ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 md:scale-105' : 'hover:border-purple-500/30'
                }`}>
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        {planIcons[planKey]}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{planNames[planKey]}</h3>
                    
                    <div className="mb-6">
                      {billingCycle === 'lifetime' ? (
                        <div>
                          <div className="flex items-baseline justify-center space-x-2">
                            <span className="text-5xl font-bold text-white">₹{plan.price.toLocaleString()}</span>
                          </div>
                          <div className="text-gray-400 mt-2">
                            <div>Lifetime: {plan.lifetime}</div>
                            <div>AMC: ₹{plan.amc.toLocaleString()}</div>
                            {selectedStorage === 'cloud' && (
                              <div className="text-purple-400 mt-1">
                                + Cloud Storage: ₹{plan.cloudStorage}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-baseline justify-center space-x-2">
                            <span className="text-5xl font-bold text-white">₹{plan.price}</span>
                            <span className="text-gray-400">/month</span>
                          </div>
                          {selectedStorage === 'cloud' && (
                            <div className="text-purple-400 mt-2">
                              + Cloud Storage: ₹{plan.cloudStorage}/month
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <button className="w-full border-2 border-purple-400/50 text-purple-300 px-6 py-3 rounded-full font-semibold hover:bg-purple-400/10 transition-all duration-300">
                      Select Plan
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="border-t border-purple-500/10 pt-4">
                      <h4 className="text-white font-semibold mb-4">Features:</h4>
                      <div className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={resetSelection}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  };

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
          {/* Glow effect behind title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold uppercase tracking-wide opacity-25 blur-md"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                background: "linear-gradient(to bottom, #60a5fa, #3b82f6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Buy Software
            </div>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-wide mb-6 sm:mb-8 relative text-white px-4" 
            style={{ 
              fontFamily: 'Montserrat, sans-serif', 
              fontWeight: 100, 
              letterSpacing: '0.05em', 
              textShadow: '0 0 15px rgba(96, 165, 250, 0.3)' 
            }}
          >
            Buy Software
          </h1>
          
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 px-4">
            Choose the perfect plan for your business needs
          </p>
        </div>

        {/* === Scroll Down - Bottom === */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <ScrollDown />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-black">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </section>
    </div>
  );
};

export default BuySoftware;
