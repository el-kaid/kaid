import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = ({ 
  children, 
  style = {}, 
  gradient = ['#ffffff', '#a855f7', '#06b6d4'],
  ...props 
}) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]} {...props}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]} {...props}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;