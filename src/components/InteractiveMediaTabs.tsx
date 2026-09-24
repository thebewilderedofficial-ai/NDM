import React, { useState } from "react";
import {
  ExternalLink,
  Award,
  TrendingUp,
  Search,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Flame,
  FileCheck2,
  Newspaper
} from "lucide-react";

export interface MediaOutlet {
  id: string;
  name: string;
  shortName: string;
  logoSvg: string;
  tagline: string;
  domainAuthority: number; // e.g. 94/100
  monthlyReaders: string; // e.g. "120M+"
  syndicationRate: string; // "Google News + Yahoo"
  wikiEligible: boolean;
  editorialTimeline: string;
  accentColor: string;
  glowColor: string;
  category: "Tier-1 Business" | "Tech & Growth" | "Mainstream News";
  sampleHeadline: string;
  executiveImpact: string;
  features: string[];
}

export const MEDIA_OUTLETS: MediaOutlet[] = [
  {
    id: "forbes",
    name: "Forbes",
    shortName: "Forbes",
    logoSvg: "/media/forbes.svg",
    tagline: "The World's Preeminent Business & Billionaire Authority",
    domainAuthority: 95,
    monthlyReaders: "140M+",
    syndicationRate: "Global Apple News, Google Discover & Bloomberg Terminal",
    wikiEligible: true,
    editorialTimeline: "7 - 14 Days",
    accentColor: "from-blue-600 via-indigo-600 to-sky-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
    category: "Tier-1 Business",
    sampleHeadline: "How [Your Brand / Executive] Is Redefining The Industry Frontier In 2026",
    executiveImpact: "Guarantees top-of-page Google Knowledge Panel validation and high-authority search lock.",
    features: [
      "100% Do-Follow Brand Mentions",
      "Executive Q&A or Dedicated Byline",
      "Direct Wikipedia Secondary Source",
      "Permanent Indexed Editorial Archive"
    ]
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur",
    shortName: "Entrepreneur",
    logoSvg: "/media/entrepreneur.svg",
    tagline: "The #1 Global Hub for Founders, Innovators & Market Leaders",
    domainAuthority: 92,
    monthlyReaders: "45M+",
    syndicationRate: "MSN News, Yahoo Finance & Apple News",
    wikiEligible: true,
    editorialTimeline: "5 - 10 Days",
    accentColor: "from-amber-500 via-orange-600 to-rose-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
    category: "Tier-1 Business",
    sampleHeadline: "Behind The Playbook: How This Founder Scaled An Unstoppable Market Presence",
    executiveImpact: "Solidifies leadership credibility for fundraising, investor decks, and partnership deals.",
    features: [
      "Syndicated Across MSN & Yahoo Finance",
      "Founder Profile & Product Feature",
      "Permanent Lifetime Citation",
      "Verified Social Media Verification Proof"
    ]
  },
  {
    id: "inc",
    name: "Inc. Magazine",
    shortName: "Inc.",
    logoSvg: "/media/inc.svg",
    tagline: "The Gold Standard for High-Growth Company Intelligence",
    domainAuthority: 93,
    monthlyReaders: "38M+",
    syndicationRate: "SmartNews, Google News & Pocket",
    wikiEligible: true,
    editorialTimeline: "7 - 12 Days",
    accentColor: "from-rose-500 via-pink-600 to-purple-600",
    glowColor: "rgba(225, 29, 72, 0.4)",
    category: "Tier-1 Business",
    sampleHeadline: "Why Investors And Industry Insiders Are Betting On This Breakthrough Vision",
    executiveImpact: "Positions your enterprise alongside Inc. 5000 fast-growth disruptors.",
    features: [
      "High Authority Backlink Profile",
      "Editorially Vetted Thought Leadership",
      "Meets Wikipedia Notability Standard",
      "Executive Headshot & Company Showcase"
    ]
  },
  {
    id: "fastcompany",
    name: "Fast Company",
    shortName: "Fast Company",
    logoSvg: "/media/fastcompany.svg",
    tagline: "The Voice of Modern Innovation, Design & Creative Tech",
    domainAuthority: 93,
    monthlyReaders: "32M+",
    syndicationRate: "Bloomberg News Feed & Flipboard Top Stories",
    wikiEligible: true,
    editorialTimeline: "10 - 18 Days",
    accentColor: "from-teal-400 via-emerald-500 to-cyan-600",
    glowColor: "rgba(20, 184, 166, 0.4)",
    category: "Tech & Growth",
    sampleHeadline: "The Most Innovative Move in The Sector: An Inside Look At What Comes Next",
    executiveImpact: "Best-in-class prestige for tech startups, AI innovators, and design leaders.",
    features: [
      "World-Renowned Innovation Indexing",
      "High Social Virality & Newsletter Syndication",
      "Uncompromising Editorial Standards",
      "Ideal for Meta & X Blue Badge Verification"
    ]
  },
  {
    id: "businessinsider",
    name: "Business Insider",
    shortName: "Business Insider",
    logoSvg: "/media/businessinsider.svg",
    tagline: "The Real-Time Pulse of Finance, Markets & Corporate Strategy",
    domainAuthority: 94,
    monthlyReaders: "115M+",
    syndicationRate: "Yahoo Finance, MSN, NewsBreak & Google Top Stories",
    wikiEligible: true,
    editorialTimeline: "6 - 12 Days",
    accentColor: "from-blue-500 via-cyan-500 to-indigo-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
    category: "Tier-1 Business",
    sampleHeadline: "Inside The Fast-Moving Operation Disrupting The Industry Status Quo",
    executiveImpact: "Triggers instant Google Top Stories carousel and AI Overview search citations.",
    features: [
      "Indexed on Google Top Stories within 2 Hours",
      "Direct Secondary Reference for Wiki Admin Desks",
      "Institutional Investor & Wall Street Readership",
      "Comprehensive Multi-Source Syndication"
    ]
  },
  {
    id: "nypost",
    name: "New York Post",
    shortName: "NY Post",
    logoSvg: "/media/nypost.svg",
    tagline: "America's Oldest Continuously Published Mainstream Daily",
    domainAuthority: 91,
    monthlyReaders: "95M+",
    syndicationRate: "Apple News, MSN, Ground News & Dow Jones Wire",
    wikiEligible: true,
    editorialTimeline: "3 - 7 Days",
    accentColor: "from-red-600 via-rose-600 to-amber-600",
    glowColor: "rgba(220, 38, 38, 0.4)",
    category: "Mainstream News",
    sampleHeadline: "Celebrity & Industry Spotlight: The Rise of [Your Name / Brand] in 2026",
    executiveImpact: "Massive consumer reach and lightning-fast turnaround for public awareness.",
    features: [
      "Fastest Turnaround Delivery (3-7 Days)",
      "High Pop-Culture & Business Recognition",
      "Exceptional Organic Search Authority",
      "Direct Mainstream Credibility Proof"
    ]
  }
];

