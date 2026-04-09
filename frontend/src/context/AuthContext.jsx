import React, { createContext, useContext, useState, useEffect } from 'react';
import API_BASE_URL from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on page refresh
    const authStatus = localStorage.getItem('distillery_admin_auth');
    if (authStatus === 'true') {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // FIX APPLIED HERE: We removed '/api' from this string because your config.js already adds it!
      const response = await fetch(`${API_BASE_URL}/auth.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username.trim(),
          password: credentials.password
        })
      });

      const data = await response.json();

      if (data && data.success) {
        setIsAdmin(true);
        localStorage.setItem('distillery_admin_auth', 'true');
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { 
          success: false, 
          error: data.message || 'Invalid credentials' 
        };
      }
    } catch (err) {
      setLoading(false);
      console.error("Login Error:", err);
      return { success: false, error: 'Connection failed. Check your internet or server.' };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('distillery_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};