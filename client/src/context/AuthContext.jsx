import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vasana_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (user && user.token) {
      // Validate session
      api.get('/auth/me')
        .then((res) => {
          setUser((prev) => ({ ...prev, ...res.data }));
        })
        .catch(() => {
          // Keep saved offline state if server is unreachable
        });
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const userData = res.data;
      setUser(userData);
      localStorage.setItem('vasana_user', JSON.stringify(userData));
      addToast(`Welcome back, ${userData.name}!`, 'success');
      return userData;
    } catch (error) {
      addToast(error.message || 'Login failed. Please check credentials.', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, phone });
      const userData = res.data;
      setUser(userData);
      localStorage.setItem('vasana_user', JSON.stringify(userData));
      addToast('Registration successful! Welcome to VASANA.', 'success');
      return userData;
    } catch (error) {
      addToast(error.message || 'Registration failed.', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vasana_user');
    addToast('You have been signed out.', 'info');
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/auth/profile', profileData);
      const updated = { ...user, ...res.data };
      setUser(updated);
      localStorage.setItem('vasana_user', JSON.stringify(updated));
      addToast('Profile updated successfully.', 'success');
      return updated;
    } catch (error) {
      addToast(error.message || 'Failed to update profile.', 'error');
      throw error;
    }
  };

  const addAddress = async (addressData) => {
    try {
      const res = await api.post('/auth/addresses', addressData);
      const updatedUser = { ...user, addresses: res.data };
      setUser(updatedUser);
      localStorage.setItem('vasana_user', JSON.stringify(updatedUser));
      addToast('New address added.', 'success');
      return res.data;
    } catch (error) {
      addToast(error.message || 'Failed to save address.', 'error');
      throw error;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const res = await api.delete(`/auth/addresses/${addressId}`);
      const updatedUser = { ...user, addresses: res.data };
      setUser(updatedUser);
      localStorage.setItem('vasana_user', JSON.stringify(updatedUser));
      addToast('Address removed.', 'info');
    } catch (error) {
      addToast(error.message || 'Failed to delete address.', 'error');
    }
  };

  // Fast login helper for testing
  const loginDemoAdmin = () => login('admin@example.com', 'admin123');
  const loginDemoCustomer = () => login('customer@example.com', 'customer123');

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        loginDemoAdmin,
        loginDemoCustomer,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
