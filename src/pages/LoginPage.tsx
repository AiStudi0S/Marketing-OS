import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  const demoUsers = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'dev', password: 'dev123', role: 'Developer' },
    { username: 'user', password: 'user123', role: 'User' },
    { username: 'auditor', password: 'audit123', role: 'Auditor' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 glow-cyan"
            style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))', border: '1px solid rgba(0,245,255,0.3)' }}>
            <span className="text-2xl font-bold text-gradient-main">S</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient-main">SPARK Enterprise</h1>
          <p className="text-slate-400 mt-2 text-sm">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="neo-card p-6 glow-cyan">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" style={{ color: '#94a3b8' }}>Username</Label>
              <Input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-transparent border-white/10 text-white placeholder:text-slate-600"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,245,255,0.2)', color: '#e2e8f0' }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" style={{ color: '#94a3b8' }}>Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,245,255,0.2)', color: '#e2e8f0' }}
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-md p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full font-semibold"
              style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', color: '#0a0a1a', border: 'none' }}
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 neo-card p-4">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2">
            {demoUsers.map(u => (
              <button
                key={u.username}
                onClick={() => { setUsername(u.username); setPassword(u.password); setError(''); }}
                className="text-left p-2 rounded-md hover:bg-white/5 transition-colors"
                style={{ border: '1px solid rgba(0,245,255,0.1)' }}
              >
                <div className="text-xs font-medium" style={{ color: '#00f5ff' }}>{u.role}</div>
                <div className="text-xs text-slate-500">{u.username} / {u.password}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
