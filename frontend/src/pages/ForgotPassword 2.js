import React, { useState } from 'react';
import {
  CreditCard,
  Shield,
  Key,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Zap,
  RefreshCw,
  UserCheck,
  Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
.liquid-glass-btn {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}
.liquid-glass-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -10px rgba(139, 92, 246, 0.3);
}
.liquid-glass-btn-primary {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(6, 182, 212, 0.6));
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: white;
}
.liquid-glass-btn-secondary {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05));
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: rgba(139, 92, 246, 1);
}
.step-indicator {
  position: relative;
}
.step-indicator:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -25%;
  width: 50%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent);
}
.step-indicator.active:not(:last-child)::after {
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), transparent);
}
.otp-input {
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const ForgotPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Form data for all steps
  const [formData, setFormData] = useState({
    email: '',
    documentType: 'pan', // 'pan' or 'citizenship'
    documentNumber: '',
    otp: ['', '', '', '', '', ''],
    newPassword: '',
    confirmPassword: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData(prev => ({
        ...prev,
        otp: newOtp
      }));

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Step 1: Verify Email and Document in Database
  const handleEmailAndDocumentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!formData.email || !formData.documentNumber) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // API call to verify if email and document exist in database
      const response = await fetch('http://localhost:8080/api/auth/verify-user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          documentType: formData.documentType,
          documentNumber: formData.documentNumber
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Details verified successfully! OTP sent to your email.');
        // Show OTP for development (remove in production)
        if (data.debugInfo?.otp) {
          console.log('🔥 Development OTP:', data.debugInfo.otp);
        }
        setTimeout(() => {
          setCurrentStep(2);
          setSuccess('');
        }, 1500);
      } else {
        setError(data.message || 'User not found. Please check your details and try again.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validate OTP
      const otpString = formData.otp.join('');
      if (otpString.length !== 6) {
        setError('Please enter complete OTP');
        setIsLoading(false);
        return;
      }

      // Validate password
      if (formData.newPassword.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // API call to reset password with OTP
      const response = await fetch('http://localhost:8080/api/auth/reset-password-with-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          documentNumber: formData.documentNumber,
          otp: otpString,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
           navigate('/login');
          console.log('Redirecting to login...');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Steps for progress
  const steps = [
    { number: 1, title: 'Enter Details', icon: Mail },
    { number: 2, title: 'Verify', icon: UserCheck },
    { number: 3, title: 'Reset Password', icon: Key }
  ];

  const features = [
    { icon: Shield, text: "Secure Verification" },
    { icon: Zap, text: "Instant OTP Delivery" },
    { icon: Sparkles, text: "Enhanced Security" }
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
        <div className="text-center mt-16 mb-8 lg:mb-12">
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
              Secure password recovery with multi-factor authentication
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

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12 lg:pt-24 relative z-10">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="glass-effect bg-slate-800/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 shadow-2xl">
            {/* Back Button */}
            <button
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Login</span>
            </button>

            {/* Step Indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = currentStep >= step.number;
                  const isCompleted = currentStep > step.number;
                  return (
                    <div key={step.number} className={`flex flex-col items-center step-indicator ${isActive ? 'active' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500'
                          : isActive
                          ? 'bg-purple-500 border-purple-500'
                          : 'border-gray-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        )}
                      </div>
                      <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 1: Email and Document */}
            {currentStep === 1 && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Enter Your Details</h2>
                  <p className="text-gray-400 text-sm sm:text-base">Enter your registered email address and document</p>
                </div>

                <form onSubmit={handleEmailAndDocumentSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Document Type Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Document Type *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="documentType"
                          value="pan"
                          checked={formData.documentType === 'pan'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 focus:ring-purple-500"
                        />
                        <span className="text-white">PAN Number</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="documentType"
                          value="citizenship"
                          checked={formData.documentType === 'citizenship'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 focus:ring-purple-500"
                        />
                        <span className="text-white">Citizenship Number</span>
                      </label>
                    </div>
                  </div>

                  {/* Document Number Input */}
                  <div className="space-y-2">
                    <label htmlFor="documentNumber" className="text-sm font-medium text-gray-300">
                      {formData.documentType === 'pan' ? 'PAN Number' : 'Citizenship Number'} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="documentNumber"
                        type="text"
                        name="documentNumber"
                        placeholder={`Enter your ${formData.documentType === 'pan' ? 'PAN' : 'citizenship'} number`}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        value={formData.documentNumber}
                        onChange={handleInputChange}
                        style={formData.documentType === 'pan' ? { textTransform: 'uppercase' } : {}}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-green-400 text-sm">{success}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="liquid-glass-btn liquid-glass-btn-primary w-full font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      'Verify & Generate OTP'
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Reset Password */}
            {currentStep === 2 && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Reset Password</h2>
                  <p className="text-gray-400 text-sm sm:text-base">Enter OTP and set new password</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-6">
                  {/* OTP Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Enter OTP *
                    </label>
                    <div className="flex justify-center space-x-3">
                      {formData.otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          className="otp-input bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm font-medium text-gray-300">
                      New Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="Enter new password"
                        className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                        minLength="6"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        minLength="6"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <p className="text-green-400 text-sm">{success}</p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="liquid-glass-btn liquid-glass-btn-secondary flex-1 font-semibold py-3 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="liquid-glass-btn liquid-glass-btn-primary flex-1 font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Resetting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Shield className="w-5 h-5" />
                          <span>Reset Password</span>
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;