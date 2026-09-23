import React from "react";

interface ThreeDIconProps {
  serviceId: string;
}

export default function ThreeDIcon({ serviceId }: ThreeDIconProps) {
  switch (serviceId) {
    /* -------------------------------------------------------------
       1. WIKIPEDIA PAGE CREATION
       Unique Theme: 3D Gyroscopic Knowledge Globe with orbital ring,
       hovering encyclopedia codex with scanning laser & orbiting wiki particles
       ------------------------------------------------------------- */
    case "wikipedia":
      return (
        <div className="relative w-44 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Ambient Multi-layer Aura Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-violet-600/30 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 group-hover:from-blue-500/40 group-hover:to-violet-500/50 transition-all duration-700 animate-pulse" />

          {/* Floating Wikipedia Book Platform with animated laser reader */}
          <div className="absolute bottom-2 w-28 h-12 bg-zinc-900/90 backdrop-blur-md rounded-xl border border-blue-400/30 shadow-[0_15px_35px_rgba(30,58,138,0.35)] [transform:rotateX(60deg)_rotateZ(-12deg)] flex flex-col justify-between p-2 overflow-hidden group-hover:border-blue-400/60 transition-colors">
            {/* Glowing Scan Ray sweeping across lines */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent -translate-x-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
            <div className="h-1 w-full bg-blue-400/60 rounded" />
            <div className="h-1 w-4/5 bg-indigo-300/40 rounded" />
            <div className="h-1 w-2/3 bg-slate-400/30 rounded" />
          </div>

          {/* 3D Gyroscope Sphere System */}
          <div className="relative w-28 h-28 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(25deg)]">
            {/* Outer Equatorial Planetary Ring with floating satellite node */}
            <div className="absolute inset-[-4px] rounded-full border border-blue-400/50 border-dashed animate-[spin_16s_linear_infinite]">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
            </div>

            {/* Orbit Ring 1 (X/Y rotated) */}
            <div className="absolute inset-0 rounded-full border border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-[spin_10s_linear_infinite] [transform:rotateX(60deg)_rotateY(30deg)]" />

            {/* Orbit Ring 2 (Counter-rotating) */}
            <div className="absolute inset-1 rounded-full border border-indigo-400/60 shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-[spin_8s_linear_infinite_reverse] [transform:rotateX(60deg)_rotateY(-50deg)]" />

            {/* Orbit Ring 3 (Z axis shimmer) */}
            <div className="absolute inset-3 rounded-full border border-violet-400/50 animate-[spin_12s_linear_infinite] [transform:rotateX(20deg)_rotateY(80deg)]" />

            {/* Core Wikipedia Monogram Crystal with breathing levitation */}
            <div className="absolute inset-0 m-auto w-12 h-12 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.8)] border border-white/40 flex items-center justify-center text-white font-serif font-black text-2xl tracking-tighter animate-[float_4s_easeInOut_infinite] group-hover:scale-110 transition-transform">
              <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] select-none">W</span>
              {/* Corner accent sparkles */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          </div>

          {/* Floating Verified Wikipedia Badge Tag */}
          <div className="absolute -top-1 right-2 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-[9px] font-mono font-semibold text-blue-300 shadow-md backdrop-blur-sm animate-[bounce_4s_easeInOut_infinite]">
            NOTABLE
          </div>
        </div>
      );

    /* -------------------------------------------------------------
       2. INSTAGRAM UNBAN & RECOVERY
       Unique Theme: Neon Cyber-Shield with pulsing security radar waves,
       a rotating golden cyber-key, and dynamic unlock padlock click
       ------------------------------------------------------------- */
    case "instagram-unban":
      return (
        <div className="relative w-44 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Ambient Instagram Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/25 via-pink-500/20 to-amber-500/25 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 group-hover:from-rose-500/40 group-hover:to-amber-500/45 transition-all duration-700" />

          {/* Concentric Radar Sonar Waves emitting from center */}
          <div className="absolute w-32 h-32 rounded-full border border-rose-500/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
          <div className="absolute w-24 h-24 rounded-full border border-pink-400/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:1s] pointer-events-none" />

          {/* 3D Floating Cyber Security Shield */}
          <div className="relative w-28 h-28 bg-gradient-to-br from-zinc-900/90 via-pink-950/60 to-rose-900/70 backdrop-blur-xl border border-rose-500/40 rounded-3xl shadow-[0_15px_35px_rgba(244,63,94,0.35)] flex items-center justify-center [transform:rotateY(-12deg)_rotateX(10deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)] transition-all duration-500 [transform-style:preserve-3d]">
            {/* Holographic rim light */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-400 opacity-40 blur-xs group-hover:opacity-80 transition-opacity duration-500 -z-10" />

            {/* Central Meta/Instagram glyph with rotating Cyber-Key */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Golden Cyber Key with spinning shimmer */}
              <div className="relative w-14 h-14 flex items-center justify-center animate-[float_3s_easeInOut_infinite]">
                <svg
                  className="w-12 h-12 text-rose-100 filter drop-shadow-[0_0_12px_rgba(244,63,94,0.9)] group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>

                {/* Sparkling Glint on Key Teeth */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-amber-200 rounded-full animate-ping" />
              </div>
            </div>

            {/* 3D Success Unlock Badge floating on top corner */}
            <div className="absolute -top-3 -right-3 w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-zinc-950 shadow-[0_0_18px_rgba(16,185,129,0.8)] flex items-center justify-center font-bold text-white text-sm animate-[bounce_2.5s_infinite]">
              <svg className="w-5 h-5 text-white stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            {/* Status ticker pill at bottom */}
            <div className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-zinc-950/90 border border-rose-500/50 shadow-lg text-[8px] font-mono font-bold text-rose-300 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>UNBAN ESCALATED</span>
            </div>
          </div>
        </div>
      );

    /* -------------------------------------------------------------
       3. USERNAME CLAIMS
       Unique Theme: 3D Holographic Gem Diamond spinning with
       an orbital neon target reticle searching for @handles
       ------------------------------------------------------------- */
    case "username-claim":
      return (
        <div className="relative w-44 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Ambient Cyan/Teal Nebula Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/25 via-cyan-500/20 to-blue-600/30 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 group-hover:from-teal-400/40 group-hover:to-cyan-400/50 transition-all duration-700" />

          {/* Rotating Target Reticle Ring 1 */}
          <div className="absolute inset-3 border border-dashed border-cyan-400/40 rounded-full animate-[spin_20s_linear_infinite]" />
          
          {/* Rotating Crosshair Ring 2 (counter) */}
          <div className="absolute inset-6 border border-teal-400/30 rounded-full animate-[spin_12s_linear_infinite_reverse] flex items-center justify-between px-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
          </div>

          {/* 3D Floating Diamond Cube Handle Container */}
          <div className="relative w-24 h-24 [transform-style:preserve-3d] animate-[float_3.5s_easeInOut_infinite] group-hover:[transform:rotateY(180deg)] transition-transform duration-1000">
            {/* Gem Shell */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/40 via-cyan-500/30 to-blue-600/40 backdrop-blur-md border border-cyan-300/40 rounded-2xl shadow-[0_20px_45px_rgba(6,182,212,0.4)] [transform:rotateX(45deg)_rotateY(45deg)] flex items-center justify-center overflow-hidden">
              {/* Continuous Shimmer Light Ray */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] [transform:skewX(-25deg)]" />

              {/* Inner Handle Emblem */}
              <div className="[transform:rotateZ(-45deg)] z-10 flex flex-col items-center">
                <span className="font-mono text-3xl font-extrabold bg-gradient-to-b from-white via-cyan-100 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(6,182,212,0.8)]">
                  @
                </span>
                <span className="text-[8px] uppercase tracking-widest font-mono text-cyan-200 font-bold">
                  CLAIMED
                </span>
              </div>
            </div>

            {/* Orbiting Small Tag Pill */}
            <div className="absolute -top-2 -left-2 px-2 py-0.5 rounded-md bg-cyan-500/30 border border-cyan-400/50 backdrop-blur-sm text-[8px] font-mono text-cyan-200 shadow animate-pulse">
              OG HANDLE
            </div>
          </div>
        </div>
      );

    /* -------------------------------------------------------------
       4. SOCIAL MEDIA VERIFICATION (META & X)
       Unique Theme: 3D Royal Starburst Octagram with spinning halo rings,
       floating blue checkmark seal, and radiating verification beams
       ------------------------------------------------------------- */
    case "meta-verify":
      return (
        <div className="relative w-44 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Ambient Indigo/Emerald Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/25 via-indigo-600/25 to-emerald-500/25 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 group-hover:from-blue-500/40 group-hover:to-emerald-400/45 transition-all duration-700" />

          {/* Radiating Celestial Orbit Ring */}
          <div className="absolute w-32 h-32 rounded-full border-2 border-indigo-400/30 border-t-indigo-400 border-b-emerald-400 animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-36 h-36 rounded-full border border-dashed border-indigo-300/20 animate-[spin_15s_linear_infinite_reverse]" />

          {/* 3D Verification Medal Badge */}
          <div className="relative w-28 h-28 flex items-center justify-center [transform-style:preserve-3d] animate-[float_4s_easeInOut_infinite]">
            {/* Starburst Base 1 */}
            <div className="absolute w-24 h-24 bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 rounded-3xl shadow-[0_15px_35px_rgba(79,70,229,0.45)] border border-white/30 [transform:rotate(0deg)] transition-transform duration-500 group-hover:[transform:rotate(45deg)]" />
            {/* Starburst Base 2 (rotated 45deg for 8-point royal crown look) */}
            <div className="absolute w-24 h-24 bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 rounded-3xl shadow-[0_15px_35px_rgba(79,70,229,0.45)] border border-white/30 [transform:rotate(45deg)] transition-transform duration-500 group-hover:[transform:rotate(0deg)]" />

            {/* Elevated Central Verification Seal */}
            <div className="relative z-10 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.9)] [transform:translateZ(15deg)] group-hover:scale-110 transition-transform">
              {/* Glowing Blue Checkmark */}
              <svg className="w-9 h-9 text-blue-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Top Floating Badge Tag */}
            <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-mono font-bold text-[8px] shadow-[0_0_12px_rgba(37,99,235,0.8)] border border-white/40 flex items-center space-x-1 z-20">
              <span>BLUE BADGE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
          </div>
        </div>
      );

    /* -------------------------------------------------------------
       5. PRESS & MEDIA PR (NEWS WIRE)
       Unique Theme: 3D Stacked Editorial Press Sheets with floating
       live publication headline cards (Forbes, Bloomberg, Reuters)
       and dynamic news ticker broadcast
       ------------------------------------------------------------- */
    case "news-pr":
      return (
        <div className="relative w-44 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Ambient Pressroom Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-indigo-600/20 to-purple-600/25 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 group-hover:from-indigo-500/35 group-hover:to-amber-500/35 transition-all duration-700" />

          {/* Stacked 3D Newspaper Pages with interactive fan-out */}
          <div className="relative w-28 h-32 flex flex-col justify-end [transform-style:preserve-3d] animate-[float_4s_easeInOut_infinite]">
            {/* Sheet 3 (Deepest / Back) */}
            <div className="absolute w-24 h-26 top-0 right-1 bg-zinc-800/90 border border-zinc-700/70 rounded-xl shadow-lg [transform:rotateZ(-10deg)_translateZ(-25px)] p-2 transition-transform duration-500 group-hover:[transform:rotateZ(-18deg)_translateZ(-30px)]">
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-[6px] font-bold text-amber-400 font-mono">BLOOMBERG</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-600/70 rounded" />
              <div className="mt-1 h-1 w-3/4 bg-zinc-700 rounded" />
            </div>

            {/* Sheet 2 (Middle) */}
            <div className="absolute w-24 h-26 top-2 left-1 bg-zinc-900 border border-indigo-500/40 rounded-xl shadow-xl [transform:rotateZ(6deg)_translateZ(-10px)] p-2 transition-transform duration-500 group-hover:[transform:rotateZ(12deg)_translateZ(-15px)]">
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-[6px] font-bold text-emerald-400 font-mono">TECHCRUNCH</span>
              </div>
              <div className="h-1.5 w-full bg-indigo-400/50 rounded" />
              <div className="mt-1 h-1 w-4/5 bg-zinc-700 rounded" />
            </div>

            {/* Sheet 1 (Front Master Feature) */}
            <div className="relative w-26 h-28 bg-neutral-950 border border-zinc-600/60 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] [transform:rotateZ(-2deg)_translateZ(5px)] p-3 flex flex-col justify-between overflow-hidden group-hover:[transform:rotateZ(0deg)_translateZ(10deg)] transition-transform duration-500">
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[scan_1.5s_ease-in-out_infinite]" />

              <div>
                {/* Header masthead */}
                <div className="flex justify-between items-center bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 mb-2">
                  <span className="text-[7px] font-black text-indigo-300 tracking-wider uppercase font-serif">
                    FORBES
                  </span>
                  <span className="text-[6px] font-mono text-emerald-400 flex items-center gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                </div>

                {/* Simulated Headline */}
                <div className="h-2 w-full bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-sm" />
                <div className="mt-1.5 h-1 w-5/6 bg-zinc-600 rounded" />
                <div className="mt-1 h-1 w-3/5 bg-zinc-700 rounded" />
              </div>

              {/* Bottom Byline & DA 90+ Badge */}
              <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                <span className="text-[6px] font-mono text-zinc-500">TIER-1 PRESS</span>
                <span className="text-[7px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1 rounded border border-amber-500/20">
                  DA 92
                </span>
              </div>
            </div>
          </div>

          {/* Floating News Broadcast Beacon */}
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-indigo-600/80 border border-indigo-300/60 shadow-[0_0_12px_rgba(99,102,241,0.8)] flex items-center justify-center text-white text-[10px] animate-pulse">
            📡
          </div>
        </div>
      );

    /* -------------------------------------------------------------
       6. WEB DEVELOPMENT & DIGITAL INFRASTRUCTURE
       Unique Theme: 3D Holographic Browser Glass with code syntax editor,
       speedometer gauge needle ticking at 100/100, and pulsing reactive matrix
       ------------------------------------------------------------- */
    case "web-development":
      return (
        <div className="relative w-44 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Ambient Cyan/Blue Matrix Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-blue-600/25 to-indigo-600/30 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 group-hover:from-cyan-400/40 group-hover:to-blue-500/45 transition-all duration-700" />

          {/* 3D Browser Window Frame with code IDE */}
          <div className="relative w-32 h-26 bg-gradient-to-br from-zinc-950/95 via-cyan-950/60 to-blue-950/80 backdrop-blur-xl border border-cyan-400/40 rounded-2xl shadow-[0_20px_45px_rgba(6,182,212,0.35)] [transform:rotateY(-12deg)_rotateX(10deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)] transition-all duration-500 p-2.5 flex flex-col justify-between [transform-style:preserve-3d]">
            {/* Top Mac style traffic light dots */}
            <div className="flex items-center space-x-1.5 pb-1.5 border-b border-cyan-500/20">
              <div className="w-2 h-2 rounded-full bg-rose-500/90 shadow-[0_0_6px_#f43f5e]" />
              <div className="w-2 h-2 rounded-full bg-amber-500/90 shadow-[0_0_6px_#f59e0b]" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/90 shadow-[0_0_6px_#10b981]" />
              <div className="ml-auto flex items-center space-x-1 text-[7px] font-mono text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                <span>99.9% SLA</span>
              </div>
            </div>

            {/* Code IDE syntax lines with animated cursor */}
            <div className="space-y-1.5 py-1">
              <div className="flex items-center space-x-1.5">
                <span className="text-[9px] font-mono text-cyan-400 font-black">&lt;/&gt;</span>
                <div className="h-1.5 w-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded animate-pulse" />
                <span className="w-1 h-2.5 bg-cyan-300 animate-[blink_1s_infinite]" />
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-1 w-10 bg-indigo-400/60 rounded" />
                <div className="h-1 w-12 bg-zinc-700/80 rounded" />
              </div>
              <div className="h-1 w-20 bg-blue-500/50 rounded" />
            </div>

            {/* Bottom Tech Badge Pill */}
            <div className="bg-cyan-500/15 border border-cyan-400/40 rounded-lg px-2 py-0.5 flex items-center justify-between">
              <span className="text-[7px] font-mono font-bold text-cyan-200">
                REACT • NEXT • TS
              </span>
              <span className="text-[7px] font-mono font-bold text-emerald-400">
                100/100 SPEED
              </span>
            </div>
          </div>

          {/* Floating Speed Radar Badge on side */}
          <div className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full bg-zinc-950 border border-cyan-400/60 shadow-lg text-[8px] font-mono font-bold text-cyan-300 flex items-center space-x-1 animate-[bounce_3s_infinite]">
            <span>⚡ 0.2s TTFB</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-slate-500/10 rounded-full blur-xl" />
          <div className="w-16 h-16 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-white text-2xl">
            ✨
          </div>
        </div>
      );
  }
}
