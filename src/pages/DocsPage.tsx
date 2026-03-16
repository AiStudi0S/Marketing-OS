import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';

const sections = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'api-reference', label: 'API Reference' },
  { id: 'components', label: 'Components' },
  { id: 'deployment', label: 'Deployment' },
];

const content: Record<string, React.ReactNode> = {
  'getting-started': (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#00f5ff' }}>Getting Started</h2>
      <p className="mb-4" style={{ color: '#94a3b8' }}>
        SPARK Enterprise is a full-stack enterprise platform built with React, TypeScript, and Tailwind CSS.
        Follow these steps to get up and running.
      </p>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>Prerequisites</h3>
      <ul className="list-disc list-inside mb-4 space-y-1" style={{ color: '#94a3b8' }}>
        <li>Node.js 18+</li>
        <li>npm 9+ or yarn/pnpm</li>
        <li>Git</li>
      </ul>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>Installation</h3>
      <pre className="p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4"
        style={{ background: '#080814', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
{`git clone https://github.com/your-org/spark-enterprise
cd spark-enterprise
npm install
npm run dev`}
      </pre>
      <p style={{ color: '#94a3b8' }}>The app will be available at <span style={{ color: '#00f5ff' }}>http://localhost:5173</span></p>
    </div>
  ),
  'authentication': (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#00f5ff' }}>Authentication</h2>
      <p className="mb-4" style={{ color: '#94a3b8' }}>
        SPARK uses a token-based authentication system with role-based access control (RBAC).
      </p>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>Available Roles</h3>
      <div className="space-y-2 mb-4">
        {[
          { role: 'admin', color: '#00f5ff', desc: 'Full system access, user management, settings' },
          { role: 'developer', color: '#bf00ff', desc: 'API access, deployments, logs, developer tools' },
          { role: 'user', color: '#00ff88', desc: 'Dashboard, settings, basic features' },
          { role: 'auditor', color: '#fbbf24', desc: 'Read-only access to logs, metrics, user list' },
        ].map(r => (
          <div key={r.role} className="flex items-center gap-3 p-3 rounded-lg"
            style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${r.color}20` }}>
            <span className="px-2 py-0.5 rounded text-xs font-bold uppercase" style={{ background: `${r.color}15`, color: r.color }}>{r.role}</span>
            <span style={{ color: '#94a3b8' }}>{r.desc}</span>
          </div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>useAuth Hook</h3>
      <pre className="p-4 rounded-lg text-sm font-mono overflow-x-auto"
        style={{ background: '#080814', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
{`import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { currentUser, isAuthenticated, login, logout, hasPermission } = useAuth();
  
  if (hasPermission('manage:users')) {
    // Render admin UI
  }
}`}
      </pre>
    </div>
  ),
  'api-reference': (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#00f5ff' }}>API Reference</h2>
      <p className="mb-4" style={{ color: '#94a3b8' }}>
        SPARK provides a RESTful API for all platform operations.
      </p>
      {[
        { method: 'GET', path: '/api/users', desc: 'List all users', auth: 'admin, developer, auditor' },
        { method: 'POST', path: '/api/users', desc: 'Create a new user', auth: 'admin' },
        { method: 'PUT', path: '/api/users/:id', desc: 'Update user details', auth: 'admin' },
        { method: 'DELETE', path: '/api/users/:id', desc: 'Delete a user', auth: 'admin' },
        { method: 'GET', path: '/api/metrics', desc: 'System metrics', auth: 'admin, developer, auditor' },
        { method: 'POST', path: '/api/deploy', desc: 'Trigger deployment', auth: 'admin, developer' },
      ].map(ep => (
        <div key={ep.path} className="flex items-start gap-3 p-3 rounded-lg mb-2"
          style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,245,255,0.1)' }}>
          <span className="px-2 py-0.5 rounded text-xs font-bold font-mono mt-0.5"
            style={{ background: ep.method === 'GET' ? 'rgba(0,255,136,0.15)' : ep.method === 'POST' ? 'rgba(0,245,255,0.15)' : ep.method === 'PUT' ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.15)',
              color: ep.method === 'GET' ? '#00ff88' : ep.method === 'POST' ? '#00f5ff' : ep.method === 'PUT' ? '#fbbf24' : '#ef4444' }}>
            {ep.method}
          </span>
          <div>
            <code className="font-mono text-sm" style={{ color: '#e2e8f0' }}>{ep.path}</code>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{ep.desc} • Auth: {ep.auth}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  'components': (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#00f5ff' }}>Components</h2>
      <p className="mb-4" style={{ color: '#94a3b8' }}>
        SPARK is built on top of 45+ pre-built Radix UI components with Neo-Glow styling.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {['Button', 'Card', 'Input', 'Label', 'Badge', 'Alert', 'Dialog', 'Table', 'Tabs', 'Switch', 'Checkbox', 'Select', 'Progress', 'Separator', 'Accordion', 'Avatar'].map(c => (
          <div key={c} className="p-3 rounded-lg text-sm font-mono"
            style={{ background: 'rgba(0,0,0,0.3)', color: '#00f5ff', border: '1px solid rgba(0,245,255,0.1)' }}>
            {`<${c} />`}
          </div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>Usage Example</h3>
      <pre className="p-4 rounded-lg text-sm font-mono overflow-x-auto"
        style={{ background: '#080814', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
{`import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

export function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click Me</Button>
      </CardContent>
    </Card>
  );
}`}
      </pre>
    </div>
  ),
  'deployment': (
    <div>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#00f5ff' }}>Deployment</h2>
      <p className="mb-4" style={{ color: '#94a3b8' }}>
        Deploy SPARK Enterprise to your preferred hosting platform.
      </p>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>Build for Production</h3>
      <pre className="p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4"
        style={{ background: '#080814', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
{`npm run build
# Output in dist/ directory`}
      </pre>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>Deploy to Vercel</h3>
      <pre className="p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4"
        style={{ background: '#080814', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
{`npm i -g vercel
vercel --prod`}
      </pre>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#e2e8f0' }}>Environment Variables</h3>
      <p style={{ color: '#94a3b8' }}>Set these variables in your deployment environment:</p>
      <pre className="p-4 rounded-lg text-sm font-mono overflow-x-auto mt-2"
        style={{ background: '#080814', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
{`VITE_API_URL=https://api.yourapp.com
VITE_APP_ENV=production`}
      </pre>
    </div>
  ),
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-cyan">Documentation</h1>
        <p style={{ color: '#94a3b8' }}>Everything you need to know about SPARK Enterprise</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-48 shrink-0">
          <nav className="space-y-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className="w-full text-left px-3 py-2 rounded-md text-sm transition-all"
                style={activeSection === s.id
                  ? { background: 'rgba(0,245,255,0.1)', color: '#00f5ff', borderLeft: '2px solid #00f5ff' }
                  : { color: '#94a3b8' }}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <Card className="flex-1" style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardContent className="pt-6">
            {content[activeSection]}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
