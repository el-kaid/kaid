import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Sparkles, Shield, Zap } from 'lucide-react';

const customStyles = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  .glass-effect {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .floating-animation {
    animation: float 6s ease-in-out infinite;
  }
  .floating-animation-delayed {
    animation: float 6s ease-in-out infinite;
    animation-delay: -3s;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .gradient-border {
    background: linear-gradient(45deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6);
    background-size: 400% 400%;
    animation: gradientShift 4s ease infinite;
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: formData.email,
      password: formData.password
    });

    if (res.data.success) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userEmail', formData.email); // Store email
      navigate('/dashboard'); // Redirect to dashboard
    }
  } catch (err) {
    // ... error handling
  } finally {
    setIsLoading(false);
  }
};

  const features = [
    { icon: Shield, text: "Secure Authentication" },
    { icon: Zap, text: "Lightning Fast Access" },
    { icon: Sparkles, text: "AI-Powered Features" }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[600px] h-[200px] sm:h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[500px] h-[150px] sm:h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl floating-animation-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[100px] sm:h-[200px] bg-gradient-radial from-pink-500/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Left Section - Brand */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 min-h-[40vh] lg:min-h-screen">
        <div className="text-center mb-8 lg:mb-12">
          {/* Logo */}
          <div className="mb-6 lg:mb-8">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl shadow-purple-500/25">
              <span className="text-2xl sm:text-4xl font-bold text-white">K</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                KAID-B1
              </span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-md px-4">
              Next-generation billing and accounting software powered by AI
            </p>
          </div>

          {/* Features */}
          <div className="hidden lg:block space-y-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-4 text-left">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                    <IconComponent className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-gray-300 text-lg">{feature.text}</span>
                </div>
              );
            })}
          </div>
          
          {/* Mobile Features */}
          <div className="lg:hidden flex justify-center space-x-8 mt-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                    <IconComponent className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300 text-xs text-center">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden lg:block absolute bottom-10 left-10 w-32 h-32 border border-purple-500/20 rounded-full"></div>
        <div className="hidden lg:block absolute top-20 right-20 w-16 h-16 border border-cyan-500/20 rounded-lg rotate-45"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 lg:pt-24 relative z-10">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="glass-effect bg-slate-800/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                <User className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-purple-400 text-sm font-medium">Welcome Back</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-400 text-sm sm:text-base">Access your KAID-B1 dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-base"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="liquid-glass-btn liquid-glass-btn-primary w-full font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Links */}
              <div className="flex flex-col sm:flex-row justify-between text-sm gap-4 sm:gap-0">
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="liquid-glass-btn liquid-glass-btn-primary text-purple-400 font-medium px-4 py-2 rounded-lg text-center"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-center sm:text-right"
                >
                  Forgot Password?
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <p className="text-center text-gray-400 text-sm">
                Secure authentication powered by{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                  KAID-B1
                </span>
              </p>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
    </div>
  );
};

export default LoginPage;