import React, { useEffect } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Clock, 
  Award, 
  TrendingUp, 
  Globe, 
  Cpu, 
  BadgeCheck, 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  ChevronRight, 
  ExternalLink,
  Zap,
  Lock,
  ArrowUpRight,
  AlertCircle,
  Menu
} from "lucide-react";
import { Service } from "../types";
import { EXTENDED_SERVICE_DATA } from "../data/serviceDetails";
import Interactive3DStage from "./Interactive3DStage";
import WikipediaRealtimeChart from "./WikipediaRealtimeChart";
import ServiceDiagnosticTool from "./ServiceDiagnosticTool";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";
import ScrollProgressBar from "./ScrollProgressBar";

interface ServiceDetailPageProps {
  service: Service;
  allServices: Service[];
  onSelectService: (service: Service) => void;
  onBackToHome: () => void;
  onOpenBriefModal: (service: Service) => void;
  whatsappNumber: string;
  onOpenMenu?: () => void;
}

export default function ServiceDetailPage({
  service,
  allServices,
  onSelectService,
  onBackToHome,
  onOpenBriefModal,
  whatsappNumber,
  onOpenMenu,
}: ServiceDetailPageProps) {
  const ext = EXTENDED_SERVICE_DATA[service.id] || EXTENDED_SERVICE_DATA["wikipedia"];

  // Scroll to top when service detail mounts or switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [service.id]);

  const cleanPhone = whatsappNumber.replace("+", "").replace(/\s/g, "");

  const getWhatsAppUrl = (customText?: string) => {
    const text = customText || ext.whatsappPreset || `Hello Notorious Digital Media, I would like to inquire about your ${service.title} service.`;
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "Globe": return Globe;
      case "ShieldCheck": return ShieldCheck;
      case "Cpu": return Cpu;
      case "Award": return Award;
      case "BadgeCheck": return BadgeCheck;
      case "TrendingUp": return TrendingUp;
      case "Clock": return Clock;
      default: return Sparkles;
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-zinc-950 text-stone-200 relative pb-20 selection:bg-indigo-500/30 selection:text-white" id={`service-page-${service.id}`}>
      {/* Visual Ambient Atmosphere Glows - Contained to prevent horizontal document overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[min(550px,100vw)] h-[min(550px,100vw)] bg-indigo-900/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-0 w-[min(450px,100vw)] h-[min(450px,100vw)] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Sub-Header Navigation */}
      <div className="sticky top-0 z-50 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900/90 w-full shadow-sm relative" id="service-subnav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-xl shrink-0"
              id="back-to-home-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Services</span>
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-xs text-zinc-500 min-w-0">
              <span>/</span>
              <span className="text-white font-medium truncate">{service.title}</span>
            </div>
          </div>

          {/* Quick Service Switcher Pills */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-zinc-900/60 border border-zinc-800/80 p-1 rounded-xl shrink-0">
            {allServices.map((srv) => (
              <button
                key={srv.id}
                onClick={() => onSelectService(srv)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  srv.id === service.id
                    ? "bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {srv.title.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Hamburger Services Menu Button */}
            {onOpenMenu && (
              <button
                onPointerDown={(e) => {
                  if (e.button === 0) onOpenMenu();
                }}
                onClick={onOpenMenu}
                className="group bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 px-3 py-2 rounded-xl flex items-center space-x-1.5 text-xs font-semibold tracking-wide transition shadow-sm shrink-0 cursor-pointer select-none active:scale-95"
                aria-label="Open Services Navigation Menu"
                id="service-detail-menu-btn"
              >
                <Menu className="w-4 h-4 text-zinc-400 group-hover:text-white transition" />
                <span className="font-display">Services</span>
              </button>
            )}
          </div>
        </div>

        {/* Glowy Scroll Progress Bar on the below side of sub-header */}
        <ScrollProgressBar gradient={service.gradient} />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Text Content column */}
          <div className="lg:col-span-7 text-left">
            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>{service.badge}</span>
              </span>
              <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs font-mono">
                Duration: {service.avgTimeline}
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono font-medium">
                {service.difficulty}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight mb-5">
              {ext.heroHeadline}
            </h1>

            <p className="text-[12px] sm:text-base md:text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
              {ext.heroSubheadline}
            </p>

            {/* Urgency Hook Card */}
            <div className="bg-zinc-900/80 border-l-4 border-indigo-500 border-y border-r border-zinc-800/80 rounded-r-2xl p-4 mb-8">
              <p className="text-[10px] sm:text-xs md:text-sm text-zinc-300 font-medium leading-relaxed">
                💡 <span className="text-white font-semibold">Key Market Reality:</span> {ext.urgentHook}
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenBriefModal(service)}
                className={`bg-gradient-to-r ${service.gradient} text-white font-display font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center space-x-2`}
                id="hero-open-brief-btn"
              >
                <span>Request Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-750 text-white font-display font-semibold text-sm px-6 py-3.5 rounded-xl hover:border-zinc-600 transition flex items-center justify-center space-x-2"
                id="hero-whatsapp-direct-btn"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Consultation</span>
              </a>
            </div>

            {/* Guarantee footnote */}
            <p className="text-[8px] sm:text-[10px] md:text-[11px] text-zinc-500 font-mono mt-3 flex items-center space-x-1.5">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
              <span>{ext.guaranteeText}</span>
            </p>
          </div>

          {/* Hologram Biometric Interactive Stage column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Interactive3DStage
              serviceId={service.id}
              title={service.title}
              badge={service.badge}
              gradient={service.gradient}
              whatsappNumber={whatsappNumber}
            />
          </div>

        </div>
      </section>

      {/* Metrics Bar */}
      <section className="border-y border-zinc-900 bg-zinc-950/60 py-8 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {ext.clientStats.map((st, i) => (
              <div key={i} className="text-left border-l border-zinc-800/80 pl-3 sm:pl-4 min-w-0">
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-white tracking-tight break-words">
                  {st.value}
                </div>
                <div className="text-xs font-semibold text-zinc-300 mt-0.5 break-words">{st.label}</div>
                <div className="text-[10px] sm:text-[11px] text-zinc-500 font-mono mt-0.5 break-words">{st.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL HIGHLIGHT: Wikipedia Real-Time Traffic Radar & Authority Chart */}
      {service.id === "wikipedia" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full overflow-hidden" id="wikipedia-analytics-section">
          <div className="mb-6">
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block">
              Verified Wikimedia Foundation Live Telemetry
            </span>
          </div>
          <WikipediaRealtimeChart />
        </section>
      )}

      {/* SPECIAL HIGHLIGHT: Wikipedia Maintenance Support Section */}
      {service.id === "wikipedia" && ext.maintenanceDetails && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full overflow-hidden" id="wikipedia-maintenance-section">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/50 to-zinc-950 border-2 border-indigo-500/40 p-5 sm:p-8 lg:p-10 shadow-2xl">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-amber-400 text-black text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>PREMIUM MAINTENANCE &amp; DEFENSE</span>
                </span>
                <span className="text-xs font-mono text-zinc-400">Available 24/7/365</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mb-3 break-words">
                {ext.maintenanceDetails.title}
              </h3>

              <p className="text-[11px] sm:text-sm md:text-base text-zinc-300 max-w-3xl leading-relaxed mb-6">
                {ext.maintenanceDetails.description}
              </p>

              {/* Maintenance Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
                {ext.maintenanceDetails.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-start space-x-3 bg-zinc-950/70 border border-indigo-500/20 rounded-xl p-3.5 min-w-0">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm text-zinc-200 font-medium leading-normal break-words">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Call to action for maintenance */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={getWhatsAppUrl("Hello Notorious Digital Media, I already have a published Wikipedia page and I want to start your 24/7 Page Maintenance & Content Defense plan.")}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white hover:bg-zinc-100 text-black font-display font-bold text-xs px-6 py-3.5 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg text-center"
                  id="wikipedia-maintenance-cta"
                >
                  <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="break-words">{ext.maintenanceDetails.ctaText}</span>
                </a>
                <button
                  onClick={() => onOpenBriefModal(service)}
                  className="bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-500/40 text-white font-display font-semibold text-xs px-5 py-3.5 rounded-xl transition text-center"
                >
                  Submit Page Link for Free Audit
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Diagnostic / Eligibility Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full overflow-hidden">
        <ServiceDiagnosticTool
          serviceId={service.id}
          whatsappNumber={whatsappNumber}
          onOpenBrief={() => onOpenBriefModal(service)}
        />
      </section>

      {/* Detailed Amazing Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 w-full overflow-hidden" id="detailed-benefits">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            Unrivaled Competitive Advantages
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight mt-2 break-words">
            Amazing Benefits You Unlock
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-zinc-400 mt-2">
            Discover why industry leaders, top executives, and high-growth brands rely on this exact service to command prestige and digital dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ext.detailedBenefits.map((ben, bidx) => {
            const Icon = getIcon(ben.iconType);
            return (
              <div
                key={bidx}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-700 transition duration-300 hover:shadow-xl hover:shadow-black/60 group min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 truncate max-w-[160px]">
                      {ben.impactTag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-indigo-300 transition-colors break-words">
                    {ben.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed break-words">
                    {ben.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-800/50 flex items-center text-[10px] sm:text-[11px] font-mono text-zinc-500">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
                  <span className="truncate">Guaranteed Agency Execution Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Phase Proven Execution Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full overflow-hidden">
        <div className="bg-zinc-900/30 border border-zinc-900 rounded-3xl p-5 sm:p-8 lg:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Operational Protocol
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mt-1 break-words">
              How We Execute Your Campaign
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Strict, white-glove project delivery from initial intake to permanent indexing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ext.processSteps.map((ps, pidx) => (
              <div
                key={pidx}
                className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 relative flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="flex justify-between items-center mb-3 gap-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest truncate">
                      {ps.step}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 shrink-0">
                      {ps.duration}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-display font-bold text-white mb-2 break-words">
                    {ps.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed break-words">
                    {ps.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Checklist & Specific FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Deliverables */}
          <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-7 min-w-0">
            <h4 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Full Scope Deliverables</span>
            </h4>
            <p className="text-xs text-zinc-400 mb-5">
              Everything provided in your verified service agreement:
            </p>

            <ul className="space-y-3">
              {ext.deliverables.map((deliv, didx) => (
                <li key={didx} className="flex items-start space-x-2.5 text-xs text-zinc-300 min-w-0">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="break-words">{deliv}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-zinc-800/60">
              <button
                onClick={() => onOpenBriefModal(service)}
                className="w-full bg-white hover:bg-zinc-100 text-black font-display font-bold text-xs py-3 rounded-xl transition text-center"
              >
                Request Quote for {service.title}
              </button>
            </div>
          </div>

          {/* Specific FAQs */}
          <div className="lg:col-span-7 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-5 sm:p-7 min-w-0">
            <h4 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>{service.title} Advisory FAQ</span>
            </h4>
            <p className="text-xs text-zinc-400 mb-5">
              Direct operational answers from our senior partners:
            </p>

            <div className="space-y-3.5">
              {ext.specificFaqs.map((faq, fidx) => (
                <div key={fidx} className="bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-4 min-w-0">
                  <h5 className="text-xs sm:text-sm font-semibold text-white mb-1.5 break-words">
                    {faq.q}
                  </h5>
                  <p className="text-xs text-zinc-400 leading-relaxed break-words">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 w-full overflow-hidden">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-zinc-900 border border-indigo-500/40 p-5 sm:p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-white mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Priority Queue Open</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white tracking-tight mb-3 break-words">
            Ready to Lock In Your Authority?
          </h3>

          <p className="text-xs sm:text-base text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed break-words">
            {ext.conversionPunch}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onOpenBriefModal(service)}
              className={`w-full sm:w-auto bg-gradient-to-r ${service.gradient} text-white font-display font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg transition hover:scale-[1.01]`}
            >
              Request Quote
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs px-8 py-3.5 rounded-xl flex items-center justify-center space-x-2 transition shadow-md text-center"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Direct WhatsApp (+91 9103908189)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Elegant Footer attribution identical to homepage */}
      <Footer 
        whatsappNumber={whatsappNumber} 
        onSelectService={onSelectService}
        onNavigateHome={onBackToHome}
        className="mt-8" 
      />
    </div>
  );
}
