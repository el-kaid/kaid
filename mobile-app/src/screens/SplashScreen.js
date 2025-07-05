import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (isAuthenticated) {
          navigation.replace('Dashboard');
        } else {
          navigation.replace('Home');
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, loading, navigation]);

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#0f172a']}
      style={styles.container}
    >
      {/* Background Effects */}
      <View style={styles.backgroundEffects}>
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.1)', 'transparent']}
          style={[styles.gradientCircle, styles.circle1]}
        />
        <LinearGradient
          colors={['rgba(6, 182, 212, 0.25)', 'rgba(6, 182, 212, 0.1)', 'transparent']}
          style={[styles.gradientCircle, styles.circle2]}
        />
        <LinearGradient
          colors={['rgba(236, 72, 153, 0.2)', 'rgba(236, 72, 153, 0.05)', 'transparent']}
          style={[styles.gradientCircle, styles.circle3]}
        />
      </View>

      {/* Content */}
      <Animatable.View 
        animation="fadeInUp" 
        duration={1500}
        style={styles.content}
      >
        {/* Logo */}
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite"
          style={styles.logoContainer}
        >
          <LinearGradient
            colors={['#06b6d4', '#8b5cf6', '#ec4899']}
            style={styles.logo}
          >
            <Text style={styles.logoText}>K</Text>
          </LinearGradient>
        </Animatable.View>

        {/* App Name */}
        <Animatable.Text 
          animation="fadeInUp" 
          delay={500}
          style={styles.appName}
        >
          KAID-B1
        </Animatable.Text>

        {/* Tagline */}
        <Animatable.Text 
          animation="fadeInUp" 
          delay={1000}
          style={styles.tagline}
        >
          Next-generation billing and accounting software powered by AI
        </Animatable.Text>

        {/* Loading Indicator */}
        <Animatable.View 
          animation="fadeInUp" 
          delay={1500}
          style={styles.loadingContainer}
        >
          <View style={styles.loadingDots}>
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite"
              style={[styles.dot, { backgroundColor: '#8b5cf6' }]}
            />
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite"
              delay={200}
              style={[styles.dot, { backgroundColor: '#06b6d4' }]}
            />
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite"
              delay={400}
              style={[styles.dot, { backgroundColor: '#ec4899' }]}
            />
          </View>
        </Animatable.View>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundEffects: {
    position: 'absolute',
    width: width,
    height: height,
  },
  gradientCircle: {
    position: 'absolute',
    borderRadius: 1000,
  },
  circle1: {
    width: width * 1.5,
    height: width * 1.2,
    top: height * 0.1,
    left: width * 0.3,
  },
  circle2: {
    width: width * 1.2,
    height: width * 0.8,
    bottom: height * 0.2,
    right: width * 0.3,
  },
  circle3: {
    width: width * 0.8,
    height: width * 0.6,
    top: height * 0.5,
    left: width * 0.1,
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 16,
    elevation: 16,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginHorizontal: 32,
    lineHeight: 24,
    marginBottom: 48,
  },
  loadingContainer: {
    marginTop: 32,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default SplashScreen;