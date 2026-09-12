import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  BadgeCheck,
  Newspaper,
  AtSign,
  Sparkles,
  ChevronRight,
  Code
} from "lucide-react";
import { Service } from "../types";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  activeServiceId?: string;
  onSelectService: (service: Service) => void;
  onNavigateHome: () => void;
  whatsappNumber: string;
}

export default function NavigationDrawer({
  isOpen,
  onClose,
  services,
  activeServiceId,
  onSelectService,
  onNavigateHome,
  whatsappNumber,
}: NavigationDrawerProps) {
  // Lock body scroll and handle Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const cleanPhone = whatsappNumber.replace("+", "").replace(/\s/g, "");

  const getServiceIcon = (id: string) => {
    switch (id) {
      case "wikipedia":
        return (
          <svg className="w-5 h-5 text-blue-400 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271C.103 5.033 0 4.982 0 4.898v-.455l.052-.045c.924-.005 5.401 0 5.401 0l.051.045v.434c0 .119-.075.176-.225.176l-.564.031c-.485.029-.727.164-.727.436 0 .135.053.33.166.601 1.082 2.646 4.818 10.521 4.818 10.521l.136.046 2.411-4.81-.482-1.067-1.658-3.264s-.318-.654-.428-.872c-.728-1.443-.712-1.518-1.447-1.617-.207-.023-.313-.05-.313-.149v-.468l.06-.045h4.292l.113.037v.451c0 .105-.076.15-.227.15l-.308.047c-.792.061-.661.381-.136 1.422l1.582 3.252 1.758-3.504c.293-.64.233-.801.111-.947-.07-.084-.305-.22-.812-.24l-.201-.021c-.052 0-.098-.015-.145-.051-.045-.031-.067-.076-.067-.129v-.427l.061-.045c1.247-.008 4.043 0 4.043 0l.059.045v.436c0 .121-.059.178-.193.178-.646.03-.782.095-1.023.439-.12.186-.375.589-.646 1.039l-2.301 4.273-.065.135 2.792 5.712.17.048 4.396-10.438c.154-.422.129-.722-.064-.895-.197-.172-.346-.273-.857-.295l-.42-.016c-.061 0-.105-.014-.152-.045-.043-.029-.072-.075-.072-.119v-.436l.059-.045h4.961l.041.045v.437c0 .119-.074.18-.209.18-.648.03-1.127.18-1.443.421-.314.255-.557.616-.736 1.067 0 0-4.043 9.258-5.426 12.339-.525 1.007-1.053.917-1.503-.031-.571-1.171-1.773-3.786-2.646-5.71l.053-.036z" />
          </svg>
        );
      case "instagram-unban":
        return <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />;
      case "username-claim":
        return <AtSign className="w-5 h-5 text-violet-400 shrink-0" />;
      case "meta-verify":
        return <BadgeCheck className="w-5 h-5 text-sky-400 shrink-0" />;
      case "news-pr":
        return <Newspaper className="w-5 h-5 text-emerald-400 shrink-0" />;
      case "web-development":
        return <Code className="w-5 h-5 text-cyan-400 shrink-0" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="navigation-drawer-portal">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative w-full max-w-md bg-zinc-950/95 border-l border-zinc-900 shadow-2xl flex flex-col h-full z-10 overflow-hidden text-zinc-200"
            id="navigation-drawer-panel"
          >
            {/* Ambient subtle glow inside drawer */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-[90px] pointer-events-none" />

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-900 flex items-center justify-between relative shrink-0">
              <div
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => {
                  onNavigateHome();
                  onClose();
                }}
              >
                <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-black/40">
                  <span className="font-display font-bold text-white text-lg">N</span>
                </div>
                <div>
                  <span className="font-display font-bold text-white text-base tracking-tight block group-hover:text-blue-400 transition">
                    NOTORIOUS
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block -mt-1">
                    Digital Media
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 transition"
                aria-label="Close menu"
                id="close-navigation-drawer-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
              
              {/* Dedicated Services Section */}
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
                    Our Services
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
                    {services.length} Capabilities
                  </span>
                </div>

                <div className="space-y-2.5">
                  {services.map((service) => {
                    const isActive = activeServiceId === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => {
                          onSelectService(service);
                          onClose();
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border transition group relative overflow-hidden flex items-start space-x-3.5 ${
                          isActive
                            ? "bg-blue-950/30 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                            : "bg-zinc-900/50 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700"
                        }`}
                        id={`nav-service-link-${service.id}`}
                      >
                        {/* Icon Container */}
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          {getServiceIcon(service.id)}
                        </div>

                        {/* Text description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between space-x-2">
                            <h4 className="text-sm font-display font-semibold text-white group-hover:text-blue-300 transition truncate">
                              {service.title}
                            </h4>
                            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                            {service.tagline}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-[10px] font-mono bg-zinc-950 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-md">
                              {service.badge}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">
                              {service.avgTimeline}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Site Quick Links */}
              <div>
                <div className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase mb-3 px-1">
                  Quick Navigation
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <button
                    onClick={() => {
                      onNavigateHome();
                      onClose();
                      setTimeout(() => {
                        const el = document.getElementById("featured-services");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="p-3 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/70 hover:border-zinc-700 rounded-xl text-left text-zinc-300 hover:text-white transition flex items-center justify-between"
                  >
                    <span>All Services Grid</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                  </button>

                  <button
                    onClick={() => {
                      onNavigateHome();
                      onClose();
                      setTimeout(() => {
                        const el = document.getElementById("stats-dashboard");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="p-3 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/70 hover:border-zinc-700 rounded-xl text-left text-zinc-300 hover:text-white transition flex items-center justify-between"
                  >
                    <span>Authority Stats</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                  </button>

                  <button
                    onClick={() => {
                      onNavigateHome();
                      onClose();
                      setTimeout(() => {
                        const el = document.getElementById("testimonials-block");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="p-3 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/70 hover:border-zinc-700 rounded-xl text-left text-zinc-300 hover:text-white transition flex items-center justify-between"
                  >
                    <span>Client Reviews</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                  </button>

                  <button
                    onClick={() => {
                      onNavigateHome();
                      onClose();
                      setTimeout(() => {
                        const el = document.getElementById("advisory-faq");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="p-3 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/70 hover:border-zinc-700 rounded-xl text-left text-zinc-300 hover:text-white transition flex items-center justify-between"
                  >
                    <span>Advisory FAQ</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                  </button>
                </div>

                <a
                  href="https://www.notoriousdigitalmedia.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 p-3 bg-zinc-900/30 hover:bg-zinc-900/70 border border-zinc-800/70 rounded-xl text-xs text-amber-400 hover:text-amber-300 transition flex items-center justify-between font-mono"
                >
                  <span>www.notoriousdigitalmedia.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Bottom Sticky Action Footer */}
            <div className="p-5 sm:p-6 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md shrink-0 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 font-mono text-[11px] text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Operations SLA: 3 min response</span>
                </div>
                <span className="text-zinc-500 font-mono text-[11px]">Confidential</span>
              </div>

              <a
                href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hello%20Notorious%20Digital%20Media%2C%20I%20would%20like%20to%20request%20a%20priority%20consultation%20regarding%20your%20services.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-display font-semibold text-sm py-3 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-950/50"
                id="drawer-whatsapp-btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 9103908189)</span>
              </a>
            </div>

          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
