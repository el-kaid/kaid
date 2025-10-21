import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import TestScrollScreen from './src/screens/TestScrollScreen';
import SimpleScrollTest from './src/screens/SimpleScrollTest';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import OurWorkScreen from './src/screens/OurWorkScreen';
import BuySoftwareScreen from './src/screens/BuySoftwareScreen';
import CareerScreen from './src/screens/CareerScreen';
import UpdatesScreen from './src/screens/UpdatesScreen';

// Context providers
import { AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#0f172a" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0f172a',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
              headerBackTitleVisible: false,
              cardStyle: { backgroundColor: '#0f172a' },
            }}
          >
            <Stack.Screen 
              name="TestScroll" 
              component={SimpleScrollTest} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ title: 'Sign In' }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ title: 'Create Account' }}
            />
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="OurWork" 
              component={OurWorkScreen} 
              options={{ title: 'Innovation' }}
            />
            <Stack.Screen 
              name="BuySoftware" 
              component={BuySoftwareScreen} 
              options={{ title: 'Pricing' }}
            />
            <Stack.Screen 
              name="Career" 
              component={CareerScreen} 
              options={{ title: 'Work With Us' }}
            />
            <Stack.Screen 
              name="Updates" 
              component={UpdatesScreen} 
              options={{ title: 'Support Hub' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}