import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, TrendingUp, Star, Globe, Instagram, Youtube, Hash } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const networkMetrics = [
  { label: 'Active Micro-Creators', value: '1,240', icon: <Users size={20} />, color: '#e879f9' },
  { label: 'Total Followers', value: '8.4M', icon: <Star size={20} />, color: '#00f5ff' },
  { label: 'Avg Engagement Rate', value: '7.2%', icon: <TrendingUp size={20} />, color: '#00ff88' },
  { label: 'Platforms Covered', value: '6', icon: <Globe size={20} />, color: '#fbbf24' },
];

const networkGrowth = [
  { month: 'Sep', creators: 48, followers: 320000 },
  { month: 'Oct', creators: 124, followers: 820000 },
  { month: 'Nov', creators: 289, followers: 1940000 },
  { month: 'Dec', creators: 512, followers: 3400000 },
  { month: 'Jan', creators: 784, followers: 5200000 },
  { month: 'Feb', creators: 1020, followers: 7100000 },
  { month: 'Mar', creators: 1240, followers: 8400000 },
];

const platformBreakdown = [
  { platform: 'TikTok', creators: 420, avgFollowers: '12.4K', color: '#00ff88' },
  { platform: 'Instagram', creators: 318, avgFollowers: '8.2K', color: '#e879f9' },
  { platform: 'YouTube', creators: 142, avgFollowers: '18.7K', color: '#ef4444' },
  { platform: 'X', creators: 196, avgFollowers: '4.1K', color: '#94a3b8' },
  { platform: 'Reddit', creators: 108, avgFollowers: '6.8K', color: '#f97316' },
  { platform: 'LinkedIn', creators: 56, avgFollowers: '3.2K', color: '#38bdf8' },
];

const contentPerformance = [
  { niche: 'AI Tools', posts: 3420, eng: 8.4, color: '#00f5ff' },
  { niche: 'Automation', posts: 2810, eng: 7.1, color: '#bf00ff' },
  { niche: 'SaaS Growth', posts: 2140, eng: 6.8, color: '#00ff88' },
  { niche: 'Productivity', posts: 1980, eng: 7.9, color: '#fbbf24' },
  { niche: 'Marketing', posts: 1650, eng: 6.2, color: '#f97316' },
];

interface Creator {
  id: number;
  handle: string;
  niche: string;
  platform: string;
  followers: string;
  engRate: string;
  status: 'growing' | 'viral' | 'stable';
  postsToday: number;
}

const topCreators: Creator[] = [
  { id: 1, handle: '@ai_pulse_01', niche: 'AI Tools', platform: 'TikTok', followers: '142K', engRate: '13.6%', status: 'viral', postsToday: 4 },
  { id: 2, handle: '@autostack_', niche: 'Automation', platform: 'Instagram', followers: '98K', engRate: '9.2%', status: 'growing', postsToday: 3 },
  { id: 3, handle: '@no_code_loop', niche: 'SaaS Growth', platform: 'YouTube', followers: '84K', engRate: '11.4%', status: 'viral', postsToday: 2 },
  { id: 4, handle: '@growth_swarm', niche: 'Marketing', platform: 'X', followers: '71K', engRate: '5.8%', status: 'growing', postsToday: 8 },
  { id: 5, handle: '@brandos_daily', niche: 'AI Tools', platform: 'TikTok', followers: '62K', engRate: '12.1%', status: 'growing', postsToday: 5 },
  { id: 6, handle: '@saas_swarm_x', niche: 'Productivity', platform: 'Instagram', followers: '54K', engRate: '8.7%', status: 'stable', postsToday: 2 },
  { id: 7, handle: '@ai_influence_9', niche: 'AI Tools', platform: 'YouTube', followers: '48K', engRate: '10.3%', status: 'growing', postsToday: 1 },
  { id: 8, handle: '@loop_market', niche: 'Automation', platform: 'Reddit', followers: '41K', engRate: '7.4%', status: 'stable', postsToday: 6 },
];

const statusStyle = (status: Creator['status']) => {
  if (status === 'viral') return { background: 'rgba(239,68,68,0.1)', color: '#ef4444' };
  if (status === 'growing') return { background: 'rgba(0,255,136,0.1)', color: '#00ff88' };
  return { background: 'rgba(148,163,184,0.1)', color: '#94a3b8' };
};

