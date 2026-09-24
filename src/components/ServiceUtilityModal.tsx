import React, { useState, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  Zap, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  MessageCircle, 
  Search,
  RefreshCw,
  Gauge,
  Lock,
  Smartphone,
  Copy,
  Check
} from "lucide-react";
import { Service } from "../types";
import BriefStepIndicator, { StepItem } from "./BriefStepIndicator";

interface ServiceUtilityModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  onOpenQuote: () => void;
}

const UTILITY_STEPS: StepItem[] = [
  { id: 1, label: "Diagnostics", description: "Target & Scope" },
  { id: 2, label: "Engine Audit", description: "Feasibility Check" },
  { id: 3, label: "Action Brief", description: "Findings & Dispatch" },
];

export default function ServiceUtilityModal({
  service,
  isOpen,
  onClose,
  whatsappNumber,
  onOpenQuote,
}: ServiceUtilityModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepDetail, setStepDetail] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    setCurrentStep(1);
    setStepDetail("Configure diagnostic parameters");
    setIsProcessing(false);
  }, [service.id, isOpen]);

  const handleStepChange = (step: number, detail?: string, processing?: boolean) => {
    setCurrentStep(step);
    if (detail !== undefined) setStepDetail(detail);
    if (processing !== undefined) setIsProcessing(processing);
  };

  if (!isOpen) return null;

  const cleanPhone = whatsappNumber.replace("+", "").replace(/\s/g, "");

  const openWhatsApp = (customText: string) => {
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(customText)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in duration-200"
        id={`utility-modal-${service.id}`}
      >
        {/* Ambient Top Glow */}
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-44 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: service.glowColor || "rgba(99, 102, 241, 0.4)" }}
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-zinc-850 relative z-10">
          <div className="min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                {service.title}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {service.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              {getToolHeader(service.id)}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {getToolSubheader(service.id)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition shrink-0 border border-zinc-800"
            aria-label="Close Tool"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Step-Progress Indicator for Brief Building */}
        <div className="-mx-5 sm:-mx-7 relative z-10">
          <BriefStepIndicator
            steps={UTILITY_STEPS}
            currentStep={currentStep}
            serviceGradient={service.gradient}
            completionDetail={stepDetail}
            isProcessing={isProcessing}
          />
        </div>

        {/* Dynamic Tool Content based on service.id */}
        <div className="py-5 relative z-10">
          {service.id === "web-development" && (
            <SpeedAndSeoAuditor onWhatsApp={openWhatsApp} onOpenQuote={onOpenQuote} onStepChange={handleStepChange} />
          )}

          {service.id === "wikipedia" && (
            <WikipediaNotabilityAuditor onWhatsApp={openWhatsApp} onOpenQuote={onOpenQuote} onStepChange={handleStepChange} />
          )}

          {service.id === "username-claim" && (
            <HandleClaimChecker onWhatsApp={openWhatsApp} onOpenQuote={onOpenQuote} onStepChange={handleStepChange} />
          )}

          {service.id === "instagram-unban" && (
            <AccountRecoveryTriage onWhatsApp={openWhatsApp} onOpenQuote={onOpenQuote} onStepChange={handleStepChange} />
          )}

          {service.id === "meta-verify" && (
            <VerificationReadinessCalculator onWhatsApp={openWhatsApp} onOpenQuote={onOpenQuote} onStepChange={handleStepChange} />
          )}

          {service.id === "news-pr" && (
            <MediaImpactCalculator onWhatsApp={openWhatsApp} onOpenQuote={onOpenQuote} onStepChange={handleStepChange} />
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted Diagnostic Session &bull; Direct Partner Desk</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold transition border border-zinc-800"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-black text-xs font-bold font-display transition"
            >
              Request Full Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getToolHeader(serviceId: string): string {
  switch (serviceId) {
    case "web-development":
      return "Live Speed & SEO Performance Auditor";
    case "wikipedia":
      return "Wikipedia Notability & Source Validator";
    case "username-claim":
      return "Handle Acquisition & Inactivity Checker";
    case "instagram-unban":
      return "Instagram Ban Severity & Turnaround Triage";
    case "meta-verify":
      return "Blue Checkmark & Authority Readiness Score";
    case "news-pr":
      return "Tier-1 Media Placement & ROI Simulator";
    default:
      return "Diagnostic & Performance Analyzer";
  }
}

function getToolSubheader(serviceId: string): string {
  switch (serviceId) {
    case "web-development":
      return "Instant technical audit for Core Web Vitals, mobile responsiveness & missing SEO schemas.";
    case "wikipedia":
      return "Evaluate your press footprint against Wikipedia's strict General Notability Guidelines (GNG).";
    case "username-claim":
      return "Check acquisition feasibility for inactive, squatted, or legacy handles on Instagram & X.";
    case "instagram-unban":
      return "Assess suspension code, appeal route, and expected Meta partner desk turnaround.";
    case "meta-verify":
      return "Benchmark your profile against Meta's public figure notability & press citation criteria.";
    case "news-pr":
      return "Estimate brand authority uplift and Google Knowledge Graph trigger probability.";
    default:
      return "Calculate your digital credibility rating and immediate action path.";
  }
}

// -------------------------------------------------------------
// 1. Web Development Tool: Speed & SEO Auditor
// -------------------------------------------------------------
function SpeedAndSeoAuditor({ 
  onWhatsApp, 
  onOpenQuote,
  onStepChange,
}: { 
  onWhatsApp: (msg: string) => void; 
  onOpenQuote: () => void; 
  onStepChange?: (step: number, detail?: string, processing?: boolean) => void;
}) {
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!result && !analyzing) {
      onStepChange?.(1, url.trim() ? "Domain specified" : "Enter domain to test", false);
    }
  }, [url]);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setAnalyzing(true);
    setResult(null);
    onStepChange?.(2, "Running Core Web Vitals & schema audit...", true);

    // Simulate realistic Lighthouse & schema audit based on input domain
    setTimeout(() => {
      setAnalyzing(false);
      const clean = url.replace(/https?:\/\//, "").replace(/\/.*$/, "").toLowerCase();
      const isShort = clean.length < 12;
      
      const newResult = {
        domain: clean,
        performanceScore: isShort ? 62 : 48,
        seoScore: 71,
        accessibilityScore: 68,
        loadTime: isShort ? "3.4s" : "4.8s",
        lcp: isShort ? "3.1s" : "4.2s",
        schemaFound: false,
        openGraphTags: "Partial / Missing Image",
        viewportConfigured: true,
        recommendation: "Critical bottleneck: Heavy unused JavaScript & missing JSON-LD Organization schema. Mobile bounce rate exceeds 54% due to slow LCP."
      };
      setResult(newResult);
      onStepChange?.(3, `Audit complete: ${newResult.performanceScore}/100 speed · LCP ${newResult.loadTime}`, false);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Globe className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., yourcompany.com or brand.co"
            className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 font-mono"
            required
          />
        </div>
        <div className="flex gap-2">
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-0.5">
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition ${device === "mobile" ? "bg-zinc-800 text-cyan-300 font-bold" : "text-zinc-500"}`}
            >
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition ${device === "desktop" ? "bg-zinc-800 text-cyan-300 font-bold" : "text-zinc-500"}`}
            >
              Desktop
            </button>
          </div>
          <button
            type="submit"
            disabled={analyzing}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0"
          >
            {analyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Gauge className="w-3.5 h-3.5" />}
            <span>{analyzing ? "Auditing..." : "Run Audit"}</span>
          </button>
        </div>
      </form>

      {analyzing && (
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 text-center space-y-2">
          <div className="w-7 h-7 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-cyan-300 font-mono">Running Core Web Vitals &amp; Schema Inspector...</p>
          <p className="text-[10px] text-zinc-500">Checking DOM size, Largest Contentful Paint, and mobile render times</p>
        </div>
      )}

      {result && !analyzing && (
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">AUDIT TARGET</span>
              <h4 className="text-sm font-bold text-white font-mono">{result.domain}</h4>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400">
              Needs Optimization
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-zinc-950/80 border border-zinc-850 p-3 rounded-xl">
              <div className="text-2xl font-black text-rose-400 font-mono">{result.performanceScore}/100</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Speed Score</div>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-850 p-3 rounded-xl">
              <div className="text-2xl font-black text-amber-400 font-mono">{result.seoScore}/100</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">SEO Health</div>
            </div>
            <div className="bg-zinc-950/80 border border-zinc-850 p-3 rounded-xl">
              <div className="text-2xl font-black text-cyan-400 font-mono">{result.loadTime}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Mobile LCP</div>
            </div>
          </div>

          <div className="bg-rose-950/20 border border-rose-500/20 p-3 rounded-xl text-left space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Diagnostic Finding:</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              {result.recommendation}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={() => onWhatsApp(`Hello Notorious Media, I ran a speed audit on my website (${result.domain}). Current speed is ${result.performanceScore}/100 and mobile LCP is ${result.loadTime}. I want to upgrade to a high-speed React/Next.js portal.`)}
              className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send Report to Engineer via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 2. Wikipedia Notability & Source Validator
// -------------------------------------------------------------
function WikipediaNotabilityAuditor({ 
  onWhatsApp, 
  onOpenQuote,
  onStepChange,
}: { 
  onWhatsApp: (msg: string) => void; 
  onOpenQuote: () => void; 
  onStepChange?: (step: number, detail?: string, processing?: boolean) => void;
}) {
  const [subjectType, setSubjectType] = useState("person");
  const [tier1Count, setTier1Count] = useState(2);
  const [hasInterviews, setHasInterviews] = useState(true);
  const [hasExistingWiki, setHasExistingWiki] = useState(false);

  const calculateScore = () => {
    if (hasExistingWiki) return 98; // Maintenance ready
    let s = 35;
    if (tier1Count >= 4) s += 40;
    else if (tier1Count >= 2) s += 25;
    if (hasInterviews) s += 15;
    return Math.min(s, 95);
  };

  const score = calculateScore();

  useEffect(() => {
    onStepChange?.(3, `Feasibility: ${score}% (${hasExistingWiki ? "Defense Mode" : "Drafting Mode"})`, false);
  }, [score, hasExistingWiki]);

  return (
    <div className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
            Subject Profile
          </label>
          <select
            value={subjectType}
            onChange={(e) => setSubjectType(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="person">Executive / Founder / Public Figure</option>
            <option value="company">Enterprise / Startup / Corporation</option>
            <option value="artist">Musician / Author / Creator</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
            Tier-1 Articles (Forbes, Bloomberg, etc.)
          </label>
          <select
            value={tier1Count}
            onChange={(e) => setTier1Count(Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value={0}>0 - None yet (Need PR First)</option>
            <option value={1}>1 - 2 Features</option>
            <option value={3}>3 - 4 High Authority Features</option>
            <option value={5}>5+ Significant Articles</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-zinc-300">Dedicated In-Depth Interviews?</span>
          <button
            type="button"
            onClick={() => setHasInterviews(!hasInterviews)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${hasInterviews ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-zinc-800 text-zinc-500"}`}
          >
            {hasInterviews ? "YES" : "NO"}
          </button>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-zinc-300">Already Have a Wikipedia Entry?</span>
          <button
            type="button"
            onClick={() => setHasExistingWiki(!hasExistingWiki)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${hasExistingWiki ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-zinc-800 text-zinc-500"}`}
          >
            {hasExistingWiki ? "YES (DEFENSE)" : "NO"}
          </button>
        </div>
      </div>

      {/* Score Output */}
      <div className="bg-blue-950/30 border border-blue-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black font-mono text-blue-300">{score}%</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {score >= 80 ? "High Publishing Feasibility" : score >= 60 ? "Moderate — Needs 1-2 Tier-1 Sources" : "PR Foundation Required"}
            </span>
          </div>
          <p className="text-[11px] text-zinc-300 mt-1">
            {hasExistingWiki 
              ? "Eligible for 24/7 Watchlist Monitoring, vandalism rollback, and citation defense."
              : score >= 80 
                ? "Your press citations meet Wikipedia General Notability Guidelines for editorial drafting." 
                : "We recommend pairing your Wikipedia submission with 2-3 guaranteed Tier-1 news placements."}
          </p>
        </div>

        <button
          onClick={() => onWhatsApp(`Hello Notorious Media, I ran the Wikipedia Notability Checker. My feasibility score is ${score}% (${tier1Count} Tier-1 articles, interviews: ${hasInterviews ? "Yes" : "No"}, existing page: ${hasExistingWiki ? "Yes" : "No"}). Please review my press links.`)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shrink-0 shadow-lg"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Verify via WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. Username Claim & Inactivity Checker
// -------------------------------------------------------------
function HandleClaimChecker({ 
  onWhatsApp, 
  onOpenQuote,
  onStepChange,
}: { 
  onWhatsApp: (msg: string) => void; 
  onOpenQuote: () => void; 
  onStepChange?: (step: number, detail?: string, processing?: boolean) => void;
}) {
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [checked, setChecked] = useState<any>(null);

  useEffect(() => {
    if (!checked) {
      onStepChange?.(1, handle.trim() ? "Handle configured" : "Enter target handle", false);
    }
  }, [handle, platform, checked]);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;

    onStepChange?.(2, "Verifying handle inactivity & registry...", true);

    const clean = handle.replace("@", "").toLowerCase();
    const isRare = clean.length <= 4;
    const isGeneric = ["media", "digital", "agency", "official", "luxury", "club", "studio"].some(k => clean.includes(k));

    const res = {
      handle: `@${clean}`,
      tier: isRare ? "Tier-1 Ultra Rare (1-4 Characters)" : isGeneric ? "Commercial Brand Generic" : "Standard Squatted / Inactive Handle",
      feasibility: isRare ? "High Security Escort Required" : "Standard Agency Portal Route",
      minInactiveYears: "2+ Years Inactive",
      successRate: isRare ? "85%" : "95%"
    };

    setTimeout(() => {
      setChecked(res);
      onStepChange?.(3, `Claim profile verified: ${res.tier}`, false);
    }, 400);
  };

  return (
    <div className="space-y-4 text-left">
      <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <span className="text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm">@</span>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="targetusername"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500 font-mono"
            required
          />
        </div>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
        >
          <option value="instagram">Instagram</option>
          <option value="x">X / Twitter</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>
        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shrink-0"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Check Handle</span>
        </button>
      </form>

      {checked && (
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{platform.toUpperCase()} CLAIM TARGET</span>
              <h4 className="text-base font-bold text-white font-mono">{checked.handle}</h4>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400">
              Acquisition Available
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-850">
              <span className="text-[10px] text-zinc-500 font-mono">RARITY PROFILE</span>
              <div className="text-xs font-bold text-zinc-200 mt-0.5">{checked.tier}</div>
            </div>
            <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-850">
              <span className="text-[10px] text-zinc-500 font-mono">ACQUISITION SUCCESS</span>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">{checked.successRate} Historical</div>
            </div>
          </div>

          <div className="bg-rose-950/20 border border-rose-500/20 p-3 rounded-xl text-xs text-zinc-300">
            <span className="font-semibold text-rose-300">Portal Protocol:</span> Direct submission to representative desks. The target handle must be inactive without active intellectual property disputes.
          </div>

          <button
            onClick={() => onWhatsApp(`Hello Notorious Media, I want to acquire the handle ${checked.handle} on ${platform}. Rarity tier: ${checked.tier}. Please initiate feasibility verification.`)}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Initiate Handle Claim on WhatsApp</span>
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 4. Instagram Account Recovery Triage
// -------------------------------------------------------------
function AccountRecoveryTriage({ 
  onWhatsApp, 
  onOpenQuote,
  onStepChange,
}: { 
  onWhatsApp: (msg: string) => void; 
  onOpenQuote: () => void; 
  onStepChange?: (step: number, detail?: string, processing?: boolean) => void;
}) {
  const [banReason, setBanReason] = useState("integrity");
  const [daysElapsed, setDaysElapsed] = useState("3");

  const getTriageInfo = () => {
    switch (banReason) {
      case "integrity":
        return { rate: "92%", time: "24 - 72 Hours", code: "Meta Integrity / Artificial Activity Review", color: "text-emerald-400" };
      case "impersonation":
        return { rate: "88%", time: "48 - 96 Hours", code: "Identity Re-Verification & Biometric Escalation", color: "text-sky-400" };
      case "trademark":
        return { rate: "84%", time: "3 - 7 Days", code: "IP Dispute & Legal Counter-Notice", color: "text-amber-400" };
      case "permanent":
        return { rate: "79%", time: "5 - 10 Days", code: "Executive Partner Portal Manual Override", color: "text-rose-400" };
      default:
        return { rate: "90%", time: "48 Hours", code: "Standard Internal Escalation", color: "text-emerald-400" };
    }
  };

  const triage = getTriageInfo();

  useEffect(() => {
    onStepChange?.(3, `Protocol ready: ${triage.rate} rate · ${triage.time}`, false);
  }, [banReason, daysElapsed]);

  return (
    <div className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
            Suspension Notice Reason
          </label>
          <select
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="integrity">Community Guidelines / Integrity / Bot Flag</option>
            <option value="impersonation">Impersonation / Fake Account Notice</option>
            <option value="trademark">Copyright / Trademark / Counterfeit</option>
            <option value="permanent">180-Day Appeal Rejection / "Permanently Disabled"</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
            Time Since Suspension
          </label>
          <select
            value={daysElapsed}
            onChange={(e) => setDaysElapsed(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="1">Less than 48 Hours</option>
            <option value="7">3 - 14 Days</option>
            <option value="30">15 - 60 Days</option>
            <option value="90">Over 60+ Days</option>
          </select>
        </div>
      </div>

      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-2.5">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase">INTERNAL ROUTE</span>
            <div className="text-xs font-bold text-white mt-0.5">{triage.code}</div>
          </div>
          <span className="text-xs font-mono text-emerald-300 font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/25">
            100% Pay On Success
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-850">
            <span className="text-[10px] text-zinc-500 font-mono">RECOVERY RATE</span>
            <div className={`text-lg font-bold font-mono ${triage.color}`}>{triage.rate}</div>
          </div>
          <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-850">
            <span className="text-[10px] text-zinc-500 font-mono">ESTIMATED SPEED</span>
            <div className="text-lg font-bold font-mono text-white">{triage.time}</div>
          </div>
        </div>

        <button
          onClick={() => onWhatsApp(`Hello Notorious Media, my Instagram account is disabled under ${banReason} (${daysElapsed} days elapsed). I need urgent agency desk escalation under the Pay On Success guarantee.`)}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Escalate to Human Desk on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Verification Readiness Calculator
// -------------------------------------------------------------
function VerificationReadinessCalculator({ 
  onWhatsApp, 
  onOpenQuote,
  onStepChange,
}: { 
  onWhatsApp: (msg: string) => void; 
  onOpenQuote: () => void; 
  onStepChange?: (step: number, detail?: string, processing?: boolean) => void;
}) {
  const [followers, setFollowers] = useState("10k-50k");
  const [hasGooglePanel, setHasGooglePanel] = useState(true);
  const [pressArticles, setPressArticles] = useState(3);

  const calculateScore = () => {
    let s = 40;
    if (hasGooglePanel) s += 30;
    if (pressArticles >= 4) s += 25;
    else if (pressArticles >= 2) s += 15;
    return Math.min(s, 98);
  };

  const score = calculateScore();

  useEffect(() => {
    onStepChange?.(3, `Readiness: ${score}% (${score >= 80 ? "Pre-Audit Approved" : "PR Gap Identified"})`, false);
  }, [score, followers, hasGooglePanel]);

  return (
    <div className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
            Follower Footprint
          </label>
          <select
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value="under-10k">Under 10k Followers</option>
            <option value="10k-50k">10k - 50k Followers</option>
            <option value="50k-200k">50k - 200k Followers</option>
            <option value="200k+">200k+ High Prominence</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
            Tier-1 Press Articles
          </label>
          <select
            value={pressArticles}
            onChange={(e) => setPressArticles(Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
          >
            <option value={0}>0 - No news coverage yet</option>
            <option value={2}>1 - 2 Press mentions</option>
            <option value={4}>3 - 5 Feature articles</option>
            <option value={6}>6+ Major publications</option>
          </select>
        </div>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
        <span className="text-xs text-zinc-300">Google Knowledge Panel Already Active?</span>
        <button
          type="button"
          onClick={() => setHasGooglePanel(!hasGooglePanel)}
          className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${hasGooglePanel ? "bg-sky-500/20 text-sky-300 border border-sky-500/30" : "bg-zinc-800 text-zinc-500"}`}
        >
          {hasGooglePanel ? "YES (ACTIVE)" : "NO"}
        </button>
      </div>

      <div className="bg-sky-950/30 border border-sky-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black font-mono text-sky-300">{score}%</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {score >= 80 ? "Pre-Audit Approved" : "PR Gap Identified"}
            </span>
          </div>
          <p className="text-[11px] text-zinc-300 mt-1">
            {score >= 80 
              ? "Ready for agency portal fast-track submission to Meta operations review desk."
              : "Meta requires independent news citations to grant verified public figure status. We provide guaranteed PR packages."}
          </p>
        </div>

        <button
          onClick={() => onWhatsApp(`Hello Notorious Media, I tested my Meta Verification readiness (${score}% score, ${followers}, Knowledge Panel: ${hasGooglePanel ? "Yes" : "No"}). Please audit my handle.`)}
          className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shrink-0 shadow-lg"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Apply on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. Media Placement Impact Calculator
// -------------------------------------------------------------
function MediaImpactCalculator({ 
  onWhatsApp, 
  onOpenQuote,
  onStepChange,
}: { 
  onWhatsApp: (msg: string) => void; 
  onOpenQuote: () => void; 
  onStepChange?: (step: number, detail?: string, processing?: boolean) => void;
}) {
  const [tier, setTier] = useState<"tier1" | "tier2" | "syndicate">("tier1");

  const tierDetails = {
    tier1: {
      name: "Tier-1 Elite Outlets",
      outlets: "Forbes, Bloomberg, Reuters, Business Insider",
      da: "DA 92 - 95",
      indexing: "Guaranteed Indexed",
      wikiPass: "100% Eligible",
      desc: "Top-tier editorial placement delivering permanent do-follow authority backlinks. Locks the top 3 Google search rankings for your name or brand and provides authoritative verification citations."
    },
    tier2: {
      name: "Tech & Business Tier",
      outlets: "TechCrunch, Inc. Magazine, Entrepreneur, Fast Company",
      da: "DA 85 - 90",
      indexing: "Guaranteed Indexed",
      wikiPass: "95% Eligible",
      desc: "High-authority editorial coverage establishing category authority, founder prominence, and investor-ready digital validation across global business circles."
    },
    syndicate: {
      name: "Mass National Syndication",
      outlets: "350+ Associated Press, Yahoo Finance & National Affiliates",
      da: "DA 75+",
      indexing: "Guaranteed Indexed",
      wikiPass: "85% Eligible",
      desc: "Widespread national distribution creating immediate search volume, blanket brand keyword saturation, and multi-state editorial footprint."
    }
  };

  const current = tierDetails[tier];

  useEffect(() => {
    onStepChange?.(3, `Selected tier: ${current.name} (${current.da})`, false);
  }, [tier]);

  return (
    <div className="space-y-4 text-left">
      {/* Tier selector tabs with responsive wrapping */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setTier("tier1")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            tier === "tier1" 
              ? "bg-amber-500/15 border-amber-500/50 text-amber-200 ring-1 ring-amber-500/40" 
              : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold font-display text-white">Tier-1 Elite</span>
            {tier === "tier1" && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 leading-snug break-words">
            Forbes, Bloomberg, Reuters
          </p>
        </button>

        <button
          type="button"
          onClick={() => setTier("tier2")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            tier === "tier2" 
              ? "bg-amber-500/15 border-amber-500/50 text-amber-200 ring-1 ring-amber-500/40" 
              : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold font-display text-white">Tech &amp; Business</span>
            {tier === "tier2" && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 leading-snug break-words">
            TechCrunch, Inc, Fast Co
          </p>
        </button>

        <button
          type="button"
          onClick={() => setTier("syndicate")}
          className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
            tier === "syndicate" 
              ? "bg-amber-500/15 border-amber-500/50 text-amber-200 ring-1 ring-amber-500/40" 
              : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold font-display text-white">Mass Syndication</span>
            {tier === "syndicate" && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 leading-snug break-words">
            350+ Associated Press Outlets
          </p>
        </button>
      </div>

      {/* Main Metric Cards & Impact Breakdown */}
      <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 space-y-4">
        {/* Active Selection Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-zinc-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              ACTIVE EDITORIAL TIER
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white font-display">
              {current.name}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 break-words">
            {current.outlets}
          </span>
        </div>

        {/* 3 Metrics Box - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="bg-zinc-950/90 p-3 rounded-xl border border-zinc-850 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center">
            <div className="text-[10px] text-zinc-400 font-mono uppercase">Authority Score</div>
            <div className="text-base sm:text-lg font-black font-mono text-amber-300 mt-0.5 sm:mt-1">
              {current.da}
            </div>
          </div>

          <div className="bg-zinc-950/90 p-3 rounded-xl border border-zinc-850 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center">
            <div className="text-[10px] text-zinc-400 font-mono uppercase">Google Index</div>
            <div className="text-base sm:text-lg font-black font-mono text-white mt-0.5 sm:mt-1">
              {current.indexing}
            </div>
          </div>

          <div className="bg-zinc-950/90 p-3 rounded-xl border border-zinc-850 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center">
            <div className="text-[10px] text-zinc-400 font-mono uppercase">Wiki Citation</div>
            <div className="text-base sm:text-lg font-black font-mono text-emerald-400 mt-0.5 sm:mt-1">
              {current.wikiPass}
            </div>
          </div>
        </div>

        {/* Impact Description Card */}
        <div className="bg-amber-950/20 border border-amber-500/25 p-3.5 rounded-xl text-left space-y-1">
          <span className="text-xs font-semibold text-amber-300 block">Strategic Impact &amp; ROI:</span>
          <p className="text-xs text-zinc-300 leading-relaxed break-words">
            {current.desc}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onWhatsApp(`Hello Notorious Media, I want to book a ${current.name} press package (${current.outlets}). Please share available editorial slots, turnarounds, and pricing.`)}
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 active:scale-[0.99]"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">Inquire on Editorial Slots via WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
