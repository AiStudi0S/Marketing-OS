import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Brain, TrendingUp, Eye, Users, Globe, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const metrics = [
  { label: 'Signals Tracked', value: '47', icon: <Brain size={20} />, color: '#00f5ff' },
  { label: 'Topics Rising', value: '12', icon: <TrendingUp size={20} />, color: '#bf00ff' },
  { label: 'Competitors Monitored', value: '8', icon: <Eye size={20} />, color: '#00ff88' },
  { label: 'Audience Segments', value: '23', icon: <Users size={20} />, color: '#fbbf24' },
];

const trendingTopics = [
  { topic: 'AI productivity tools', score: 94, platform: 'TikTok', delta: '+38%' },
  { topic: 'Autonomous marketing', score: 88, platform: 'Reddit', delta: '+27%' },
  { topic: 'Brand OS systems', score: 82, platform: 'YouTube', delta: '+21%' },
  { topic: 'No-code AI agents', score: 76, platform: 'Google', delta: '+19%' },
  { topic: 'Growth hacking 2026', score: 71, platform: 'X', delta: '+15%' },
  { topic: 'Swarm marketing', score: 68, platform: 'Reddit', delta: '+13%' },
];

const signalTrend = [
  { day: 'Mon', signals: 32, opportunities: 8 },
  { day: 'Tue', signals: 38, opportunities: 11 },
  { day: 'Wed', signals: 45, opportunities: 14 },
  { day: 'Thu', signals: 41, opportunities: 12 },
  { day: 'Fri', signals: 52, opportunities: 17 },
  { day: 'Sat', signals: 47, opportunities: 15 },
  { day: 'Sun', signals: 58, opportunities: 20 },
];

const audienceSegments = [
  { segment: 'Early Adopters', size: '42K', interest: 'AI Tools', score: 94 },
  { segment: 'Growth Marketers', size: '38K', interest: 'Automation', score: 88 },
  { segment: 'Indie Hackers', size: '29K', interest: 'SaaS', score: 82 },
  { segment: 'Content Creators', size: '51K', interest: 'Short-form video', score: 79 },
  { segment: 'B2B Founders', size: '18K', interest: 'ROI tools', score: 75 },
];

const radarData = [
  { metric: 'Reach', our: 84, avg: 52 },
  { metric: 'Engagement', our: 89, avg: 62 },
  { metric: 'Growth', our: 41, avg: 18 },
  { metric: 'Content Vol', our: 78, avg: 45 },
  { metric: 'SEO', our: 71, avg: 58 },
  { metric: 'Sentiment', our: 92, avg: 67 },
];

const platformColor: Record<string, string> = {
  TikTok: '#e879f9',
  Reddit: '#f97316',
  YouTube: '#ef4444',
  Google: '#00f5ff',
  X: '#94a3b8',
};

export default function BrandIntelligencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-cyan flex items-center gap-2">
          <Brain size={24} /> Brand Intelligence AI
        </h1>
        <p style={{ color: '#94a3b8' }}>Real-time market signals · competitor activity · audience insights</p>
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
        {/* Signal Trend Chart */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Signal Volume This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={signalTrend}>
                <defs>
                  <linearGradient id="sigGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="oppGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#bf00ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#bf00ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
                <Area type="monotone" dataKey="signals" stroke="#00f5ff" strokeWidth={2} fill="url(#sigGrad)" name="Signals" />
                <Area type="monotone" dataKey="opportunities" stroke="#bf00ff" strokeWidth={2} fill="url(#oppGrad)" name="Opportunities" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competitive Radar */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Competitive Position Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar name="Avg" dataKey="avg" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} />
                <Radar name="Our Brand" dataKey="our" stroke="#00f5ff" fill="#00f5ff" fillOpacity={0.25} />
                <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)', color: '#e2e8f0' }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trending Topic Clusters */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#e2e8f0' }}>
            <Globe size={16} style={{ color: '#00f5ff' }} /> Trending Topic Clusters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingTopics.map((t, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-xs font-bold w-5 text-center" style={{ color: '#94a3b8' }}>#{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: '#e2e8f0' }}>{t.topic}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${platformColor[t.platform]}20`, color: platformColor[t.platform] }}>
                        {t.platform}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: '#00ff88' }}>{t.delta}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${t.score}%`, background: 'linear-gradient(90deg, #00f5ff, #bf00ff)' }} />
                  </div>
                </div>
                <div className="text-sm font-bold w-8 text-right" style={{ color: '#00f5ff' }}>{t.score}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audience Segments */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(191,0,255,0.2)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: '#e2e8f0' }}>
            <Users size={16} style={{ color: '#bf00ff' }} /> New Audience Segments Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audienceSegments.map((seg, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(191,0,255,0.05)', border: '1px solid rgba(191,0,255,0.15)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm" style={{ color: '#e2e8f0' }}>{seg.segment}</span>
                  <span className="text-xs font-bold" style={{ color: '#bf00ff' }}>{seg.score}</span>
                </div>
                <div className="text-xs mb-1" style={{ color: '#94a3b8' }}>Interest: {seg.interest}</div>
                <div className="text-sm font-bold" style={{ color: '#00ff88' }}>{seg.size} users</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Intelligence Report Banner */}
      <div className="p-4 rounded-xl flex items-start gap-3"
        style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.2)' }}>
        <AlertCircle size={18} style={{ color: '#00f5ff', flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: '#00f5ff' }}>Daily Intelligence Report Ready</p>
          <p className="text-xs" style={{ color: '#94a3b8' }}>
            Today's report identifies 6 high-opportunity topics, 3 competitor gaps, and 2 emerging audience segments.
            Recommended action: launch 4 new micro-campaigns targeting "AI productivity" and "Autonomous marketing" clusters.
          </p>
        </div>
      </div>
    </div>
  );
}