const platformIcon = (p: string) => {
  if (p === 'TikTok') return <Hash size={12} />;
  if (p === 'Instagram') return <Instagram size={12} />;
  if (p === 'YouTube') return <Youtube size={12} />;
  return <Globe size={12} />;
};

const platformColor: Record<string, string> = {
  TikTok: '#00ff88', Instagram: '#e879f9', YouTube: '#ef4444',
  X: '#94a3b8', Reddit: '#f97316', LinkedIn: '#38bdf8',
};

type FilterStatus = 'all' | Creator['status'];

export default function InfluenceNetworkPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filtered = filter === 'all' ? topCreators : topCreators.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#e879f9' }}>
          <Users size={24} /> AI Influence Network
        </h1>
        <p style={{ color: '#94a3b8' }}>1,240 AI micro-creators growing audiences & promoting the brand autonomously</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {networkMetrics.map(m => (
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
        {/* Network Growth Chart */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(232,121,249,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Network Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={networkGrowth}>
                <defs>
                  <linearGradient id="creatorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e879f9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#e879f9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(232,121,249,0.2)', color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="creators" stroke="#e879f9" strokeWidth={2} fill="url(#creatorGrad)" name="Creators" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(232,121,249,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Creators by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {platformBreakdown.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-xs font-semibold w-20" style={{ color: p.color }}>{p.platform}</div>
                  <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(p.creators / 420) * 100}%`, background: p.color }} />
                  </div>
                  <div className="text-xs w-8 font-bold text-right" style={{ color: p.color }}>{p.creators}</div>
                  <div className="text-xs w-16 text-right" style={{ color: '#94a3b8' }}>{p.avgFollowers} avg</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance by Niche */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(232,121,249,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>Content Performance by Niche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {contentPerformance.map((n, i) => (
              <div key={i} className="p-3 rounded-lg text-center"
                style={{ background: `${n.color}08`, border: `1px solid ${n.color}20` }}>
                <div className="font-semibold text-sm mb-1" style={{ color: n.color }}>{n.niche}</div>
                <div className="text-2xl font-bold" style={{ color: '#e2e8f0' }}>{n.posts.toLocaleString()}</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>posts</div>
                <div className="mt-1 text-sm font-semibold" style={{ color: '#00ff88' }}>{n.eng}% eng</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Creators Table */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(232,121,249,0.2)' }}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-3" style={{ color: '#e2e8f0' }}>
            <span>Top AI Micro-Creators</span>
            <div className="flex gap-2">
              {(['all', 'viral', 'growing', 'stable'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-xs px-3 py-1 rounded-full capitalize transition-all"
                  style={filter === f
                    ? { background: 'rgba(232,121,249,0.15)', color: '#e879f9', border: '1px solid rgba(232,121,249,0.3)' }
                    : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {f}
                </button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filtered.map(creator => (
              <div key={creator.id} className="flex items-center gap-3 p-3 rounded-lg flex-wrap" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex-1 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm" style={{ color: '#e879f9' }}>{creator.handle}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded capitalize" style={statusStyle(creator.status)}>
                      {creator.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-xs" style={{ color: platformColor[creator.platform] ?? '#94a3b8' }}>
                      {platformIcon(creator.platform)} {creator.platform}
                    </span>
                    <span className="text-xs" style={{ color: '#94a3b8' }}>· {creator.niche}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-center">
                    <div className="font-bold" style={{ color: '#00f5ff' }}>{creator.followers}</div>
                    <div style={{ color: '#94a3b8' }}>followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: '#00ff88' }}>{creator.engRate}</div>
                    <div style={{ color: '#94a3b8' }}>eng rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: '#fbbf24' }}>{creator.postsToday}</div>
                    <div style={{ color: '#94a3b8' }}>posts/d</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How it works */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(232,121,249,0.15)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>How the AI Influence Network Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              { step: '1. Persona Generation', detail: 'AI creates unique creator personas with defined niche, voice & visual style', color: '#e879f9' },
              { step: '2. Content Production', detail: 'Content Studio generates platform-native posts, scripts & visuals', color: '#bf00ff' },
              { step: '3. Autonomous Publishing', detail: 'Distribution Engine schedules and publishes at optimal times', color: '#00f5ff' },
              { step: '4. Audience Compounding', detail: 'Each creator grows independently, funneling traffic back to brand', color: '#00ff88' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                <div className="font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: item.color }}>{item.step}</div>
                <div style={{ color: '#94a3b8' }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
