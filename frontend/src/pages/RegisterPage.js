import React, { useState, useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  User, Lock, Phone, Mail, MapPin, Briefcase, UploadCloud, Building2, 
  Eye, EyeOff, ChevronRight, ChevronLeft,
  UserPlus, ArrowRight, CheckCircle, Star, X
} from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

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
  .step-indicator {
    transition: all 0.3s ease;
  }
  .step-active {
    background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  }
  .step-completed {
    background: linear-gradient(45deg, #10b981, #059669);
  }
  .input-group {
    position: relative;
    margin-bottom: 1.5rem;
  }
  .input-group input {
    width: 100%;
    padding: 12px 16px 12px 40px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.5);
    border-radius: 8px;
    color: white;
    transition: all 0.3s ease;
    font-size: 16px; /* Prevents zoom on iOS */
  }
  @media (max-width: 640px) {
    .input-group input {
      padding: 14px 16px 14px 40px;
    }
  }
  .input-group input:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
  .input-group .icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    z-index: 1;
  }
  .file-upload {
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 100%;
  }
  .file-upload input[type=file] {
    position: absolute;
    left: -9999px;
  }
  .file-upload-label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    background: rgba(30, 41, 59, 0.5);
    border: 2px dashed rgba(139, 92, 246, 0.5);
    border-radius: 8px;
    color: #8b5cf6;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .file-upload-label:hover {
    border-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
  }
  .success-popup {
    animation: slideInUp 0.5s ease-out;
  }
  @keyframes slideInUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .success-popup.fade-out {
    animation: slideOutDown 0.3s ease-in forwards;
  }
  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100px);
      opacity: 0;
    }
  }
