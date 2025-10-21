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
import GlassyButton from '../components/GlassyButton';

const OurWorkScreen = ({ navigation }) => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Complete billing solution for online retailers',
      technology: 'React Native + Node.js',
      status: 'Completed',
      icon: 'storefront',
      color: '#8b5cf6',
    },
    {
      id: 2,
      title: 'Restaurant Management',
      description: 'POS system with inventory tracking',
      technology: 'Flutter + Firebase',
      status: 'In Progress',
      icon: 'restaurant',
      color: '#06b6d4',
    },
    {
      id: 3,
      title: 'Healthcare Analytics',
      description: 'Patient billing and insurance management',
      technology: 'React + AWS',
      status: 'Completed',
      icon: 'medical',
      color: '#10b981',
    },
    {
      id: 4,
      title: 'Educational Platform',
      description: 'Student fee management system',
      technology: 'Vue.js + PostgreSQL',
      status: 'Planning',
      icon: 'school',
      color: '#f59e0b',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#10b981';
      case 'In Progress':
        return '#06b6d4';
      case 'Planning':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

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
              <Text style={styles.sectionBadgeText}>💼 Our Portfolio</Text>
            </View>
            <Text style={styles.title}>Innovation</Text>
            <Text style={styles.subtitle}>
              Explore our portfolio of successful projects and innovative solutions
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsSection}>
            <View style={styles.statsGrid}>
              <GlassCard style={styles.statCard}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </GlassCard>
              <GlassCard style={styles.statCard}>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </GlassCard>
              <GlassCard style={styles.statCard}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Support</Text>
              </GlassCard>
            </View>
          </View>

          {/* Projects */}
          <View style={styles.projectsSection}>
            <Text style={styles.sectionTitle}>Featured Projects</Text>
            
            {projects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectItem}
                activeOpacity={0.8}
              >
                <GlassCard style={styles.projectCard}>
                  <View style={styles.projectHeader}>
                    <View style={[styles.projectIcon, { backgroundColor: `${project.color}20` }]}>
                      <Ionicons 
                        name={project.icon} 
                        size={24} 
                        color={project.color} 
                      />
                    </View>
                    <View style={styles.projectInfo}>
                      <Text style={styles.projectTitle}>{project.title}</Text>
                      <Text style={styles.projectTechnology}>{project.technology}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(project.status)}20` }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
                        {project.status}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  
                  <View style={styles.projectFooter}>
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View Details</Text>
                      <Ionicons name="chevron-forward" size={16} color="#8b5cf6" />
                    </TouchableOpacity>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>

          {/* Technologies */}
          <View style={styles.technologiesSection}>
            <Text style={styles.sectionTitle}>Technologies We Use</Text>
            
            <View style={styles.techGrid}>
              {['React Native', 'Node.js', 'Flutter', 'Firebase', 'AWS', 'MongoDB'].map((tech, index) => (
                <GlassCard key={index} style={styles.techCard}>
                  <Text style={styles.techText}>{tech}</Text>
                </GlassCard>
              ))}
            </View>
          </View>

          {/* CTA */}
          <View style={styles.ctaSection}>
            <GlassCard style={styles.ctaCard}>
              <Text style={styles.ctaTitle}>Ready to start your project?</Text>
              <Text style={styles.ctaSubtitle}>
                Let's discuss how we can help transform your business
              </Text>
              <GlassyButton
                title="Get Started"
                onPress={() => navigation.navigate('Contact')}
                variant="primary"
                style={styles.ctaButton}
              />
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
  statsSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  projectsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  projectItem: {
    marginBottom: 16,
  },
  projectCard: {
    padding: 20,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectTechnology: {
    fontSize: 14,
    color: '#94a3b8',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  projectDescription: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
    marginBottom: 16,
  },
  projectFooter: {
    alignItems: 'flex-end',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
    marginRight: 4,
  },
  technologiesSection: {
    marginBottom: 32,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techCard: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  techText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  ctaSection: {
    marginBottom: 40,
  },
  ctaCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  ctaButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
});

export default OurWorkScreen;