import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const activityData = [
  { day: 'Mon', activity: 24 },
  { day: 'Tue', activity: 38 },
  { day: 'Wed', activity: 29 },
  { day: 'Thu', activity: 47 },
  { day: 'Fri', activity: 52 },
  { day: 'Sat', activity: 18 },
  { day: 'Sun', activity: 31 },
];

const notifications = [
  { id: 1, type: 'success', message: 'Project "Alpha" deployment successful', time: '2m ago' },
  { id: 2, type: 'info', message: 'Scheduled maintenance tonight at 2 AM UTC', time: '1h ago' },
  { id: 3, type: 'warning', message: 'API rate limit at 80% usage', time: '3h ago' },
  { id: 4, type: 'success', message: 'Your report has been generated', time: '5h ago' },
  { id: 5, type: 'info', message: 'New feature: Dark mode is now available', time: '1d ago' },
];

const userStats = [
  { label: 'Posts', value: 42 },
  { label: 'Projects', value: 7 },
  { label: 'Tasks', value: 156 },
  { label: 'Score', value: '9.2' },
];

const notifIcon = (type: string) => {
  if (type === 'success') return <CheckCircle2 size={16} style={{ color: '#00ff88' }} />;
  if (type === 'warning') return <AlertCircle size={16} style={{ color: '#fbbf24' }} />;
  return <Info size={16} style={{ color: '#00f5ff' }} />;
};

export default function UserDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>
          Welcome back, <span className="text-gradient-cyan">{currentUser?.name}!</span>
        </h1>
        <p style={{ color: '#94a3b8' }}>Here's your activity overview for this week.</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {userStats.map(stat => (
          <div key={stat.label} className="neo-card p-4 text-center">
            <div className="text-3xl font-bold text-gradient-cyan">{stat.value}</div>
            <div className="text-sm mt-1" style={{ color: '#94a3b8' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="activity" stroke="#00f5ff" strokeWidth={2} fill="url(#activityGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#e2e8f0' }}>
              <Bell size={18} style={{ color: '#00f5ff' }} /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="flex items-start gap-3 p-2 rounded-md" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {notifIcon(n.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: '#e2e8f0' }}>{n.message}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Settings Display */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Display Name</p>
              <p className="font-medium" style={{ color: '#e2e8f0' }}>{currentUser?.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Email</p>
              <p className="font-medium" style={{ color: '#e2e8f0' }}>{currentUser?.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Role</p>
              <Badge style={{ background: 'rgba(191,0,255,0.15)', color: '#bf00ff', border: '1px solid rgba(191,0,255,0.3)' }}>
                {currentUser?.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
