import React, { useState, useEffect } from "react";
import { X, Sparkles, Copy, Check, Mail, ExternalLink, ArrowLeft } from "lucide-react";
import { Service } from "../types";

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
  agencyEmail?: string;
}

const LOADING_STEPS = [
  "Structuring project parameters...",
  "Formatting client specifications...",
  "Compiling quotation inquiry...",
  "Redirecting to email client..."
];

export default function ServiceModal({
  service,
  isOpen,
  onClose,
  whatsappNumber = "+919103908189",
  agencyEmail = "notoriousdigitalmedia@gmail.com",
}: ServiceModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [dispatchedInfo, setDispatchedInfo] = useState<{
    mailtoUrl: string;
    gmailWebUrl: string;
    subject: string;
    body: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [customNotes, setCustomNotes] = useState("");

  useEffect(() => {
    // Reset states when current service changes
    setFormData({});
    setDispatchedInfo(null);
    setLoading(false);
    setCopied(false);
    setCustomNotes("");
  }, [service]);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < LOADING_STEPS.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 350);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (!isOpen) return null;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getClientIdentifier = () => {
    return (
      formData.brandName ||
      formData.username ||
      formData.desiredUsername ||
      formData.handle ||
      formData.name ||
      formData.company ||
      ""
    );
  };

  const buildEmailContent = () => {
    const clientIdentifier = getClientIdentifier();
    const subject = `Quote Request: ${service.title}${clientIdentifier ? ` - ${clientIdentifier}` : ""}`;

    // Collect all fields provided by the client with human-friendly labels
    const fieldLines: string[] = [];

    service.fields.forEach((f) => {
      const val = formData[f.name];
      if (val && typeof val === "string" && val.trim()) {
        fieldLines.push(`• ${f.label}:\n  ${val.trim()}`);
      }
    });

    // Any other custom entries in formData not explicitly in service.fields
    Object.entries(formData).forEach(([k, v]) => {
      const isKnown = service.fields.some((f) => f.name === k);
      if (!isKnown && v && typeof v === "string" && v.trim()) {
        const friendlyName = k
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase());
        fieldLines.push(`• ${friendlyName}:\n  ${v.trim()}`);
      }
    });

    if (customNotes.trim()) {
      fieldLines.push(`• Custom Requests & Timeline Target:\n  ${customNotes.trim()}`);
    }

    const dateStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const body = `Hello Notorious Digital Media Team,

I am requesting a formal quotation and project scope review for the following service:

SERVICE: ${service.title}
DATE: ${dateStr}

==================================================
CLIENT SUBMITTED DETAILS
==================================================
${fieldLines.length > 0 ? fieldLines.join("\n\n") : "• No specific fields entered."}

==================================================
Please review these project specifications and respond back with a formal quotation, estimated timeline, and next steps.

Thank you!
`;

    return { subject, body };
  };

  const getEmailUrls = () => {
    const { subject, body } = buildEmailContent();
    const mailtoUrl = `mailto:${agencyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(agencyEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { mailtoUrl, gmailWebUrl, subject, body };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDispatchedInfo(null);

    // Analyse and format specifications, then immediately redirect to email
    setTimeout(() => {
      const urls = getEmailUrls();
      setDispatchedInfo(urls);
      setLoading(false);

      try {
        window.location.href = urls.mailtoUrl;
      } catch (err) {
        console.warn("Auto mailto redirection caught:", err);
      }
    }, 1200);
  };

  const copyBriefText = () => {
    if (!dispatchedInfo) return;
    navigator.clipboard.writeText(dispatchedInfo.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" id="service-advisory-modal">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-black/85 backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Modal content layout */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.8)] relative">
          
          {/* Glowing Top Frame */}
          <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${service.gradient}`} />

          {/* Header */}
          <div className="px-6 py-5 bg-zinc-900/50 border-b border-zinc-800 flex justify-between items-center">
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono tracking-wider bg-white/5 border border-white/10 text-zinc-300 mb-1`}>
                {service.badge}
              </span>
              <h3 className="text-xl font-bold font-display text-white leading-tight">
                {service.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg p-2 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {!dispatchedInfo && !loading && (
              <form onSubmit={handleSubmit} className="space-y-5" id="service-brief-form">
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="space-y-4">
                  {service.fields.map((field) => (
                    <div key={field.name} className="flex flex-col">
                      <label className="text-zinc-300 font-display font-medium text-xs tracking-wide uppercase mb-1.5">
                        {field.label}
                      </label>
                      
                      {field.type === "select" ? (
                        <select
                          required
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-700 transition"
                        >
                          <option value="">Choose one...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt} className="bg-zinc-950">
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "textarea" ? (
                        <textarea
                          required
                          rows={3}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none"
                        />
                      ) : (
                        <input
                          required
                          type={field.type}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition"
                        />
                      )}
                    </div>
                  ))}

                  {/* General Additional Instructions */}
                  <div className="flex flex-col">
                    <label className="text-zinc-400 font-display font-medium text-xs tracking-wide uppercase mb-1.5 flex items-center justify-between">
                      <span>Custom Requests & Timeline Target</span>
                      <span className="text-zinc-600 font-normal lowercase tracking-normal">optional</span>
                    </label>
                    <textarea
                      rows={2}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="e.g. Need priority launch, matching trademark is owned but inactive, specific URL preferences..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none"
                    />
                  </div>
                </div>

                {/* Submitting button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-xl font-display font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center space-x-2`}
                  >
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    <span>Generate Formal Quote</span>
                  </button>
                  <p className="text-center text-[11px] text-zinc-600 font-mono mt-2">
                    Prepares verified project scope and quotation summary
                  </p>
                </div>
              </form>
            )}

            {/* Loading Cinematic phase */}
            {loading && (
              <div className="py-12 flex flex-col items-center justify-center" id="modal-loading-screen">
                <div className="relative w-20 h-20 mb-8">
                  {/* Decorative rotating loading loops */}
                  <div className="absolute inset-0 rounded-full border-4 border-t-white/80 border-r-white/40 border-b-white/10 border-l-white/20 animate-spin" />
                  <div className={`absolute inset-2 rounded-full border-2 border-t-transparent border-r-transparent animate-[spin_1.5s_linear_infinite_reverse] bg-gradient-to-tr ${service.gradient} opacity-25`} />
                </div>
                
                <h4 className="text-white font-display font-semibold text-base mb-2">
                  Analyzing Custom Scope Request
                </h4>
                
                <div className="h-6 overflow-hidden relative w-full max-w-sm text-center">
                  <div 
                    className="text-zinc-400 text-xs font-mono transition-transform duration-500 ease-out"
                    style={{ transform: `translateY(-${loadingStep * 24}px)` }}
                  >
                    {LOADING_STEPS.map((step, idx) => (
                      <div key={idx} className="h-6 leading-6">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-64 h-[2px] bg-zinc-800/80 rounded-full mt-6 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${service.gradient} transition-all duration-300`} 
                    style={{ width: `${(loadingStep + 1) * (100 / LOADING_STEPS.length)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Results / Direct Email Redirect Screen */}
            {dispatchedInfo && !loading && (
              <div className="py-6 px-2 text-center space-y-6" id="quote-dispatched-screen">
                
                {/* Animated Dispatch Icon */}
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-[0_0_30px_rgba(59,130,246,0.35)] flex items-center justify-center">
                  <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                    <Mail className="w-8 h-8 text-blue-400 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    REDIRECTED TO EMAIL
                  </span>
                  <h4 className="text-2xl font-bold font-display text-white">
                    Quote Request Dispatched
                  </h4>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                    Your details have been compiled and redirected to your email client addressed to{" "}
                    <strong className="text-white font-mono">{agencyEmail}</strong> for our team to review manually and respond back.
                  </p>
                </div>

                {/* Submitted fields preview */}
                <div className="max-w-md mx-auto text-left bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      Client Submitted Specifications
                    </span>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Manual Review
                    </span>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 text-xs">
                    <div className="flex flex-col">
                      <span className="text-zinc-500 text-[10px] uppercase font-mono">Service</span>
                      <span className="text-white font-semibold">{service.title}</span>
                    </div>

                    {service.fields.map((f) => {
                      const val = formData[f.name];
                      if (!val || !val.trim()) return null;
                      return (
                        <div key={f.name} className="flex flex-col">
                          <span className="text-zinc-500 text-[10px] uppercase font-mono">{f.label}</span>
                          <span className="text-zinc-200 font-normal leading-relaxed">{val.trim()}</span>
                        </div>
                      );
                    })}

                    {customNotes.trim() && (
                      <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] uppercase font-mono">Custom Requests & Timeline Target</span>
                        <span className="text-zinc-200 font-normal leading-relaxed">{customNotes.trim()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Launch / Fallback Actions */}
                <div className="pt-2 max-w-md mx-auto space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={dispatchedInfo.mailtoUrl}
                      className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-600 text-white py-3.5 px-5 rounded-xl font-display font-bold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_10px_25px_rgba(59,130,246,0.35)] flex items-center justify-center space-x-2 text-sm"
                      id="launch-email-client-btn"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>Launch Email App</span>
                    </a>

                    <a
                      href={dispatchedInfo.gmailWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-white py-3.5 px-5 rounded-xl font-display font-semibold transition-all hover:scale-[1.01] flex items-center justify-center space-x-2 text-xs shrink-0"
                      id="launch-gmail-web-btn"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Open in Gmail Web</span>
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs">
                    <button
                      onClick={copyBriefText}
                      className="text-zinc-400 hover:text-zinc-200 flex items-center space-x-1.5 transition font-display"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Inquiry Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Inquiry Text</span>
                        </>
                      )}
                    </button>

                    <span className="text-zinc-700">•</span>

                    <button
                      onClick={() => setDispatchedInfo(null)}
                      className="text-zinc-400 hover:text-white flex items-center space-x-1 transition font-display"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Edit Details</span>
                    </button>

                    <span className="text-zinc-700">•</span>

                    <button
                      onClick={onClose}
                      className="text-zinc-400 hover:text-white transition font-display"
                    >
                      Close Window
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
