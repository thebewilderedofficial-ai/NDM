import React, { useState, useRef, useEffect } from "react";
import { Shield, Fingerprint, CheckCircle2, ArrowRight, ExternalLink, RotateCcw } from "lucide-react";

interface Interactive3DStageProps {
  serviceId: string;
  title: string;
  badge: string;
  gradient: string;
  whatsappNumber?: string;
}

export default function Interactive3DStage({
  serviceId,
  title,
  badge,
  gradient,
  whatsappNumber = "+919103908189",
}: Interactive3DStageProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [holdErrorNotice, setHoldErrorNotice] = useState<boolean>(false);

  const holdStartTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const HOLD_DURATION_MS = 4000; // Exact 4 seconds to complete

  // Clean phone number for WhatsApp URL
  const cleanPhone = whatsappNumber.replace("+", "").replace(/\s/g, "");

  // Blue theme for Wikipedia
  const isBlueTheme = serviceId === "wikipedia";

  const startHold = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent default touch gestures like scrolling/zooming while holding
    if ("touches" in e) {
      // touch event
    }
    if (isUnlocked) return;

    setIsHolding(true);
    setHoldErrorNotice(false);
    holdStartTimeRef.current = performance.now();

    const updateProgress = (now: number) => {
      if (!holdStartTimeRef.current) return;
      const elapsed = now - holdStartTimeRef.current;
      const pct = Math.min(100, Math.round((elapsed / HOLD_DURATION_MS) * 100));
      setProgress(pct);

      if (pct >= 100) {
        setIsHolding(false);
        setIsUnlocked(true);
        holdStartTimeRef.current = null;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const cancelHold = () => {
    if (isUnlocked) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (isHolding && progress < 100) {
      setHoldErrorNotice(true);
      setTimeout(() => setHoldErrorNotice(false), 1800);
    }
    setIsHolding(false);
    setProgress(0);
    holdStartTimeRef.current = null;
  };

  const handlePublishClick = () => {
    const message = `Hello Notorious Media, I unlocked my digital potential on the ${title} portal! I am ready to publish and deploy my authority presence.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleReset = () => {
    setIsUnlocked(false);
    setProgress(0);
    setIsHolding(false);
    holdStartTimeRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-full sm:max-w-md mx-auto select-none overflow-hidden" id={`verification-stage-${serviceId}`}>
      {/* Verification Status Indicator Header */}
      <div className="flex items-center justify-between gap-2 mb-3 px-3 sm:px-3.5 py-2 bg-zinc-900/70 border border-zinc-800/90 rounded-2xl text-[11px] font-mono text-zinc-400 backdrop-blur-md overflow-hidden">
        <div className="flex items-center space-x-2 min-w-0">
          <span
            className={`w-2 h-2 shrink-0 rounded-full ${
              isUnlocked
                ? isBlueTheme
                  ? "bg-blue-400 animate-pulse"
                  : "bg-emerald-400 animate-pulse"
                : isHolding
                ? isBlueTheme
                  ? "bg-blue-400 animate-ping"
                  : "bg-cyan-400 animate-ping"
                : "bg-indigo-400"
            }`}
          />
          <span className="text-zinc-300 font-semibold tracking-wide truncate text-[10px] sm:text-[11px]">
            {isUnlocked ? "AUTHENTICATED" : isHolding ? "SCANNING BIOMETRICS..." : "BIOMETRIC AUTHENTICATION"}
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-zinc-500 text-[10px] shrink-0">
          <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-none">{badge}</span>
        </div>
      </div>

      {/* Holographic Chamber Stage */}
      <div
        className={`relative min-h-[340px] sm:min-h-[360px] w-full rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black border transition-all duration-300 p-6 flex flex-col items-center justify-center overflow-hidden shadow-2xl ${
          isUnlocked
            ? isBlueTheme
              ? "border-blue-500/60 shadow-[0_0_50px_rgba(37,99,235,0.3)]"
              : "border-emerald-500/60 shadow-[0_0_50px_rgba(16,185,129,0.25)]"
            : isHolding
            ? isBlueTheme
              ? "border-blue-500/70 shadow-[0_0_45px_rgba(37,99,235,0.35)]"
              : "border-cyan-500/70 shadow-[0_0_45px_rgba(6,182,212,0.3)]"
            : isBlueTheme
            ? "border-zinc-800/90 hover:border-blue-700/60"
            : "border-zinc-800/90 hover:border-zinc-700"
        }`}
      >
        {/* Ambient Hologram Glows & Cyber Matrix Grid */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-20 rounded-3xl blur-2xl transition-opacity duration-700 pointer-events-none`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

        {/* Scanlines layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 z-10" />

        {!isUnlocked ? (
          /* ========================================================================= */
          /* UNLOCKED: FALSE => INTERACTIVE FINGERPRINT HOLOGRAM & PROGRESS BAR        */
          /* ========================================================================= */
          <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-2">
            
            {/* Holographic Fingerprint Interactive Touch Zone */}
            <div
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              onTouchCancel={cancelHold}
              className={`relative cursor-pointer group rounded-full p-6 transition-all duration-200 select-none touch-none ${
                isHolding ? "scale-95" : "hover:scale-105 active:scale-95"
              }`}
              style={{ WebkitTouchCallout: "none", userSelect: "none" }}
              title="Hold down to scan"
            >
              {/* Radial Hologram Pulse Rings */}
              <div
                className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                  isBlueTheme
                    ? isHolding
                      ? "scale-125 border-blue-400/70 animate-ping"
                      : "scale-100 border-blue-500/30"
                    : isHolding
                    ? "scale-125 border-cyan-400/60 animate-ping"
                    : "scale-100 border-cyan-500/30"
                }`}
              />
              <div
                className={`absolute -inset-2 rounded-full border transition-all duration-500 ${
                  isBlueTheme
                    ? isHolding
                      ? "scale-150 border-blue-400/50"
                      : "scale-105 border-indigo-500/25"
                    : isHolding
                    ? "scale-150 border-indigo-400/50"
                    : "scale-105 border-indigo-500/20"
                }`}
              />

              {/* Glowing Background Disc */}
              <div
                className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
                  isBlueTheme
                    ? isHolding
                      ? "bg-blue-950/80 border-2 border-blue-400 shadow-[0_0_35px_rgba(37,99,235,0.7)]"
                      : "bg-zinc-900/90 border border-blue-500/40 shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                    : isHolding
                    ? "bg-cyan-950/70 border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.6)]"
                    : "bg-zinc-900/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                }`}
              >
                {/* Laser Scanning Bar (Sweeps during hold) */}
                {isHolding && (
                  <div
                    className={`absolute inset-x-0 h-1 bg-gradient-to-r from-transparent animate-bounce z-20 ${
                      isBlueTheme
                        ? "via-blue-300 to-transparent shadow-[0_0_14px_#3b82f6]"
                        : "via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee]"
                    }`}
                  />
                )}

                {/* Biometric Laser Grid Hologram SVG */}
                <div className="relative z-10">
                  <Fingerprint
                    className={`w-16 h-16 sm:w-20 sm:h-20 transition-all duration-300 ${
                      isBlueTheme
                        ? isHolding
                          ? "text-blue-400 drop-shadow-[0_0_16px_rgba(59,130,246,0.95)] animate-pulse"
                          : "text-blue-400/80 drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] group-hover:text-blue-300"
                        : isHolding
                        ? "text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.9)] animate-pulse"
                        : "text-cyan-400/80 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:text-cyan-300"
                    }`}
                  />
                </div>

                {/* Progress Overlay Radial Fill */}
                <div
                  className={`absolute bottom-0 inset-x-0 transition-all duration-75 pointer-events-none ${
                    isBlueTheme
                      ? "bg-gradient-to-t from-blue-600/40 to-indigo-500/15"
                      : "bg-gradient-to-t from-cyan-500/30 to-indigo-500/10"
                  }`}
                  style={{ height: `${progress}%` }}
                />
              </div>
            </div>

            {/* Hold Instructions Copy */}
            <div className="mt-4 mb-3">
              <h4 className="text-sm sm:text-base font-display font-bold text-white tracking-wide">
                Hold to unlock your credibility and presence
              </h4>
              <p className="text-[11px] text-zinc-400 mt-1 font-mono min-h-[16px]">
                {isHolding ? (
                  <span className={`${isBlueTheme ? "text-blue-400" : "text-cyan-400"} font-semibold animate-pulse`}>
                    HOLDING... SCANNING CREDIBILITY ({progress}%)
                  </span>
                ) : holdErrorNotice ? (
                  <span className="text-rose-400 font-medium">
                    ⚠️ Keep holding continuously!
                  </span>
                ) : null}
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full max-w-xs mt-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1.5 px-0.5">
                <span>AUTHENTICATION PROGRESS</span>
                <span className={isHolding ? (isBlueTheme ? "text-blue-400 font-bold" : "text-cyan-400 font-bold") : "text-zinc-400"}>
                  {progress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-zinc-950 border border-zinc-800 rounded-full overflow-hidden p-0.5 shadow-inner relative">
                <div
                  className={`h-full rounded-full transition-all duration-75 ${
                    isBlueTheme
                      ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.7)]"
                      : "bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 shadow-[0_0_10px_rgba(6,182,212,0.7)]"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* UNLOCKED: TRUE => CONGRATULATIONS & PUBLISH DIRECT TO WHATSAPP            */
          /* ========================================================================= */
          <div className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4 py-2 animate-in fade-in zoom-in duration-300">
            
            {/* Glowing Verified Badge */}
            <div className="relative mb-3">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center animate-bounce ${
                  isBlueTheme
                    ? "bg-blue-500/20 border-2 border-blue-400 text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                    : "bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                }`}
              >
                <CheckCircle2 className={`w-9 h-9 ${isBlueTheme ? "text-blue-400" : "text-emerald-400"}`} />
              </div>
            </div>

            {/* Unlocked Message requested by user */}
            <div
              className={`border rounded-2xl p-4 mb-5 max-w-sm backdrop-blur-sm ${
                isBlueTheme
                  ? "bg-blue-950/40 border-blue-500/30"
                  : "bg-emerald-950/40 border-emerald-500/30"
              }`}
            >
              <span
                className={`text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full border ${
                  isBlueTheme
                    ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
                    : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                }`}
              >
                100% CREDIBILITY UNLOCKED
              </span>
              <h3 className="text-base sm:text-lg font-bold font-display text-white mt-2 leading-snug">
                Congratulations!
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 font-medium leading-relaxed ${
                  isBlueTheme ? "text-blue-200" : "text-emerald-200"
                }`}
              >
                You have unlocked your true digital potential.
              </p>
            </div>

            {/* "Publish" Button directly to WhatsApp */}
            <button
              onClick={handlePublishClick}
              className={`w-full max-w-xs text-white font-display font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 group cursor-pointer ${
                isBlueTheme
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-[0_10px_30px_rgba(37,99,235,0.4)]"
                  : "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.4)]"
              }`}
              id="hologram-publish-btn"
            >
              <span>Publish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Destination Notice & Scan Again */}
            <div className="flex items-center justify-between w-full max-w-xs mt-3.5 px-1">
              <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                <span>Redirects to:</span>
                <span className={`font-semibold ${isBlueTheme ? "text-blue-400" : "text-emerald-400"}`}>
                  {whatsappNumber}
                </span>
              </span>
              <button
                onClick={handleReset}
                className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition"
                title="Scan again"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Re-scan</span>
              </button>
            </div>

          </div>
        )}

        {/* Verification Status Bar at Bottom */}
        <div className="absolute bottom-2.5 inset-x-4 flex justify-start items-center text-[9px] font-mono text-zinc-600 border-t border-zinc-900/80 pt-1.5 pointer-events-none">
          <span>PORTAL: {serviceId.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
