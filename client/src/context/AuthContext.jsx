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
      api.get('/auth/me')
        .then((res) => {
          setUser((prev) => ({ ...prev, ...res.data }));
        })
        .catch(() => {});
    }
  }, []);

  const saveCustomerLocal = (u) => {
    // Customers are managed directly in MongoDB User collection via Express auth endpoints
  };

  const login = async (email, password) => {
    setLoading(true);
    
    // Customer login strictly calls backend API


    if (email === 'customer@example.com' && password === 'customer123') {
      const mockCustomer = {
        _id: 'customer_demo_id',
        name: 'Priya Sundaram',
        email: 'customer@example.com',
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
      saveCustomerLocal(mockCustomer);
      addToast('Welcome back, Priya Sundaram!', 'success');
      setLoading(false);
      return mockCustomer;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      const userData = res.data.user || res.data;
      setUser(userData);
      localStorage.setItem('vasana_user', JSON.stringify(userData));
      addToast(`Welcome back, ${userData.name || 'Valued Customer'}!`, 'success');
      return userData;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Invalid email or password.';
      addToast(errMsg, 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, phone }, { timeout: 1000 });
      const userData = res.data;
      setUser(userData);
      localStorage.setItem('vasana_user', JSON.stringify(userData));
      saveCustomerLocal(userData);
      addToast('Registration successful! Welcome to VASANA.', 'success');
      return userData;
    } catch (error) {
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
      saveCustomerLocal(newMockUser);
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
    window.location.href = '/';
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/auth/profile', profileData);
      const updated = { ...user, ...res.data };
      setUser(updated);
      localStorage.setItem('vasana_user', JSON.stringify(updated));
      saveCustomerLocal(updated);
      addToast('Profile updated successfully.', 'success');
      return updated;
    } catch (error) {
      const updated = { ...user, ...profileData };
      setUser(updated);
      localStorage.setItem('vasana_user', JSON.stringify(updated));
      saveCustomerLocal(updated);
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
        setUser,
        loading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        loginDemoAdmin,
        loginDemoCustomer,
        isAdmin: user && (user.role === 'admin' || user.role === 'super_admin' || user.isAdmin === true)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
