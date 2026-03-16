import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Brain, Sparkles, Target, Zap, TrendingUp, DollarSign, BarChart3, Users, ArrowRight, Activity } from 'lucide-react';
import type { Page } from '../types/pages';

/** Each department maps to a navigable page. Distribution Engine, Audience Growth,
 *  Revenue Optimization, and Analytics all live inside the combined Swarm Traffic Engine page. */
const departments = [
  {
    id: 'brand-intelligence',
    name: 'Brand Intelligence AI',
    icon: <Brain size={22} />,
    color: '#00f5ff',
    status: 'active',
    metric: '47 signals',
    description: 'Monitoring trends, competitors & audience shifts',
    page: 'brand-intelligence',
  },
  {
    id: 'content-studio',
    name: 'Content Studio AI',
    icon: <Sparkles size={22} />,
    color: '#bf00ff',
    status: 'active',
    metric: '12 assets/hr',
    description: 'Generating articles, videos & graphics automatically',
    page: 'content-studio',
  },
  {
    id: 'campaigns',
    name: 'Campaign Strategy AI',
    icon: <Target size={22} />,
    color: '#00ff88',
    status: 'active',
    metric: '84 campaigns',
    description: 'Running micro-campaigns across all platforms',
    page: 'campaigns',
  },
  {
    id: 'distribution',
    name: 'Distribution Engine',
    icon: <Zap size={22} />,
    color: '#fbbf24',
    status: 'active',
    metric: '6 channels',
    description: 'Publishing & scheduling across social channels',
    page: 'swarm-traffic',
  },
  {
    id: 'audience-growth',
    name: 'Audience Growth AI',
    icon: <TrendingUp size={22} />,
    color: '#f97316',
    status: 'active',
    metric: '+2.4K/day',
    description: 'SEO loops, viral content & newsletter growth',
    page: 'swarm-traffic',
  },
  {
    id: 'revenue',
    name: 'Revenue Optimization',
    icon: <DollarSign size={22} />,
    color: '#a3e635',
    status: 'active',
    metric: '+18% CVR',
    description: 'A/B testing funnels & pricing experiments',
    page: 'swarm-traffic',
  },
  {
    id: 'influence-network',
    name: 'Influence Network',
    icon: <Users size={22} />,
    color: '#e879f9',
    status: 'active',
    metric: '1,240 creators',
    description: 'AI micro-creators growing audiences autonomously',
    page: 'influence-network',
  },
  {
    id: 'analytics',
    name: 'Analytics & Insights',
    icon: <BarChart3 size={22} />,
    color: '#38bdf8',
    status: 'active',
    metric: 'Real-time',
    description: 'ClickHouse-powered dashboards & forecasting',
    page: 'swarm-traffic',
  },
];

const globalStats = [
  { label: 'Total Impressions', value: '4.2M', delta: '+34%', color: '#00f5ff' },
  { label: 'Active Campaigns', value: '84', delta: '+12', color: '#bf00ff' },
  { label: 'Audience Growth', value: '127K', delta: '+2.4K/d', color: '#00ff88' },
  { label: 'Revenue Index', value: '$18.4K', delta: '+22%', color: '#fbbf24' },
];

const continuousLoop = [
  { step: 'Trend Detected', color: '#00f5ff' },
  { step: 'Content Generated', color: '#bf00ff' },
  { step: 'Campaign Launched', color: '#00ff88' },
  { step: 'Traffic Captured', color: '#fbbf24' },
  { step: 'Audience Grows', color: '#f97316' },
  { step: 'Revenue Optimized', color: '#a3e635' },
];

const recentActivity = [
  { time: '0m ago', msg: 'Swarm detected viral TikTok trend: "AI productivity"', type: 'intelligence' },
  { time: '3m ago', msg: '6 short-form video scripts generated for campaign #084', type: 'content' },
  { time: '7m ago', msg: 'Campaign #083 exceeded CTR target by 42% — scaling budget', type: 'campaign' },
  { time: '11m ago', msg: 'Newsletter A/B test: Subject line B wins (+18% open rate)', type: 'revenue' },
  { time: '15m ago', msg: '340 new subscribers from Reddit organic post', type: 'growth' },
  { time: '22m ago', msg: 'Micro-creator @ai_pulse_83 hit 10K followers milestone', type: 'influence' },
];

const typeColor: Record<string, string> = {
  intelligence: '#00f5ff',
  content: '#bf00ff',
  campaign: '#00ff88',
  revenue: '#fbbf24',
  growth: '#f97316',
  influence: '#e879f9',
};

interface BrandOSPageProps {
  onNavigate: (page: Page) => void;
}

export default function BrandOSPage({ onNavigate }: BrandOSPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient-main">Brand OS — Mission Control</h1>
          <p style={{ color: '#94a3b8' }}>Autonomous Brand Operating System · All departments online</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.3)' }}>
          <Activity size={12} className="animate-pulse" />
          SYSTEM LIVE
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {globalStats.map(s => (
          <div key={s.label} className="neo-card p-4">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{s.label}</div>
            <div className="text-xs mt-1 font-semibold" style={{ color: '#00ff88' }}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* AI Departments Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-3" style={{ color: '#e2e8f0' }}>AI Departments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => onNavigate(dept.page)}
              className="neo-card p-4 text-left transition-all hover:scale-[1.02] group"
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: `${dept.color}15`, color: dept.color }}>
                  {dept.icon}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00ff88' }} />
                  <span className="text-xs" style={{ color: '#00ff88' }}>live</span>
                </div>
              </div>
              <div className="font-semibold text-sm mb-1" style={{ color: '#e2e8f0' }}>{dept.name}</div>
              <div className="text-xs mb-2" style={{ color: '#94a3b8' }}>{dept.description}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: dept.color }}>{dept.metric}</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: dept.color }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Continuous Growth Loop */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle style={{ color: '#e2e8f0' }}>Continuous Growth Loop</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {continuousLoop.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 h-px" style={{ background: `${item.color}30` }} />
                  <div className="text-sm font-medium" style={{ color: item.color }}>{item.step}</div>
                  {i < continuousLoop.length - 1 && (
                    <ArrowRight size={12} style={{ color: '#94a3b8' }} />
                  )}
                </div>
              ))}
              <div className="mt-2 text-xs text-center" style={{ color: '#94a3b8' }}>↺ Loop repeats continuously</div>
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card style={{ background: '#0f0f2a', border: '1px solid rgba(0,245,255,0.2)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#e2e8f0' }}>
              <Activity size={16} style={{ color: '#00f5ff' }} className="animate-pulse" />
              Live Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: typeColor[a.type] }} />
                  <div>
                    <p className="text-xs" style={{ color: '#e2e8f0' }}>{a.msg}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Architecture Overview */}
      <Card style={{ background: '#0f0f2a', border: '1px solid rgba(191,0,255,0.2)' }}>
        <CardHeader>
          <CardTitle style={{ color: '#e2e8f0' }}>
            System Architecture
            <span className="ml-2 text-xs font-normal px-2 py-0.5 rounded" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)', verticalAlign: 'middle' }}>
              conceptual target stack
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
            {[
              { layer: 'Frontend', tech: 'React · Vite · TypeScript', color: '#00f5ff' },
              { layer: 'Backend', tech: 'Node.js · FastAPI', color: '#bf00ff' },
              { layer: 'Data', tech: 'ClickHouse · Kafka', color: '#00ff88' },
              { layer: 'Infra', tech: 'Docker · K8s · AWS', color: '#fbbf24' },
            ].map(item => (
              <div key={item.layer} className="p-3 rounded-lg" style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                <div className="font-semibold mb-1" style={{ color: item.color }}>{item.layer}</div>
                <div style={{ color: '#94a3b8' }}>{item.tech}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
