import React, { useState, useEffect } from "react";
import { Sparkles, Check, Globe, AtSign, Newspaper, ShieldAlert, Code2, Cpu, Terminal, Layout } from "lucide-react";

interface HeroTypewriterVisualProps {
  phraseIndex: number;
  isVisible: boolean;
}

export default function HeroTypewriterVisual({
  phraseIndex,
  isVisible,
}: HeroTypewriterVisualProps) {
  // Retain the current visual while fading out, only swap to new visual when visible again
  const [displayedIndex, setDisplayedIndex] = useState(phraseIndex);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setDisplayedIndex((prev) => (prev !== phraseIndex ? phraseIndex : prev));
      setImgError(false);
    }
  }, [phraseIndex, isVisible]);

  // Normalize index modulo 5 (now matching all 5 phrases)
  const activeIdx = displayedIndex % 5;

  return (
    <div
      className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-out transform ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0 filter-none"
          : "opacity-0 scale-90 translate-y-3 blur-[2px] pointer-events-none"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      {/* 3D Visual Item 0: Web Development / Web Portals (Emerald / Green Theme) */}
      {activeIdx === 0 && (
        <div className="relative flex flex-col items-center animate-float">
          {/* Ambient Green / Emerald Halo */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/30 via-teal-500/20 to-green-400/20 rounded-full blur-2xl -z-10 pointer-events-none" />

          {/* 3D Modern Web Portal Code Stage */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center [perspective:800px]">
            {/* 3D Glass Window Layer */}
            <div className="relative w-22 h-20 sm:w-24 sm:h-22 bg-gradient-to-br from-emerald-950/90 via-zinc-900/90 to-teal-950/80 backdrop-blur-xl border border-emerald-400/50 rounded-2xl shadow-[0_15px_35px_rgba(16,185,129,0.35)] flex flex-col justify-between p-2.5 [transform:rotateX(15deg)_rotateY(-10deg)] [transform-style:preserve-3d]">
              {/* Browser window dots */}
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-1.5 [transform:translateZ(10px)]">
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                </div>
                <span className="text-[7px] font-mono text-emerald-300 font-bold tracking-wider">NEXT.JS &bull; 99/100</span>
              </div>

              {/* Code brackets and glowing core */}
              <div className="flex items-center justify-center my-auto [transform:translateZ(18px)]">
                <div className="flex items-center space-x-1.5">
                  <Code2 className="w-8 h-8 text-emerald-400 filter drop-shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between text-[6px] font-mono text-emerald-300/90 pt-1 border-t border-emerald-500/20 [transform:translateZ(8px)]">
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  <span>CORE WEB VITALS</span>
                </span>
                <span className="text-white font-bold">0.4s LCP</span>
              </div>
            </div>

            {/* Orbiting Emerald Tech Ring */}
            <div className="absolute inset-0 border border-dashed border-emerald-400/40 rounded-full [transform:rotateX(68deg)_rotateZ(30deg)] pointer-events-none animate-[spin_18s_linear_infinite]" />
          </div>

          {/* Mini Transparency Badge (Green) */}
          <div className="mt-1 inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-emerald-300 uppercase">
              Web Development
            </span>
          </div>
        </div>
      )}

      {/* 3D Visual Item 1: Wikipedia */}
      {activeIdx === 1 && (
        <div className="relative flex flex-col items-center animate-float">
          {/* Ambient Blue Halo */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />

          {/* 3D Transparent Wikipedia Globe Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center [perspective:800px]">
            {!imgError ? (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/300px-Wikipedia-logo-v2.svg.png"
                alt="3D Wikipedia Puzzle Globe"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_12px_24px_rgba(59,130,246,0.45)] select-none pointer-events-none"
              />
            ) : (
              /* High-fidelity 3D Wikipedia Sphere Fallback */
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-800 to-slate-900 border border-blue-400/40 shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex items-center justify-center [transform-style:preserve-3d]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-950/80 via-indigo-900/60 to-blue-800/40 border border-blue-300/40 flex items-center justify-center shadow-[inset_0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-white filter drop-shadow-[0_2px_8px_rgba(96,165,250,0.9)] select-none">
                    W
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full border border-blue-400/30 [transform:rotateX(60deg)] pointer-events-none" />
              </div>
            )}

            {/* Orbiting Subtle Coordinate Ring */}
            <div className="absolute inset-0 border border-blue-400/30 rounded-full [transform:rotateX(70deg)_rotateZ(25deg)] pointer-events-none animate-[spin_20s_linear_infinite]" />
          </div>

          {/* Mini Transparency Badge */}
          <div className="mt-1 inline-flex items-center space-x-1.5 bg-blue-500/10 border border-blue-500/25 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-blue-300 uppercase">
              Wikipedia Entry
            </span>
          </div>
        </div>
      )}

      {/* 3D Visual Item 2: Claim Username Profiles */}
      {activeIdx === 2 && (
        <div className="relative flex flex-col items-center animate-float">
          {/* Ambient Cyan Halo */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/25 via-teal-500/20 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />

          {/* 3D Transparent Glowing Diamond Gem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center [perspective:800px]">
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 bg-gradient-to-tr from-teal-500/20 via-cyan-500/30 to-blue-500/10 backdrop-blur-xl border border-cyan-400/50 rounded-2xl shadow-[0_15px_30px_rgba(6,182,212,0.35)] flex items-center justify-center [transform:rotateX(25deg)_rotateY(-20deg)_rotateZ(5deg)] [transform-style:preserve-3d]">
              {/* Inner Glowing @ handle symbol */}
              <div className="flex flex-col items-center justify-center [transform:translateZ(15px)]">
                <AtSign className="w-10 h-10 text-cyan-200 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              </div>

              {/* Verified Mini Floating Badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-400 text-black font-bold flex items-center justify-center shadow-lg [transform:translateZ(25px)]">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Orbiting Cyan Cyber Ring */}
            <div className="absolute inset-1 border border-dashed border-cyan-400/40 rounded-full [transform:rotateX(65deg)] animate-[spin_15s_linear_infinite] pointer-events-none" />
          </div>

          {/* Mini Transparency Badge */}
          <div className="mt-1 inline-flex items-center space-x-1.5 bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-cyan-300 uppercase">
              @Handle Acquired
            </span>
          </div>
        </div>
      )}

      {/* 3D Visual Item 3: Major Media Outlets */}
      {activeIdx === 3 && (
        <div className="relative flex flex-col items-center animate-float">
          {/* Ambient Indigo/Gold Halo */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-transparent rounded-full blur-2xl -z-10 pointer-events-none" />

          {/* 3D Transparent Floating News Publication Cards */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center [perspective:800px]">
            {/* Back Card (Bloomberg/Reuters) */}
            <div className="absolute w-16 h-18 bg-indigo-950/70 border border-indigo-500/40 rounded-lg shadow-lg [transform:rotateZ(-12deg)_rotateY(-15deg)_translateZ(-15px)] p-1.5 backdrop-blur-md">
              <div className="h-1 w-2/3 bg-indigo-400/70 rounded-full" />
              <div className="mt-1.5 h-1 w-full bg-zinc-700/60 rounded-full" />
              <div className="mt-1 h-1 w-4/5 bg-zinc-700/60 rounded-full" />
            </div>

            {/* Front Card (Forbes Live Publication) */}
            <div className="relative w-18 h-20 sm:w-20 sm:h-22 bg-neutral-950/85 border border-amber-400/40 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] [transform:rotateZ(6deg)_rotateY(10deg)_translateZ(10px)] p-2 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-1 mb-1.5">
                  <span className="text-[7px] font-bold font-serif text-amber-300 tracking-wider">
                    FORBES
                  </span>
                  <span className="text-[6px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">
                    FEATURE
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200/90 rounded-sm mb-1" />
                <div className="h-1 w-4/5 bg-zinc-500/70 rounded-sm mb-0.5" />
                <div className="h-1 w-3/5 bg-zinc-500/70 rounded-sm" />
              </div>

              <div className="flex items-center justify-between text-[6px] font-mono text-indigo-300">
                <Newspaper className="w-2.5 h-2.5 text-indigo-400" />
                <span>INDEXED</span>
              </div>
            </div>
          </div>

          {/* Mini Transparency Badge */}
          <div className="mt-1 inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/25 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-indigo-300 uppercase">
              Major Media PR
            </span>
          </div>
        </div>
      )}

      {/* 3D Visual Item 4: Instagram Account Recovery */}
      {activeIdx === 4 && (
        <div className="relative flex flex-col items-center animate-float">
          {/* Ambient Rose Halo */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/25 via-pink-500/20 to-amber-500/15 rounded-full blur-2xl -z-10 pointer-events-none" />

          {/* 3D Transparent Floating Instagram Unban Shield */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center [perspective:800px]">
            {/* 3D Shield Base */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 bg-gradient-to-br from-rose-500/20 via-pink-500/30 to-amber-500/15 backdrop-blur-xl border border-rose-400/50 rounded-2xl shadow-[0_15px_30px_rgba(244,63,94,0.35)] flex items-center justify-center [transform:rotateY(-15deg)_rotateX(10deg)] [transform-style:preserve-3d]">
              {/* Instagram Authentic Vector Emblem */}
              <div className="relative flex flex-col items-center [transform:translateZ(14px)]">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] shadow-[0_6px_20px_rgba(220,39,67,0.5)] flex items-center justify-center">
                  <div className="w-full h-full rounded-[10px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
                    <svg
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating Unlock Badge */}
              <div className="absolute -bottom-2 -right-1.5 bg-emerald-500 text-black px-2 py-0.5 rounded-full text-[8px] font-mono font-bold flex items-center space-x-0.5 shadow-[0_0_12px_rgba(16,185,129,0.7)] [transform:translateZ(24px)]">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
                <span>UNLOCKED</span>
              </div>
            </div>

            {/* Orbiting Rose Ring */}
            <div className="absolute inset-1 border border-dashed border-rose-400/40 rounded-full [transform:rotateX(75deg)] animate-[spin_20s_linear_infinite] pointer-events-none" />
          </div>

          {/* Mini Transparency Badge */}
          <div className="mt-1 inline-flex items-center space-x-1.5 bg-rose-500/10 border border-rose-500/25 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-rose-300 uppercase">
              Account Restored
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
