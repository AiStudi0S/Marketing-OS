import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import DocsPage from './pages/DocsPage';
import BrandOSPage from './pages/BrandOSPage';
import BrandIntelligencePage from './pages/BrandIntelligencePage';
import ContentStudioPage from './pages/ContentStudioPage';
import CampaignStrategyPage from './pages/CampaignStrategyPage';
import SwarmTrafficPage from './pages/SwarmTrafficPage';
import InfluenceNetworkPage from './pages/InfluenceNetworkPage';
import type { Page } from './types/pages';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'dashboard': return <UserDashboard />;
      case 'admin': return <AdminDashboard />;
      case 'developer': return <DeveloperDashboard />;
      case 'users': return <UsersPage />;
      case 'settings': return <SettingsPage />;
      case 'docs': return <DocsPage />;
      case 'brand-os': return <BrandOSPage onNavigate={setCurrentPage} />;
      case 'brand-intelligence': return <BrandIntelligencePage />;
      case 'content-studio': return <ContentStudioPage />;
      case 'campaigns': return <CampaignStrategyPage />;
      case 'swarm-traffic': return <SwarmTrafficPage />;
      case 'influence-network': return <InfluenceNetworkPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a1a' }}>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="container mx-auto px-4 py-6">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}