`;

const InputField = memo(({ icon: Icon, name, type = "text", placeholder, required = false, value, onChange }) => (
  <div className="input-group">
    <Icon className="icon w-5 h-5" />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      autoComplete={name === 'email' ? 'email' : name === 'password' ? 'new-password' : 'off'}
    />
  </div>
));

const FileUpload = memo(({ name, label, onChange, accept = "image/*" }) => (
  <div className="file-upload">
    <input
      type="file"
      id={name}
      name={name}
      accept={accept}
      onChange={onChange}
      required
    />
    <label htmlFor={name} className="file-upload-label">
      <UploadCloud className="w-5 h-5 mr-2" />
      {label}
    </label>
  </div>
));

// Success Popup Component
const SuccessPopup = memo(({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="success-popup glass-effect bg-green-500/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 shadow-2xl pointer-events-auto max-w-md w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Account Created Successfully!</h3>
              <p className="text-green-300 text-sm">Redirecting to login page...</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-green-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 bg-green-500/10 rounded-lg p-3">
          <p className="text-green-200 text-sm">You can now sign in with your credentials to access your dashboard.</p>
        </div>
      </div>
    </div>
  );
});

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', panOrCitizenship: '', phone: '', email: '', homeAddress: '', state: '',
    pincode: '', businessType: '', goodsOrService: '', exactBusiness: '', customBusiness: '',
    businessName: '', businessPlace: '', businessPincode: '', password: '', confirmPassword: '',
    consultancy: '', personPhoto: null, placePhoto: null
  });

  // Inject styles only once on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleSheet = document.createElement('style');
      styleSheet.textContent = customStyles;
      document.head.appendChild(styleSheet);
      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const nextStep = useCallback(() => {
    if (step < 3) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const handleSuccessPopupClose = useCallback(() => {
    setShowSuccessPopup(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Show success popup
        setShowSuccessPopup(true);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Security", icon: Lock },
    { number: 3, title: "Consultation", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl floating-animation-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-gradient-radial from-pink-500/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center justify-center py-8 relative z-10">
        <div className="text-center mb-8"></div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-8 pb-8 relative z-10">
        <div className="w-full max-w-4xl">
          <div className="glass-effect bg-slate-800/30 backdrop-blur-xl rounded-2xl p-4 sm:p-8 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                <UserPlus className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-purple-400 text-sm font-medium">Create Account</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Get Started Today</h2>
              <p className="text-gray-400 text-sm sm:text-base">Complete your registration to transform your business</p>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-4">
                {steps.map((stepItem, index) => {
                  const StepIcon = stepItem.icon;
                  const isActive = step === stepItem.number;
                  const isCompleted = step > stepItem.number;
                  
                  return (
                    <div key={stepItem.number} className="flex items-center">
                      <div className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${isActive ? 'step-active border-transparent text-white' : 
                          isCompleted ? 'step-completed border-transparent text-white' : 
                          'border-slate-600 text-slate-400'}
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-4 sm:w-8 h-0.5 mx-1 sm:mx-2 transition-all duration-300 ${
                          isCompleted ? 'bg-green-500' : 'bg-slate-600'
                        }`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Personal & Business Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputField
                      key="name"
                      icon={User}
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <InputField
                      key="panOrCitizenship"
                      icon={Building2}
                      name="panOrCitizenship"
                      placeholder="PAN/Citizenship Number"
                      required
                      value={formData.panOrCitizenship}
                      onChange={handleChange}
                    />
                    <InputField
                      key="phone"
                      icon={Phone}
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <InputField
                      key="email"
                      icon={Mail}
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <InputField
                      key="homeAddress"
                      icon={MapPin}
                      name="homeAddress"
                      placeholder="Home Address"
                      value={formData.homeAddress}
                      onChange={handleChange}
                    />
                    <InputField
                      key="state"
                      icon={MapPin}
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <InputField
                      key="pincode"
                      icon={MapPin}
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                    <InputField
                      key="businessType"
                      icon={Briefcase}
                      name="businessType"
                      placeholder="Type of Business"
                      value={formData.businessType}
                      onChange={handleChange}
                    />
                    <InputField
                      key="goodsOrService"
                      icon={Briefcase}
                      name="goodsOrService"
                      placeholder="Goods or Services"
                      value={formData.goodsOrService}
                      onChange={handleChange}
                    />
                    <InputField
                      key="exactBusiness"
                      icon={Briefcase}
                      name="exactBusiness"
                      placeholder="Choose Exact Business"
                      value={formData.exactBusiness}
                      onChange={handleChange}
                    />
                    <InputField
                      key="customBusiness"
                      icon={Briefcase}
                      name="customBusiness"
                      placeholder="Type Business Manually"
                      value={formData.customBusiness}
                      onChange={handleChange}
                    />
                    <InputField
                      key="businessName"
                      icon={Building2}
                      name="businessName"
                      placeholder="Name of Business"
                      value={formData.businessName}
                      onChange={handleChange}
                    />
                    <InputField
                      key="businessPlace"
                      icon={MapPin}
                      name="businessPlace"
                      placeholder="Place of Business"
                      value={formData.businessPlace}
                      onChange={handleChange}
                    />
                    <InputField
                      key="businessPincode"
                      icon={MapPin}
                      name="businessPincode"
                      placeholder="Business Pincode"
                      value={formData.businessPincode}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Person Photo</label>
                      <FileUpload
                        name="personPhoto"
                        label="Upload Photo"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Business Place Photo</label>
                      <FileUpload
                        name="placePhoto"
                        label="Upload Photo"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Security */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Create Your Password</h3>
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="input-group">
                      <Lock className="icon w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create Password"
                        required
                        minLength="6"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    <div className="input-group">
                      <Lock className="icon w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        minLength="6"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <p className="text-purple-400 text-sm">
                        Password should be at least 6 characters long and contain a mix of letters and numbers for better security.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Consultation */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Choose Your Experience</h3>
                  <div className="max-w-lg mx-auto space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-purple-500/50 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="consultancy"
                        value="with"
                        onChange={handleChange}
                        required
                        className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <label className="text-white font-medium cursor-pointer">With Consultancy</label>
                        <p className="text-gray-400 text-sm mt-1">Get personalized guidance from our experts</p>
                      </div>
                      <Star className="w-6 h-6 text-purple-400" />
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-purple-500/50 transition-all cursor-pointer">
                      <input
                        type="radio"
                        name="consultancy"
                        value="without"
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <label className="text-white font-medium cursor-pointer">Without Consultancy</label>
                        <p className="text-gray-400 text-sm mt-1">Explore the platform on your own</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4 sm:gap-0">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`liquid-glass-btn flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-lg font-medium w-full sm:w-auto ${
                    step === 1 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'liquid-glass-btn-secondary'
                  }`}
                  disabled={step === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="liquid-glass-btn liquid-glass-btn-primary flex items-center justify-center space-x-2 px-6 py-3 font-semibold rounded-lg w-full sm:w-auto"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="liquid-glass-btn liquid-glass-btn-primary flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-slate-700/50">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="liquid-glass-btn liquid-glass-btn-white text-purple-400 hover:text-purple-300 transition-colors font-medium px-3 py-1 rounded"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Bottom Decoration */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup 
        isVisible={showSuccessPopup} 
        onClose={handleSuccessPopupClose}
      />

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

export default RegistrationPage;