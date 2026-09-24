import React, { useRef, useState, useEffect } from "react";

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
    duration: 4.5,
  },
  // Instagram Unban: Vivid Neon Rose -> Fuchsia -> Amber Gold
  "instagram-unban": {
    primary: "#fb7185",
    secondary: "#ec4899",
    trail: "#f59e0b",
    glowColor: "rgba(244, 63, 94, 0.95)",
    duration: 4.5,
  },
  // Username Claims: Electric Cyan -> Aquamarine -> Seafoam
  "username-claim": {
    primary: "#22d3ee",
    secondary: "#2dd4bf",
    trail: "#38bdf8",
    glowColor: "rgba(34, 211, 238, 0.95)",
    duration: 4.2,
  },
  // Social Verification: Royal Azure -> Cobalt -> Emerald
  "meta-verify": {
    primary: "#38bdf8",
    secondary: "#6366f1",
    trail: "#10b981",
    glowColor: "rgba(56, 189, 248, 0.95)",
    duration: 4.5,
  },
  // Press & Media PR: Radiant Warm Gold -> Imperial Amber -> Indigo
  "news-pr": {
    primary: "#fbbf24",
    secondary: "#f59e0b",
    trail: "#818cf8",
    glowColor: "rgba(251, 191, 36, 0.95)",
    duration: 4.8,
  },
  // Web Development: Cyber Matrix Cyan -> Neon Teal -> Violet
  "web-development": {
    primary: "#06b6d4",
    secondary: "#3b82f6",
    trail: "#8b5cf6",
    glowColor: "rgba(6, 182, 212, 0.95)",
    duration: 4.2,
  },
};

export default function CardBorderFlare({ serviceId }: CardBorderFlareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 360, height: 520 });
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

  // Snake length: ~24% of perimeter creates a distinct travelling snake beam
  const snakeLength = Math.max(perimeter * 0.24, 130);
  const gapLength = perimeter - snakeLength;

  const gradientId = `snake-grad-${serviceId}`;
  const filterId = `snake-glow-${serviceId}`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none rounded-2xl z-20 overflow-visible"
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
            <feGaussianBlur stdDeviation="1.5" result="blur2" />
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
            <stop offset="100%" stopColor={theme.trail} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ambient subtle track path */}
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={radius}
          ry={radius}
          stroke={theme.primary}
          strokeWidth="1"
          strokeOpacity="0.08"
        />

        {/*
          THE RUNNING SNAKE BEAM:
          Using pathLength={perimeter} and stroke-dashoffset: 0 -> -perimeter in CSS,
          the line physically glides around the entire 4 borders and rounded corners continuously.
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
              filter: `url(#${filterId}) drop-shadow(0 0 6px ${theme.glowColor})`,
              "--total-perimeter": `${perimeter}`,
              animationDuration: `${theme.duration}s`,
            } as React.CSSProperties
          }
        />
      </svg>
    </div>
  );
}
