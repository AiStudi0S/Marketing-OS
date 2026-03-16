import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Target, TrendingUp, DollarSign, Users, Play, Pause, BarChart2, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const metrics = [
  { label: 'Active Campaigns', value: '84', icon: <Target size={20} />, color: '#00ff88' },
  { label: 'Avg CTR', value: '6.4%', icon: <TrendingUp size={20} />, color: '#00f5ff' },
  { label: 'Total Ad Spend', value: '$4.2K', icon: <DollarSign size={20} />, color: '#fbbf24' },
  { label: 'Audiences Targeted', value: '23', icon: <Users size={20} />, color: '#bf00ff' },
];

const platforms = [
  { name: 'Instagram', active: 22, budget: 1200, ctr: 7.2, color: '#e879f9' },
  { name: 'X', active: 18, budget: 800, ctr: 5.8, color: '#94a3b8' },
  { name: 'YouTube', active: 14, budget: 1000, ctr: 8.1, color: '#ef4444' },
  { name: 'Reddit', active: 17, budget: 600, ctr: 6.3, color: '#f97316' },
  { name: 'TikTok', active: 13, budget: 600, ctr: 9.2, color: '#00ff88' },
];

const campaignData = [
  { week: 'W1', impressions: 124000, conversions: 480, ctr: 3.8 },
  { week: 'W2', impressions: 198000, conversions: 820, ctr: 4.1 },
  { week: 'W3', impressions: 267000, conversions: 1240, ctr: 4.6 },
  { week: 'W4', impressions: 341000, conversions: 1780, ctr: 5.2 },
  { week: 'W5', impressions: 428000, conversions: 2350, ctr: 5.5 },
  { week: 'W6', impressions: 512000, conversions: 3100, ctr: 6.1 },
  { week: 'W7', impressions: 634000, conversions: 4080, ctr: 6.4 },
];

interface Campaign {
  id: number;
  name: string;
  platform: string;
  status: 'running' | 'paused' | 'scheduled';
  impressions: string;
  ctr: string;
  spend: string;
  audience: string;
}

const campaigns: Campaign[] = [
  { id: 1, name: 'AI Productivity Hook Series', platform: 'TikTok', status: 'running', impressions: '84K', ctr: '9.2%', spend: '$180', audience: 'Early Adopters' },
  { id: 2, name: 'Brand OS Explainer Thread', platform: 'X', status: 'running', impressions: '41K', ctr: '5.8%', spend: '$90', audience: 'Growth Hackers' },
  { id: 3, name: 'Swarm Marketing Carousel', platform: 'Instagram', status: 'running', impressions: '62K', ctr: '7.4%', spend: '$120', audience: 'Marketers' },
  { id: 4, name: 'AI Tools Deep Dive', platform: 'YouTube', status: 'paused', impressions: '28K', ctr: '8.1%', spend: '$240', audience: 'B2B Founders' },
  { id: 5, name: 'No-Code Automation AMA', platform: 'Reddit', status: 'running', impressions: '19K', ctr: '6.3%', spend: '$60', audience: 'Indie Hackers' },
  { id: 6, name: 'Conversion Rate Sprint', platform: 'Instagram', status: 'scheduled', impressions: '—', ctr: '—', spend: '$200', audience: 'Retargeting' },
];

const statusStyle = (status: Campaign['status']) => {
  if (status === 'running') return { background: 'rgba(0,255,136,0.1)', color: '#00ff88' };
  if (status === 'paused') return { background: 'rgba(251,191,36,0.1)', color: '#fbbf24' };
  return { background: 'rgba(0,245,255,0.1)', color: '#00f5ff' };
};

const platformColor: Record<string, string> = {
  TikTok: '#00ff88', X: '#94a3b8', Instagram: '#e879f9',
  YouTube: '#ef4444', Reddit: '#f97316',
};

