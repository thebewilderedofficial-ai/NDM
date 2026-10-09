import React, { useMemo } from "react";

interface StarItem {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  duration: string;
  delay: string;
  hasSparkle?: boolean;
}

export default function HeroTwinklingStars() {
  const stars: StarItem[] = useMemo(() => {
    // Reduced, subtle, minimal starfield (~15 stars) specifically for Authority Stats
    const rawCoords = [
      { top: "12%", left: "8%", size: 2.2, color: "#93c5fd", dur: 3.2, del: 0.2 },
      { top: "18%", left: "32%", size: 3.0, color: "#ffffff", dur: 3.8, del: 1.4, sparkle: true },
      { top: "10%", left: "64%", size: 2.0, color: "#38bdf8", dur: 2.9, del: 0.7 },
      { top: "15%", left: "91%", size: 2.8, color: "#ffffff", dur: 3.5, del: 1.8, sparkle: true },

      { top: "42%", left: "14%", size: 2.4, color: "#ffffff", dur: 4.1, del: 0.5 },
      { top: "48%", left: "45%", size: 2.0, color: "#93c5fd", dur: 3.4, del: 2.0 },
      { top: "39%", left: "78%", size: 2.6, color: "#c084fc", dur: 3.6, del: 1.1, sparkle: true },
      { top: "52%", left: "96%", size: 1.8, color: "#93c5fd", dur: 4.3, del: 0.9 },

      { top: "72%", left: "6%", size: 2.0, color: "#38bdf8", dur: 3.7, del: 1.6 },
      { top: "78%", left: "28%", size: 2.8, color: "#ffffff", dur: 3.1, del: 0.3, sparkle: true },
      { top: "68%", left: "58%", size: 2.2, color: "#93c5fd", dur: 4.0, del: 2.2 },
      { top: "75%", left: "84%", size: 3.0, color: "#ffffff", dur: 3.3, del: 1.0, sparkle: true },

      { top: "88%", left: "18%", size: 1.8, color: "#ffffff", dur: 4.2, del: 1.5 },
      { top: "92%", left: "48%", size: 2.4, color: "#38bdf8", dur: 3.5, del: 0.8 },
      { top: "86%", left: "74%", size: 2.0, color: "#93c5fd", dur: 3.9, del: 2.1 },
    ];

    return rawCoords.map((c, index) => ({
      id: index,
      top: c.top,
      left: c.left,
      size: c.size,
      color: c.color,
      duration: `${c.dur}s`,
      delay: `${c.del}s`,
      hasSparkle: c.sparkle,
    }));
  }, []);

  return (
    <div
      className="hero-starfield-container absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Individual Subtle Twinkling Stars */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="hero-twinkling-star absolute rounded-full block"
          style={
            {
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: star.hasSparkle
                ? `0 0 6px 1.5px ${star.color}, 0 0 12px 2px rgba(56, 189, 248, 0.4)`
                : `0 0 4px 1px ${star.color}`,
              "--twinkle-dur": star.duration,
              "--twinkle-delay": star.delay,
            } as any
          }
        >
          {/* Subtle cross sparkle on few prominent stars */}
          {star.hasSparkle && (
            <>
              <span
                className="absolute -top-[4px] -bottom-[4px] left-1/2 -translate-x-1/2 w-[0.8px] bg-white/90 pointer-events-none rounded-full"
                style={{ boxShadow: "0 0 3px #ffffff" }}
              />
              <span
                className="absolute top-1/2 -left-[4px] -right-[4px] -translate-y-1/2 h-[0.8px] bg-white/90 pointer-events-none rounded-full"
                style={{ boxShadow: "0 0 3px #ffffff" }}
              />
            </>
          )}
        </span>
      ))}
    </div>
  );
}
