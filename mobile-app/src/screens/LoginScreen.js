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
import LoadingSpinner from '../components/LoadingSpinner';

const LoginScreen = ({ navigation }) => {
  const { login, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Login Failed', result.error || 'Please check your credentials and try again.');
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

  if (loading) {
    return <LoadingSpinner text="Loading..." />;
  }

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
              <LinearGradient
                colors={['#06b6d4', '#8b5cf6', '#ec4899']}
                style={styles.logo}
              >
                <Text style={styles.logoText}>K</Text>
              </LinearGradient>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to access your KAID-B1 dashboard</Text>
            </View>

            {/* Form */}
            <GlassCard style={styles.formCard}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                  <Ionicons 
                    name="mail" 
                    size={20} 
                    color="#94a3b8" 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#64748b"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                  <Ionicons 
                    name="lock-closed" 
                    size={20} 
                    color="#94a3b8" 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#64748b"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
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

              {/* Login Button */}
              <GlassyButton
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                variant="primary"
                style={styles.loginButton}
              />

              {/* Links */}
              <View style={styles.linksContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                  style={styles.linkButton}
                >
                  <Text style={styles.linkText}>Create Account</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.linkButton}>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Secure authentication powered by KAID-B1</Text>
                <View style={styles.dividerLine} />
              </View>
            </GlassCard>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <View style={styles.feature}>
                <Ionicons name="shield-checkmark" size={16} color="#10b981" />
                <Text style={styles.featureText}>Secure Authentication</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="flash" size={16} color="#f59e0b" />
                <Text style={styles.featureText}>Lightning Fast Access</Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="sparkles" size={16} color="#8b5cf6" />
                <Text style={styles.featureText}>AI-Powered Features</Text>
              </View>
            </View>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
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
  formCard: {
    marginBottom: 24,
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
  loginButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
  },
  dividerText: {
    fontSize: 12,
    color: '#64748b',
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingVertical: 20,
    alignItems: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default LoginScreen;