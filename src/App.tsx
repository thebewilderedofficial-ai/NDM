import React, { useState, useEffect } from "react";
import { 
  Globe, 
  Sparkles, 
  BadgeCheck, 
  Newspaper, 
  ArrowUpRight, 
  MessageSquare, 
  Settings, 
  Phone, 
  ExternalLink,
  ShieldCheck,
  Check,
  HelpCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { SERVICES_DATA } from "./data";
import { Service, AgencySettings } from "./types";
import ThreeDIcon from "./components/ThreeDIcons";
import StatsDashboard from "./components/StatsDashboard";
import ServiceModal from "./components/ServiceModal";

const FAQS = [
  {
    q: "How do you recover disabled Instagram accounts?",
    a: "We do not use standard forms that are filtered out by automatic systems. As an agency partner, we send requests directly to real human reviewers, which makes the unban and recovery process much quicker and highly successful."
  },
  {
    q: "What is Wikipedia's rule for page creation?",
    a: "Wikipedia pages require independent news coverage about you in newspapers or solid magazines (such as Forbes, TechCrunch, or other business news channels). We read through your available news features first to ensure they fit Wikipedia guidelines before draft start."
  },
  {
    q: "Can you claim any inactive username?",
    a: "We can help you get inactive usernames on Instagram, TikTok, and Twitter if the account has been inactive for a long time (usually 2 or more years with zero posts or activity) and fits your brand. We cannot claim active or already verified channels."
  },
  {
    q: "Do I need to make upfront payments?",
    a: "It depends heavily on the specific services and our prior agreements with the client. For standard campaigns such as Wikipedia setup or press media packages, an upfront payment is mostly required to initialize the project."
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
    quote: "Setting up our official page on Wikipedia was critical for our search results. They wrote a neutral draft that fit the rules perfectly.",
    author: "Sir Marcus Vance",
    role: "Founder, Vance Luxury Real Estate",
    tag: "Wikipedia client"
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "pr" | "social" | "claim">("all");
  const [whatsappNumber, setWhatsappNumber] = useState("+447404499119");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hasGemini, setHasGemini] = useState(false);
  
  // Custom temporary input for WhatsApp number adjustments
  const [tempPhoneInput, setTempPhoneInput] = useState("");

  useEffect(() => {
    // Attempt to load settings from server or localStorage
    const savedNum = localStorage.getItem("agency_whatsapp");
    if (savedNum) {
      setWhatsappNumber(savedNum);
      setTempPhoneInput(savedNum);
    } else {
      setTempPhoneInput("+447404499119");
    }

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data: AgencySettings) => {
        setHasGemini(data.hasGemini);
        if (data.whatsappNumber && !savedNum) {
          setWhatsappNumber(data.whatsappNumber);
          setTempPhoneInput(data.whatsappNumber);
        }
      })
      .catch((err) => console.log("Settings fetch local fallback activated.", err));
  }, []);

  const savePhoneSetting = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = tempPhoneInput.trim();
    if (cleaned) {
      setWhatsappNumber(cleaned);
      localStorage.setItem("agency_whatsapp", cleaned);
      setIsSettingsOpen(false);
    }
  };

  const filteredServices = SERVICES_DATA.filter((srv) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "pr") return srv.id === "wikipedia" || srv.id === "news-pr";
    if (selectedCategory === "social") return srv.id === "instagram-unban" || srv.id === "meta-verify";
    if (selectedCategory === "claim") return srv.id === "username-claim";
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-stone-200 relative pb-16 selection:bg-indigo-500/30 selection:text-white" id="agency-root">
      
      {/* Visual Ambient Atmosphere Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-rose-900/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-950/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Primary Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/75 backdrop-blur-md border-b border-zinc-900/80" id="agency-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-black/40">
              <span className="font-display font-bold text-white text-lg">N</span>
            </div>
            <div>
              <span className="font-display font-bold text-white text-base tracking-tight block">NOTORIOUS</span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block -mt-1">Digital Media</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center space-x-8 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            <a href="#featured-services" className="hover:text-white transition">Core Services</a>
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

            {/* Customizer settings trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition"
              title="Configure recipient destination keys"
              id="settings-trigger-btn"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Direct Instant Reach Button */}
            <a
              href={`https://api.whatsapp.com/send?phone=${whatsappNumber.replace("+", "")}&text=Hello%20Notorious%20Digital%20Media%20Operations%2C%20I%20would%20like%20to%20request%20a%20priority%20custom%20confidential%20PR%20consultation.`}
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-100 hover:bg-white text-black font-display font-bold text-xs x-padding py-2 rounded-xl border border-zinc-300 flex items-center space-x-1.5 transition px-3.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Call</span>
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
          Get your customized Wikipedia page created, recover your disabled Instagram accounts, claim inactive usernames for your brand, or get featured on top news websites. Simple, secure, and direct.
        </p>

        {/* Call actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-16">
          <a
            href="#featured-services"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-display font-semibold hover:scale-[1.01] active:scale-[0.99] transition px-8 py-3.5 rounded-xl shadow-[0_10px_35px_rgba(37,99,235,0.25)] flex items-center justify-center space-x-2"
          >
            <span>Explore Custom Services</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#advisory-faq"
            className="w-full sm:w-auto border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:text-white px-8 py-3.5 rounded-xl text-sm font-medium transition"
          >
            Advisory Guidelines
          </a>
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
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Featured PR &amp; Marketing Services
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Select a service below to create your brief and see how we can help.
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
                className="relative overflow-hidden rounded-2xl bg-zinc-900/35 border border-zinc-800/60 hover:border-zinc-700/80 p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] glow-hover"
                style={{ "--hover-shadow": srv.glowColor } as any}
              >
                {/* 3D-styled Custom Layer Illustration */}
                <div className="flex justify-center mb-4">
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

                  <h3 className="text-xl font-bold font-display text-white tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
                    {srv.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                    {srv.tagline}
                  </p>

                  <ul className="space-y-2 mt-4 pt-4 border-t border-zinc-900/80">
                    {srv.benefits.slice(0, 3).map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start space-x-2 text-[11px] text-zinc-500">
                        <Check className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Start assessment CTA */}
                <button
                  onClick={() => setSelectedService(srv)}
                  className={`mt-6 w-full bg-gradient-to-r ${srv.gradient} text-white font-display font-semibold text-xs py-2.5 rounded-xl shadow-md transition-all duration-300 hover:opacity-90 active:scale-[0.98] flex items-center justify-center space-x-1.5`}
                >
                  <span>Build custom dispatch brief</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
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
            Understanding operations, trademark claims, and media partner allocations.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, fidx) => (
            <div key={fidx} className="bg-zinc-900/30 border border-zinc-900/80 rounded-2xl p-5 hover:border-zinc-800 transition">
              <h4 className="text-white font-display font-semibold text-base mb-2">
                {faq.q}
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Advisory Configuration Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" id="global-settings-dialog">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm relative">
            <h4 className="text-white font-display font-bold text-lg mb-2 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-indigo-400 animate-spin-slow" />
              <span>Agency Portal Setup</span>
            </h4>
            <p className="text-zinc-500 text-xs mb-4">
              Adjust the destination target phone number for direct client dispatches and order notifications.
            </p>

            <form onSubmit={savePhoneSetting} className="space-y-4">
              <div>
                <label className="block text-zinc-300 text-xs font-mono uppercase mb-1">
                  Destination WhatsApp Line
                </label>
                <input
                  type="text"
                  required
                  placeholder="+447404499119"
                  value={tempPhoneInput}
                  onChange={(e) => setTempPhoneInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] text-zinc-600 font-mono mt-1 block">
                  Include country code (e.g., +44, +1)
                </span>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-white hover:bg-zinc-200 text-black py-2.5 rounded-xl font-display font-bold text-xs transition"
                >
                  Save Settings
                </button>
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-400 py-2.5 px-4 rounded-xl font-display font-semibold text-xs transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Questionnaire Modal pop-up */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          whatsappNumber={whatsappNumber}
        />
      )}

      {/* Elegant Footer attribution */}
      <footer className="text-center pt-16 border-t border-zinc-900 pb-1 flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-zinc-500 font-medium">
          <a href="https://www.notoriousdigitalmedia.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center space-x-1">
            <span>www.notoriousdigitalmedia.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a href="mailto:notoriousdigitalmedia@gmail.com" className="hover:text-indigo-400 transition flex items-center space-x-1">
            <span>notoriousdigitalmedia@gmail.com</span>
          </a>
        </div>
        <p className="text-[10px] text-zinc-650 font-mono mt-1">
          &copy; {new Date().getFullYear()} NOTORIOUS DIGITAL MEDIA. ALL OPERATIONS SECURED & EXTENDED VIA EXCLUSIVE PORTALS.
        </p>
      </footer>

    </div>
  );
}
