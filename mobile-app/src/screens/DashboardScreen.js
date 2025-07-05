import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              navigation.replace('Home');
            }
          },
        },
      ]
    );
  };

  const dashboardItems = [
    { title: 'Invoices', icon: 'document-text', count: '12', color: '#8b5cf6' },
    { title: 'Customers', icon: 'people', count: '48', color: '#06b6d4' },
    { title: 'Revenue', icon: 'trending-up', count: '$12.5k', color: '#10b981' },
    { title: 'Reports', icon: 'bar-chart', count: '6', color: '#f59e0b' },
  ];

  const quickActions = [
    { title: 'Create Invoice', icon: 'add-circle', color: '#8b5cf6' },
    { title: 'Add Customer', icon: 'person-add', color: '#06b6d4' },
    { title: 'View Reports', icon: 'analytics', color: '#10b981' },
    { title: 'Settings', icon: 'settings', color: '#64748b' },
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
            <View style={styles.headerLeft}>
              <LinearGradient
                colors={['#06b6d4', '#8b5cf6', '#ec4899']}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Text>
              </LinearGradient>
              <View style={styles.headerInfo}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color="#ef4444" />
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.statsGrid}>
              {dashboardItems.map((item, index) => (
                <GlassCard key={index} style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <Ionicons 
                      name={item.icon} 
                      size={24} 
                      color={item.color} 
                    />
                    <Text style={styles.statCount}>{item.count}</Text>
                  </View>
                  <Text style={styles.statTitle}>{item.title}</Text>
                </GlassCard>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.actionItem}
                  activeOpacity={0.8}
                >
                  <GlassCard style={styles.actionCard}>
                    <Ionicons 
                      name={action.icon} 
                      size={32} 
                      color={action.color} 
                    />
                    <Text style={styles.actionTitle}>{action.title}</Text>
                  </GlassCard>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <GlassCard style={styles.activityCard}>
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="document-text" size={20} color="#8b5cf6" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>Invoice #1001 created</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="person-add" size={20} color="#06b6d4" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>New customer added</Text>
                  <Text style={styles.activityTime}>5 hours ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>Payment received</Text>
                  <Text style={styles.activityTime}>1 day ago</Text>
                </View>
              </View>
            </GlassCard>
          </View>

          {/* Navigation Links */}
          <View style={styles.navigationSection}>
            <Text style={styles.sectionTitle}>Explore</Text>
            <View style={styles.navigationGrid}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('OurWork')}
              >
                <GlassCard style={styles.navCard}>
                  <Ionicons name="briefcase" size={24} color="#8b5cf6" />
                  <Text style={styles.navTitle}>Our Work</Text>
                  <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                </GlassCard>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('BuySoftware')}
              >
                <GlassCard style={styles.navCard}>
                  <Ionicons name="card" size={24} color="#06b6d4" />
                  <Text style={styles.navTitle}>Pricing</Text>
                  <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                </GlassCard>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigation.navigate('Contact')}
              >
                <GlassCard style={styles.navCard}>
                  <Ionicons name="mail" size={24} color="#10b981" />
                  <Text style={styles.navTitle}>Contact</Text>
                  <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                </GlassCard>
              </TouchableOpacity>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  logoutButton: {
    padding: 8,
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '47%',
    padding: 18,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statTitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '47%',
  },
  actionCard: {
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
  },
  activitySection: {
    marginBottom: 32,
  },
  activityCard: {
    paddingVertical: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 85, 105, 0.3)',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  navigationSection: {
    marginBottom: 40,
  },
  navigationGrid: {
    gap: 12,
  },
  navItem: {
    marginBottom: 4,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  navTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginLeft: 16,
  },
});

export default DashboardScreen;