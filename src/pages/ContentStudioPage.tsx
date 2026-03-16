import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Sparkles, FileText, Video, Image, Mail, Globe, ArrowDown, Clock, CheckCircle2, Loader } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const metrics = [
  { label: 'Assets Generated Today', value: '148', icon: <Sparkles size={20} />, color: '#bf00ff' },
  { label: 'Pipeline Queue', value: '34', icon: <Clock size={20} />, color: '#00f5ff' },
  { label: 'Published This Week', value: '892', icon: <CheckCircle2 size={20} />, color: '#00ff88' },
  { label: 'Avg Generation Time', value: '4.2s', icon: <Loader size={20} />, color: '#fbbf24' },
];

const contentTypes = [
  { type: 'Articles', count: 42, icon: <FileText size={16} />, color: '#00f5ff' },
  { type: 'Short Videos', count: 38, icon: <Video size={16} />, color: '#bf00ff' },
  { type: 'Graphics', count: 31, icon: <Image size={16} />, color: '#00ff88' },
  { type: 'Newsletters', count: 18, icon: <Mail size={16} />, color: '#fbbf24' },
  { type: 'Landing Pages', count: 12, icon: <Globe size={16} />, color: '#f97316' },
  { type: 'Ad Creatives', count: 7, icon: <Sparkles size={16} />, color: '#e879f9' },
];

const volumeData = [
  { day: 'Mon', articles: 18, videos: 14, graphics: 22 },
  { day: 'Tue', articles: 24, videos: 19, graphics: 28 },
  { day: 'Wed', articles: 21, videos: 16, graphics: 19 },
  { day: 'Thu', articles: 29, videos: 23, graphics: 31 },
  { day: 'Fri', articles: 32, videos: 27, graphics: 35 },
  { day: 'Sat', articles: 15, videos: 11, graphics: 17 },
  { day: 'Sun', articles: 22, videos: 18, graphics: 24 },
];

const pipelineSteps = [
  { step: 'Topic Detected', description: 'Brand Intelligence feeds trending topics', color: '#00f5ff', status: 'done' },
  { step: 'Headline Generator', description: 'AI produces 10+ headline variants', color: '#bf00ff', status: 'done' },
  { step: 'Script Generation', description: 'Full content script with hooks & CTAs', color: '#00ff88', status: 'active' },
  { step: 'Media Production', description: 'Video / image / graphic assets created', color: '#fbbf24', status: 'pending' },
  { step: 'Publishing-Ready', description: 'SEO-optimized, formatted per platform', color: '#f97316', status: 'pending' },
];

interface ContentItem {
  id: number;
  title: string;
  type: string;
  status: 'generating' | 'review' | 'published';
  platform: string;
  score: number;
  created: string;
}

const contentQueue: ContentItem[] = [
  { id: 1, title: '7 Ways AI Agents Replace Your Marketing Team', type: 'Article', status: 'published', platform: 'Blog', score: 91, created: '2m ago' },
  { id: 2, title: 'Brand OS Launch Reel — 30s Hook', type: 'Video', status: 'review', platform: 'TikTok', score: 87, created: '8m ago' },
  { id: 3, title: 'AI Swarm Marketing Infographic', type: 'Graphic', status: 'generating', platform: 'Instagram', score: 0, created: 'now' },
  { id: 4, title: 'Autonomous Growth Weekly — Issue #42', type: 'Newsletter', status: 'review', platform: 'Email', score: 84, created: '15m ago' },
  { id: 5, title: 'No-Code AI Stack Landing Page', type: 'Landing Page', status: 'published', platform: 'Web', score: 88, created: '1h ago' },
  { id: 6, title: 'Competitor Gap Analysis Thread', type: 'Article', status: 'generating', platform: 'X', score: 0, created: 'now' },
];

const statusStyle = (status: ContentItem['status']) => {
  if (status === 'published') return { background: 'rgba(0,255,136,0.1)', color: '#00ff88' };
  if (status === 'review') return { background: 'rgba(251,191,36,0.1)', color: '#fbbf24' };
  return { background: 'rgba(191,0,255,0.1)', color: '#bf00ff' };
};

const statusLabel = (status: ContentItem['status']) => {
  if (status === 'generating') return '⏳ Generating';
  if (status === 'review') return '👁 Review';
  return '✓ Published';
};

export default function ContentStudioPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | ContentItem['status']>('all');

  const filtered = activeFilter === 'all' ? contentQueue : contentQueue.filter(c => c.status === activeFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-main flex items-center gap-2">
          <Sparkles size={24} /> AI Content Studio
        </h1>
        <p style={{ color: '#94a3b8' }}>Automated media production · articles · videos · graphics · newsletters</p>
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
        {/* Content Type Breakdown */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(191,0,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Content Types Generated Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentTypes.map((ct, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div style={{ color: ct.color }}>{ct.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm" style={{ color: '#e2e8f0' }}>{ct.type}</span>
                      <span className="text-sm font-bold" style={{ color: ct.color }}>{ct.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full" style={{ width: `${(ct.count / 42) * 100}%`, background: ct.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Volume Chart */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(191,0,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Weekly Production Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#0f0f2a', border: '1px solid rgba(191,0,255,0.2)', color: '#e2e8f0' }} />
                <Bar dataKey="articles" fill="#00f5ff" radius={[2, 2, 0, 0]} name="Articles" stackId="a" />
                <Bar dataKey="videos" fill="#bf00ff" radius={[0, 0, 0, 0]} name="Videos" stackId="a" />
                <Bar dataKey="graphics" fill="#00ff88" radius={[2, 2, 0, 0]} name="Graphics" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Pipeline */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>AI Content Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0">
            {pipelineSteps.map((step, i) => (
              <div key={i} className="flex flex-row md:flex-col items-center gap-2 md:gap-1 flex-1">
                <div className={`flex flex-col md:flex-row items-center gap-2 flex-1 ${i < pipelineSteps.length - 1 ? 'w-full' : ''}`}>
                  <div className="flex-shrink-0 p-2 rounded-lg text-center min-w-[120px]"
                    style={{
                      background: step.status === 'done' ? `${step.color}20` : step.status === 'active' ? `${step.color}15` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${step.status !== 'pending' ? step.color + '40' : 'rgba(255,255,255,0.08)'}`,
                    }}>
                    <div className="text-xs font-semibold mb-0.5"
                      style={{ color: step.status !== 'pending' ? step.color : '#94a3b8' }}>
                      {step.status === 'done' ? '✓ ' : step.status === 'active' ? '⟳ ' : ''}{step.step}
                    </div>
                    <div className="text-xs" style={{ color: '#94a3b8' }}>{step.description}</div>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="hidden md:block flex-1 h-px mx-1" style={{ background: 'rgba(0,245,255,0.2)' }} />
                  )}
                  {i < pipelineSteps.length - 1 && (
                    <ArrowDown size={14} className="md:hidden" style={{ color: '#94a3b8' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Queue */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(191,0,255,0.2)' }}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-3" style={{ color: '#e2e8f0' }}>
            <span>Content Queue</span>
            <div className="flex gap-2">
              {(['all', 'generating', 'review', 'published'] as const).map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className="text-xs px-3 py-1 rounded-full transition-all capitalize"
                  style={activeFilter === f
                    ? { background: 'rgba(191,0,255,0.2)', color: '#bf00ff', border: '1px solid rgba(191,0,255,0.4)' }
                    : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {f}
                </button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filtered.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: '#e2e8f0' }}>{item.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: '#94a3b8' }}>{item.type}</span>
                    <span className="text-xs" style={{ color: '#94a3b8' }}>·</span>
                    <span className="text-xs" style={{ color: '#94a3b8' }}>{item.platform}</span>
                    <span className="text-xs" style={{ color: '#94a3b8' }}>·</span>
                    <span className="text-xs" style={{ color: '#94a3b8' }}>{item.created}</span>
                  </div>
                </div>
                {item.score > 0 && (
                  <div className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(0,245,255,0.1)', color: '#00f5ff' }}>
                    {item.score}
                  </div>
                )}
                <span className="text-xs px-2 py-0.5 rounded flex-shrink-0" style={statusStyle(item.status)}>
                  {statusLabel(item.status)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
