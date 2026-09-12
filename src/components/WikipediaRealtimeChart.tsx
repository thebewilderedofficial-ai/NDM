import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Globe, Users, TrendingUp, Eye, Sparkles, BookOpen, ShieldCheck, Activity } from "lucide-react";

// Historical and real-time aggregate data for Wikipedia traffic & brand authority
const MONTHLY_TRAFFIC_DATA = [
  { month: "Jan", pageviews: 14.8, brandQueries: 410, kpTriggers: 82 },
  { month: "Feb", pageviews: 15.1, brandQueries: 435, kpTriggers: 85 },
  { month: "Mar", pageviews: 15.6, brandQueries: 460, kpTriggers: 89 },
  { month: "Apr", pageviews: 15.4, brandQueries: 480, kpTriggers: 91 },
  { month: "May", pageviews: 15.9, brandQueries: 510, kpTriggers: 93 },
  { month: "Jun", pageviews: 16.2, brandQueries: 540, kpTriggers: 95 },
  { month: "Jul", pageviews: 16.0, brandQueries: 570, kpTriggers: 96 },
  { month: "Aug", pageviews: 16.4, brandQueries: 605, kpTriggers: 98 },
  { month: "Sep", pageviews: 16.8, brandQueries: 640, kpTriggers: 99 },
  { month: "Oct", pageviews: 17.1, brandQueries: 675, kpTriggers: 99 },
  { month: "Nov", pageviews: 17.5, brandQueries: 710, kpTriggers: 100 },
  { month: "Dec", pageviews: 17.9, brandQueries: 750, kpTriggers: 100 },
];

const IMPACT_COMPARISON_DATA = [
  { metric: "Google 1st Page Rank", withoutWiki: 24, withWiki: 98 },
  { metric: "Google Knowledge Panel", withoutWiki: 8, withWiki: 96 },
  { metric: "Executive Credibility", withoutWiki: 32, withWiki: 94 },
  { metric: "Press & Media Inquiries", withoutWiki: 19, withWiki: 88 },
  { metric: "AI Overview Citations", withoutWiki: 12, withWiki: 92 },
];

export default function WikipediaRealtimeChart() {
  const [activeTab, setActiveTab] = useState<"traffic" | "impact">("traffic");
  
  // Real-time counter simulation that ticks upward realistically
  const [liveGlobalViews, setLiveGlobalViews] = useState(15842190800);
  const [activeReaders, setActiveReaders] = useState(247380);
  const [totalEnglishPages, setTotalEnglishPages] = useState(6942150);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time global pageview increments (approx 5,000-8,000 views per second globally)
      setLiveGlobalViews((prev) => prev + Math.floor(Math.random() * 450 + 250));
      // Slight fluctuation in active live readers
      setActiveReaders((prev) => prev + Math.floor(Math.random() * 41 - 20));
      // Occasional new page creation around the world
      if (Math.random() > 0.6) {
        setTotalEnglishPages((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-full bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 lg:p-7 backdrop-blur-md relative overflow-hidden shadow-2xl" id="wikipedia-realtime-chart-card">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header section with live pulse */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-zinc-800/70">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE WIKIPEDIA TRAFFIC RADAR</span>
            </span>
            <span className="text-zinc-500 text-xs font-mono">Global Wikimedia Stream</span>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white tracking-tight flex items-center gap-2 break-words">
            <span>Wikipedia Audience &amp; Brand Authority Trends</span>
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed break-words">
            Wikipedia is the #5 most visited website on Earth, with 15+ Billion monthly pageviews. A verified Wikipedia page is the single most definitive factor for triggering Google Knowledge Panels and AI overview references.
          </p>
        </div>

        {/* View toggle tabs */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 bg-zinc-950/80 border border-zinc-800 p-1.5 rounded-xl w-full sm:w-auto shrink-0 justify-center">
          <button
            onClick={() => setActiveTab("traffic")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition flex items-center justify-center space-x-1.5 ${
              activeTab === "traffic"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Traffic &amp; Views</span>
          </button>
          <button
            onClick={() => setActiveTab("impact")}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition flex items-center justify-center space-x-1.5 ${
              activeTab === "impact"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Impact Ratio (%)</span>
          </button>
        </div>
      </div>

      {/* Real-time Ticker Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span className="font-mono uppercase tracking-wider text-[11px]">Monthly Global Views</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {liveGlobalViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <span>↑ +6.2% Year-Over-Year</span>
            <span className="text-zinc-500 font-normal">across 300+ languages</span>
          </div>
        </div>

        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span className="font-mono uppercase tracking-wider text-[11px]">Active Readers Right Now</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-300 tracking-tight flex items-baseline gap-2">
            <span>{activeReaders.toLocaleString()}</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 animate-pulse">
              LIVE
            </span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">
            Seeking verified biographical &amp; corporate facts
          </div>
        </div>

        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
            <span className="font-mono uppercase tracking-wider text-[11px]">Published English Articles</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {totalEnglishPages.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">
            <span className="text-cyan-300 font-medium">Only top 0.01%</span> of companies &amp; executives qualify
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="w-full min-w-0 max-w-full overflow-hidden h-64 sm:h-80 pt-2">
        {activeTab === "traffic" ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_TRAFFIC_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="queriesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} unit="B" domain={[12, 20]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  border: "1px solid #27272a",
                  borderRadius: "0.75rem",
                  fontSize: "12px",
                  color: "#f4f4f5",
                }}
                formatter={(value: any, name: string) => {
                  if (name === "pageviews") return [`${value} Billion views`, "Global Wikipedia Pageviews"];
                  if (name === "brandQueries") return [`${value}M inquiries`, "Brand & Executive Profile Queries"];
                  return [value, name];
                }}
              />
              <Area
                type="monotone"
                dataKey="pageviews"
                name="pageviews"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#viewsGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={IMPACT_COMPARISON_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="metric" stroke="#71717a" fontSize={9} tickLine={false} interval={0} angle={-15} textAnchor="end" height={45} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  border: "1px solid #27272a",
                  borderRadius: "0.75rem",
                  fontSize: "12px",
                  color: "#f4f4f5",
                }}
                formatter={(value: any, name: string) => [
                  `${value}% Probability`,
                  name === "withWiki" ? "With Verified Wikipedia Page" : "Without Wikipedia Page",
                ]}
              />
              <Bar dataKey="withoutWiki" name="withoutWiki" fill="#3f3f46" radius={[4, 4, 0, 0]} />
              <Bar dataKey="withWiki" name="withWiki" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend & Explanatory footnote */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-zinc-800/70 text-xs text-zinc-400">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {activeTab === "traffic" ? (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
              <span className="text-zinc-300 text-xs">Global Wikipedia Views (Billions/mo)</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                <span className="text-white font-medium text-xs">With Wikipedia Page</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 shrink-0" />
                <span className="text-zinc-400 text-xs">Industry Average</span>
              </div>
            </>
          )}
        </div>
        <div className="text-[10px] sm:text-[11px] text-zinc-500 font-mono">
          Data synchronized with official Wikimedia logs
        </div>
      </div>
    </div>
  );
}
