import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GlassyButton from '../components/GlassyButton';
import GlassCard from '../components/GlassCard';

const HomeScreen = ({ navigation }) => {
  const features = [
    {
      icon: 'flash',
      title: 'AI-Powered Billing',
      description: 'Automated invoice generation with smart categorization and real-time processing',
      color: '#06b6d4',
      bgColor: 'rgba(6, 182, 212, 0.15)',
      borderColor: 'rgba(6, 182, 212, 0.2)'
    },
    {
      icon: 'analytics',
      title: 'Real-time Analytics', 
      description: 'Get comprehensive insights into your business performance with live dashboards',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.15)',
      borderColor: 'rgba(139, 92, 246, 0.2)'
    },
    {
      icon: 'cloud',
      title: 'Cloud Sync',
      description: 'Access your data anywhere, anytime with secure cloud storage and backup',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.2)'
    },
    {
      icon: 'people',
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team with real-time collaboration tools',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.2)'
    }
  ];

  const menuItems = [
    { title: 'Innovation', icon: 'briefcase', screen: 'OurWork', color: '#06b6d4' },
    { title: 'Pricing Plans', icon: 'card', screen: 'BuySoftware', color: '#8b5cf6' },
    { title: 'Work With Us', icon: 'people', screen: 'Career', color: '#10b981' },
    { title: 'Support Hub', icon: 'newspaper', screen: 'Updates', color: '#f59e0b' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#06b6d4', '#8b5cf6', '#ec4899']}
                style={styles.logo}
              >
                <Text style={styles.logoText}>K</Text>
              </LinearGradient>
              <Text style={styles.logoTitle}>EL KAID</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>
              Transform Your{'\n'}
              <Text style={styles.heroTitleAccent}>Business Operations</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Next-generation billing and accounting software powered by AI to streamline your business processes
            </Text>
          </View>

          {/* Main Action Buttons */}
          <View style={styles.actionButtons}>
            <GlassyButton
              title="Get Started Free"
              onPress={() => navigation.navigate('Register')}
              variant="white"
              style={styles.primaryButton}
            />
            <GlassyButton
              title="Watch Demo"
              onPress={() => navigation.navigate('OurWork')}
              variant="primary"
              style={styles.secondaryButton}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Active Users</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>99.9%</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Features</Text>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>⚡ Powerful Features</Text>
            </View>
            <Text style={styles.sectionTitle}>Why Choose EL KAID?</Text>
            <Text style={styles.sectionSubtitle}>
              Built for businesses that need powerful technology solutions without the complexity.
            </Text>
          </View>
          
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureIcon}>{
                    feature.icon === 'flash' ? '⚡' :
                    feature.icon === 'analytics' ? '📊' :
                    feature.icon === 'cloud' ? '☁️' :
                    feature.icon === 'people' ? '👥' : '🚀'
                  }</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Navigation Menu */}
        <View style={styles.menuSection}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionBadge, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#06b6d4' }]}>🚀 Explore More</Text>
            </View>
            <Text style={styles.sectionTitle}>Get Started Today</Text>
            <Text style={styles.sectionSubtitle}>
              Discover all the powerful tools and features EL KAID has to offer
            </Text>
          </View>
          
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons 
                    name={item.icon} 
                    size={24} 
                    color={item.color} 
                  />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>
                    {item.title === 'Innovation' ? 'See our latest projects' :
                     item.title === 'Pricing Plans' ? 'Choose your plan' :
                     item.title === 'Work With Us' ? 'Join our team' :
                     item.title === 'Support Hub' ? 'Get help & contact us' :
                     'Get help anytime'}
                  </Text>
                </View>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color="#94a3b8" 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <GlassCard style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Transform Your Business?</Text>
            <Text style={styles.ctaSubtitle}>
              Join thousands of companies already using EL KAID to streamline their operations
            </Text>
            <View style={styles.ctaButtons}>
              <GlassyButton
                title="Start Free Trial"
                onPress={() => navigation.navigate('Register')}
                variant="white"
                style={styles.ctaButton}
              />
              <GlassyButton
                title="Contact Sales"
                onPress={() => navigation.navigate('Contact')}
                variant="primary"
                style={styles.ctaButton}
              />
            </View>
          </GlassCard>
        </View>

        {/* Footer Padding */}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 48,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 0.05,
    textTransform: 'uppercase',
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 0.05,
    textTransform: 'uppercase',
  },
  signInButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  signInText: {
    color: '#8b5cf6',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.02,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 16,
    width: '100%',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 20,
    maxWidth: '90%',
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 0.05,
    textTransform: 'uppercase',
  },
  heroTitleAccent: {
    color: '#06b6d4',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
    maxWidth: '85%',
  },
  actionButtons: {
    width: '100%',
    paddingHorizontal: 12,
    gap: 14,
    alignItems: 'center',
  },
  primaryButton: {
    marginBottom: 0,
  },
  secondaryButton: {
    marginBottom: 0,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
  statItem: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    height: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#06b6d4',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 32,
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
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    width: '47%',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 8,
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 28,
    color: '#8b5cf6',
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },
  featureDescription: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  menuSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  menuContainer: {
    gap: 16,
  },
  menuItem: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 4,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  ctaCard: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  ctaButtons: {
    width: '100%',
    gap: 16,
  },
  ctaButton: {
    width: '100%',
  },
  footer: {
    height: 60,
  },
});

export default HomeScreen;