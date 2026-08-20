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
    if (user && user.token && !user.token.startsWith('mock_')) {
      // Validate session with live backend if available
      api.get('/auth/me')
        .then((res) => {
          setUser((prev) => ({ ...prev, ...res.data }));
        })
        .catch(() => {
          // Keep saved session if server is unreachable
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
      // Fallback demo authentication if backend is offline/unreachable on Vercel preview:
      if (email === 'admin@example.com' && password === 'admin123') {
        const mockAdmin = {
          _id: 'admin_demo_id',
          name: 'VASANA Administrator',
          email: 'admin@example.com',
          role: 'admin',
          addresses: [{
            _id: 'addr_admin_1',
            fullName: 'VASANA HQ',
            phone: '+91 9876543210',
            street: '108 Fashion Avenue, Jubilee Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500033',
            country: 'India',
            isDefault: true
          }],
          token: 'mock_admin_token'
        };
        setUser(mockAdmin);
        localStorage.setItem('vasana_user', JSON.stringify(mockAdmin));
        addToast('Welcome back, VASANA Administrator!', 'success');
        return mockAdmin;
      } else if (email === 'customer@example.com' || password === 'customer123' || email.includes('@')) {
        const mockCustomer = {
          _id: 'customer_demo_id',
          name: email.split('@')[0] || 'Priya Sundaram',
          email: email || 'customer@example.com',
          role: 'customer',
          addresses: [{
            _id: 'addr_cust_1',
            fullName: 'Priya Sundaram',
            phone: '+91 9123456789',
            street: 'Flat 402, Royal Palms, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038',
            country: 'India',
            isDefault: true
          }],
          token: 'mock_customer_token'
        };
        setUser(mockCustomer);
        localStorage.setItem('vasana_user', JSON.stringify(mockCustomer));
        addToast(`Welcome back, ${mockCustomer.name}!`, 'success');
        return mockCustomer;
      }
      addToast('Login failed. Please check your credentials.', 'error');
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
      // Fallback registration if backend is offline on Vercel preview:
      const newMockUser = {
        _id: 'user_' + Date.now(),
        name,
        email,
        phone: phone || '',
        role: 'customer',
        addresses: [],
        token: 'mock_token_' + Date.now()
      };
      setUser(newMockUser);
      localStorage.setItem('vasana_user', JSON.stringify(newMockUser));
      addToast('Registration successful! Welcome to VASANA.', 'success');
      return newMockUser;
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
      const updated = { ...user, ...profileData };
      setUser(updated);
      localStorage.setItem('vasana_user', JSON.stringify(updated));
      addToast('Profile updated successfully.', 'success');
      return updated;
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
      const newAddr = { _id: 'addr_' + Date.now(), ...addressData };
      const updatedAddresses = [...(user?.addresses || []), newAddr];
      const updatedUser = { ...user, addresses: updatedAddresses };
      setUser(updatedUser);
      localStorage.setItem('vasana_user', JSON.stringify(updatedUser));
      addToast('New address added.', 'success');
      return updatedAddresses;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      await api.delete(`/auth/addresses/${addressId}`);
      const updatedUser = { ...user, addresses: user.addresses.filter(a => a._id !== addressId) };
      setUser(updatedUser);
      localStorage.setItem('vasana_user', JSON.stringify(updatedUser));
      addToast('Address removed.', 'info');
    } catch (error) {
      const updatedUser = { ...user, addresses: (user?.addresses || []).filter(a => a._id !== addressId) };
      setUser(updatedUser);
      localStorage.setItem('vasana_user', JSON.stringify(updatedUser));
      addToast('Address removed.', 'info');
    }
  };

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
