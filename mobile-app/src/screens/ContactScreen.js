import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import GlassCard from '../components/GlassCard';
import GlassyButton from '../components/GlassyButton';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: 'mail',
      title: 'Email',
      value: 'hello@kaid.com',
      color: '#8b5cf6',
    },
    {
      icon: 'call',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      color: '#06b6d4',
    },
    {
      icon: 'location',
      title: 'Address',
      value: '123 Business St, Tech City',
      color: '#10b981',
    },
  ];

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
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>📞 Contact Support</Text>
              </View>
              <Text style={styles.title}>Contact Us</Text>
              <Text style={styles.subtitle}>
                Get in touch with our team for any questions or support
              </Text>
            </View>

            {/* Contact Methods */}
            <View style={styles.contactMethodsSection}>
              {contactMethods.map((method, index) => (
                <GlassCard key={index} style={styles.contactMethodCard}>
                  <View style={[styles.contactMethodIcon, { backgroundColor: `${method.color}20` }]}>
                    <Ionicons 
                      name={method.icon} 
                      size={24} 
                      color={method.color} 
                    />
                  </View>
                  <View style={styles.contactMethodInfo}>
                    <Text style={styles.contactMethodTitle}>{method.title}</Text>
                    <Text style={styles.contactMethodValue}>{method.value}</Text>
                  </View>
                </GlassCard>
              ))}
            </View>

            {/* Contact Form */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Send us a message</Text>
              
              <GlassCard style={styles.formCard}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Full Name *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your full name"
                    placeholderTextColor="#64748b"
                    value={formData.name}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email Address *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#64748b"
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Subject</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter subject"
                    placeholderTextColor="#64748b"
                    value={formData.subject}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, subject: text }))}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Message *</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder="Enter your message"
                    placeholderTextColor="#64748b"
                    value={formData.message}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, message: text }))}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                </View>

                <GlassyButton
                  title="Send Message"
                  onPress={handleSubmit}
                  loading={isLoading}
                  variant="primary"
                  style={styles.submitButton}
                />
              </GlassCard>
            </View>

            {/* Office Hours */}
            <View style={styles.hoursSection}>
              <GlassCard style={styles.hoursCard}>
                <Text style={styles.hoursTitle}>Office Hours</Text>
                <View style={styles.hoursItem}>
                  <Text style={styles.hoursDay}>Monday - Friday</Text>
                  <Text style={styles.hoursTime}>9:00 AM - 6:00 PM</Text>
                </View>
                <View style={styles.hoursItem}>
                  <Text style={styles.hoursDay}>Saturday</Text>
                  <Text style={styles.hoursTime}>10:00 AM - 4:00 PM</Text>
                </View>
                <View style={styles.hoursItem}>
                  <Text style={styles.hoursDay}>Sunday</Text>
                  <Text style={styles.hoursTime}>Closed</Text>
                </View>
              </GlassCard>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  sectionBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 20,
    marginBottom: 16,
  },
  sectionBadgeText: {
    color: '#8b5cf6',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    paddingHorizontal: 20,
  },
  contactMethodsSection: {
    marginBottom: 32,
  },
  contactMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 12,
  },
  contactMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactMethodInfo: {
    flex: 1,
  },
  contactMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  contactMethodValue: {
    fontSize: 14,
    color: '#94a3b8',
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  formCard: {
    padding: 20,
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
  textInput: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1.5,
    borderColor: 'rgba(71, 85, 105, 0.7)',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  submitButton: {
    marginTop: 8,
  },
  hoursSection: {
    marginBottom: 40,
  },
  hoursCard: {
    padding: 20,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 85, 105, 0.3)',
  },
  hoursDay: {
    fontSize: 14,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default ContactScreen;