import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import GlassyButton from '../components/GlassyButton';
import GlassCard from '../components/GlassCard';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    password: '',
    confirmPassword: '',
    consultancy: '',
  });

  const steps = [
    { number: 1, title: 'Personal Info', icon: 'person' },
    { number: 2, title: 'Business Info', icon: 'business' },
    { number: 3, title: 'Security', icon: 'lock-closed' },
  ];

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    } else if (step === 2) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.businessType.trim()) newErrors.businessType = 'Business type is required';
    } else if (step === 3) {
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.consultancy) newErrors.consultancy = 'Please select an option';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleRegister();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async () => {
    if (!validateStep()) return;
    
    setIsLoading(true);
    
    try {
      // Create FormData for file upload (similar to web version)
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      const result = await register(submitData);
      
      if (result.success) {
        Alert.alert(
          'Success!', 
          'Account created successfully! You can now sign in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      } else {
        Alert.alert('Registration Failed', result.error || 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((stepItem, index) => (
        <View key={stepItem.number} style={styles.stepItem}>
          <View style={[
            styles.stepCircle,
            step === stepItem.number && styles.stepActive,
            step > stepItem.number && styles.stepCompleted,
          ]}>
            <Ionicons
              name={step > stepItem.number ? 'checkmark' : stepItem.icon}
              size={16}
              color="#ffffff"
            />
          </View>
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              step > stepItem.number && styles.stepLineCompleted,
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
          <Ionicons name="person" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your full name"
            placeholderTextColor="#64748b"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            autoCapitalize="words"
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
          <Ionicons name="mail" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="#64748b"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
          <Ionicons name="call" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone number"
            placeholderTextColor="#64748b"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Business Information</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Business Name</Text>
        <View style={[styles.inputWrapper, errors.businessName && styles.inputError]}>
          <Ionicons name="business" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your business name"
            placeholderTextColor="#64748b"
            value={formData.businessName}
            onChangeText={(value) => handleInputChange('businessName', value)}
            autoCapitalize="words"
          />
        </View>
        {errors.businessName && <Text style={styles.errorText}>{errors.businessName}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Business Type</Text>
        <View style={[styles.inputWrapper, errors.businessType && styles.inputError]}>
          <Ionicons name="briefcase" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Retail, Consulting, Manufacturing"
            placeholderTextColor="#64748b"
            value={formData.businessType}
            onChangeText={(value) => handleInputChange('businessType', value)}
            autoCapitalize="words"
          />
        </View>
        {errors.businessType && <Text style={styles.errorText}>{errors.businessType}</Text>}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Create Your Password</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
          <Ionicons name="lock-closed" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Create password"
            placeholderTextColor="#64748b"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
          <Ionicons name="lock-closed" size={20} color="#94a3b8" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm password"
            placeholderTextColor="#64748b"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Consultation Preference</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioOption, formData.consultancy === 'with' && styles.radioSelected]}
            onPress={() => handleInputChange('consultancy', 'with')}
          >
            <View style={styles.radioCircle}>
              {formData.consultancy === 'with' && <View style={styles.radioInner} />}
            </View>
            <View style={styles.radioContent}>
              <Text style={styles.radioTitle}>With Consultancy</Text>
              <Text style={styles.radioDescription}>Get personalized guidance from our experts</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.radioOption, formData.consultancy === 'without' && styles.radioSelected]}
            onPress={() => handleInputChange('consultancy', 'without')}
          >
            <View style={styles.radioCircle}>
              {formData.consultancy === 'without' && <View style={styles.radioInner} />}
            </View>
            <View style={styles.radioContent}>
              <Text style={styles.radioTitle}>Without Consultancy</Text>
              <Text style={styles.radioDescription}>Explore the platform on your own</Text>
            </View>
          </TouchableOpacity>
        </View>
        {errors.consultancy && <Text style={styles.errorText}>{errors.consultancy}</Text>}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#0f172a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Complete your registration to transform your business</Text>
            </View>

            {/* Step Indicator */}
            {renderStepIndicator()}

            {/* Form */}
            <GlassCard style={styles.formCard}>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  style={[styles.backButton, step === 1 && styles.backButtonDisabled]}
                  onPress={handleBack}
                  disabled={step === 1}
                >
                  <Ionicons name="chevron-back" size={20} color={step === 1 ? "#64748b" : "#e2e8f0"} />
                  <Text style={[styles.backButtonText, step === 1 && styles.backButtonTextDisabled]}>
                    Back
                  </Text>
                </TouchableOpacity>

                <GlassyButton
                  title={step === 3 ? "Create Account" : "Next"}
                  onPress={handleNext}
                  loading={isLoading}
                  variant="primary"
                  style={styles.nextButton}
                />
              </View>

              {/* Login Link */}
              <View style={styles.loginLinkContainer}>
                <Text style={styles.loginLinkText}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(71, 85, 105, 0.5)',
  },
  stepActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  stepCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  stepLine: {
    width: 24,
    height: 2,
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
    marginHorizontal: 8,
  },
  stepLineCompleted: {
    backgroundColor: '#10b981',
  },
  formCard: {
    marginBottom: 24,
  },
  stepContent: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1.5,
    borderColor: 'rgba(71, 85, 105, 0.7)',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 2,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    paddingVertical: 12,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  radioContainer: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1.5,
    borderColor: 'rgba(71, 85, 105, 0.7)',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 2,
  },
  radioSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8b5cf6',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8b5cf6',
  },
  radioContent: {
    flex: 1,
  },
  radioTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  radioDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButtonDisabled: {
    opacity: 0.5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#e2e8f0',
    marginLeft: 4,
  },
  backButtonTextDisabled: {
    color: '#64748b',
  },
  nextButton: {
    flex: 1,
    marginLeft: 16,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  loginLink: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
});

export default RegisterScreen;