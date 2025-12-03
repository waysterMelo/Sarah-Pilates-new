import React, { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import api from '../services/api';

// Define User and AuthContext types
interface User {
  name: string;
  email: string;
  role: string;
}

interface RegisterRequestData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  register: (data: RegisterRequestData) => Promise<void>;
}

// Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Provider
interface AuthProviderProps {
  children: React.ReactNode;
}

// Function to parse JWT
const parseJwt = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);
    
    // Assuming the JWT payload has these fields
    return {
      email: payload.sub, // 'sub' is standard for subject (user id/email)
      name: payload.name || 'Usuário', // Fallback name
      role: payload.roles[0] || 'ROLE_INSTRUCTOR' // Assuming roles is an array
    };
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading true to check for existing token

  // Check for token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const userData = parseJwt(storedToken);
        if (userData) {
          setUser(userData);
          setToken(storedToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        // Handle invalid token
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token: newToken } = response.data;
      
      const userData = parseJwt(newToken);
      
      localStorage.setItem('authToken', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      setUser(userData);
      setToken(newToken);
    } catch (error) {
      // Let the caller handle UI errors
      console.error('Sign in failed:', error);
      throw error; // Re-throw to be caught in the component
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequestData) => {
    setLoading(true);
    try {
      await api.post('/api/auth/register', data);
      // No token or user data returned for registration, just success
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Re-throw for UI to handle
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  }, []);

  const isAuthenticated = !!token;

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    loading,
    signIn,
    signOut,
    register
  }), [isAuthenticated, user, loading, signIn, signOut, register]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

