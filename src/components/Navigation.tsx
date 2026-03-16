import { useState } from 'react';
import { Home, LayoutDashboard, Users, Shield, Code2, Settings, BookOpen, Menu, X, LogOut, User, Zap, Brain, Sparkles, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Page } from '../types/pages';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

interface NavTab {
  id: Page;
  label: string;
  icon: React.ReactNode;
  roles?: string[];
  group?: 'main' | 'brandos';
}

const tabs: NavTab[] = [
  { id: 'home', label: 'Home', icon: <Home size={16} />, group: 'main' },
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, group: 'main' },
  { id: 'users', label: 'Users', icon: <Users size={16} />, roles: ['admin', 'developer', 'auditor'], group: 'main' },
  { id: 'admin', label: 'Admin', icon: <Shield size={16} />, roles: ['admin'], group: 'main' },
  { id: 'developer', label: 'Developer', icon: <Code2 size={16} />, roles: ['developer'], group: 'main' },
  { id: 'settings', label: 'Settings', icon: <Settings size={16} />, group: 'main' },
  { id: 'docs', label: 'Docs', icon: <BookOpen size={16} />, group: 'main' },
  // Brand OS tabs
  { id: 'brand-os', label: 'Brand OS', icon: <Zap size={16} />, group: 'brandos' },
  { id: 'brand-intelligence', label: 'Intelligence', icon: <Brain size={16} />, group: 'brandos' },
  { id: 'content-studio', label: 'Content', icon: <Sparkles size={16} />, group: 'brandos' },
  { id: 'campaigns', label: 'Campaigns', icon: <Target size={16} />, group: 'brandos' },
  { id: 'swarm-traffic', label: 'Swarm', icon: <TrendingUp size={16} />, group: 'brandos' },
  { id: 'influence-network', label: 'Influence', icon: <Users size={16} />, group: 'brandos' },
];

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { currentUser, logout, hasRole } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleTabs = tabs.filter(tab => {
    if (!tab.roles) return true;
    return tab.roles.some(role => hasRole(role as Parameters<typeof hasRole>[0]));
  });

  const mainTabs = visibleTabs.filter(t => t.group === 'main');
  const brandOSTabs = visibleTabs.filter(t => t.group === 'brandos');

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <nav style={{ backgroundColor: '#0a0a1a', borderBottom: '1px solid rgba(0,245,255,0.2)' }} className="sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Primary row */}
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', borderRadius: '8px' }} className="w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg text-gradient-main hidden sm:inline">Marketing OS</span>
          </div>

          {/* Desktop main Tabs */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto">
            {mainTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNav(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
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
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {currentUser && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <User size={16} style={{ color: '#00f5ff' }} />
                <span className="hidden lg:inline">{currentUser.name}</span>
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

        {/* Brand OS sub-nav row (desktop) */}
        <div className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto"
          style={{ borderTop: '1px solid rgba(232,121,249,0.1)' }}>
          <span className="text-xs font-semibold mr-1 flex-shrink-0" style={{ color: '#e879f9' }}>Brand OS</span>
          {brandOSTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleNav(tab.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                currentPage === tab.id ? '' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
              style={currentPage === tab.id
                ? { backgroundColor: 'rgba(232,121,249,0.12)', color: '#e879f9', border: '1px solid rgba(232,121,249,0.25)' }
                : {}}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ borderTop: '1px solid rgba(0,245,255,0.1)', paddingBottom: '12px' }}>
            <div className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Navigation</div>
            {mainTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNav(tab.id)}
                className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-left transition-all ${
                  currentPage === tab.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
                style={currentPage === tab.id ? { color: '#00f5ff', backgroundColor: 'rgba(0,245,255,0.05)' } : {}}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <div className="px-2 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: '#e879f9' }}>Brand OS</div>
            {brandOSTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNav(tab.id)}
                className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-left transition-all`}
                style={currentPage === tab.id ? { color: '#e879f9', backgroundColor: 'rgba(232,121,249,0.07)' } : { color: '#94a3b8' }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <div className="px-4 pt-3 flex items-center justify-between border-t" style={{ borderColor: 'rgba(255,255,255,0.05)', marginTop: '8px' }}>
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
