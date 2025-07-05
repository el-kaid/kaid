import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GlassyButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
  variant = 'primary', // primary, secondary, accent, white
  ...props
}) => {
  const shimmerAnim = useRef(new Animated.Value(-100)).current;
  const getButtonColors = () => {
    switch (variant) {
      case 'secondary':
        return {
          background: 'rgba(6, 182, 212, 0.2)',
          border: 'rgba(6, 182, 212, 0.3)',
          textColor: '#ffffff',
          shadowColor: 'rgba(6, 182, 212, 0.3)'
        };
      case 'accent':
        return {
          background: 'rgba(239, 68, 68, 0.2)',
          border: 'rgba(239, 68, 68, 0.3)',
          textColor: '#ffffff',
          shadowColor: 'rgba(239, 68, 68, 0.3)'
        };
      case 'white':
        return {
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'rgba(255, 255, 255, 0.5)',
          textColor: '#1e293b',
          shadowColor: 'rgba(255, 255, 255, 0.2)'
        };
      default: // primary
        return {
          background: 'rgba(147, 51, 234, 0.2)',
          border: 'rgba(147, 51, 234, 0.3)',
          textColor: '#ffffff',
          shadowColor: 'rgba(147, 51, 234, 0.3)'
        };
    }
  };

  const colors = getButtonColors();

  const startShimmer = () => {
    shimmerAnim.setValue(-100);
    Animated.timing(shimmerAnim, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => {
        startShimmer();
        onPress && onPress();
      }}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <View style={[styles.glassBackground, {
        backgroundColor: disabled ? 'rgba(100, 116, 139, 0.1)' : colors.background,
        borderColor: disabled ? 'rgba(100, 116, 139, 0.2)' : colors.border,
      }]}>
        
        {/* Shimmer Effect */}
        <Animated.View style={[styles.shimmer, {
          transform: [{ translateX: shimmerAnim }]
        }]} />
        
        {/* Top highlight */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.4)', 'transparent']}
          style={styles.topHighlight}
        />
        
        {/* Bottom shadow */}
        <LinearGradient
          colors={['transparent', variant === 'white' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)']}
          style={styles.bottomShadow}
        />
        
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color={disabled ? '#64748b' : colors.textColor} size="small" />
          ) : (
            <Text style={[styles.text, { color: disabled ? '#64748b' : colors.textColor }, textStyle]}>
              {title}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  glassBackground: {
    borderRadius: 25,
    borderWidth: 1.5,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
    position: 'relative',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: '100%',
    borderRadius: 25,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    minHeight: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default GlassyButton;