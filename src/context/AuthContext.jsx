import { createContext, useState, useContext } from 'react';
import { mockUser } from '../data/mockUser';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Always provide the mock user as the default user
  const [user] = useState(mockUser);
  const [loading] = useState(false);

  const login = () => {
    console.log('Login is disabled in this local-only version.');
  };

  const logout = () => {
    console.log('Logout is disabled in this local-only version.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
