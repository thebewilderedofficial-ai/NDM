import React, { useState, useRef } from "react";
import ThreeDIcon from "./ThreeDIcons";
import { Sparkles, Compass, Shield, Maximize2 } from "lucide-react";

interface Interactive3DStageProps {
  serviceId: string;
  title: string;
  badge: string;
  gradient: string;
}

export default function Interactive3DStage({
  serviceId,
  title,
  badge,
  gradient,
}: Interactive3DStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeEffect, setActiveEffect] = useState<"standard" | "hologram" | "pulse">("standard");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Constrain tilt angles between -20deg and 20deg
    const rotateY = (x / (rect.width / 2)) * 18;
    const rotateX = -(y / (rect.height / 2)) * 18;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-md mx-auto select-none" id={`3d-stage-${serviceId}`}>
      {/* Interactive Controls Pill */}
      <div className="flex items-center justify-between mb-3 px-3 py-1.5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-[11px] font-mono text-zinc-400">
        <div className="flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
          <span>Interactive 3D Stage (Move Cursor to Rotate)</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveEffect("standard")}
            className={`px-2 py-0.5 rounded text-[10px] transition ${
              activeEffect === "standard" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => setActiveEffect("hologram")}
            className={`px-2 py-0.5 rounded text-[10px] transition ${
              activeEffect === "hologram" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Holo
          </button>
        </div>
      </div>

      {/* 3D Perspective Card Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-72 sm:h-80 w-full rounded-3xl bg-gradient-to-b from-zinc-900/80 via-zinc-950/90 to-black border border-zinc-800/90 p-6 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden shadow-2xl transition-transform duration-150 ease-out [perspective:1200px]"
        style={{
          boxShadow: isHovered ? "0 25px 50px -12px rgba(99, 102, 241, 0.25)" : "0 20px 35px -10px rgba(0,0,0,0.6)",
        }}
      >
        {/* Hologram scanlines effect if selected */}
        {activeEffect === "hologram" && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-20" />
        )}

        {/* Dynamic ambient stage lighting */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-15 rounded-3xl blur-2xl transition-opacity duration-500`}
        />

        {/* Floating Ring Grid Lines in 3D */}
        <div className="absolute inset-6 border border-dashed border-zinc-800/60 rounded-full [transform:rotateX(65deg)] pointer-events-none" />
        <div className="absolute inset-16 border border-dashed border-indigo-500/20 rounded-full [transform:rotateX(65deg)] pointer-events-none animate-pulse" />

        {/* 3D Transformed Core Element */}
        <div
          className="relative z-10 [transform-style:preserve-3d] transition-transform duration-200 ease-out flex flex-col items-center"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${isHovered ? "30px" : "0px"})`,
          }}
        >
          {/* Main 3D Icon Presentation */}
          <div className="scale-110 sm:scale-125 mb-4">
            <ThreeDIcon serviceId={serviceId} />
          </div>

          {/* Floating Label Badge */}
          <div className="mt-2 [transform:translateZ(25px)] flex items-center space-x-2 bg-zinc-900/90 border border-zinc-700/80 px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-display font-bold text-white tracking-wide">{title}</span>
            <span className="text-[10px] font-mono text-zinc-400 border-l border-zinc-700 pl-2 uppercase">
              {badge}
            </span>
          </div>
        </div>

        {/* Bottom pedestal glow */}
        <div className="absolute bottom-4 w-44 h-8 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />
        
        {/* Subtle coordinate watermark */}
        <div className="absolute bottom-3 left-4 text-[9px] font-mono text-zinc-600">
          X: {rotation.x.toFixed(1)}° | Y: {rotation.y.toFixed(1)}°
        </div>
        <div className="absolute bottom-3 right-4 text-[9px] font-mono text-zinc-500 flex items-center gap-1">
          <Shield className="w-3 h-3 text-indigo-400" />
          <span>PORTAL ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
