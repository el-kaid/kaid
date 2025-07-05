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

const UpdatesScreen = () => {
  const updates = [
    {
      id: 1,
      title: 'KAID Mobile App Launch',
      excerpt: 'We\'re excited to announce the launch of our mobile application for iOS and Android.',
      content: 'After months of development, we\'re thrilled to bring KAID to your mobile devices...',
      date: '2 days ago',
      category: 'Product',
      icon: 'phone-portrait',
      color: '#8b5cf6',
    },
    {
      id: 2,
      title: 'New AI-Powered Analytics',
      excerpt: 'Introducing intelligent insights that help you make better business decisions.',
      content: 'Our new AI analytics engine provides automated insights and recommendations...',
      date: '1 week ago',
      category: 'Feature',
      icon: 'analytics',
      color: '#06b6d4',
    },
    {
      id: 3,
      title: 'Enhanced Security Features',
      excerpt: 'We\'ve added two-factor authentication and advanced encryption protocols.',
      content: 'Security is our top priority. We\'ve implemented additional security measures...',
      date: '2 weeks ago',
      category: 'Security',
      icon: 'shield-checkmark',
      color: '#10b981',
    },
    {
      id: 4,
      title: 'API v2.0 Release',
      excerpt: 'Our new API version offers improved performance and additional endpoints.',
      content: 'API v2.0 brings significant improvements in speed and functionality...',
      date: '3 weeks ago',
      category: 'Developer',
      icon: 'code-slash',
      color: '#f59e0b',
    },
    {
      id: 5,
      title: 'Partnership with TechCorp',
      excerpt: 'Strategic partnership to expand our enterprise solutions.',
      content: 'We\'re excited to announce our partnership with TechCorp to bring...',
      date: '1 month ago',
      category: 'Business',
      icon: 'business',
      color: '#ec4899',
    },
  ];

  const categories = ['All', 'Product', 'Feature', 'Security', 'Developer', 'Business'];

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
            <Text style={styles.title}>Updates & News</Text>
            <Text style={styles.subtitle}>
              Stay updated with the latest features, improvements, and company news
            </Text>
          </View>

          {/* Category Filter */}
          <View style={styles.categorySection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    index === 0 && styles.categoryButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      index === 0 && styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured Update */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured</Text>
            
            <GlassCard style={styles.featuredCard}>
              <View style={styles.featuredHeader}>
                <View style={[styles.featuredIcon, { backgroundColor: `${updates[0].color}20` }]}>
                  <Ionicons 
                    name={updates[0].icon} 
                    size={32} 
                    color={updates[0].color} 
                  />
                </View>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>NEW</Text>
                </View>
              </View>
              
              <Text style={styles.featuredTitle}>{updates[0].title}</Text>
              <Text style={styles.featuredExcerpt}>{updates[0].excerpt}</Text>
              
              <View style={styles.featuredFooter}>
                <View style={styles.featuredMeta}>
                  <Text style={styles.featuredCategory}>{updates[0].category}</Text>
                  <Text style={styles.featuredDate}>{updates[0].date}</Text>
                </View>
                <TouchableOpacity style={styles.readMoreButton}>
                  <Text style={styles.readMoreText}>Read More</Text>
                  <Ionicons name="chevron-forward" size={16} color="#8b5cf6" />
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>

          {/* Recent Updates */}
          <View style={styles.updatesSection}>
            <Text style={styles.sectionTitle}>Recent Updates</Text>
            
            {updates.slice(1).map((update) => (
              <TouchableOpacity
                key={update.id}
                style={styles.updateItem}
                activeOpacity={0.8}
              >
                <GlassCard style={styles.updateCard}>
                  <View style={styles.updateHeader}>
                    <View style={[styles.updateIcon, { backgroundColor: `${update.color}20` }]}>
                      <Ionicons 
                        name={update.icon} 
                        size={20} 
                        color={update.color} 
                      />
                    </View>
                    <View style={styles.updateInfo}>
                      <Text style={styles.updateTitle}>{update.title}</Text>
                      <Text style={styles.updateExcerpt}>{update.excerpt}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                  </View>
                  
                  <View style={styles.updateFooter}>
                    <View style={[styles.categoryTag, { backgroundColor: `${update.color}20` }]}>
                      <Text style={[styles.categoryTagText, { color: update.color }]}>
                        {update.category}
                      </Text>
                    </View>
                    <Text style={styles.updateDate}>{update.date}</Text>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>

          {/* Newsletter Signup */}
          <View style={styles.newsletterSection}>
            <GlassCard style={styles.newsletterCard}>
              <View style={styles.newsletterIcon}>
                <Ionicons name="mail" size={32} color="#8b5cf6" />
              </View>
              <Text style={styles.newsletterTitle}>Stay in the Loop</Text>
              <Text style={styles.newsletterDescription}>
                Subscribe to our newsletter for the latest updates and exclusive content
              </Text>
              
              <TouchableOpacity style={styles.subscribeButton}>
                <LinearGradient
                  colors={['#8b5cf6', '#06b6d4']}
                  style={styles.subscribeButtonGradient}
                >
                  <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
                  <Ionicons name="arrow-forward" size={16} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
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
  categorySection: {
    marginBottom: 24,
  },
  categoryContainer: {
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
  },
  categoryButtonActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  featuredSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  featuredCard: {
    padding: 24,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  featuredExcerpt: {
    fontSize: 16,
    color: '#94a3b8',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredMeta: {
    flex: 1,
  },
  featuredCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8b5cf6',
    marginBottom: 2,
  },
  featuredDate: {
    fontSize: 12,
    color: '#64748b',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
    marginRight: 4,
  },
  updatesSection: {
    marginBottom: 32,
  },
  updateItem: {
    marginBottom: 12,
  },
  updateCard: {
    padding: 16,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateInfo: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  updateExcerpt: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  updateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  updateDate: {
    fontSize: 12,
    color: '#64748b',
  },
  newsletterSection: {
    marginBottom: 40,
  },
  newsletterCard: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  newsletterIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  newsletterDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  subscribeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  subscribeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
});

export default UpdatesScreen;