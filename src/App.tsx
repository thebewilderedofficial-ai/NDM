import React, { useState, useEffect, useCallback } from "react";
import { 
  Globe, 
  Sparkles, 
  BadgeCheck, 
  Newspaper, 
  ArrowUpRight, 
  MessageSquare, 
  MessageCircle,
  Phone, 
  ExternalLink,
  ShieldCheck,
  Check,
  HelpCircle,
  Clock,
  ArrowRight,
  ChevronRight,
  Menu,
  Wrench,
  Gauge
} from "lucide-react";
import { SERVICES_DATA } from "./data";
import { Service, AgencySettings } from "./types";
import ThreeDIcon from "./components/ThreeDIcons";
import StatsDashboard from "./components/StatsDashboard";
import WikipediaRealtimeChart from "./components/WikipediaRealtimeChart";
import ServiceModal from "./components/ServiceModal";
import ServiceUtilityModal from "./components/ServiceUtilityModal";
import ServiceDetailPage from "./components/ServiceDetailPage";
import TypewriterHeadline from "./components/TypewriterHeadline";
import NavigationDrawer from "./components/NavigationDrawer";
import HeroTypewriterVisual from "./components/HeroTypewriterVisual";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";

// Fixed WhatsApp line across all dispatches and calls
const FIXED_WHATSAPP = "+919103908189";
const FIXED_EMAIL = "notoriousdigitalmedia@gmail.com";

const HERO_TYPEWRITER_PHRASES = [
  "Build high-performance Websites",
  "Create your Wikipedia page",
  "Claim Username Profiles",
  "Publish you in Major media outlets",
  "Recover disabled Instagram accounts",
];

const FAQS = [
  {
    q: "What is Wikipedia's rule for page creation, and do you offer maintenance support for existing pages?",
    a: "Wikipedia pages require independent news coverage about you in newspapers or notable magazines (such as Forbes, Bloomberg, TechCrunch, or other business news channels). We evaluate your available news features first to ensure they fit Wikipedia guidelines before drafting. IN ADDITION, WE OFFER 24/7 ONGOING MAINTENANCE & CONTENT DEFENSE FOR PAGES THAT ARE ALREADY PUBLISHED—including watchlist monitoring against competitor vandalism, reversion of unauthorized changes, citation repairs, and regular milestone updates (funding rounds, awards, leadership expansions)!"
  },
  {
    q: "How do you recover disabled Instagram accounts?",
    a: "We do not use standard forms that are filtered out by automated bots. As an agency partner, we send requests directly to real human review desks at Meta operations, which makes the unban and recovery process much quicker and highly successful. Plus, we operate under a 100% Pay On Success Guarantee."
  },
  {
    q: "Can you claim any inactive username?",
    a: "We help you acquire inactive, squatted, or dead usernames on Instagram, X (Twitter), TikTok, and YouTube if the account has been inactive for an extended duration (usually 2 or more years with zero activity) and fits your brand. We cannot claim active or verified channels."
  },
  {
    q: "Do I need to make upfront payments?",
    a: "It depends on the specific service. For Instagram account recovery, we offer a 100% Pay On Success guarantee (you pay nothing unless the account is back in your hands). For Wikipedia publishing and Tier-1 press distribution, milestone allocations or standard packages apply."
  }
];

