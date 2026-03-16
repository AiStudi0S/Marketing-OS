import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'admin' | 'developer' | 'user' | 'auditor';

export interface User {
  id: string;
  username: string;
  role: Role;
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  hasRole: (role: Role) => boolean;
  hasPermission: (permission: string) => boolean;
}

// DEMO ONLY: passwords stored in plain text for demonstration purposes.
// A runtime guard ensures this in-browser auth is never silently used outside
// development / demo environments.  Production systems MUST use server-side
// password hashing (e.g. bcrypt) and a proper auth service.
if (import.meta.env.PROD && import.meta.env.VITE_APP_ENV !== 'demo') {
  console.error(
    '[AuthContext] In-memory demo auth must not be used in a production deployment. ' +
    'Replace with a server-side authentication service.',
  );
}
const USERS = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' as Role, name: 'Admin User', email: 'admin@example.com' },
  { id: '2', username: 'dev', password: 'dev123', role: 'developer' as Role, name: 'Dev User', email: 'dev@example.com' },
  { id: '3', username: 'user', password: 'user123', role: 'user' as Role, name: 'Regular User', email: 'user@example.com' },
  { id: '4', username: 'auditor', password: 'audit123', role: 'auditor' as Role, name: 'Audit User', email: 'auditor@example.com' },
];

const PERMISSIONS: Record<string, Role[]> = {
  'manage:users': ['admin'],
  'view:users': ['admin', 'developer', 'auditor'],
  'manage:system': ['admin'],
  'view:logs': ['admin', 'developer', 'auditor'],
  'deploy:apps': ['admin', 'developer'],
  'view:metrics': ['admin', 'developer', 'auditor'],
  'manage:settings': ['admin'],
  'view:settings': ['admin', 'developer', 'user', 'auditor'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const user = USERS.find(u => u.id === token);
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('auth_token', user.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('auth_token');
  };

  const hasRole = (role: Role): boolean => currentUser?.role === role;

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false;
    const allowedRoles = PERMISSIONS[permission] || [];
    return allowedRoles.includes(currentUser.role);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout, hasRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
