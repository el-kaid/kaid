  import React, { createContext, useState, useContext, useEffect } from 'react';
  import * as SecureStore from 'expo-secure-store';
  import axios from 'axios';
  import { API_BASE_URL } from '../config/api';

  const AuthContext = createContext();

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    // API base URL is now imported from config/api.js

    useEffect(() => {
      loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('userToken');
        const storedUser = await SecureStore.getItemAsync('userData');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Set default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
      } finally {
        setLoading(false);
      }
    };

    const login = async (email, password) => {
      try {
        console.log(`🚀 Attempting login to: ${API_BASE_URL}/api/auth/login`);
        console.log(`📧 Email: ${email}`);
        
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          email,
          password,
        });

        console.log('✅ Login response received:', response.data);

        if (response.data.success) {
          const { token: authToken, user: userData } = response.data;
          
          // Store in secure storage
          await SecureStore.setItemAsync('userToken', authToken);
          await SecureStore.setItemAsync('userData', JSON.stringify(userData));
          
          // Update state
          setToken(authToken);
          setUser(userData);
          
          // Set default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
          
          console.log('🎉 Login successful for user:', userData.name);
          return { success: true };
        } else {
          console.log('❌ Login failed:', response.data.message);
          return { success: false, error: response.data.message };
        }
      } catch (error) {
        console.error('🔥 Login error:', error);
        console.error('🔍 Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: `${API_BASE_URL}/api/auth/login`
        });
        return { 
          success: false, 
          error: error.response?.data?.message || 'Network error. Please check your connection and try again.' 
        };
      }
    };

    const register = async (formData) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          return { success: true };
        } else {
          return { success: false, error: response.data.message };
        }
      } catch (error) {
        console.error('Registration error:', error);
        return { 
          success: false, 
          error: error.response?.data?.message || 'Registration failed. Please try again.' 
        };
      }
    };

    const logout = async () => {
      try {
        // Remove from secure storage
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
        
        // Clear state
        setToken(null);
        setUser(null);
        
        // Remove authorization header
        delete axios.defaults.headers.common['Authorization'];
        
        return { success: true };
      } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: 'Logout failed' };
      }
    };

    const value = {
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!token && !!user,
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };