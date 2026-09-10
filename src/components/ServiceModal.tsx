import React, { useState, useEffect } from "react";
import { X, Sparkles, Send, Copy, Check, MessageSquare, AlertCircle, HelpCircle } from "lucide-react";
import { Service, BriefResponse } from "../types";

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

const LOADING_STEPS = [
  "Setting up our customer consultation session...",
  "Reviewing your digital search presence...",
  "Checking news sources and references...",
  "Verifying category guidelines and eligibility...",
  "Calculating the optimal plan for your brief...",
  "Ready to finalize!"
];

export default function ServiceModal({ service, isOpen, onClose, whatsappNumber }: ServiceModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<BriefResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [customNotes, setCustomNotes] = useState("");

  useEffect(() => {
    // Reset states when current service changes
    setFormData({});
    setResult(null);
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
      }, 1000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (!isOpen) return null;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Merge custom notes block if filled
    const submissionDetails = {
      ...formData,
      ...(customNotes.trim() ? { additionalAgencyDirectives: customNotes } : {})
    };

    try {
      const response = await fetch("/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          details: submissionDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Feasibility check failed.");
      }

      const data: BriefResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback local results
      setResult({
        assessment: "Failed to load direct strategic assessment. Fallback outline generated successfully.",
        recommendations: [
          "Double check internet connection parameters.",
          "Prepare official registration certificates.",
          "Coordinate directly with senior operations team on WhatsApp."
        ],
        whatsappBrief: `*PREMIUM ${service.title.toUpperCase()} INQUIRY*\n\n` +
          `Failed to compile full AI brief, however we are ready to serve you.\n\n` +
          `Details Submitted:\n` +
          Object.entries(formData)
            .map(([k, v]) => `• *${k}:* ${v}`)
            .join("\n") +
          `\n\n*Agency Support:* Ready to consult.`,
        isAiGenerated: false
      });
    } finally {
      setLoading(false);
    }
  };

  const copyBriefText = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.whatsappBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dispatchToWhatsApp = () => {
    if (!result) return;
    const cleanNum = whatsappNumber.replace("+", "").replace(/\s/g, "");
    const encodedText = encodeURIComponent(result.whatsappBrief);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNum}&text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
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
            {!result && !loading && (
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
                    <span>Run AI Strategic Assessment</span>
                  </button>
                  <p className="text-center text-[11px] text-zinc-600 font-mono mt-2">
                    Builds bespoke briefing copy in under 5 seconds
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

            {/* Results display */}
            {result && !loading && (
              <div className="space-y-6" id="assessment-response-view">
                
                {/* Feasibility Index Callout */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                  <h4 className="text-zinc-300 font-display font-bold text-xs uppercase tracking-wider mb-2 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Executive Advisory Assessment</span>
                  </h4>
                  <p className="text-zinc-100 text-sm leading-relaxed">
                    {result.assessment}
                  </p>
                </div>

                {/* Strategy Checkpoints */}
                <div className="space-y-2.5">
                  <h4 className="text-zinc-400 font-display font-medium text-xs uppercase tracking-wider">
                    Preparation Checklist & Guidance
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/40 text-xs text-zinc-300">
                        <div className={`p-1 mt-0.5 rounded-md bg-zinc-800 text-zinc-300`}>
                          {i + 1}
                        </div>
                        <p className="leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Raw Message Review Block */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-zinc-400 font-display font-medium text-xs uppercase tracking-wider">
                      Compiled Dispatch WhatsApp Brief
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {result.isAiGenerated ? "⚡ Optimized by AI" : "⚙️ Compiled via Heuristics"}
                    </span>
                  </div>

                  <div className="relative">
                    <pre className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-zinc-300 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                      {result.whatsappBrief}
                    </pre>
                    
                    {/* Copy Hover Button */}
                    <button
                      onClick={copyBriefText}
                      className="absolute right-3 top-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg p-2 text-zinc-400 hover:text-white transition-all shadow-md"
                      title="Copy brief copy to clipboard"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Final dispatch CTA */}
                <div className="pt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={dispatchToWhatsApp}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-display font-bold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_10px_25px_rgba(34,197,94,0.3)] flex items-center justify-center space-x-2 text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Order Brief via WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={() => setResult(null)}
                    className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white py-3 px-5 rounded-xl font-display font-medium transition text-xs"
                  >
                    Reconfigure Details
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
