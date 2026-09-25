import React, { useEffect, useRef } from "react";

export interface GlowOrbConfig {
  id: string;
  className: string;
  initialStyle?: React.CSSProperties;
  speedY: number; // Vertical parallax factor (e.g. 0.12 means shifts 12px per 100px scroll)
  speedX?: number; // Subtle horizontal drift factor
  swayAmplitude?: number; // Pixel amplitude for gentle organic wave sway
  swayFrequency?: number; // Frequency of the sway cycle
}

interface ParallaxAmbientGlowsProps {
  variant?: "home" | "service";
  serviceGradient?: string;
  customOrbs?: GlowOrbConfig[];
  className?: string;
}

const DEFAULT_HOME_ORBS: GlowOrbConfig[] = [
  {
    // Deep Upper-Right Indigo / Sky Ambient Sphere (deepest layer, steady downward lag)
    id: "home-indigo-top-right",
    className:
      "absolute -top-12 -right-20 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] bg-indigo-900/10 rounded-full blur-[130px] -z-10 pointer-events-none will-change-transform",
    speedY: 0.14,
    speedX: -0.02,
    swayAmplitude: 15,
    swayFrequency: 0.0015,
  },
  {
    // Mid-Page Left Rose / Ruby Atmosphere Glow (counter-motion for multi-layer depth)
    id: "home-rose-mid-left",
    className:
      "absolute top-[28%] -left-28 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-rose-900/5 rounded-full blur-[110px] -z-10 pointer-events-none will-change-transform",
    speedY: -0.07,
    speedX: 0.03,
    swayAmplitude: 20,
    swayFrequency: 0.002,
  },
  {
    // Mid-Lower Central Cyan / Blue Subtle Core (bridges services section with stats)
    id: "home-cyan-mid-core",
    className:
      "absolute top-[52%] left-1/4 sm:left-1/3 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] bg-blue-900/5 rounded-full blur-[140px] -z-10 pointer-events-none will-change-transform",
    speedY: 0.09,
    speedX: -0.015,
    swayAmplitude: 12,
    swayFrequency: 0.0018,
  },
  {
    // Lower-Page Right Emerald / Teal Foundation Glow (grounding depth near reviews & FAQ)
    id: "home-emerald-bottom-right",
    className:
      "absolute top-[78%] right-[10%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-emerald-950/10 rounded-full blur-[150px] -z-10 pointer-events-none will-change-transform",
    speedY: 0.12,
    speedX: -0.025,
    swayAmplitude: 18,
    swayFrequency: 0.0012,
  },
];

const DEFAULT_SERVICE_ORBS: GlowOrbConfig[] = [
  {
    // Deep Upper-Right Signature Glow
    id: "service-top-right",
    className:
      "absolute -top-16 -right-16 w-[min(580px,100vw)] h-[min(580px,100vw)] bg-indigo-900/10 rounded-full blur-[140px] -z-10 pointer-events-none will-change-transform",
    speedY: 0.15,
    speedX: -0.02,
    swayAmplitude: 14,
    swayFrequency: 0.0018,
  },
  {
    // Mid-Section Left Complementary Blue Glow
    id: "service-mid-left",
    className:
      "absolute top-[45%] -left-20 w-[min(480px,100vw)] h-[min(480px,100vw)] bg-blue-900/10 rounded-full blur-[120px] -z-10 pointer-events-none will-change-transform",
    speedY: -0.08,
    speedX: 0.03,
    swayAmplitude: 18,
    swayFrequency: 0.0022,
  },
  {
    // Lower Grounding Subtle Emerald Ambient
    id: "service-bottom-right",
    className:
      "absolute top-[75%] right-[5%] w-[min(400px,100vw)] h-[min(400px,100vw)] bg-emerald-950/10 rounded-full blur-[130px] -z-10 pointer-events-none will-change-transform",
    speedY: 0.11,
    speedX: -0.02,
    swayAmplitude: 10,
    swayFrequency: 0.0015,
  },
];

export default function ParallaxAmbientGlows({
  variant = "home",
  customOrbs,
  className = "",
}: ParallaxAmbientGlowsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const orbs = customOrbs || (variant === "service" ? DEFAULT_SERVICE_ORBS : DEFAULT_HOME_ORBS);

  useEffect(() => {
    let currentScroll = 0;
    let targetScroll = 0;
    let rafId: number | null = null;
    let isRunning = false;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Direct GPU transform update on orbs
    const render = (scrollY: number) => {
      orbs.forEach((orb, index) => {
        const el = orbElementsRef.current[index];
        if (!el) return;

        if (prefersReducedMotion) {
          el.style.transform = "none";
          return;
        }

        // Calculate smooth parallax translation
        const translateY = scrollY * orb.speedY;
        const driftX = orb.speedX ? scrollY * orb.speedX : 0;
        const swayX =
          orb.swayAmplitude && orb.swayFrequency
            ? Math.sin(scrollY * orb.swayFrequency) * orb.swayAmplitude
            : 0;

        const totalX = driftX + swayX;

        el.style.transform = `translate3d(${totalX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0)`;
      });
    };

    // Smooth Lerp Physics Loop with automatic sleep when idle
    const tick = () => {
      const diff = targetScroll - currentScroll;
      const absDiff = Math.abs(diff);

      if (absDiff < 0.25) {
        currentScroll = targetScroll;
        render(currentScroll);
        isRunning = false;
        rafId = null;
        return;
      }

      // Smooth damping (0.10 gives an ultra-silky, organic momentum glide)
      currentScroll += diff * 0.10;
      render(currentScroll);

      rafId = requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      targetScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Initialize with current scroll position
    targetScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
    currentScroll = targetScroll;
    render(currentScroll);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [orbs]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
      aria-hidden="true"
    >
      {orbs.map((orb, index) => (
        <div
          key={orb.id}
          ref={(el) => {
            orbElementsRef.current[index] = el;
          }}
          className={orb.className}
          style={orb.initialStyle}
        />
      ))}
    </div>
  );
}
