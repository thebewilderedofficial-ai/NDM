import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Sparkles,
  Share2,
  Globe,
  Award,
  AlertTriangle,
  Building,
  GraduationCap,
  ArrowRight,
  UserCheck,
  Zap,
  Bot,
  BadgeCheck,
} from "lucide-react";

interface PersonaConfig {
  id: string;
  name: string;
  role: string;
  industry: string;
  born: string;
  education: string;
  organizations: string;
  knownFor: string;
  books: string;
  image: string;
  snippet: string;
}

const PERSONAS: PersonaConfig[] = [
  {
    id: "founder",
    name: "Alexander Wright",
    role: "Venture Investor & Tech Entrepreneur",
    industry: "Artificial Intelligence, Venture Capital",
    born: "October 14, 1988 (age 37), San Francisco, CA",
    education: "Stanford University (B.S., Computer Science)",
    organizations: "Apex Frontier Ventures, NeuralMatrix AI",
    knownFor: "Autonomous Enterprise Systems, Early Stage AI Syndicates",
    books: "Architects of Capital (2024), Vector Economics (2022)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    snippet:
      "Alexander Wright is an American tech entrepreneur, angel investor, and enterprise architect recognized for pioneering autonomous workflow infrastructure.",
  },
  {
    id: "executive",
    name: "Dr. Elena Rostova",
    role: "Chief Strategy Advisor & Board Member",
    industry: "Global FinTech, Sovereign Asset Allocation",
    born: "June 22, 1982 (age 43), Geneva, Switzerland",
    education: "London School of Economics (Ph.D. Economics)",
    organizations: "Horizon Sovereign Trust, CrossBorder Alliance",
    knownFor: "Institutional Algorithmic Settlement, Global Macro Policy",
    books: "The Next Monetary Epoch (2023)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    snippet:
      "Dr. Elena Rostova is a Swiss-British economist and sovereign advisory partner counseling top-tier private equity syndicates and multi-billion treasury offices.",
  },
  {
    id: "creator",
    name: "Kaelen Vance",
    role: "Media Producer & Keynote Speaker",
    industry: "Digital Media, Brand Architecture",
    born: "March 11, 1994 (age 31), Austin, TX",
    education: "New York University (Tisch School of the Arts)",
    organizations: "Vance Media Lab, The High-Agency Society",
    knownFor: "Viral Documentary Distribution, Syndicate Storytelling",
    books: "Zero to Ten Million Attention Architecture (2023)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    snippet:
      "Kaelen Vance is a digital media executive and keynote lecturer who has engineered over 2.4 billion organic consumer views across tier-1 publications.",
  },
];

interface CredibilityKnowledgeGraphVisualizerProps {
  onOpenConsultation?: () => void;
  whatsappNumber?: string;
}

