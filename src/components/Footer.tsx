import React from "react";
import { 
  ExternalLink, 
  Mail, 
  Globe, 
  ArrowUpRight 
} from "lucide-react";
import { SERVICES_DATA } from "../data";
import { Service } from "../types";

interface FooterProps {
  whatsappNumber?: string;
  agencyEmail?: string;
  className?: string;
  onSelectService?: (service: Service) => void;
  onNavigateHome?: () => void;
}

export default function Footer({
  whatsappNumber = "+91 9103908189",
  agencyEmail = "notoriousdigitalmedia@gmail.com",
  className = "",
  onSelectService,
  onNavigateHome,
}: FooterProps) {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hello%20Notorious%20Digital%20Media%2C%20I%20am%20reaching%20out%20for%20PR%2C%20Wikipedia%20and%20digital%20authority%20services.`;

  const servicesList = [
    { label: "Wikipedia Page Creation", id: "wikipedia" },
    { label: "Instagram Recovery", id: "instagram-unban" },
    { label: "Press Syndication", id: "press-syndication" },
    { label: "News Wire PR", id: "news-pr" },
    { label: "Web Development", id: "web-development" },
  ];

  return (
    <footer 
      id="universal-agency-footer" 
      className={`relative w-full border-t border-zinc-900/90 bg-zinc-950 text-zinc-400 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Brief Description (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div 
              className="flex items-center space-x-2.5 cursor-pointer group inline-flex"
              onClick={() => onNavigateHome && onNavigateHome()}
            >
              <div className="w-7 h-7 bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-md shadow-black/40 px-1 group-hover:scale-105 transition">
                <span className="font-display font-extrabold text-white text-[10px] tracking-tight">NDM</span>
              </div>
              <span className="font-display font-bold text-white text-sm tracking-tight">
                NOTORIOUS DIGITAL MEDIA
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Executive authority agency delivering high-tier Wikipedia pages, human-desk social recoveries, verified wire press syndication, and digital presence.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <a
                href={`mailto:${agencyEmail}`}
                id="footer-email-badge"
                className="inline-flex items-center space-x-1.5 text-zinc-400 hover:text-white transition"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{agencyEmail}</span>
              </a>
            </div>
          </div>

          {/* Quick Services Links (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300">
              Services
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              {servicesList.map((item) => {
                const srv = SERVICES_DATA.find((s) => s.id === item.id);
                return srv && onSelectService ? (
                  <button
                    key={item.id}
                    onClick={() => onSelectService(srv)}
                    className="text-left text-zinc-400 hover:text-indigo-400 transition truncate py-0.5"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.id}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-indigo-400 transition truncate py-0.5"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact / Direct Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300">
              Direct Desk
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://www.notoriousdigitalmedia.com"
                  target="_blank"
                  rel="noreferrer"
                  id="footer-website-badge"
                  className="inline-flex items-center space-x-1.5 text-zinc-400 hover:text-white transition"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>notoriousdigitalmedia.com</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 ml-0.5" />
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-xs text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded-lg transition"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Compact Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500 font-mono">
          <p>
            &copy; {new Date().getFullYear()} NOTORIOUS DIGITAL MEDIA. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
