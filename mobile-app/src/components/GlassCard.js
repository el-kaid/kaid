import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GlassCard = ({ 
  children, 
  style = {}, 
  gradient = ['rgba(30, 41, 59, 0.4)', 'rgba(30, 41, 59, 0.15)'],
  borderColor = 'rgba(71, 85, 105, 0.6)',
  ...props 
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={gradient}
        style={styles.gradient}
      >
        <View style={[styles.content, { borderColor }]}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  gradient: {
    borderRadius: 18,
  },
  content: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 20,
    backgroundColor: 'rgba(30, 41, 59, 0.2)',
  },
});

export default GlassCard;