const workflowSteps = [
  { step: 'Trend Detected', detail: 'Brand Intelligence feeds signal', color: '#00f5ff' },
  { step: 'Campaign Idea', detail: 'AI generates campaign brief', color: '#bf00ff' },
  { step: 'Content Produced', detail: 'Content Studio creates assets', color: '#00ff88' },
  { step: 'Distribution Scheduled', detail: 'Auto-scheduled across channels', color: '#fbbf24' },
];

type FilterStatus = 'all' | Campaign['status'];

export default function CampaignStrategyPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filtered = filter === 'all' ? campaigns : campaigns.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-cyan flex items-center gap-2">
          <Target size={24} /> Campaign Strategy AI
        </h1>
        <p style={{ color: '#94a3b8' }}>84 micro-campaigns running · autonomous budget allocation · platform targeting</p>
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
        {/* Campaign Growth Chart */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,255,136,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Campaign Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(0,255,136,0.2)', color: '#e2e8f0' }}
                  formatter={(val: number, name: string) => name === 'ctr' ? [`${val}%`, 'CTR'] : [val.toLocaleString(), name]} />
                <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#00f5ff" strokeWidth={2} dot={false} name="Impressions" />
                <Line yAxisId="left" type="monotone" dataKey="conversions" stroke="#bf00ff" strokeWidth={2} dot={false} name="Conversions" />
                <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#00ff88" strokeWidth={2} dot={false} name="ctr" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,255,136,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Platform Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {platforms.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-xs font-semibold w-20" style={{ color: p.color }}>{p.name}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1" style={{ color: '#94a3b8' }}>
                      <span>{p.active} campaigns</span>
                      <span>${p.budget}</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full" style={{ width: `${(p.budget / 1200) * 100}%`, background: p.color }} />
                    </div>
                  </div>
                  <div className="text-xs font-bold w-12 text-right" style={{ color: '#00ff88' }}>{p.ctr}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Campaign Workflow */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#e2e8f0' }}>
            <BarChart2 size={16} style={{ color: '#00f5ff' }} /> Autonomous Campaign Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {workflowSteps.map((step, i) => (
              <div key={i} className="relative p-3 rounded-lg text-center"
                style={{ background: `${step.color}08`, border: `1px solid ${step.color}25` }}>
                <div className="text-xs font-bold mb-1 uppercase tracking-wide" style={{ color: step.color }}>{step.step}</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>{step.detail}</div>
                {i < workflowSteps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden md:block text-xs" style={{ color: '#94a3b8' }}>→</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Campaigns Table */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,255,136,0.2)' }}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-3" style={{ color: '#e2e8f0' }}>
            <span className="flex items-center gap-2">
              <Calendar size={16} style={{ color: '#00ff88' }} /> Micro-Campaigns
            </span>
            <div className="flex gap-2">
              {(['all', 'running', 'paused', 'scheduled'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-xs px-3 py-1 rounded-full capitalize transition-all"
                  style={filter === f
                    ? { background: 'rgba(0,255,136,0.15)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.3)' }
                    : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {f}
                </button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filtered.map(c => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg flex-wrap" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex-1 min-w-[140px]">
                  <p className="text-sm font-medium" style={{ color: '#e2e8f0' }}>{c.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: platformColor[c.platform] ?? '#94a3b8' }}>{c.platform}</span>
                    <span className="text-xs" style={{ color: '#94a3b8' }}>· {c.audience}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs flex-shrink-0">
                  <div className="text-center">
                    <div className="font-bold" style={{ color: '#00f5ff' }}>{c.impressions}</div>
                    <div style={{ color: '#94a3b8' }}>Impr.</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: '#bf00ff' }}>{c.ctr}</div>
                    <div style={{ color: '#94a3b8' }}>CTR</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: '#fbbf24' }}>{c.spend}</div>
                    <div style={{ color: '#94a3b8' }}>Spend</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded capitalize" style={statusStyle(c.status)}>
                    {c.status === 'running' ? <span className="flex items-center gap-1"><Play size={10} />{c.status}</span> :
                      c.status === 'paused' ? <span className="flex items-center gap-1"><Pause size={10} />{c.status}</span> :
                      c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