export default function CredibilityKnowledgeGraphVisualizer({
  onOpenConsultation,
  whatsappNumber = "+919103908189",
}: CredibilityKnowledgeGraphVisualizerProps) {
  // Switch trigger: false = Without Knowledge Panel (Off), true = With Google Knowledge Panel (On)
  const [hasKnowledgePanel, setHasKnowledgePanel] = useState<boolean>(true);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("founder");

  const currentPersona =
    PERSONAS.find((p) => p.id === selectedPersonaId) || PERSONAS[0];

  const cleanPhone = whatsappNumber.replace("+", "").replace(/\s/g, "");

  const handleConsultationClick = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const message = encodeURIComponent(
        `Hello Notorious Digital Media, I would like to establish and claim my verified Google Knowledge Panel for ${currentPersona.name}.`
      );
      window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
    }
  };

  return (
    <section
      className="py-20 relative overflow-hidden bg-zinc-950/70 border-t border-zinc-900/80"
      id="credibility-visualizer"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-900/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-950/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Google Knowledge Graph Simulator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-tight mb-4">
            Why You Need Better Credibility
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            When high-value clients, venture investors, or journalists Google your
            name, what do they see? Experience the real-time contrast between
            unverified digital obscurity and a verified Google Knowledge Graph.
          </p>

          {/* Persona quick selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mr-1">
              Select Persona:
            </span>
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPersonaId(p.id)}
                style={{ fontSize: "8px" }}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  selectedPersonaId === p.id
                    ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-900 hover:border-zinc-800"
                }`}
              >
                {p.name.split(" ")[0]} ({p.role.split("&")[0].trim()})
              </button>
            ))}
          </div>
        </div>

        {/* Master Switch Trigger Bar */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl py-2.5 px-4 max-w-xl mx-auto mb-8 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="text-xs sm:text-sm font-semibold text-white font-display block">
                {hasKnowledgePanel
                  ? "✓ Active Google Knowledge Panel"
                  : "✗ No Knowledge Panel"}
              </span>
            </div>

            {/* Toggle switch with glowing on/off pill */}
            <div className="flex items-center space-x-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => setHasKnowledgePanel(false)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] font-semibold tracking-wide transition-all cursor-pointer flex items-center space-x-1.5 ${
                  !hasKnowledgePanel
                    ? "bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Without Panel</span>
              </button>

              <button
                onClick={() => setHasKnowledgePanel(true)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] font-semibold tracking-wide transition-all cursor-pointer flex items-center space-x-1.5 ${
                  hasKnowledgePanel
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-cyan-400/40"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <BadgeCheck className="w-3.5 h-3.5 text-cyan-200" />
                <span>With Knowledge Panel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Dynamic Credibility Gauge Bar */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                    hasKnowledgePanel
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {hasKnowledgePanel ? (
                    <ShieldCheck className="w-5 h-5 animate-pulse" />
                  ) : (
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Instant Search Authority Score
                  </h4>
                  <div className="text-xl sm:text-2xl font-black font-display text-white flex items-center space-x-2">
                    <span>{hasKnowledgePanel ? "94 / 100" : "8 / 100"}</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                        hasKnowledgePanel
                          ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                          : "bg-rose-950/80 border-rose-500/40 text-rose-300"
                      }`}
                    >
                      {hasKnowledgePanel
                        ? "Elite Sovereign Authority"
                        : "High Risk of Disqualification"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-zinc-400 font-mono sm:text-right">
                {hasKnowledgePanel ? (
                  <span className="text-emerald-400 flex items-center sm:justify-end gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +86% Conversion Lift
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center sm:justify-end gap-1">
                    <TrendingDown className="w-4 h-4" />
                    74% Client Drop-off
                  </span>
                )}
                <span className="text-[11px] text-zinc-500 block">
                  Measured across 1,200+ partner executive audits
                </span>
              </div>
            </div>

            {/* Visual meter track */}
            <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  hasKnowledgePanel
                    ? "w-[94%] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_12px_#10b981]"
                    : "w-[8%] bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_0_8px_#f43f5e]"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Google SERP Simulated Window */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800/90 shadow-2xl overflow-hidden mb-12">
          {/* Simulated Browser Chrome Top Bar */}
          <div className="bg-zinc-900/90 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-[11px] font-mono text-zinc-400 hidden sm:inline">
                https://www.google.com/search?q={encodeURIComponent(currentPersona.name)}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400">
              <span className="px-2 py-0.5 bg-zinc-800 rounded border border-zinc-700">
                {hasKnowledgePanel ? "Knowledge Graph: ACTIVE" : "Knowledge Graph: MISSING"}
              </span>
            </div>
          </div>

          {/* Google Search Bar Mockup */}
          <div className="px-4 sm:px-8 pt-5 pb-3 border-b border-zinc-900 bg-zinc-950/60">
            <div className="flex items-center space-x-3 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2.5 max-w-xl shadow-inner">
              <Search className="w-4 h-4 text-zinc-500" />
              <span className="text-white text-sm font-medium">
                {currentPersona.name}
              </span>
              <span className="text-zinc-600 text-xs hidden sm:inline">
                {currentPersona.role.split("&")[0]}
              </span>
            </div>

            {/* Search tabs */}
            <div className="flex items-center space-x-4 text-[11px] font-medium text-zinc-400 mt-3 overflow-x-auto pb-1">
              <span className="text-blue-400 border-b-2 border-blue-400 pb-1.5 cursor-pointer font-semibold">
                All
              </span>
              <span className="hover:text-zinc-200 cursor-pointer pb-1.5">News</span>
              <span className="hover:text-zinc-200 cursor-pointer pb-1.5">Images</span>
              <span className="hover:text-zinc-200 cursor-pointer pb-1.5">Videos</span>
              <span className="hover:text-zinc-200 cursor-pointer pb-1.5">Books</span>
              <span className="text-zinc-600 text-[10px] ml-auto hidden md:inline">
                About 1,840,000 results (0.28 seconds)
              </span>
            </div>
          </div>

          {/* Dynamic SERP Body Grid */}
          <div className="p-4 sm:p-7 bg-zinc-950">
            {hasKnowledgePanel ? (
              /* =========================================================
                 WITH KNOWLEDGE PANEL: GRAPH COMES FIRST, OTHER RESULTS FOLLOW
                 ========================================================= */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                {/* 1. Official Google Knowledge Panel Simulated Card (FIRST) */}
                <div className="lg:col-span-5 order-1">
                  <div className="rounded-2xl bg-zinc-900/90 border border-zinc-700/80 p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-all duration-500 animate-in fade-in">
                    {/* Top Glow & Verified Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />
                    
                    {/* Header: Name, Subtitle, Verified Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                            {currentPersona.name}
                          </h3>
                          <BadgeCheck className="w-5 h-5 text-blue-400 shrink-0" title="Google Verified Knowledge Graph Entity" />
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5 font-medium">
                          {currentPersona.role}
                        </p>
                      </div>

                      <div className="flex items-center space-x-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-[10px] text-zinc-300">
                        <Share2 className="w-3 h-3 text-zinc-400" />
                        <span className="font-mono">Claimed</span>
                      </div>
                    </div>

                    {/* Image & Quick Excerpt */}
                    <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-zinc-800">
                      <img
                        src={currentPersona.image}
                        alt={currentPersona.name}
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-zinc-700 shadow-md shrink-0"
                      />
                      <div className="text-xs text-zinc-300 leading-relaxed">
                        <p className="line-clamp-3">
                          {currentPersona.snippet}
                        </p>
                        <span className="text-blue-400 hover:underline cursor-pointer text-[11px] font-semibold mt-1 inline-block">
                          Read more on Wikipedia →
                        </span>
                      </div>
                    </div>

                    {/* Structured Knowledge Graph Data Points */}
                    <div className="space-y-2 text-xs text-zinc-300 mb-4">
                      <div className="flex justify-between py-1 border-b border-zinc-850">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase">Born</span>
                        <span className="font-medium text-right text-zinc-200">{currentPersona.born}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-850">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase">Education</span>
                        <span className="font-medium text-right text-zinc-200">{currentPersona.education}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-850">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase">Ventures</span>
                        <span className="font-medium text-right text-zinc-200">{currentPersona.organizations}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-850">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase">Known for</span>
                        <span className="font-medium text-right text-zinc-200">{currentPersona.knownFor}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-zinc-850">
                        <span className="text-zinc-500 font-mono text-[10px] uppercase">Publications</span>
                        <span className="font-medium text-right text-zinc-200">{currentPersona.books}</span>
                      </div>
                    </div>

                    {/* Profiles Syndicate Icons */}
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-2">
                        Official Verified Profiles (Knowledge Vault URI)
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {["Wikipedia", "LinkedIn", "X (Twitter)", "Crunchbase"].map((net, nidx) => (
                          <div
                            key={nidx}
                            className="bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 rounded-lg p-1.5 text-center text-[9px] font-medium text-zinc-200 flex flex-col items-center gap-1 cursor-pointer transition"
                          >
                            <CheckCircle2 className="w-3 h-3 text-blue-400" />
                            <span className="truncate w-full">{net}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Organic Search Results (FOLLOW AFTER GRAPH) */}
                <div className="lg:col-span-7 space-y-4 order-2">
                  {/* Result 1: Official Verified Website */}
                  <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700 transition">
                    <div className="flex items-center space-x-2 text-[11px] text-zinc-400 mb-1">
                      <Globe className="w-3.5 h-3.5 text-blue-400" />
                      <span>https://www.{currentPersona.name.toLowerCase().replace(/\s+/g, "")}.com</span>
                      <span className="text-emerald-400 font-mono font-semibold">✓ Verified Entity</span>
                    </div>
                    <h3 className="text-blue-400 hover:underline text-lg font-semibold cursor-pointer">
                      {currentPersona.name} | Official Executive Portal &amp; Advisory
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-1.5">
                      Official personal domain for {currentPersona.name} ({currentPersona.role}). Includes verified biography, venture allocations, keynote dates, and direct contact protocol.
                    </p>
                  </div>

                  {/* Result 2: Wikipedia Article */}
                  <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700 transition">
                    <div className="flex items-center space-x-2 text-[11px] text-zinc-400 mb-1">
                      <span className="w-3.5 h-3.5 bg-white text-black font-serif font-bold text-[9px] flex items-center justify-center rounded-sm">W</span>
                      <span>https://en.wikipedia.org/wiki/{currentPersona.name.replace(/\s+/g, "_")}</span>
                    </div>
                    <h3 className="text-blue-400 hover:underline text-lg font-semibold cursor-pointer">
                      {currentPersona.name} - Wikipedia
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-1.5">
                      {currentPersona.snippet}
                    </p>
                  </div>

                  {/* Result 3: Tier-1 Publication (Forbes / Bloomberg) */}
                  <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-850 hover:border-zinc-750 transition">
                    <div className="flex items-center space-x-2 text-[11px] text-zinc-400 mb-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>https://www.forbes.com/profile/{currentPersona.name.toLowerCase().replace(/\s+/g, "-")}</span>
                    </div>
                    <h3 className="text-blue-400 hover:underline text-lg font-semibold cursor-pointer">
                      How {currentPersona.name} is Reshaping {currentPersona.industry.split(",")[0]}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-1.5">
                      In an exclusive conversation, {currentPersona.name} details their proprietary frameworks and the strategic roadmap powering {currentPersona.organizations}.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* =========================================================
                 WITHOUT KNOWLEDGE PANEL: LOW AUTHORITY RESULTS
                 ========================================================= */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Organic Search Results */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Disambiguation & Identity Confusion Warning */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-amber-200">
                        Did you mean: {currentPersona.name} (Real Estate Broker) or Mark {currentPersona.name.split(" ")[1]} (Fitness Coach)?
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-1 block">
                        No canonical Google entity identifier exists. Your search results are fragmented and diluted with dozens of namesakes.
                      </span>
                    </div>
                  </div>

                  {/* Weak, Unverified Generic Result 1 */}
                  <div className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-900 text-zinc-400">
                    <div className="text-[11px] text-zinc-500 mb-1">
                      https://www.peoplesearchdirectory.org/records/{currentPersona.name.toLowerCase().replace(/\s+/g, "-")}
                    </div>
                    <h3 className="text-zinc-400 text-base font-medium">
                      {currentPersona.name} Public Contact Info &amp; Address Lookup
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Find phone numbers, relatives, and background records for {currentPersona.name}. No verified enterprise or executive profile found.
                    </p>
                  </div>

                  {/* Weak, Outdated Social Stub */}
                  <div className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-900 text-zinc-400">
                    <div className="text-[11px] text-zinc-500 mb-1">
                      https://twitter.com/user_9847120398
                    </div>
                    <h3 className="text-zinc-400 text-base font-medium">
                      {currentPersona.name} (@unverified_user) on X
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Last active 3 years ago. Account unverified. Profile photo default avatar.
                    </p>
                  </div>

                  {/* Critical Failure Card */}
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 text-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Google AI Overviews: "Insufficient reliable entity records to generate an authoritative overview."</span>
                    </div>
                    <span className="text-[10px] font-mono bg-rose-900/60 px-2 py-0.5 rounded border border-rose-500/40 text-rose-300">
                      Zero Entity Confidence
                    </span>
                  </div>
                </div>

                {/* Right Column: Empty Ghost Panel */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-950/80 p-8 text-center flex flex-col items-center justify-center min-h-[360px] relative">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                      <ShieldAlert className="w-7 h-7 text-rose-500/70" />
                    </div>

                    <h4 className="text-base font-bold font-display text-zinc-300 mb-1">
                      No Google Knowledge Panel Found
                    </h4>
                    
                    <p className="text-xs text-zinc-500 max-w-xs leading-relaxed mb-6">
                      Google's Knowledge Graph algorithm has not validated this individual as a notable entity. Real estate is surrendered to competitors or namesakes.
                    </p>

                    <div className="w-full bg-zinc-900/60 rounded-xl p-3 border border-zinc-850 text-[11px] text-zinc-400 space-y-2 text-left">
                      <div className="flex items-center space-x-2 text-rose-400">
                        <XCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Entity Trust Status: 0 (Unindexed)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-rose-400">
                        <XCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Meta/X Verification: Automatic Rejection</span>
                      </div>
                      <div className="flex items-center space-x-2 text-rose-400">
                        <XCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>LLM Grounding: Hallucination Risk</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Detailed Breakdown (Negative Impacts vs Sovereign Benefits) */}
        {hasKnowledgePanel ? (
          /* =========================================================
             SOVEREIGN BENEFITS BREAKDOWN (WITH KNOWLEDGE GRAPH)
             ========================================================= */
          <div className="bg-gradient-to-br from-indigo-950/40 via-zinc-900/40 to-cyan-950/30 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                  ✓ Active Sovereign Footprint
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  The Power of a Verified Google Knowledge Panel
                </h3>
              </div>

              <button
                onClick={handleConsultationClick}
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 hover:opacity-95 text-white font-display font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/20 transition flex items-center justify-center space-x-2 cursor-pointer shrink-0"
              >
                <span>Claim Your Google Entity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm mb-1.5">
                  Search Monopolization
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Occupy 65%+ of Google Desktop Page 1. Control the immediate visual impression before anyone scrolls.
                </p>
              </div>

              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                  <Bot className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm mb-1.5">
                  AI Grounding &amp; Citations
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  ChatGPT, Gemini, and Perplexity ingest Google’s Knowledge Graph as fact. You become an algorithmic authority.
                </p>
              </div>

              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm mb-1.5">
                  Fast-Track Verification
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Unlocks expedited verification on Instagram, X, TikTok, and YouTube by linking verified social URIs.
                </p>
              </div>

              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 hover:border-indigo-500/40 transition">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm mb-1.5">
                  3.8x Deal Acceleration
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pre-empts client due diligence hesitation. High-ticket contracts close faster when Google certifies your identity.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================
             NEGATIVE IMPACTS BREAKDOWN (WITHOUT KNOWLEDGE GRAPH)
             ========================================================= */
          <div className="bg-gradient-to-br from-rose-950/40 via-zinc-900/40 to-red-950/30 border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-rose-400 block mb-1">
                  ✗ Unverified Entity Pitfalls
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  How Lack of a Knowledge Panel Destroys Your Credibility
                </h3>
              </div>

              <button
                onClick={() => setHasKnowledgePanel(true)}
                className="bg-zinc-850 hover:bg-zinc-800 text-white font-display font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl border border-zinc-700 transition flex items-center justify-center space-x-2 cursor-pointer shrink-0"
              >
                <span>Simulate Knowledge Panel On</span>
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-zinc-950/70 border border-rose-500/20 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm mb-1.5">
                  74% Due Diligence Drop-off
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Institutional investors and enterprise buyers audit your name before wires. Zero Google entity presence creates silent suspicion.
                </p>
              </div>

              <div className="bg-zinc-950/70 border border-rose-500/20 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm mb-1.5">
                  Impersonation &amp; Spoofing
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Without an official Google entity footprint, bad actors easily spoof your identity, duplicate social handles, and siphon reputation.
                </p>
              </div>

              <div className="bg-zinc-950/70 border border-rose-500/20 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                  <Bot className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm mb-1.5">
                  AI &amp; LLM Blindspot
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Perplexity, ChatGPT, and Gemini query Wikidata and Knowledge Graph. If you aren't in the graph, AI answers report you don't exist.
                </p>
              </div>

              <div className="bg-zinc-950/70 border border-rose-500/20 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm mb-1.5">
                  Rejected Verification
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Platform compliance desks require authoritative primary sources. No Knowledge Graph means instant badge rejection.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Direct Call to Action Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/60 border border-zinc-800 p-4 sm:p-5 rounded-2xl max-w-3xl mx-auto">
            <div className="text-center sm:text-left">
              <span className="text-white font-display font-bold text-sm sm:text-base block">
                Ready to Lock In Your Permanent Google Knowledge Panel?
              </span>
              <span className="text-zinc-400 text-xs">
                Guaranteed entity schema construction, Wikidata anchoring, and full ownership claim.
              </span>
            </div>
            <button
              onClick={handleConsultationClick}
              className="bg-blue-600 hover:bg-blue-500 text-white font-display font-semibold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shrink-0 shadow-md flex items-center space-x-1.5"
            >
              <span>Publish Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
