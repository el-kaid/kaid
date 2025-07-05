import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import GlassCard from '../components/GlassCard';
import GlassyButton from '../components/GlassyButton';

const BuySoftwareScreen = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 29 : 290,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Perfect for small businesses and freelancers',
      features: [
        'Up to 5 users',
        '50GB storage',
        'Basic reporting',
        'Email support',
        'Mobile access',
      ],
      color: '#8b5cf6',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 79 : 790,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 25 users',
        '500GB storage',
        'Advanced reporting',
        'Priority support',
        'API access',
        'Custom integrations',
      ],
      color: '#06b6d4',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 199 : 1990,
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For large organizations',
      features: [
        'Unlimited users',
        'Unlimited storage',
        'Custom reporting',
        '24/7 phone support',
        'Dedicated manager',
        'White-label options',
      ],
      color: '#10b981',
    },
  ];

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#0f172a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>💎 Pricing Plans</Text>
            </View>
            <Text style={styles.title}>Choose Your Plan</Text>
            <Text style={styles.subtitle}>
              Start your free trial today and discover why thousands trust KAID
            </Text>
          </View>

          {/* Billing Toggle */}
          <View style={styles.billingToggle}>
            <GlassCard style={styles.toggleCard}>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    billingCycle === 'monthly' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setBillingCycle('monthly')}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      billingCycle === 'monthly' && styles.toggleTextActive,
                    ]}
                  >
                    Monthly
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    billingCycle === 'yearly' && styles.toggleButtonActive,
                  ]}
                  onPress={() => setBillingCycle('yearly')}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      billingCycle === 'yearly' && styles.toggleTextActive,
                    ]}
                  >
                    Yearly
                  </Text>
                  <View style={styles.saveBadge}>
                    <Text style={styles.saveText}>Save 17%</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>

          {/* Plans */}
          <View style={styles.plansSection}>
            {plans.map((plan) => (
              <GlassCard
                key={plan.id}
                style={[
                  styles.planCard,
                  plan.popular && styles.popularCard,
                ]}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <LinearGradient
                      colors={['#8b5cf6', '#06b6d4']}
                      style={styles.popularBadgeGradient}
                    >
                      <Ionicons name="star" size={12} color="#ffffff" />
                      <Text style={styles.popularText}>Most Popular</Text>
                    </LinearGradient>
                  </View>
                )}

                <View style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                </View>

                <View style={styles.planPricing}>
                  <Text style={styles.planPrice}>${plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>

                <View style={styles.planFeatures}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Ionicons 
                        name="checkmark-circle" 
                        size={16} 
                        color={plan.color} 
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <GlassyButton
                  title="Get Started"
                  variant={plan.popular ? "primary" : "secondary"}
                  style={styles.planButton}
                />
              </GlassCard>
            ))}
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            
            <GlassCard style={styles.faqCard}>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>Can I change plans anytime?</Text>
                <Text style={styles.faqAnswer}>
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </Text>
              </View>
              
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>Is there a free trial?</Text>
                <Text style={styles.faqAnswer}>
                  Yes, we offer a 14-day free trial for all plans. No credit card required.
                </Text>
              </View>
              
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>What payment methods do you accept?</Text>
                <Text style={styles.faqAnswer}>
                  We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                </Text>
              </View>
            </GlassCard>
          </View>
        </ScrollView>
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
  billingToggle: {
    marginBottom: 24,
  },
  toggleCard: {
    padding: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
  },
  toggleTextActive: {
    color: '#ffffff',
  },
  saveBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  saveText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  plansSection: {
    marginBottom: 32,
  },
  planCard: {
    marginBottom: 20,
    padding: 24,
    position: 'relative',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  popularCard: {
    borderColor: '#8b5cf6',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  popularBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 4,
  },
  planHeader: {
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  planPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  planPeriod: {
    fontSize: 16,
    color: '#94a3b8',
    marginLeft: 4,
  },
  planFeatures: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#e2e8f0',
    marginLeft: 12,
    flex: 1,
  },
  planButton: {
    marginTop: 8,
  },
  faqSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  faqCard: {
    padding: 20,
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 85, 105, 0.3)',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
});

export default BuySoftwareScreen;