import React from "react";

interface ThreeDIconProps {
  serviceId: string;
}

export default function ThreeDIcon({ serviceId }: ThreeDIconProps) {
  switch (serviceId) {
    case "wikipedia":
      return (
        <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Glowing Ambient Backdrop */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/35 transition-all duration-500" />
          
          {/* Main 3D Sphere of Connection lines */}
          <div className="relative w-28 h-28 [transform-style:preserve-3d] animate-[spin_10s_linear_infinite] hover:[animation-play-state:paused]">
            {/* Outer rings simulating global coordinates */}
            <div className="absolute inset-0 rounded-full border border-blue-400/40 [transform:rotateX(45deg)_rotateY(45deg)]" />
            <div className="absolute inset-0 rounded-full border border-indigo-400/30 [transform:rotateX(45deg)_rotateY(-45deg)]" />
            <div className="absolute inset-0 rounded-full border-2 border-violet-400/50 [transform:rotateH(90deg)] flex items-center justify-center">
              {/* Inner core */}
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)] flex items-center justify-center font-bold text-white text-lg">
                W
              </div>
            </div>
          </div>
          
          {/* Floating Wikipedia Book Platform */}
          <div className="absolute bottom-1 w-24 h-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.3)] [transform:rotateX(60deg)_rotateZ(-20deg)] flex flex-col justify-between p-2">
            <div className="h-1 w-full bg-blue-400/40 rounded" />
            <div className="h-1 w-4/5 bg-slate-300/30 rounded" />
            <div className="h-1 w-2/3 bg-slate-300/30 rounded" />
          </div>
        </div>
      );

    case "instagram-unban":
      return (
        <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Glowing Ambient Backdrop */}
          <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-orange-500/35 transition-all duration-500" />
          
          {/* 3D Shield base */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-pink-500/20 via-rose-500/30 to-amber-500/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_10px_25px_rgba(244,63,94,0.35)] flex items-center justify-center [transform:rotateY(-15deg)_rotateX(15deg)] transition-all duration-300 hover:[transform:rotateY(5deg)_rotateX(5deg)] [transform-style:preserve-3d]">
            {/* Holographic Keyholes and locked locks */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 opacity-20 blur-sm -z-10 group-hover:opacity-40 transition-all duration-500" />
            
            <div className="relative flex flex-col items-center">
              {/* Outer glowing key */}
              <svg className="w-12 h-12 text-rose-100 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </div>
            
            {/* Floating padlock ring representing restoration unlock */}
            <div className="absolute -top-3 right-2 w-8 h-8 rounded-full border-2 border-green-400 bg-black/60 shadow-[0_0_12px_rgba(74,222,128,0.5)] flex items-center justify-center font-bold text-green-400 text-xs animate-[bounce_3s_infinite]">
              ✓
            </div>
          </div>
        </div>
      );

    case "username-claim":
      return (
        <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Glowing Ambient Backdrop */}
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-blue-500/35 transition-all duration-500" />
          
          {/* 3D Floating Diamond Gem */}
          <div className="relative w-24 h-24 hover:[transform:rotateY(180deg)] transition-all duration-1000 [transform-style:preserve-3d]">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/40 to-blue-500/30 backdrop-blur-md border border-white/30 rounded-xl shadow-[0_20px_40px_rgba(6,182,212,0.3)] [transform:rotateX(45deg)_rotateY(45deg)] flex items-center justify-center overflow-hidden">
              {/* Core Shimmer */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full hover:translate-x-full duration-1000 transition-all [transform:skewX(-25deg)] animate-[shimmer_3s_infinite]" />
              
              <div className="[transform:rotateZ(-45deg)] z-10 flex flex-col items-center">
                <span className="font-mono text-xl font-bold bg-gradient-to-r from-white to-sky-100 bg-clip-text text-transparent">@</span>
                <span className="text-[9px] uppercase tracking-widest text-cyan-200">claim</span>
              </div>
            </div>
          </div>
          
          {/* Floating Digital Ring */}
          <div className="absolute inset-4 border border-dashed border-cyan-400/40 rounded-full animate-[spin_20s_linear_infinite]" />
        </div>
      );

    case "meta-verify":
      return (
        <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Glowing Ambient Backdrop */}
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500" />
          
          {/* Layered verification crown-stars */}
          <div className="relative w-28 h-28 flex items-center justify-center [transform-style:preserve-3d]">
            <div className="absolute w-24 h-24 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-3xl border border-white/20 shadow-[0_15px_30px_rgba(99,102,241,0.3)] [transform:rotateX(50deg)_rotateY(-10deg)] flex items-center justify-center">
              {/* Inner verification badge */}
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md [transform:translateZ(10px)] animate-pulse">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );

    case "news-pr":
      return (
        <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Glowing Ambient Backdrop */}
          <div className="absolute inset-0 bg-slate-800/20 rounded-full blur-2xl group-hover:bg-neutral-600/35 transition-all duration-500" />
          
          {/* Stacked 3D papers */}
          <div className="relative w-24 h-28 flex flex-col justify-end [transform-style:preserve-3d]">
            {/* Paper 3 (deepest) */}
            <div className="absolute w-20 h-24 top-0 left-4 bg-zinc-800 border border-zinc-700/60 rounded-md shadow-lg [transform:rotateZ(-12deg)_translateZ(-20deg)] p-2">
              <div className="h-1.5 w-1/2 bg-zinc-600 rounded" />
              <div className="mt-2 h-1 w-5/6 bg-zinc-700 rounded" />
            </div>
            
            {/* Paper 2 (middle) */}
            <div className="absolute w-20 h-24 top-2 left-2 bg-zinc-900 border border-zinc-700 rounded-md shadow-xl [transform:rotateZ(-4deg)_translateZ(-10deg)] p-2">
              <div className="h-1.5 w-2/3 bg-indigo-500/60 rounded" />
              <div className="mt-2 h-1 w-full bg-zinc-700 rounded" />
              <div className="mt-1 h-1 w-4/5 bg-zinc-700 rounded" />
            </div>

            {/* Paper 1 (front) */}
            <div className="absolute w-22 h-26 top-4 left-0 bg-neutral-950 border border-zinc-600/50 rounded-md shadow-[0_15px_30px_rgba(0,0,0,0.5)] [transform:rotateZ(4deg)_translateZ(0px)] p-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center bg-zinc-800 p-1 rounded mb-2">
                  <span className="text-[6px] font-bold text-indigo-400 uppercase tracking-widest">Forbes</span>
                  <span className="text-[5px] text-zinc-400">Live</span>
                </div>
                <div className="h-2 w-full bg-zinc-200/90 rounded" />
                <div className="mt-2 h-1 w-5/6 bg-zinc-600 rounded" />
                <div className="mt-1 h-1 w-4/5 bg-zinc-600 rounded" />
              </div>
              <div className="h-1 w-1/3 bg-indigo-400 rounded-sm self-end" />
            </div>
          </div>
        </div>
      );

    case "web-development":
      return (
        <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500 [perspective:1000px]">
          {/* Glowing Ambient Backdrop */}
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-blue-500/35 transition-all duration-500" />

          {/* 3D Browser Window Frame */}
          <div className="relative w-28 h-24 bg-gradient-to-br from-cyan-950/80 via-zinc-900/90 to-blue-950/80 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-[0_15px_35px_rgba(6,182,212,0.3)] [transform:rotateY(-12deg)_rotateX(12deg)] transition-all duration-300 group-hover:[transform:rotateY(0deg)_rotateX(0deg)] p-2 flex flex-col justify-between">
            {/* Window header dots */}
            <div className="flex items-center space-x-1.5 pb-1 border-b border-cyan-500/20">
              <div className="w-2 h-2 rounded-full bg-rose-500/80" />
              <div className="w-2 h-2 rounded-full bg-amber-500/80" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <div className="ml-auto text-[7px] font-mono text-cyan-400/70">https://</div>
            </div>

            {/* Code snippets & layout lines */}
            <div className="space-y-1.5 py-1">
              <div className="flex items-center space-x-1">
                <span className="text-[8px] font-mono text-cyan-300 font-bold">&lt;/&gt;</span>
                <div className="h-1.5 w-14 bg-cyan-400/40 rounded" />
              </div>
              <div className="h-1 w-20 bg-zinc-700/80 rounded" />
              <div className="h-1 w-16 bg-blue-500/40 rounded" />
            </div>

            {/* Floating Terminal Pill */}
            <div className="bg-cyan-500/20 border border-cyan-400/40 rounded px-1.5 py-0.5 flex items-center justify-between">
              <span className="text-[7px] font-mono text-cyan-300">REACT + NEXT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>
      );

    default:

      return (
        <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-slate-500/10 rounded-full blur-xl" />
          <div className="w-16 h-16 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-white">
            🔮
          </div>
        </div>
      );
  }
}
