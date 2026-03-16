import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Zap, TrendingUp, DollarSign, Mail, ArrowRight, BarChart3 } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar,
} from 'recharts';

/* ────────────── Swarm Traffic Engine ────────────── */

const trafficMetrics = [
  { label: 'Total Impressions', value: '4.2M', delta: '+34%', icon: <Zap size={20} />, color: '#fbbf24' },
  { label: 'Monthly Visitors', value: '284K', delta: '+28%', icon: <TrendingUp size={20} />, color: '#00f5ff' },
  { label: 'Email Subscribers', value: '127K', delta: '+2.4K/d', icon: <Mail size={20} />, color: '#bf00ff' },
  { label: 'Revenue This Month', value: '$18.4K', delta: '+22%', icon: <DollarSign size={20} />, color: '#00ff88' },
];

const trafficGrowth = [
  { month: 'Sep', visitors: 8200, subscribers: 4100 },
  { month: 'Oct', visitors: 14800, subscribers: 8900 },
  { month: 'Nov', visitors: 31000, subscribers: 18200 },
  { month: 'Dec', visitors: 58000, subscribers: 34700 },
  { month: 'Jan', visitors: 112000, subscribers: 67000 },
  { month: 'Feb', visitors: 198000, subscribers: 98000 },
  { month: 'Mar', visitors: 284000, subscribers: 127000 },
];

/* ────────────── Distribution Engine ────────────── */

const channels = [
  { name: 'Instagram', posts: 42, reach: '128K', eng: '8.4%', color: '#e879f9' },
  { name: 'X / Twitter', posts: 87, reach: '94K', eng: '4.2%', color: '#94a3b8' },
  { name: 'YouTube', posts: 12, reach: '68K', eng: '11.3%', color: '#ef4444' },
  { name: 'Reddit', posts: 31, reach: '47K', eng: '7.8%', color: '#f97316' },
  { name: 'TikTok', posts: 28, reach: '214K', eng: '13.6%', color: '#00ff88' },
  { name: 'Email', posts: 8, reach: '127K', eng: '34.1%', color: '#00f5ff' },
];

const scheduleData = [
  { hour: '6am', posts: 3 },
  { hour: '8am', posts: 8 },
  { hour: '10am', posts: 12 },
  { hour: '12pm', posts: 9 },
  { hour: '2pm', posts: 14 },
  { hour: '4pm', posts: 18 },
  { hour: '6pm', posts: 22 },
  { hour: '8pm', posts: 16 },
  { hour: '10pm', posts: 7 },
];

/* ────────────── Audience Growth Engine ────────────── */

const growthStrategies = [
  { name: 'SEO Optimization', contribution: 34, color: '#00f5ff' },
  { name: 'Viral Content Loops', contribution: 28, color: '#bf00ff' },
  { name: 'Newsletter Growth', contribution: 19, color: '#00ff88' },
  { name: 'Community Engagement', contribution: 12, color: '#fbbf24' },
  { name: 'Referral Systems', contribution: 7, color: '#f97316' },
];

const growthLoop = [
  { step: 'Content Published', color: '#00f5ff' },
  { step: 'Traffic Captured', color: '#bf00ff' },
  { step: 'Subscribers Gained', color: '#00ff88' },
  { step: 'Newsletter Drives Traffic', color: '#fbbf24' },
  { step: 'Audience Expands', color: '#f97316' },
];

/* ────────────── Revenue Optimization ────────────── */

const revenueData = [
  { month: 'Sep', revenue: 1200 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 4400 },
  { month: 'Dec', revenue: 7100 },
  { month: 'Jan', revenue: 10200 },
  { month: 'Feb', revenue: 14800 },
  { month: 'Mar', revenue: 18400 },
];

const funnelData = [
  { name: 'Visitors', value: 284000, fill: '#00f5ff' },
  { name: 'Leads', value: 42600, fill: '#bf00ff' },
  { name: 'Trials', value: 12780, fill: '#00ff88' },
  { name: 'Customers', value: 3834, fill: '#fbbf24' },
];

const abTests = [
  { name: 'Hero CTA — "Start Free" vs "Get Access"', winner: '"Get Access"', lift: '+18%', status: 'concluded' },
  { name: 'Pricing Page — Monthly vs Annual toggle', winner: 'Annual default', lift: '+24%', status: 'concluded' },
  { name: 'Email subject: emoji vs plain text', winner: 'Plain text', lift: '+11%', status: 'running' },
  { name: 'Onboarding flow — 3 steps vs 5 steps', winner: '—', lift: '—', status: 'running' },
];