const TESTIMONIALS = [
  {
    quote: "Our company Instagram was locked during a major launch. This team helped get our account back in under 36 hours. Very professional and quick.",
    author: "Elena Rostov",
    role: "VP of Communications",
    tag: "Instagram Unban customer"
  },
  {
    quote: "Setting up our official page on Wikipedia was critical for our search results. They wrote a neutral draft that fit the rules perfectly. They also monitor and defend our page from vandalism 24/7.",
    author: "Sir Marcus Vance",
    role: "Founder, Vance Luxury Real Estate",
    tag: "Wikipedia client"
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "pr" | "social" | "claim" | "web">("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [utilityModalService, setUtilityModalService] = useState<Service | null>(null);
  const [activeServiceDetail, setActiveServiceDetail] = useState<Service | null>(null);
  const [hasGemini, setHasGemini] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [heroTypewriter, setHeroTypewriter] = useState({
    phraseIndex: 0,
    isVisible: true,
  });

  const handleTypewriterStateChange = useCallback(
    (st: { phraseIndex: number; isVisible: boolean }) => {
      setHeroTypewriter((prev) => {
        if (prev.phraseIndex === st.phraseIndex && prev.isVisible === st.isVisible) {
          return prev;
        }
        return { phraseIndex: st.phraseIndex, isVisible: st.isVisible };
      });
    },
    []
  );

  useEffect(() => {
    // Always ensure fresh page loads and browser reloads land on the Home page
    if (window.location.hash && (window.location.hash.includes("service-") || window.location.hash.includes("service/"))) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setActiveServiceDetail(null);

    // Respond to in-session hash navigation
    const handleHashRouting = () => {
      const hash = window.location.hash.replace("#", "").replace("service-", "").replace("services/", "").replace("service/", "");
      if (hash && hash !== "featured-services" && hash !== "faq-section") {
        const found = SERVICES_DATA.find((s) => s.id.toLowerCase() === hash.toLowerCase());
        if (found) {
          setActiveServiceDetail(found);
          return;
        }
      }
      if (!window.location.hash || window.location.hash === "#" || window.location.hash === "#featured-services" || window.location.hash === "#faq-section") {
        setActiveServiceDetail(null);
      }
    };

    window.addEventListener("hashchange", handleHashRouting);

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data: AgencySettings) => {
        setHasGemini(data.hasGemini);
      })
      .catch((err) => console.log("Settings fetch fallback activated.", err));

    return () => window.removeEventListener("hashchange", handleHashRouting);
  }, []);

  const openServicePage = (srv: Service) => {
    setActiveServiceDetail(srv);
    window.location.hash = `service-${srv.id}`;
  };

  const backToAllServices = () => {
    setActiveServiceDetail(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const filteredServices = SERVICES_DATA.filter((srv) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "pr") return srv.id === "wikipedia" || srv.id === "news-pr";
    if (selectedCategory === "social") return srv.id === "instagram-unban" || srv.id === "meta-verify";
    if (selectedCategory === "claim") return srv.id === "username-claim";
    if (selectedCategory === "web") return srv.id === "web-development";
    return true;
  });

  const cleanPhone = FIXED_WHATSAPP.replace("+", "").replace(/\s/g, "");

  // If a dedicated service detail page is active, display it full-page
  if (activeServiceDetail) {
    return (
      <>
        <ServiceDetailPage
          service={activeServiceDetail}
          allServices={SERVICES_DATA}
          onSelectService={openServicePage}
          onBackToHome={backToAllServices}
          onOpenBriefModal={(srv) => setSelectedService(srv)}
          whatsappNumber={FIXED_WHATSAPP}
          onOpenMenu={() => setIsNavDrawerOpen(true)}
        />

        {/* Questionnaire Modal pop-up when initiated from detail page */}
        {selectedService && (
          <ServiceModal
            service={selectedService}
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            whatsappNumber={FIXED_WHATSAPP}
            agencyEmail={FIXED_EMAIL}
          />
        )}

        <NavigationDrawer
          isOpen={isNavDrawerOpen}
          onClose={() => setIsNavDrawerOpen(false)}
          services={SERVICES_DATA}
          activeServiceId={activeServiceDetail?.id}
          onSelectService={openServicePage}
          onNavigateHome={backToAllServices}
          whatsappNumber={FIXED_WHATSAPP}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-stone-200 relative pb-16 selection:bg-indigo-500/30 selection:text-white" id="agency-root">
      
      {/* Visual Ambient Atmosphere Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-rose-900/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-950/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Primary Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900/80 shadow-sm relative" id="agency-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={backToAllServices}>
            <div className="w-10 h-9 bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-black/40 px-1">
              <span className="font-display font-extrabold text-white text-xs tracking-tight">NDM</span>
            </div>
            <div>
              <span className="font-display font-bold text-white text-base tracking-tight block">NOTORIOUS</span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block -mt-1">Digital Media</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center space-x-7 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            <a href="#featured-services" className="hover:text-white transition">Core Services</a>
            <button
              onClick={() => {
                const wikiSrv = SERVICES_DATA.find((s) => s.id === "wikipedia");
                if (wikiSrv) openServicePage(wikiSrv);
              }}
              className="hover:text-blue-300 transition text-blue-400 flex items-center space-x-1 uppercase"
            >
              <span>Wikipedia &amp; Maintenance</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            </button>
            <a href="#stats-dashboard" className="hover:text-white transition">Authority Stats</a>
            <a href="#testimonials-block" className="hover:text-white transition">Reviews</a>
            <a href="#advisory-faq" className="hover:text-white transition">FAQ</a>
            <a href="https://www.notoriousdigitalmedia.in" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300 transition flex items-center space-x-1 lowercase font-mono">
              <span>www.notoriousdigitalmedia.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Real-time Indicator Tag */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-zinc-400 uppercase">Live SLA: 3m</span>
            </div>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* Hamburger Services Navigation Menu */}
            <button
              onPointerDown={(e) => {
                // Instant trigger on finger touch or mouse down (bypasses 300ms mobile click delay)
                if (e.button === 0) setIsNavDrawerOpen(true);
              }}
              onClick={() => setIsNavDrawerOpen(true)}
              className="group bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 px-3 py-2 rounded-xl flex items-center space-x-1.5 text-xs font-semibold tracking-wide transition shadow-sm cursor-pointer select-none active:scale-95"
              aria-label="Open Services Navigation Menu"
              id="header-services-menu-btn"
            >
              <Menu className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition" />
              <span className="font-display">Services</span>
            </button>
          </div>

        </div>

        {/* Glowy Scroll Progress Bar on the below side of header */}
        <ScrollProgressBar />
      </header>

      {/* Hero Showcase Display */}
      <section className="pt-12 sm:pt-16 pb-12 text-center max-w-5xl mx-auto px-4" id="agency-hero">
        
        {/* 3D Transparent Floating Dynamic Visual Stage with Fade In / Fade Out sync */}
        <div className="relative w-full max-w-xs sm:max-w-sm mx-auto h-28 sm:h-32 mb-4 sm:mb-6 flex items-center justify-center pointer-events-none">
          <HeroTypewriterVisual
            phraseIndex={heroTypewriter.phraseIndex}
            isVisible={heroTypewriter.isVisible}
          />
        </div>

        <h1 className="font-extrabold font-display text-white tracking-tight leading-tight max-w-4xl mx-auto mb-4 sm:mb-6">
          <span className="block text-[21px] sm:text-4xl md:text-5xl lg:text-6xl">We Build Your Online Authority</span>
          <span className="block mt-1 sm:mt-2 text-zinc-300 text-[21px] sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="inline-flex items-baseline justify-center max-w-full">
              <span className="text-zinc-500 font-normal mr-2 sm:mr-3 text-[0.85em] shrink-0">&amp;</span>
              <TypewriterHeadline
                phrases={HERO_TYPEWRITER_PHRASES}
                onStateChange={handleTypewriterStateChange}
              />
            </span>
          </span>
        </h1>

        <p className="text-[11px] sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10">
          Get your customized Wikipedia page created, maintain and protect your existing published Wikipedia pages, recover disabled Instagram accounts, claim inactive usernames for your brand, or get featured on top global news websites.
        </p>

        {/* Call actions */}
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 mb-14 max-w-sm sm:max-w-none mx-auto w-full px-1 sm:px-0">
          <a
            href="#featured-services"
            className="flex-1 sm:flex-initial sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-display font-semibold hover:scale-[1.01] active:scale-[0.99] transition px-3 sm:px-7 py-2 sm:py-3 rounded-xl shadow-[0_10px_35px_rgba(37,99,235,0.25)] flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-sm md:text-base whitespace-nowrap"
          >
            <span>Our Services</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          </a>
          
          <button
            onClick={() => {
              const wikiSrv = SERVICES_DATA.find((s) => s.id === "wikipedia");
              if (wikiSrv) openServicePage(wikiSrv);
            }}
            className="flex-1 sm:flex-initial sm:w-auto border border-blue-500/40 hover:border-blue-400 bg-blue-500/10 text-blue-300 hover:text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-[10px] sm:text-xs md:text-sm font-medium transition flex items-center justify-center space-x-1.5 sm:space-x-2 whitespace-nowrap"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.436 0 .135.053.33.166.601 1.082 2.646 4.818 10.521 4.818 10.521l.136.046 2.411-4.81-.482-1.067-1.658-3.264s-.318-.654-.428-.872c-.728-1.443-.712-1.518-1.447-1.617-.207-.023-.313-.05-.313-.149v-.468l.06-.045h4.292l.113.037v.451c0 .105-.076.15-.227.15l-.308.047c-.792.061-.661.381-.136 1.422l1.582 3.252 1.758-3.504c.293-.64.233-.801.111-.947-.07-.084-.305-.22-.812-.24l-.201-.021c-.052 0-.098-.015-.145-.051-.045-.031-.067-.076-.067-.129v-.427l.061-.045c1.247-.008 4.043 0 4.043 0l.059.045v.436c0 .121-.059.178-.193.178-.646.03-.782.095-1.023.439-.12.186-.375.589-.646 1.039l-2.301 4.273-.065.135 2.792 5.712.17.048 4.396-10.438c.154-.422.129-.722-.064-.895-.197-.172-.346-.273-.857-.295l-.42-.016c-.061 0-.105-.014-.152-.045-.043-.029-.072-.075-.072-.119v-.436l.059-.045h4.961l.041.045v.437c0 .119-.074.18-.209.18-.648.03-1.127.18-1.443.421-.314.255-.557.616-.736 1.067 0 0-4.043 9.258-5.426 12.339-.525 1.007-1.053.917-1.503-.031-.571-1.171-1.773-3.786-2.646-5.71l.053-.036z" />
            </svg>
            <span>Get a Wikipedia Page</span>
          </button>
        </div>

        {/* Bento Board component */}
        <div className="pt-2 border-t border-zinc-900/60" id="stats-dashboard">
          <StatsDashboard />
        </div>

        {/* Wikipedia Realtime Live Stats & Authority Trends on Homepage */}
        <div className="mt-8 text-left" id="homepage-wikipedia-stats">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block">
                What you are missing out on
              </span>
              <span className="hidden sm:inline-block text-zinc-500 font-mono text-xs">
                Real-Time Global Fact &amp; Entity Search Impact
              </span>
            </div>
          </div>
          <WikipediaRealtimeChart />
        </div>

      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-20" id="featured-services">
        
        {/* Section Header with categories */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-zinc-900/60">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
              <span>Specialized Practice Areas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Featured PR &amp; Marketing Services
            </h2>
            <p className="text-zinc-500 text-[12px] sm:text-sm mt-1">
              Review comprehensive service specifications, client delivery frameworks, and verifiable deliverables.
            </p>
          </div>

          {/* Categories pill controls */}
          <div id="category-filters-container" className="flex flex-wrap gap-2 mt-5 md:mt-0 bg-zinc-900/60 border border-zinc-800/80 p-1.5 rounded-xl">
            {[
              { id: "all", label: "All Services" },
              { id: "pr", label: "PR & Wikipedia" },
              { id: "social", label: "Social Recovery" },
              { id: "claim", label: "Username Claims" },
              { id: "web", label: "Web Development" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition ${
                  selectedCategory === cat.id 
                    ? "bg-zinc-800 border border-zinc-700 text-white shadow-md" 
                    : "text-zinc-400 hover:text-stone-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="agency-services-grid">
          {filteredServices.map((srv, index) => {
            const floatDelays = ["0s", "0.9s", "1.8s", "0.45s", "1.35s", "2.25s"];
            const staggerDelay = floatDelays[index % floatDelays.length];
            return (
              <div
                key={srv.id}
                id={`card-${srv.id}`}
                className="service-card-floating relative overflow-hidden rounded-2xl bg-zinc-900/35 border border-zinc-800/60 hover:border-zinc-750 p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] glow-hover"
                style={{
                  "--hover-shadow": srv.glowColor,
                  animationDelay: staggerDelay,
                } as any}
              >
                {/* 3D-styled Custom Layer Illustration (Clickable) */}
                <div 
                  className="flex justify-center mb-4 cursor-pointer"
                  onClick={() => openServicePage(srv)}
                  title={`View dedicated ${srv.title} page`}
                >
                  <ThreeDIcon serviceId={srv.id} />
                </div>

                {/* Info Text block */}
                <div className="mt-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      {srv.avgTimeline} duration
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-semibold bg-white/5 border border-white/10 text-zinc-300`}>
                      {srv.difficulty}
                    </span>
                  </div>

                  <h3 
                    onClick={() => openServicePage(srv)}
                    className="text-xl font-bold font-display text-white tracking-tight mb-2 group-hover:text-indigo-300 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{srv.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </h3>
                  
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                    {srv.tagline}
                  </p>

                  {/* Special note for Wikipedia maintenance on card */}
                  {srv.id === "wikipedia" && (
                    <div className="mb-3 px-2.5 py-1.5 bg-blue-500/10 border border-blue-500/25 rounded-lg text-[11px] text-blue-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Includes 24/7 existing page maintenance &amp; defense</span>
                    </div>
                  )}

                  <ul className="space-y-2 mt-3 pt-3 border-t border-zinc-900/80">
                    {srv.benefits.slice(0, 3).map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start space-x-2 text-[11px] text-zinc-400">
                        <Check className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons Trio: Learn More, Interactive Tool, Request Quote */}
                <div className="mt-6 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openServicePage(srv)}
                      className="bg-zinc-800/90 hover:bg-zinc-700 text-white font-display font-semibold text-xs py-2 rounded-xl border border-zinc-700 transition flex items-center justify-center space-x-1.5"
                      id={`view-page-btn-${srv.id}`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-300" />
                    </button>

                    <button
                      onClick={() => setUtilityModalService(srv)}
                      className="bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-200 hover:text-white font-display font-semibold text-xs py-2 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm"
                      id={`utility-btn-${srv.id}`}
                      title={`Launch ${srv.title} Tool`}
                    >
                      <Gauge className="w-3.5 h-3.5 text-indigo-400" />
                      <span>
                        {srv.id === "web-development"
                          ? "Speed Audit"
                          : srv.id === "wikipedia"
                          ? "Check Eligibility"
                          : srv.id === "username-claim"
                          ? "Check Handle"
                          : srv.id === "instagram-unban"
                          ? "Ban Triage"
                          : srv.id === "meta-verify"
                          ? "Audit Badge"
                          : "ROI Simulator"}
                      </span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedService(srv)}
                    className={`w-full bg-gradient-to-r ${srv.gradient} text-white font-display font-semibold text-xs py-2 rounded-xl shadow-md transition hover:opacity-90 active:scale-[0.98] flex items-center justify-center space-x-1.5`}
                    id={`quote-btn-${srv.id}`}
                  >
                    <span>Request Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Customer Trust Section */}
      <section className="bg-zinc-900/30 border-y border-zinc-900/80 py-16" id="testimonials-block">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-xs font-mono tracking-widest text-zinc-600 uppercase mb-8">
            Verified Premium Client Dispatches
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-zinc-950/60 rounded-2xl border border-zinc-800/60 p-6 text-left relative">
                <div className="absolute top-4 right-4 text-zinc-700/50 font-serif text-5xl">“</div>
                <p className="text-stone-300 text-sm leading-relaxed mb-6 font-medium italic z-10 relative">
                  {t.quote}
                </p>
                <div className="flex justify-between items-center z-10 relative">
                  <div>
                    <h5 className="text-white font-display font-bold text-xs">
                      {t.author}
                    </h5>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wide">
                      {t.role}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-0.5 rounded">
                    {t.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-12" id="advisory-faq">
        <div className="text-center mb-12">
          <HelpCircle className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Consultancy &amp; Advisory FAQ
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            Understanding operations, trademark claims, media partner allocations, and page maintenance.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, fidx) => (
            <div key={fidx} className="bg-zinc-900/30 border border-zinc-900/80 rounded-2xl p-5 hover:border-zinc-800 transition">
              <h4 className="text-white font-display font-semibold text-base mb-2">
                {faq.q}
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Questionnaire Modal pop-up */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          whatsappNumber={FIXED_WHATSAPP}
          agencyEmail={FIXED_EMAIL}
        />
      )}

      {/* Interactive Service Utility Modal pop-up (Triggered by 3rd button) */}
      {utilityModalService && (
        <ServiceUtilityModal
          service={utilityModalService}
          isOpen={!!utilityModalService}
          onClose={() => setUtilityModalService(null)}
          whatsappNumber={FIXED_WHATSAPP}
          onOpenQuote={() => {
            const s = utilityModalService;
            setUtilityModalService(null);
            setSelectedService(s);
          }}
        />
      )}

      {/* Elegant Footer attribution identical across all pages */}
      <Footer 
        whatsappNumber={FIXED_WHATSAPP} 
        agencyEmail={FIXED_EMAIL} 
        onSelectService={openServicePage}
        onNavigateHome={backToAllServices}
      />

      {/* Slide-in Navigation Drawer */}
      <NavigationDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        services={SERVICES_DATA}
        activeServiceId={activeServiceDetail?.id}
        onSelectService={openServicePage}
        onNavigateHome={backToAllServices}
        whatsappNumber={FIXED_WHATSAPP}
      />

    </div>
  );
}

