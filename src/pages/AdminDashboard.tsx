import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Activity, Server, Clock } from 'lucide-react';

const metrics = [
  { label: 'Total Users', value: '4', icon: <Users size={20} />, color: '#00f5ff' },
  { label: 'Active Sessions', value: '12', icon: <Activity size={20} />, color: '#bf00ff' },
  { label: 'System Load', value: '34%', icon: <Server size={20} />, color: '#00ff88' },
  { label: 'Uptime', value: '99.9%', icon: <Clock size={20} />, color: '#fbbf24' },
];

const usersData = [
  { id: '1', username: 'admin', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
  { id: '2', username: 'dev', name: 'Dev User', email: 'dev@example.com', role: 'developer', status: 'active' },
  { id: '3', username: 'user', name: 'Regular User', email: 'user@example.com', role: 'user', status: 'active' },
  { id: '4', username: 'auditor', name: 'Audit User', email: 'auditor@example.com', role: 'auditor', status: 'active' },
];

const roleStats = [
  { role: 'Admin', count: 1 },
  { role: 'Developer', count: 1 },
  { role: 'User', count: 1 },
  { role: 'Auditor', count: 1 },
];

const auditLogs = (() => {
  const now = Date.now();
  const fmt = (ms: number) => new Date(now - ms).toISOString().replace('T', ' ').slice(0, 19);
  return [
    { time: fmt(2 * 60 * 1000),     action: 'USER_LOGIN',      user: 'admin',   status: 'success' },
    { time: fmt(5 * 60 * 1000),     action: 'SETTINGS_UPDATE', user: 'admin',   status: 'success' },
    { time: fmt(18 * 60 * 1000),    action: 'USER_LOGIN',      user: 'dev',     status: 'success' },
    { time: fmt(34 * 60 * 1000),    action: 'DEPLOY_APP',      user: 'dev',     status: 'success' },
    { time: fmt(47 * 60 * 1000),    action: 'USER_LOGIN',      user: 'user',    status: 'failed'  },
    { time: fmt(62 * 60 * 1000),    action: 'VIEW_LOGS',       user: 'auditor', status: 'success' },
  ];
})();

const roleColor: Record<string, string> = {
  admin: '#00f5ff',
  developer: '#bf00ff',
  user: '#00ff88',
  auditor: '#fbbf24',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-cyan">Admin Dashboard</h1>
        <p style={{ color: '#94a3b8' }}>System overview and management console</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="neo-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: `${m.color}15`, color: m.color }}>{m.icon}</div>
            <div>
              <div className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs" style={{ color: '#94a3b8' }}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
                  <TableHead style={{ color: '#94a3b8' }}>Name</TableHead>
                  <TableHead style={{ color: '#94a3b8' }}>Role</TableHead>
                  <TableHead style={{ color: '#94a3b8' }}>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData.map(u => (
                  <TableRow key={u.id} style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <TableCell style={{ color: '#e2e8f0' }}>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>{u.email}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-0.5 rounded font-semibold uppercase"
                        style={{ background: `${roleColor[u.role]}15`, color: roleColor[u.role], border: `1px solid ${roleColor[u.role]}30` }}>
                        {u.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88' }}>
                        {u.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Role Stats Chart */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={roleStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="role" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
                <Bar dataKey="count" fill="#00f5ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
                <TableHead style={{ color: '#94a3b8' }}>Timestamp</TableHead>
                <TableHead style={{ color: '#94a3b8' }}>Action</TableHead>
                <TableHead style={{ color: '#94a3b8' }}>User</TableHead>
                <TableHead style={{ color: '#94a3b8' }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, i) => (
                <TableRow key={i} style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <TableCell className="font-mono text-xs" style={{ color: '#94a3b8' }}>{log.time}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: '#00f5ff' }}>{log.action}</TableCell>
                  <TableCell style={{ color: '#e2e8f0' }}>{log.user}</TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-0.5 rounded"
                      style={log.status === 'success'
                        ? { background: 'rgba(0,255,136,0.1)', color: '#00ff88' }
                        : { background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                      {log.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
