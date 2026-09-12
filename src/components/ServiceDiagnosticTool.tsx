import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, ArrowRight, Sparkles, MessageCircle, HelpCircle } from "lucide-react";

interface DiagnosticProps {
  serviceId: string;
  whatsappNumber: string;
  onOpenBrief: () => void;
}

export default function ServiceDiagnosticTool({
  serviceId,
  whatsappNumber,
  onOpenBrief,
}: DiagnosticProps) {
  // States for Wikipedia checker
  const [wikiArticles, setWikiArticles] = useState<number>(3);
  const [hasPressInTier1, setHasPressInTier1] = useState<boolean>(true);
  const [hasTrademark, setHasTrademark] = useState<boolean>(false);
  const [isExistingPage, setIsExistingPage] = useState<boolean>(false);

  // States for Instagram unban
  const [banType, setBanType] = useState<string>("tos");
  const [daysBanned, setDaysBanned] = useState<string>("recent");

  // States for Username claim
  const [platform, setPlatform] = useState<string>("instagram");
  const [handleLength, setHandleLength] = useState<string>("clean");

  // Calculations for Wikipedia
  const calculateWikiScore = () => {
    let score = 40;
    if (wikiArticles >= 4) score += 30;
    else if (wikiArticles >= 2) score += 15;
    if (hasPressInTier1) score += 25;
    if (hasTrademark) score += 10;
    if (isExistingPage) return 99; // Maintenance readiness
    return Math.min(score, 98);
  };

  const wikiScore = calculateWikiScore();

  const directWhatsAppLink = (customText: string) => {
    const cleanNum = whatsappNumber.replace("+", "").replace(/\s/g, "");
    return `https://api.whatsapp.com/send?phone=${cleanNum}&text=${encodeURIComponent(customText)}`;
  };

  return (
    <div className="w-full max-w-full bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm relative overflow-hidden" id="service-diagnostic-tool">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-800/60">
        <div className="min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 inline-block mb-1.5">
            Diagnostic Engine
          </span>
          <h4 className="text-lg sm:text-xl font-bold font-display text-white mt-1 break-words">
            {serviceId === "wikipedia" && "Wikipedia Feasibility & Eligibility Scorecard"}
            {serviceId === "instagram-unban" && "Account Recovery Priority & Timeframe Estimator"}
            {serviceId === "username-claim" && "Inactive Handle Claim Probability Checker"}
            {serviceId === "meta-verify" && "Blue Badge Pre-Audit Readiness Index"}
            {serviceId === "news-pr" && "Media Authority & Google Impact Simulator"}
            {serviceId === "web-development" && "Web Portal & Performance Architecture Estimator"}
          </h4>
        </div>
        <Sparkles className="w-6 h-6 text-amber-400 shrink-0 self-start sm:self-auto" />
      </div>

      {/* Wikipedia specific diagnostic */}
      {serviceId === "wikipedia" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                Do you already have a published Wikipedia page?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsExistingPage(false)}
                  className={`px-3 py-2 text-xs rounded-xl border transition ${
                    !isExistingPage
                      ? "bg-blue-600 border-blue-500 text-white font-semibold"
                      : "bg-zinc-950/60 border-zinc-800 text-zinc-400"
                  }`}
                >
                  No, Need New Creation
                </button>
                <button
                  type="button"
                  onClick={() => setIsExistingPage(true)}
                  className={`px-3 py-2 text-xs rounded-xl border transition ${
                    isExistingPage
                      ? "bg-indigo-600 border-indigo-500 text-white font-semibold"
                      : "bg-zinc-950/60 border-zinc-800 text-zinc-400"
                  }`}
                >
                  Yes, Need Maintenance / Updates
                </button>
              </div>
            </div>

            {!isExistingPage ? (
              <div>
                <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                  Number of Independent Press Features (Articles):
                </label>
                <div className="flex items-center space-x-2">
                  {[0, 2, 4, 8].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setWikiArticles(count)}
                      className={`flex-1 py-2 text-xs rounded-xl border transition ${
                        wikiArticles === count
                          ? "bg-zinc-800 border-zinc-600 text-white font-bold"
                          : "bg-zinc-950/60 border-zinc-800 text-zinc-400"
                      }`}
                    >
                      {count === 0 ? "0" : count === 8 ? "8+" : `${count}-${count + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                  Current Maintenance Priority:
                </label>
                <span className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-3 py-2 rounded-xl block">
                  🛡️ 24/7 Watchlist Protection, Disputed Edit Reversion &amp; Milestone Updates
                </span>
              </div>
            )}
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-900 border-2 border-indigo-500 flex items-center justify-center shrink-0">
                <span className="font-mono text-lg sm:text-xl font-bold text-white">{wikiScore}%</span>
              </div>
              <div className="min-w-0">
                <h5 className="text-xs sm:text-sm font-display font-bold text-white break-words">
                  {isExistingPage
                    ? "Existing Page Maintenance Eligible (Immediate Deployment)"
                    : wikiScore > 75
                    ? "Prime Candidate for Official Wikipedia Page"
                    : "Qualifies with Bundled PR Distribution Pathway"}
                </h5>
                <p className="text-xs text-zinc-400 mt-0.5 break-words">
                  {isExistingPage
                    ? "We can connect your page to our automated revision monitor within 2 hours."
                    : wikiScore > 75
                    ? "Your press footprint meets Wikipedia GNG requirements. Approval timeline: 3-5 weeks."
                    : "We will bundle 2-3 Tier 1 journalistic features to solidify your notability prior to submission."}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenBrief}
                className="bg-white hover:bg-zinc-100 text-black text-xs font-bold px-4 py-2.5 rounded-xl transition text-center"
              >
                Request Quote
              </button>
              <a
                href={directWhatsAppLink(
                  isExistingPage
                    ? "Hello Notorious Media, I have an existing Wikipedia page and need your 24/7 maintenance & protection service."
                    : `Hello Notorious Media, I scored ${wikiScore}% on the Wikipedia Feasibility diagnostic. I would like to review my submission details.`
                )}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Fast-Track</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Instagram Unban diagnostic */}
      {serviceId === "instagram-unban" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                Suspension Classification:
              </label>
              <select
                value={banType}
                onChange={(e) => setBanType(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="tos">Terms of Service / Community Standards</option>
                <option value="copyright">Intellectual Property / Copyright</option>
                <option value="impersonation">Impersonation / Identity Verification</option>
                <option value="bot">Artificial Engagement / Third-party Tools</option>
                <option value="unclear">Permanent Disable / No Reason Specified</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                Suspension Age:
              </label>
              <select
                value={daysBanned}
                onChange={(e) => setDaysBanned(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="recent">Under 7 Days Ago (Priority Escalation)</option>
                <option value="month">1 to 4 Weeks Ago</option>
                <option value="extended">Over 1 Month (Complex Recovery Tier)</option>
              </select>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  94.6% Historical Recovery Probability
                </span>
              </div>
              <h5 className="text-xs sm:text-sm font-display font-bold text-white mt-1 break-words">
                Estimated Recovery Window: 24 to 72 Hours via Meta Direct Representative
              </h5>
              <p className="text-xs text-zinc-400 mt-0.5 break-words">
                Protected by our 100% Pay On Success Guarantee. If we cannot restore your account, you pay $0.
              </p>
            </div>

            <a
              href={directWhatsAppLink(`Hello Notorious Media, I have an urgent Instagram account suspension (${banType}, ${daysBanned}). I want an immediate Pay-On-Success review.`)}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-display font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center space-x-2 shrink-0 transition shadow-lg shadow-rose-900/30 text-center"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Submit Urgent Case to WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Username Claim diagnostic */}
      {serviceId === "username-claim" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">Target Platform:</label>
              <div className="grid grid-cols-2 gap-2">
                {["Instagram", "X (Twitter)", "TikTok", "YouTube"].map((plat) => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setPlatform(plat.toLowerCase())}
                    className={`py-2 text-xs rounded-xl border transition ${
                      platform === plat.toLowerCase()
                        ? "bg-cyan-600 border-cyan-500 text-white font-bold"
                        : "bg-zinc-950/60 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">Handle Type:</label>
              <select
                value={handleLength}
                onChange={(e) => setHandleLength(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="clean">Exact Brand Name (e.g., @Acme)</option>
                <option value="short">Short Handle (3 - 5 characters)</option>
                <option value="generic">First Name / Dictionary Word</option>
              </select>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="min-w-0">
              <h5 className="text-xs sm:text-sm font-display font-bold text-white break-words">
                Transfer Feasibility: High (via Media Portal Inactivity Rights)
              </h5>
              <p className="text-xs text-zinc-400 mt-0.5 break-words">
                Accounts inactive for 2+ years can be released directly to matching brand entities.
              </p>
            </div>
            <a
              href={directWhatsAppLink(`Hello Notorious Media, I want to claim a username on ${platform} (${handleLength}). Please check handle availability.`)}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-display font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center space-x-2 shrink-0 transition text-center"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Check Handle on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Meta verify diagnostic */}
      {serviceId === "meta-verify" && (
        <div className="space-y-6">
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="text-emerald-400 font-mono text-xs font-semibold">
                ✓ Agency Fast-Track Submission Active
              </span>
              <h5 className="text-xs sm:text-sm font-display font-bold text-white mt-1 break-words">
                Legacy Verified Blue Badge Consultation
              </h5>
              <p className="text-xs text-zinc-400 mt-0.5 break-words">
                Skip the basic subscription. Build a permanent public figure profile dossier backed by press citations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenBrief}
                className="bg-white hover:bg-zinc-100 text-black text-xs font-bold px-4 py-2.5 rounded-xl transition text-center"
              >
                Request Quote
              </button>
              <a
                href={directWhatsAppLink("Hello Notorious Media, I want to apply for the official Meta/Instagram Verified Blue Badge. Please assess my profile.")}
                target="_blank"
                rel="noreferrer"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Press PR diagnostic */}
      {serviceId === "news-pr" && (
        <div className="space-y-6">
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="text-amber-400 font-mono text-xs font-semibold">
                ✓ Guaranteed Editorial Publishing Contracts
              </span>
              <h5 className="text-xs sm:text-sm font-display font-bold text-white mt-1 break-words">
                Tier-1 Publication Package (Forbes, Bloomberg, TechCrunch)
              </h5>
              <p className="text-xs text-zinc-400 mt-0.5 break-words">
                High-DA permanent backlinks, Google News indexing, and immediate notability for Wikipedia.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenBrief}
                className="bg-white hover:bg-zinc-100 text-black text-xs font-bold px-4 py-2.5 rounded-xl transition text-center"
              >
                Request Quote
              </button>
              <a
                href={directWhatsAppLink("Hello Notorious Media, I want to publish articles on Forbes/Bloomberg/top news. Please share current publication slots and pricing.")}
                target="_blank"
                rel="noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Web Development diagnostic */}
      {serviceId === "web-development" && (
        <div className="space-y-6">
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="text-cyan-400 font-mono text-xs font-semibold">
                ✓ Full-Stack Engineering &amp; High-Speed Architecture
              </span>
              <h5 className="text-xs sm:text-sm font-display font-bold text-white mt-1 break-words">
                Bespoke Corporate Portals, Agency Platforms &amp; Client Engines
              </h5>
              <p className="text-xs text-zinc-400 mt-0.5 break-words">
                React/Next.js stacks, Lighthouse score 98+, tailored quote workflows, SSL security hardening, and complete SEO schema.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenBrief}
                className="bg-white hover:bg-zinc-100 text-black text-xs font-bold px-4 py-2.5 rounded-xl transition text-center"
              >
                Request Quote
              </button>
              <a
                href={directWhatsAppLink("Hello Notorious Media, I want to inquire about custom Web Development and digital infrastructure for my brand.")}
                target="_blank"
                rel="noreferrer"
                className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
