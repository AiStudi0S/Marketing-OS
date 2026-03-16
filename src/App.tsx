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

type Page = 'home' | 'dashboard' | 'users' | 'admin' | 'developer' | 'settings' | 'docs';

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