interface InteractiveMediaTabsProps {
  onOpenBrief?: (mediaOutletName: string) => void;
  whatsappNumber: string;
}

export default function InteractiveMediaTabs({
  onOpenBrief,
  whatsappNumber
}: InteractiveMediaTabsProps) {
  const [selectedId, setSelectedId] = useState<string>("forbes");

  const currentOutlet = MEDIA_OUTLETS.find((m) => m.id === selectedId) || MEDIA_OUTLETS[0];

  const cleanPhone = whatsappNumber.replace("+", "").replace(/\s/g, "");

  return (
    <div
      className="w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 lg:p-7 backdrop-blur-md relative overflow-hidden shadow-2xl"
      id="interactive-media-showcase"
    >
      {/* Background ambient color pulse matching active outlet */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 transition-all duration-700 opacity-20"
        style={{ background: currentOutlet.glowColor }}
      />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 pb-6 border-b border-zinc-800/70">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
              <Flame className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>GUARANTEED EDITORIAL PLACEMENTS</span>
            </span>
            <span className="text-zinc-500 font-mono text-xs hidden sm:inline-block">
              Tier-1 Publications
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white tracking-tight flex items-center gap-2">
            <span>Media Authority &amp; Press Wire Showcase</span>
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Direct human editorial desk relationships. We secure permanent, editorially vetted features in world-renowned outlets to permanently lock in Wikipedia notability, Meta verification, and Google 1st page search dominance.
          </p>
        </div>

        {/* Live Authority Status Pill */}
        <div className="bg-zinc-950/80 border border-zinc-800 px-3 py-1.5 rounded-xl flex items-center space-x-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-zinc-300">
            Current Editorial Desk: <strong className="text-white">Active (Q1/Q2 2026)</strong>
          </span>
        </div>
      </div>

      {/* Interactive Publication Selector Tabs */}
      <div className="pt-6">
        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-3 px-1 flex justify-between items-center">
          <span>Select Publication Outlet to Inspect Specifications:</span>
          <span className="text-zinc-500">6 Verified Partners</span>
        </div>

        {/* Scrollable / Responsive Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5" id="media-tabs-bar">
          {MEDIA_OUTLETS.map((outlet) => {
            const isSelected = outlet.id === selectedId;
            return (
              <button
                key={outlet.id}
                onClick={() => setSelectedId(outlet.id)}
                className={`group relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-between text-center select-none cursor-pointer overflow-hidden ${
                  isSelected
                    ? "bg-zinc-850 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)] scale-[1.02]"
                    : "bg-zinc-950/70 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700 hover:scale-[1.01]"
                }`}
                id={`media-tab-${outlet.id}`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />
                )}

                {/* Logo Image */}
                <div className="h-8 flex items-center justify-center w-full px-1 py-0.5 mt-1">
                  <img
                    src={outlet.logoSvg}
                    alt={`${outlet.name} logo`}
                    className={`h-5 sm:h-6 max-w-full object-contain filter transition-all duration-300 ${
                      isSelected
                        ? "brightness-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        : "opacity-75 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Small DA Badge */}
                <div className="mt-2 pt-2 border-t border-zinc-800/80 w-full flex items-center justify-between text-[10px] font-mono">
                  <span className={`${isSelected ? "text-amber-400 font-bold" : "text-zinc-500"}`}>
                    DA {outlet.domainAuthority}
                  </span>
                  <span className={`${isSelected ? "text-zinc-200" : "text-zinc-500"}`}>
                    {outlet.monthlyReaders}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Outlet Detailed Dossier & Live Spec Card */}
      <div
        className="mt-6 bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-5 sm:p-6 lg:p-7 relative overflow-hidden transition-all duration-300"
        id="media-outlet-detail-card"
      >
        {/* Subtle accent border top */}
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${currentOutlet.accentColor}`} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Publication Bio, Headline Mockup, & Metrics */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-zinc-900 border border-zinc-700 text-zinc-300 font-semibold">
                {currentOutlet.category}
              </span>
              <span className="text-zinc-500 text-xs font-mono">
                Domain Authority: <strong className="text-emerald-400 font-bold">{currentOutlet.domainAuthority}/100</strong>
              </span>
              <span className="text-zinc-500 text-xs font-mono">•</span>
              <span className="text-zinc-400 text-xs font-mono">
                {currentOutlet.monthlyReaders} Global Readers
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-white/10 p-2 rounded-lg border border-white/20 shrink-0">
                  <img
                    src={currentOutlet.logoSvg}
                    alt={currentOutlet.name}
                    className="h-6 object-contain"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {currentOutlet.name} Guaranteed Editorial
                </h4>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {currentOutlet.tagline}. {currentOutlet.executiveImpact}
              </p>
            </div>

            {/* Live Publication Simulated Headline Box */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 relative overflow-hidden group">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                <span>VERIFIABLE EDITORIAL BLUEPRINT</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Google News Live
                </span>
              </div>
              <div className="font-display font-bold text-sm sm:text-base text-zinc-100 italic leading-snug">
                "{currentOutlet.sampleHeadline}"
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-zinc-300">
                  <FileCheck2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  Permanent Indexing &amp; Do-Follow Archive
                </span>
                <span className="text-amber-400/90 font-medium">
                  Est. Delivery: {currentOutlet.editorialTimeline}
                </span>
              </div>
            </div>

            {/* Syndication Network Bar */}
            <div className="p-3 bg-zinc-900/50 border border-zinc-850 rounded-xl flex items-start space-x-2 text-xs">
              <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-300 font-medium">Syndication Network: </span>
                <span className="text-zinc-400">{currentOutlet.syndicationRate}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Key Deliverables & Action CTA */}
          <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between h-full space-y-5">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center justify-between">
                <span>Verified Client Deliverables</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>

              <ul className="space-y-2.5">
                {currentOutlet.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Wikipedia Notability Highlight */}
              <div className="mt-4 p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs text-blue-300 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  <strong>Wiki-Ready Citation:</strong> Officially recognized as a reliable independent secondary source by Wikipedia review boards.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <a
                href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hello%20Notorious%20Digital%20Media%2C%20I%20am%20interested%20in%20securing%20a%20guaranteed%20editorial%20feature%20on%20${encodeURIComponent(currentOutlet.name)}.%20Please%20provide%20scope%20and%20rates.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-semibold text-xs py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transition active:scale-[0.99]"
                id={`media-whatsapp-btn-${currentOutlet.id}`}
              >
                <span>Instant {currentOutlet.shortName} Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {onOpenBrief && (
                <button
                  onClick={() => onOpenBrief(currentOutlet.name)}
                  className="w-full bg-zinc-800 hover:bg-zinc-750 text-zinc-200 hover:text-white font-display font-medium text-xs py-2.5 rounded-xl border border-zinc-700 transition"
                >
                  Submit Editorial Pitch Questionnaire
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
