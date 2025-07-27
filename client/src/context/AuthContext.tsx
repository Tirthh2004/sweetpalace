import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access'));

  const login = async (username: string, password: string) => {
    const res = await axios.post('http://localhost:8000/api/auth/login/', {
      username,
      password,
    });
    setAccessToken(res.data.access);
    localStorage.setItem('access', res.data.access);
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await axios.post('http://localhost:8000/api/auth/register/', {
      username,
      email,
      password,
    });
    setAccessToken(res.data.access);
    localStorage.setItem('access', res.data.access);
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('access');
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
