import React, { useState, useEffect } from "react";
import { 
  Globe, 
  Sparkles, 
  BadgeCheck, 
  Newspaper, 
  ArrowUpRight, 
  MessageSquare, 
  Phone, 
  ExternalLink,
  ShieldCheck,
  Check,
  HelpCircle,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { SERVICES_DATA } from "./data";
import { Service, AgencySettings } from "./types";
import ThreeDIcon from "./components/ThreeDIcons";
import StatsDashboard from "./components/StatsDashboard";
import ServiceModal from "./components/ServiceModal";
import ServiceDetailPage from "./components/ServiceDetailPage";

// Fixed WhatsApp line across all dispatches and calls
const FIXED_WHATSAPP = "+919103908189";

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
  const [selectedCategory, setSelectedCategory] = useState<"all" | "pr" | "social" | "claim">("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeServiceDetail, setActiveServiceDetail] = useState<Service | null>(null);
  const [hasGemini, setHasGemini] = useState(false);

  useEffect(() => {
    // Check URL hash for direct service page routing (e.g., #service-wikipedia or #wikipedia)
    const handleHashRouting = () => {
      const hash = window.location.hash.replace("#", "").replace("service-", "").replace("services/", "").replace("service/", "");
      if (hash) {
        const found = SERVICES_DATA.find((s) => s.id.toLowerCase() === hash.toLowerCase());
        if (found) {
          setActiveServiceDetail(found);
          return;
        }
      }
      if (!window.location.hash || window.location.hash === "#" || window.location.hash === "#featured-services") {
        setActiveServiceDetail(null);
      }
    };

    handleHashRouting();
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
    window.location.hash = "";
  };

  const filteredServices = SERVICES_DATA.filter((srv) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "pr") return srv.id === "wikipedia" || srv.id === "news-pr";
    if (selectedCategory === "social") return srv.id === "instagram-unban" || srv.id === "meta-verify";
    if (selectedCategory === "claim") return srv.id === "username-claim";
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
        />

        {/* Questionnaire Modal pop-up when initiated from detail page */}
        {selectedService && (
          <ServiceModal
            service={selectedService}
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            whatsappNumber={FIXED_WHATSAPP}
          />
        )}
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
      <header className="sticky top-0 z-40 bg-zinc-950/75 backdrop-blur-md border-b border-zinc-900/80" id="agency-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={backToAllServices}>
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-black/40">
              <span className="font-display font-bold text-white text-lg">N</span>
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
            <a href="https://www.notoriousdigitalmedia.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300 transition flex items-center space-x-1 lowercase font-mono">
              <span>www.notoriousdigitalmedia.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Real-time Indicator Tag */}
            <div className="hidden lg:flex items-center space-x-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-zinc-400 uppercase">Live SLA: 3m</span>
            </div>

            {/* Direct Instant Reach Button with FIXED WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hello%20Notorious%20Digital%20Media%20Operations%2C%20I%20would%20like%20to%20request%20a%20priority%20custom%20confidential%20PR%20consultation.`}
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-100 hover:bg-white text-black font-display font-bold text-xs x-padding py-2 rounded-xl border border-zinc-300 flex items-center space-x-1.5 transition px-3.5 shadow-sm"
              id="header-direct-call-btn"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Call (+91 9103908189)</span>
            </a>
          </div>

        </div>
      </header>

      {/* Hero Showcase Display */}
      <section className="pt-16 pb-12 text-center max-w-5xl mx-auto px-4" id="agency-hero">
        
        {/* Elite agency crown design */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-mono font-medium text-blue-300 uppercase tracking-widest">
            {hasGemini ? "AI-Powered Strategy Assistant" : "Premium Digital & PR Agency"}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          We Build Your Online Authority &amp; <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent">Claim Username Profiles</span>
        </h1>

        <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto mb-10">
          Get your customized Wikipedia page created, maintain and protect your existing published Wikipedia pages, recover disabled Instagram accounts, claim inactive usernames for your brand, or get featured on top global news websites.
        </p>

        {/* Call actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-16">
          <a
            href="#featured-services"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-display font-semibold hover:scale-[1.01] active:scale-[0.99] transition px-8 py-3.5 rounded-xl shadow-[0_10px_35px_rgba(37,99,235,0.25)] flex items-center justify-center space-x-2"
          >
            <span>Explore Dedicated Services</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <button
            onClick={() => {
              const wikiSrv = SERVICES_DATA.find((s) => s.id === "wikipedia");
              if (wikiSrv) openServicePage(wikiSrv);
            }}
            className="w-full sm:w-auto border border-blue-500/40 hover:border-blue-400 bg-blue-500/10 text-blue-300 hover:text-white px-7 py-3.5 rounded-xl text-sm font-medium transition flex items-center justify-center space-x-2"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Wikipedia Hub &amp; Maintenance</span>
          </button>
        </div>

        {/* Bento Board component */}
        <div className="pt-2 border-t border-zinc-900/60" id="stats-dashboard">
          <StatsDashboard />
        </div>

      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-20" id="featured-services">
        
        {/* Section Header with categories */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-zinc-900/60">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
              <span>Interactive 3D Service Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Featured PR &amp; Marketing Services
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Select any service to view its dedicated 3D interactive page, detailed benefits, and live telemetry.
            </p>
          </div>

          {/* Categories pill controls */}
          <div className="flex flex-wrap gap-2 mt-5 md:mt-0 bg-zinc-900/60 border border-zinc-800/80 p-1.5 rounded-xl">
            {[
              { id: "all", label: "All Services" },
              { id: "pr", label: "PR & Wikipedia" },
              { id: "social", label: "Social Recovery" },
              { id: "claim", label: "Username Claims" }
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
          {filteredServices.map((srv) => {
            return (
              <div
                key={srv.id}
                id={`card-${srv.id}`}
                className="relative overflow-hidden rounded-2xl bg-zinc-900/35 border border-zinc-800/60 hover:border-zinc-750 p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] glow-hover"
                style={{ "--hover-shadow": srv.glowColor } as any}
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

                {/* Dual Action Buttons */}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => openServicePage(srv)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-display font-semibold text-xs py-2.5 rounded-xl border border-zinc-700 transition flex items-center justify-center space-x-1.5"
                    id={`view-page-btn-${srv.id}`}
                  >
                    <span>View Dedicated Page &amp; 3D Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-300" />
                  </button>

                  <button
                    onClick={() => setSelectedService(srv)}
                    className={`w-full bg-gradient-to-r ${srv.gradient} text-white font-display font-semibold text-xs py-2 rounded-xl shadow-md transition hover:opacity-90 active:scale-[0.98] flex items-center justify-center space-x-1.5`}
                  >
                    <span>Build Strategy Brief</span>
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
        />
      )}

      {/* Elegant Footer attribution with fixed WhatsApp */}
      <footer className="text-center pt-16 border-t border-zinc-900 pb-1 flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-zinc-500 font-medium">
          <a href="https://www.notoriousdigitalmedia.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center space-x-1">
            <span>www.notoriousdigitalmedia.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hello%20Notorious%20Digital%20Media%2C%20I%20am%20reaching%20out%20for%20PR%20and%20social%20services.`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition flex items-center space-x-1"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp: +91 9103908189</span>
          </a>
          <a href="mailto:notoriousdigitalmedia@gmail.com" className="hover:text-indigo-400 transition flex items-center space-x-1">
            <span>notoriousdigitalmedia@gmail.com</span>
          </a>
        </div>
        <p className="text-[10px] text-zinc-650 font-mono mt-1">
          &copy; {new Date().getFullYear()} NOTORIOUS DIGITAL MEDIA. ALL OPERATIONS SECURED VIA FIXED DESK (+919103908189).
        </p>
      </footer>

    </div>
  );
}

