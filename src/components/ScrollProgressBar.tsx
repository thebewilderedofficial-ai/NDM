import React, { useEffect, useRef } from "react";

interface ScrollProgressBarProps {
  className?: string;
  gradient?: string;
}

export default function ScrollProgressBar({
  className = "",
  gradient = "from-blue-500 via-indigo-500 via-purple-500 to-cyan-400",
}: ScrollProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    let targetProgress = 0;
    let rafId: number | null = null;
    let isRunning = false;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = (progress: number) => {
      const scaleStr = `scale3d(${progress}, 1, 1)`;
      if (barRef.current) {
        barRef.current.style.transform = scaleStr;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = scaleStr;
      }
      if (sparkRef.current) {
        sparkRef.current.style.left = `${(progress * 100).toFixed(3)}%`;
        sparkRef.current.style.opacity = progress > 0.005 ? "1" : "0";
      }
    };

    const tick = () => {
      if (prefersReducedMotion) {
        currentProgress = targetProgress;
        render(currentProgress);
        isRunning = false;
        rafId = null;
        return;
      }

      const diff = targetProgress - currentProgress;
      const absDiff = Math.abs(diff);

      // Snap clean at boundaries or when difference is negligible
      if (
        absDiff < 0.0006 ||
        (targetProgress === 0 && currentProgress < 0.005) ||
        (targetProgress === 1 && currentProgress > 0.995)
      ) {
        currentProgress = targetProgress;
        render(currentProgress);
        isRunning = false;
        rafId = null;
        return;
      }

      // Adaptive smoothing: silky on gentle scrolls, dynamically accelerates on high speed scroll
      let factor = 0.22;
      if (absDiff > 0.35) {
        factor = 0.75;
      } else if (absDiff > 0.12) {
        factor = 0.45;
      }

      currentProgress += diff * factor;
      render(currentProgress);

      rafId = requestAnimationFrame(tick);
    };

    const updateScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      targetProgress =
        scrollHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / scrollHeight))
          : 0;

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Calculate initial position immediately
    updateScroll();
    currentProgress = targetProgress;
    render(currentProgress);

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      className={`header-scroll-track absolute bottom-0 left-0 right-0 h-[2.5px] sm:h-[3px] pointer-events-none overflow-visible z-50 ${className}`}
      aria-hidden="true"
    >
      {/* Background subtle hairline track */}
      <div className="absolute inset-0 bg-zinc-800/40" />

      {/* Ambient soft glow projection beneath the bar */}
      <div
        ref={glowRef}
        className={`absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r ${gradient} blur-[5px] pointer-events-none opacity-70 will-change-transform`}
        style={{
          transform: "scale3d(0, 1, 1)",
          transformOrigin: "left",
        }}
      />

      {/* Primary Glowy Animated Progress Bar */}
      <div
        ref={barRef}
        className={`relative h-full bg-gradient-to-r ${gradient} will-change-transform`}
        style={{
          transform: "scale3d(0, 1, 1)",
          transformOrigin: "left",
          boxShadow:
            "0 0 10px rgba(99, 102, 241, 0.8), 0 0 20px rgba(56, 189, 248, 0.6), 0 1px 4px rgba(168, 85, 247, 0.7)",
        }}
      />

      {/* Leading glowing spark beacon (outside scaleX to prevent squishing distortion) */}
      <div
        ref={sparkRef}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-0 will-change-[left,opacity]"
        style={{ left: "0%" }}
      >
        <div className="w-3.5 h-3.5 rounded-full bg-cyan-300 blur-[1px] opacity-95 shadow-[0_0_8px_#38bdf8,0_0_16px_#818cf8]" />
      </div>
    </div>
  );
}
