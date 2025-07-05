import React from 'react';
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

const CareerScreen = () => {
  const jobs = [
    {
      id: 1,
      title: 'Senior React Native Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      icon: 'phone-portrait',
      color: '#8b5cf6',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'New York',
      type: 'Full-time',
      experience: '2+ years',
      icon: 'color-palette',
      color: '#06b6d4',
    },
    {
      id: 3,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      icon: 'server',
      color: '#10b981',
    },
    {
      id: 4,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco',
      type: 'Full-time',
      experience: '5+ years',
      icon: 'briefcase',
      color: '#f59e0b',
    },
  ];

  const benefits = [
    { icon: 'medical', title: 'Health Insurance', description: 'Comprehensive medical coverage' },
    { icon: 'time', title: 'Flexible Hours', description: 'Work-life balance is important' },
    { icon: 'home', title: 'Remote Work', description: 'Work from anywhere' },
    { icon: 'school', title: 'Learning Budget', description: '$2000 annual learning budget' },
    { icon: 'airplane', title: 'Vacation Days', description: 'Unlimited PTO policy' },
    { icon: 'trophy', title: 'Stock Options', description: 'Equity participation' },
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
            <Text style={styles.title}>Join Our Team</Text>
            <Text style={styles.subtitle}>
              Help us build the future of business automation
            </Text>
          </View>

          {/* Company Culture */}
          <View style={styles.cultureSection}>
            <GlassCard style={styles.cultureCard}>
              <Text style={styles.cultureTitle}>Why Work at KAID?</Text>
              <Text style={styles.cultureDescription}>
                We're a fast-growing team of passionate individuals working to revolutionize 
                how businesses manage their operations. Join us in building innovative solutions 
                that make a real impact.
              </Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>50+</Text>
                  <Text style={styles.statLabel}>Team Members</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>15+</Text>
                  <Text style={styles.statLabel}>Countries</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>Offices</Text>
                </View>
              </View>
            </GlassCard>
          </View>

          {/* Open Positions */}
          <View style={styles.jobsSection}>
            <Text style={styles.sectionTitle}>Open Positions</Text>
            
            {jobs.map((job) => (
              <TouchableOpacity
                key={job.id}
                style={styles.jobItem}
                activeOpacity={0.8}
              >
                <GlassCard style={styles.jobCard}>
                  <View style={styles.jobHeader}>
                    <View style={[styles.jobIcon, { backgroundColor: `${job.color}20` }]}>
                      <Ionicons 
                        name={job.icon} 
                        size={24} 
                        color={job.color} 
                      />
                    </View>
                    <View style={styles.jobInfo}>
                      <Text style={styles.jobTitle}>{job.title}</Text>
                      <Text style={styles.jobDepartment}>{job.department}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
                  </View>
                  
                  <View style={styles.jobDetails}>
                    <View style={styles.jobDetail}>
                      <Ionicons name="location" size={14} color="#94a3b8" />
                      <Text style={styles.jobDetailText}>{job.location}</Text>
                    </View>
                    <View style={styles.jobDetail}>
                      <Ionicons name="time" size={14} color="#94a3b8" />
                      <Text style={styles.jobDetailText}>{job.type}</Text>
                    </View>
                    <View style={styles.jobDetail}>
                      <Ionicons name="star" size={14} color="#94a3b8" />
                      <Text style={styles.jobDetailText}>{job.experience}</Text>
                    </View>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>

          {/* Benefits */}
          <View style={styles.benefitsSection}>
            <Text style={styles.sectionTitle}>Benefits & Perks</Text>
            
            <View style={styles.benefitsGrid}>
              {benefits.map((benefit, index) => (
                <GlassCard key={index} style={styles.benefitCard}>
                  <View style={styles.benefitIcon}>
                    <Ionicons 
                      name={benefit.icon} 
                      size={24} 
                      color="#8b5cf6" 
                    />
                  </View>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </GlassCard>
              ))}
            </View>
          </View>

          {/* Application Process */}
          <View style={styles.processSection}>
            <Text style={styles.sectionTitle}>Application Process</Text>
            
            <GlassCard style={styles.processCard}>
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Apply Online</Text>
                  <Text style={styles.stepDescription}>Submit your application and resume</Text>
                </View>
              </View>
              
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Phone Screen</Text>
                  <Text style={styles.stepDescription}>Initial conversation with HR team</Text>
                </View>
              </View>
              
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Technical Interview</Text>
                  <Text style={styles.stepDescription}>Technical assessment and team interview</Text>
                </View>
              </View>
              
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>4</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Final Interview</Text>
                  <Text style={styles.stepDescription}>Meet with leadership team</Text>
                </View>
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
    paddingVertical: 20,
    alignItems: 'center',
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
    lineHeight: 24,
  },
  cultureSection: {
    marginBottom: 32,
  },
  cultureCard: {
    padding: 24,
    alignItems: 'center',
  },
  cultureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  cultureDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  jobsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  jobItem: {
    marginBottom: 12,
  },
  jobCard: {
    padding: 20,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  jobDepartment: {
    fontSize: 14,
    color: '#94a3b8',
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailText: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 4,
  },
  benefitsSection: {
    marginBottom: 32,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefitCard: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    minHeight: 140,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 16,
  },
  processSection: {
    marginBottom: 40,
  },
  processCard: {
    padding: 20,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 85, 105, 0.3)',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default CareerScreen;