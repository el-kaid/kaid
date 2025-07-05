import { Platform } from 'react-native';

// Get your computer's IP address for mobile testing
// To find your IP: run `ipconfig getifaddr en0` (macOS) or `ipconfig` (Windows)
const COMPUTER_IP = '192.168.1.100'; // Replace with your actual IP address

// API Configuration for different environments
const getApiBaseUrl = () => {
  if (__DEV__) {
    // Development environment
    if (Platform.OS === 'ios') {
      // iOS Simulator can use localhost
      return 'http://localhost:8080';
    } else if (Platform.OS === 'android') {
      // Android emulator needs 10.0.2.2 for localhost
      // Physical Android device needs your computer's IP
      return 'http://10.0.2.2:8080'; // Use this for Android emulator
      // return `http://${COMPUTER_IP}:8080`; // Use this for physical device
    } else {
      return 'http://localhost:8080';
    }
  } else {
    // Production environment
    return 'https://your-production-api.com'; // Replace with actual production URL
  }
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`,
  },
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/health`,
};

// Debug logging in development
if (__DEV__) {
  console.log(`Mobile API Base URL: ${API_BASE_URL}`);
  console.log(`Platform: ${Platform.OS}`);
}