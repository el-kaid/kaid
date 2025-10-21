import React, { useState, useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  User, Lock, Phone, Mail, Calendar, Globe, Star,
  Eye, EyeOff, ChevronRight, ChevronLeft,
  UserPlus, ArrowRight, CheckCircle, X
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
  .input-group input, .input-group select {
    width: 100%;
    padding: 12px 16px 12px 40px;
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(71, 85, 105, 0.5);
    border-radius: 8px;
    color: white;
    transition: all 0.3s ease;
    font-size: 16px;
  }
  .input-group select {
    cursor: pointer;
  }
  .input-group select option {
    background: #1e293b;
    color: white;
  }
  @media (max-width: 640px) {
    .input-group input, .input-group select {
      padding: 14px 16px 14px 40px;
    }
  }
  .input-group input:focus, .input-group select:focus {
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
`;

const InputField = memo(({ icon: Icon, name, type = "text", placeholder, required = false, value, onChange, children }) => (
  <div className="input-group">
    <Icon className="icon w-5 h-5" />
    {type === 'select' ? (
      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={name === 'email' ? 'email' : name === 'password' ? 'new-password' : 'off'}
      />
    )}
  </div>
));

// Success Popup Component
const SuccessPopup = memo(({ isVisible, onClose, message, subMessage }) => {
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
              <h3 className="text-white font-semibold text-lg">{message}</h3>
              <p className="text-green-300 text-sm">{subMessage}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-green-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Registration, 2: Experience Choice
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successSubMessage, setSuccessSubMessage] = useState('');
  const [userId, setUserId] = useState(null); // Store user ID after registration
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    country: '',
    password: '',
    confirmPassword: '',
    consultancy: ''
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSuccessPopupClose = useCallback(() => {
    setShowSuccessPopup(false);
  }, []);

  // Step 1: Basic Registration
  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        country: formData.country,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, registrationData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setUserId(response.data.user.id);
        setSuccessMessage('Account Created Successfully!');
        setSuccessSubMessage('Now choose your experience level...');
        setShowSuccessPopup(true);
        
        // Move to step 2 after showing success
        setTimeout(() => {
          setShowSuccessPopup(false);
          setStep(2);
        }, 2000);
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

  // Step 2: Update consultancy preference
  const handleConsultancyChoice = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.put(`${API_ENDPOINTS.AUTH.UPDATE_CONSULTANCY}/${userId}`, {
        consultancy: formData.consultancy
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSuccessMessage('Setup Complete!');
        setSuccessSubMessage('Redirecting to dashboard...');
        setShowSuccessPopup(true);
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to update preference.');
      }
    } catch (err) {
      console.error('Consultancy update error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update preference. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl floating-animation-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-gradient-radial from-pink-500/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="glass-effect bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl">
            
            {/* Step 1: Registration Form */}
            {step === 1 && (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                    <UserPlus className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-purple-400 text-sm font-medium">Create Account</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Get Started Today</h2>
                  <p className="text-gray-400">Create your account in seconds</p>
                </div>

                <form onSubmit={handleRegistration} className="space-y-4">
                  <InputField
                    icon={User}
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={Phone}
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={Calendar}
                    name="dateOfBirth"
                    type="date"
                    placeholder="Date of Birth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={Globe}
                    name="country"
                    type="select"
                    required
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="UAE">UAE</option>
                  </InputField>

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

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="liquid-glass-btn liquid-glass-btn-primary w-full flex items-center justify-center space-x-2 py-3 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

                  <div className="text-center pt-4 border-t border-slate-700/50">
                    <p className="text-gray-400 text-sm">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              </>
            )}

            {/* Step 2: Experience Choice */}
            {step === 2 && (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                    <Star className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-purple-400 text-sm font-medium">Choose Experience</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">How would you like to proceed?</h2>
                  <p className="text-gray-400">Select your preferred experience level</p>
                </div>

                <form onSubmit={handleConsultancyChoice} className="space-y-4">
                  <div className="space-y-4">
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

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="liquid-glass-btn liquid-glass-btn-secondary flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium flex-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="liquid-glass-btn liquid-glass-btn-primary flex items-center justify-center space-x-2 px-6 py-3 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
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
        message={successMessage}
        subMessage={successSubMessage}
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
