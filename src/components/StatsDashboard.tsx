import React, { useState, useEffect, useRef } from "react";
import { Award, Zap, CheckCircle2 } from "lucide-react";

export default function StatsDashboard() {
  const [progress, setProgress] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Triggers when viewport enters and reaches the stats container
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px", // Mobile-friendly middle/lower-middle viewport trigger
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasTriggered) return;

    let startTimestamp: number | null = null;
    const duration = 1400; // Smooth 1.4s energetic count-up

    let animId: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const fraction = Math.min(elapsed / duration, 1);
      
      // Smooth easeOutCubic easing for satisfying deceleration
      const easeFraction = 1 - Math.pow(1 - fraction, 3);
      setProgress(easeFraction);

      if (fraction < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [hasTriggered]);

  const val1 = Math.floor(progress * 142);
  const val2 = (progress * 94.6).toFixed(1);
  const val3 = Math.floor(progress * 410);
  const val4 = Math.round(progress * 100);

  const stats = [
    {
      id: "stat-1",
      label: "Wikipedia Pages Published",
      value: `${val1}+`,
      sub: "Active Pages Setup Successfully",
      icon: Award,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      id: "stat-2",
      label: "Account Recovery Rate",
      value: `${val2}%`,
      sub: "Banned Pages Restored",
      icon: ShieldCheckIcon,
      color: "text-pink-400",
      bg: "bg-pink-500/10"
    },
    {
      id: "stat-3",
      label: "Usernames Claimed",
      value: `${val3}+`,
      sub: "Inactive Brands Transferred",
      icon: Zap,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    {
      id: "stat-4",
      label: "Verification Success",
      value: `${val4}%`,
      sub: "With Direct Portal Assistance",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    }
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none"
      id="stats-dashboard-container"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            id={stat.id}
            className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 group transition-all duration-300 hover:border-zinc-750 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
          >
            {/* Subtle glow background layer */}
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${stat.bg} filter blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-400 font-medium text-xs tracking-wide">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon className="w-5 h-5 shrink-0" />
              </div>
            </div>

            <div className="text-3xl font-extrabold font-display text-white tracking-tight leading-none mb-1">
              {stat.value}
            </div>
            
            <p className="text-zinc-500 text-[10px] font-mono">
              {stat.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// Custom Shield Icon component
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={props.className}
      width="20"
      height="20"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  );
}
