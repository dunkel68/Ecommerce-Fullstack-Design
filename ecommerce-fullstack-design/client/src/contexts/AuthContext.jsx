// src/contexts/AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext(null); // Initialize with null

// 2. Create the provider component
// src/contexts/AuthContext.js
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post('/api/users/login', { email, password });
    setUser(res.data.user);
    localStorage.setItem('token', res.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Check auth status on app load
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get('/api/users/me');
        setUser(res.data.user);
      } catch {
        localStorage.removeItem('token');
      }
    };
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;