export default function SwarmTrafficPage() {
  return (
    <div className="space-y-8">

      {/* ── Swarm Traffic Engine ── */}
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient-main flex items-center gap-2">
            <Zap size={24} /> Swarm Traffic Engine
          </h1>
          <p style={{ color: '#94a3b8' }}>Self-growing traffic system · audience growth · revenue optimization</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trafficMetrics.map(m => (
            <div key={m.label} className="neo-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div style={{ color: m.color }}>{m.icon}</div>
              </div>
              <div className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs" style={{ color: '#94a3b8' }}>{m.label}</div>
              <div className="text-xs mt-1 font-semibold" style={{ color: '#00ff88' }}>{m.delta}</div>
            </div>
          ))}
        </div>

        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(251,191,36,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Compounding Growth Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trafficGrowth}>
                <defs>
                  <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#bf00ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#bf00ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(251,191,36,0.2)', color: '#e2e8f0' }}
                  formatter={(v: number) => v.toLocaleString()} />
                <Area type="monotone" dataKey="visitors" stroke="#00f5ff" strokeWidth={2} fill="url(#visitGrad)" name="Visitors" />
                <Area type="monotone" dataKey="subscribers" stroke="#bf00ff" strokeWidth={2} fill="url(#subGrad)" name="Subscribers" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* ── Distribution Engine ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#fbbf24' }}>
          <BarChart3 size={20} /> Distribution Engine
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card style={{ background: '#0f0f2a', border: '1px solid rgba(251,191,36,0.2)' }}>
            <CardHeader>
              <CardTitle style={{ color: '#e2e8f0' }}>Channel Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {channels.map((ch, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs font-semibold w-20" style={{ color: ch.color }}>{ch.name}</div>
                    <div className="flex-1 grid grid-cols-3 text-xs text-center gap-2">
                      <div><span className="font-bold" style={{ color: '#e2e8f0' }}>{ch.posts}</span><br /><span style={{ color: '#94a3b8' }}>posts</span></div>
                      <div><span className="font-bold" style={{ color: ch.color }}>{ch.reach}</span><br /><span style={{ color: '#94a3b8' }}>reach</span></div>
                      <div><span className="font-bold" style={{ color: '#00ff88' }}>{ch.eng}</span><br /><span style={{ color: '#94a3b8' }}>eng</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card style={{ background: '#0f0f2a', border: '1px solid rgba(251,191,36,0.2)' }}>
            <CardHeader>
              <CardTitle style={{ color: '#e2e8f0' }}>Optimal Posting Schedule (Today)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={scheduleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hour" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(251,191,36,0.2)', color: '#e2e8f0' }} />
                  <Bar dataKey="posts" fill="#fbbf24" radius={[4, 4, 0, 0]} name="Posts" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Audience Growth Engine ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#00ff88' }}>
          <TrendingUp size={20} /> Audience Growth Engine
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,255,136,0.2)' }}>
            <CardHeader>
              <CardTitle style={{ color: '#e2e8f0' }}>Growth Strategy Mix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {growthStrategies.map((g, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs font-medium w-40" style={{ color: '#e2e8f0' }}>{g.name}</div>
                    <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full" style={{ width: `${g.contribution}%`, background: g.color }} />
                    </div>
                    <div className="text-xs font-bold w-8 text-right" style={{ color: g.color }}>{g.contribution}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,255,136,0.2)' }}>
            <CardHeader>
              <CardTitle style={{ color: '#e2e8f0' }}>Compounding Growth Loop</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 pt-2">
                {growthLoop.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}>
                      {i + 1}
                    </div>
                    <div className="text-sm font-medium" style={{ color: item.color }}>{item.step}</div>
                    {i < growthLoop.length - 1 && (
                      <ArrowRight size={12} className="ml-auto flex-shrink-0" style={{ color: '#94a3b8' }} />
                    )}
                  </div>
                ))}
                <div className="text-xs text-center pt-1" style={{ color: '#94a3b8' }}>↺ Loop creates compounding audience growth</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Revenue Optimization ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#a3e635' }}>
          <DollarSign size={20} /> Revenue Optimization Engine
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card style={{ background: '#0f0f2a', border: '1px solid rgba(163,230,53,0.2)' }}>
            <CardHeader>
              <CardTitle style={{ color: '#e2e8f0' }}>Monthly Revenue Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(163,230,53,0.2)', color: '#e2e8f0' }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#a3e635" strokeWidth={2} dot={{ fill: '#a3e635' }} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card style={{ background: '#0f0f2a', border: '1px solid rgba(163,230,53,0.2)' }}>
            <CardHeader>
              <CardTitle style={{ color: '#e2e8f0' }}>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 pt-2">
                {(() => {
                  const funnelMax = Math.max(...funnelData.map(d => d.value));
                  return funnelData.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-xs w-20 font-medium" style={{ color: '#94a3b8' }}>{item.name}</div>
                      <div className="flex-1 h-7 rounded relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="absolute inset-y-0 left-0 rounded flex items-center px-2"
                          style={{ width: `${(item.value / funnelMax) * 100}%`, background: `${item.fill}25`, borderRight: `2px solid ${item.fill}` }}>
                        </div>
                        <span className="absolute inset-0 flex items-center px-2 text-xs font-bold" style={{ color: item.fill }}>
                          {item.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* A/B Tests */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(163,230,53,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Active A/B Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {abTests.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg flex-wrap" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-sm" style={{ color: '#e2e8f0' }}>{t.name}</p>
                    {t.winner !== '—' && (
                      <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Winner: <span style={{ color: '#a3e635' }}>{t.winner}</span></p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    {t.lift !== '—' && (
                      <span className="font-bold" style={{ color: '#00ff88' }}>{t.lift}</span>
                    )}
                    <span className="px-2 py-0.5 rounded capitalize"
                      style={t.status === 'running'
                        ? { background: 'rgba(0,245,255,0.1)', color: '#00f5ff' }
                        : { background: 'rgba(163,230,53,0.1)', color: '#a3e635' }}>
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
