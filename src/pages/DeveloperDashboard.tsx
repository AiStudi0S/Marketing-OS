import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const apiEndpoints = [
  { name: '/api/users', status: 'healthy', latency: '42ms', uptime: '99.9%' },
  { name: '/api/auth', status: 'healthy', latency: '18ms', uptime: '100%' },
  { name: '/api/metrics', status: 'degraded', latency: '312ms', uptime: '98.2%' },
  { name: '/api/deploy', status: 'healthy', latency: '89ms', uptime: '99.5%' },
  { name: '/api/logs', status: 'down', latency: 'N/A', uptime: '94.1%' },
];

const logEntries = [
  { level: 'info', time: '14:32:01', msg: 'Server started on port 3000', source: 'server' },
  { level: 'info', time: '14:32:05', msg: 'Database connection established', source: 'db' },
  { level: 'warn', time: '14:35:12', msg: 'High memory usage detected: 78%', source: 'monitor' },
  { level: 'error', time: '14:38:44', msg: 'Failed to connect to Redis: ECONNREFUSED', source: 'cache' },
  { level: 'info', time: '14:40:00', msg: 'Scheduled job "cleanup" completed', source: 'scheduler' },
  { level: 'warn', time: '14:41:33', msg: 'Rate limit threshold approaching for /api/metrics', source: 'ratelimit' },
  { level: 'info', time: '14:42:10', msg: 'User "admin" logged in successfully', source: 'auth' },
  { level: 'error', time: '14:43:55', msg: 'Unhandled promise rejection in worker thread', source: 'worker' },
];

const envVars = [
  { key: 'NODE_ENV', value: 'production' },
  { key: 'API_VERSION', value: 'v2.1.0' },
  { key: 'PORT', value: '3000' },
  { key: 'LOG_LEVEL', value: 'info' },
  { key: 'CACHE_TTL', value: '3600' },
  { key: 'MAX_CONNECTIONS', value: '100' },
];

const deployments = [
  { name: 'API Gateway', version: 'v2.1.0', status: 'running', deployed: '2h ago' },
  { name: 'Auth Service', version: 'v1.8.3', status: 'running', deployed: '1d ago' },
  { name: 'Worker Service', version: 'v1.2.1', status: 'deploying', deployed: 'just now' },
  { name: 'Analytics Engine', version: 'v3.0.0', status: 'stopped', deployed: '3d ago' },
];

const metricsData = [
  { time: '12:00', cpu: 42, memory: 68 },
  { time: '12:10', cpu: 55, memory: 71 },
  { time: '12:20', cpu: 38, memory: 69 },
  { time: '12:30', cpu: 72, memory: 75 },
  { time: '12:40', cpu: 61, memory: 73 },
  { time: '12:50', cpu: 48, memory: 70 },
  { time: '13:00', cpu: 53, memory: 72 },
];

const logColor: Record<string, string> = {
  info: '#00f5ff',
  warn: '#fbbf24',
  error: '#ef4444',
};

const statusIcon = (status: string) => {
  if (status === 'healthy' || status === 'running') return <CheckCircle2 size={14} style={{ color: '#00ff88' }} />;
  if (status === 'degraded' || status === 'deploying') return <AlertCircle size={14} style={{ color: '#fbbf24' }} />;
  return <XCircle size={14} style={{ color: '#ef4444' }} />;
};

export default function DeveloperDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-cyan">Developer Dashboard</h1>
        <p style={{ color: '#94a3b8' }}>API health, logs, deployments, and system metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Health */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>API Health Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {apiEndpoints.map(ep => (
                <div key={ep.name} className="flex items-center justify-between p-2 rounded-md"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-2">
                    {statusIcon(ep.status)}
                    <span className="font-mono text-sm" style={{ color: '#e2e8f0' }}>{ep.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#94a3b8' }}>
                    <span>{ep.latency}</span>
                    <span>{ep.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deployments */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {deployments.map(d => (
                <div key={d.name} className="flex items-center justify-between p-2 rounded-md"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-2">
                    {statusIcon(d.status)}
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#e2e8f0' }}>{d.name}</div>
                      <div className="text-xs font-mono" style={{ color: '#94a3b8' }}>{d.version}</div>
                    </div>
                  </div>
                  <div className="text-xs" style={{ color: '#94a3b8' }}>{d.deployed}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics Chart */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>System Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="cpu" stroke="#00f5ff" strokeWidth={2} dot={false} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#bf00ff" strokeWidth={2} dot={false} name="Memory %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Log Viewer */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Log Viewer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-xs space-y-1 max-h-64 overflow-y-auto">
              {logEntries.map((log, i) => (
                <div key={i} className="flex items-start gap-2 p-1 rounded" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <span style={{ color: '#94a3b8' }}>{log.time}</span>
                  <span className="uppercase font-bold w-10" style={{ color: logColor[log.level] }}>{log.level}</span>
                  <span style={{ color: '#64748b' }}>[{log.source}]</span>
                  <span style={{ color: '#e2e8f0' }}>{log.msg}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Environment Variables */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {envVars.map(v => (
                <div key={v.key} className="flex items-center justify-between p-2 rounded-md font-mono text-xs"
                  style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <span style={{ color: '#00f5ff' }}>{v.key}</span>
                  <span style={{ color: '#e2e8f0' }}>{v.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
