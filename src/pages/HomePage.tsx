import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Activity, Code2, FileSearch } from 'lucide-react';

const features = [
  { icon: <Shield size={24} />, title: 'Security & RBAC', desc: 'Role-based access control with fine-grained permissions for every feature.', color: '#00f5ff' },
  { icon: <Activity size={24} />, title: 'Real-time Analytics', desc: 'Monitor system performance and user activity with live dashboards.', color: '#bf00ff' },
  { icon: <Code2 size={24} />, title: 'Developer Tools', desc: 'API monitoring, log viewer, deployment management, and env configs.', color: '#00ff88' },
  { icon: <FileSearch size={24} />, title: 'Audit & Compliance', desc: 'Complete audit trail with detailed logs for all system actions.', color: '#00f5ff' },
];

const stats = [
  { label: 'Active Users', value: '1,248', delta: '+12%' },
  { label: 'API Calls Today', value: '94.2K', delta: '+8%' },
  { label: 'System Uptime', value: '99.9%', delta: '+0.1%' },
  { label: 'Data Processed', value: '2.4 TB', delta: '+15%' },
];

export default function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-12">
        <div className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)', color: '#00f5ff' }}>
          Enterprise Platform
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-main">
          SPARK Enterprise Platform
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#94a3b8' }}>
          A powerful, secure, and scalable platform for managing your enterprise applications,
          users, and infrastructure with real-time insights.
        </p>
        {currentUser && (
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.2)' }}>
            <span style={{ color: '#94a3b8' }}>Welcome back,</span>
            <span className="font-semibold" style={{ color: '#00f5ff' }}>{currentUser.name}</span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold uppercase"
              style={{ background: 'rgba(191,0,255,0.15)', color: '#bf00ff', border: '1px solid rgba(191,0,255,0.3)' }}>
              {currentUser.role}
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="neo-card p-4 text-center">
            <div className="text-2xl font-bold text-gradient-cyan">{stat.value}</div>
            <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>{stat.label}</div>
            <div className="text-xs mt-1 font-medium" style={{ color: '#00ff88' }}>{stat.delta}</div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#e2e8f0' }}>Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(f => (
            <Card key={f.title} className="neo-card border-0"
              style={{ background: '#0f0f2a', border: `1px solid rgba(0,245,255,0.15)` }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ background: `${f.color}15`, color: f.color }}>
                    {f.icon}
                  </div>
                  <CardTitle style={{ color: '#e2e8f0' }}>{f.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ color: '#94a3b8' }}>{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
