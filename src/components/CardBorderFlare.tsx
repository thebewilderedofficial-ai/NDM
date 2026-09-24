import React, { useRef, useState, useEffect, useCallback } from "react";

interface CardBorderFlareProps {
  serviceId: string;
}

interface FlareTheme {
  primary: string;       // Head light / flare core
  secondary: string;     // Mid tail glow
  trail: string;         // Fading trail
  glowColor: string;     // Drop shadow glow
  duration: number;      // Seconds per full perimeter circuit
}

const SERVICE_THEMES: Record<string, FlareTheme> = {
  // Wikipedia: Brilliant Electric Blue -> Deep Violet
  wikipedia: {
    primary: "#60a5fa",
    secondary: "#6366f1",
    trail: "#a855f7",
    glowColor: "rgba(96, 165, 250, 0.95)",
    duration: 3.8,
  },
  // Instagram Unban: Vivid Neon Rose -> Fuchsia -> Amber Gold
  "instagram-unban": {
    primary: "#fb7185",
    secondary: "#ec4899",
    trail: "#f59e0b",
    glowColor: "rgba(244, 63, 94, 0.95)",
    duration: 3.8,
  },
  // Username Claims: Electric Cyan -> Aquamarine -> Seafoam
  "username-claim": {
    primary: "#22d3ee",
    secondary: "#2dd4bf",
    trail: "#38bdf8",
    glowColor: "rgba(34, 211, 238, 0.95)",
    duration: 3.5,
  },
  // Social Verification: Royal Azure -> Cobalt -> Emerald
  "meta-verify": {
    primary: "#38bdf8",
    secondary: "#6366f1",
    trail: "#10b981",
    glowColor: "rgba(56, 189, 248, 0.95)",
    duration: 3.8,
  },
  // Press & Media PR: Radiant Warm Gold -> Imperial Amber -> Indigo
  "news-pr": {
    primary: "#fbbf24",
    secondary: "#f59e0b",
    trail: "#818cf8",
    glowColor: "rgba(251, 191, 36, 0.95)",
    duration: 4.0,
  },
  // Web Development: Cyber Matrix Cyan -> Neon Teal -> Violet
  "web-development": {
    primary: "#06b6d4",
    secondary: "#3b82f6",
    trail: "#8b5cf6",
    glowColor: "rgba(6, 182, 212, 0.95)",
    duration: 3.5,
  },
};

export default function CardBorderFlare({ serviceId }: CardBorderFlareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 360, height: 520 });
  const [isInMiddle, setIsInMiddle] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = SERVICE_THEMES[serviceId] || SERVICE_THEMES.wikipedia;

  // Measure card dimensions dynamically
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        if (offsetWidth > 0 && offsetHeight > 0) {
          setDimensions({ width: offsetWidth, height: offsetHeight });
        }
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Viewport middle detection:
  // Detects when the card is in the central band of the viewport (25% - 75% height)
  // and triggers the snake run, stopping when the card leaves this middle zone.
  const checkMiddlePosition = useCallback(() => {
    if (!containerRef.current) return;
    const target = containerRef.current.parentElement || containerRef.current;
    const rect = target.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Middle zone: central 50% of the viewport (from 25% from top to 75% from top)
    const bandTop = windowHeight * 0.25;
    const bandBottom = windowHeight * 0.75;

    // Card is in middle zone if it overlaps the central band
    const inMiddle = rect.top < bandBottom && rect.bottom > bandTop;
    setIsInMiddle(inMiddle);
  }, []);

  useEffect(() => {
    const target = containerRef.current?.parentElement || containerRef.current;
    if (!target) return;

    // Native IntersectionObserver with a rootMargin targeting the middle of the viewport
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsInMiddle(entry.isIntersecting);
          });
        },
        {
          root: null,
          rootMargin: "-25% 0px -25% 0px",
          threshold: 0,
        }
      );
      observer.observe(target);
    } catch {
      // Fallback to scroll check if IntersectionObserver has restricted margin support
    }

    // Scroll and resize listener for instantaneous sync
    window.addEventListener("scroll", checkMiddlePosition, { passive: true });
    window.addEventListener("resize", checkMiddlePosition, { passive: true });

    // Initial check
    checkMiddlePosition();

    // Mouse enter / leave listener on parent card so hover also triggers on desktop
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    target.addEventListener("mouseenter", handleMouseEnter);
    target.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", checkMiddlePosition);
      window.removeEventListener("resize", checkMiddlePosition);
      target.removeEventListener("mouseenter", handleMouseEnter);
      target.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [checkMiddlePosition]);

  const strokeWidth = 2.5;
  const radius = 16;
  const w = Math.max(dimensions.width - strokeWidth, 10);
  const h = Math.max(dimensions.height - strokeWidth, 10);
  const x = strokeWidth / 2;
  const y = strokeWidth / 2;

  // Exact geometric perimeter of a rounded rectangle: 2*(w - 2r) + 2*(h - 2r) + 2*PI*r
  const straightX = Math.max(0, w - 2 * radius);
  const straightY = Math.max(0, h - 2 * radius);
  const perimeter = 2 * straightX + 2 * straightY + 2 * Math.PI * radius;

  // Shorter snake flare: ~6% of perimeter (around 75px - 95px) for a sleek, intense laser beam
  const snakeLength = Math.max(perimeter * 0.06, 75);
  const gapLength = perimeter - snakeLength;

  const gradientId = `snake-grad-${serviceId}`;
  const filterId = `snake-glow-${serviceId}`;

  // Only trigger and run when in middle of viewport (or hovered)
  const isActive = isInMiddle || isHovered;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none rounded-2xl z-20 overflow-visible transition-opacity duration-500 ease-out"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Intense neon glow filter */}
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="1" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dynamic gradient matching 3D logo palette */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.primary} stopOpacity="1" />
            <stop offset="50%" stopColor={theme.secondary} stopOpacity="0.85" />
            <stop offset="100%" stopColor={theme.trail} stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Ambient faint track path (only visible while active) */}
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={radius}
          ry={radius}
          stroke={theme.primary}
          strokeWidth="1"
          strokeOpacity="0.1"
        />

        {/*
          THE RUNNING SNAKE BEAM:
          - Shorter laser flare length (~75-95px)
          - Runs 360 degrees around the 4 borders continuously
          - Pauses and disappears when outside the middle of the viewport
        */}
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={radius}
          ry={radius}
          pathLength={perimeter}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${snakeLength} ${gapLength}`}
          className="border-snake-stream"
          style={
            {
              filter: `url(#${filterId}) drop-shadow(0 0 6px ${theme.glowColor}) drop-shadow(0 0 2px #ffffff)`,
              "--total-perimeter": `${perimeter}`,
              animationDuration: `${theme.duration}s`,
              animationPlayState: isActive ? "running" : "paused",
            } as React.CSSProperties
          }
        />
      </svg>
    </div>
  );
}
