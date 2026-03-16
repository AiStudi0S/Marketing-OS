import { useState } from 'react';
import { Home, LayoutDashboard, Users, Shield, Code2, Settings, BookOpen, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type Page = 'home' | 'dashboard' | 'users' | 'admin' | 'developer' | 'settings' | 'docs';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

interface NavTab {
  id: Page;
  label: string;
  icon: React.ReactNode;
  roles?: string[];
}

const tabs: NavTab[] = [
  { id: 'home', label: 'Home', icon: <Home size={16} /> },
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'users', label: 'Users', icon: <Users size={16} />, roles: ['admin', 'developer', 'auditor'] },
  { id: 'admin', label: 'Admin', icon: <Shield size={16} />, roles: ['admin'] },
  { id: 'developer', label: 'Developer', icon: <Code2 size={16} />, roles: ['developer'] },
  { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  { id: 'docs', label: 'Docs', icon: <BookOpen size={16} /> },
];

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { currentUser, logout, hasRole } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleTabs = tabs.filter(tab => {
    if (!tab.roles) return true;
    return tab.roles.some(role => hasRole(role as Parameters<typeof hasRole>[0]));
  });

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <nav style={{ backgroundColor: '#0a0a1a', borderBottom: '1px solid rgba(0,245,255,0.2)' }} className="sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', borderRadius: '8px' }} className="w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-gradient-main">SPARK</span>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {visibleTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNav(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  currentPage === tab.id
                    ? 'glow-cyan text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                style={currentPage === tab.id ? { backgroundColor: 'rgba(0,245,255,0.1)', color: '#00f5ff' } : {}}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* User Info + Logout (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <User size={16} style={{ color: '#00f5ff' }} />
                <span>{currentUser.name}</span>
                <span style={{ color: '#bf00ff', fontSize: '11px', textTransform: 'uppercase', background: 'rgba(191,0,255,0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                  {currentUser.role}
                </span>
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ borderTop: '1px solid rgba(0,245,255,0.1)', paddingBottom: '12px' }}>
            {visibleTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNav(tab.id)}
                className={`flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-left transition-all ${
                  currentPage === tab.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
                style={currentPage === tab.id ? { color: '#00f5ff', backgroundColor: 'rgba(0,245,255,0.05)' } : {}}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <div className="px-4 pt-2 flex items-center justify-between">
              {currentUser && (
                <span className="text-sm text-slate-400">{currentUser.name} ({currentUser.role})</span>
              )}
              <button onClick={logout} className="text-sm text-red-400 flex items-center gap-1">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
