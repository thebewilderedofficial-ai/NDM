import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface RocketWelcomeScreenProps {
  onComplete: () => void;
  durationSeconds?: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  layer: number; // 1 (far, slow), 2 (mid), 3 (close, fast)
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
}

export default function RocketWelcomeScreen({
  onComplete,
  durationSeconds = 5.0,
}: RocketWelcomeScreenProps) {
  const [fadingOut, setFadingOut] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleFinish = () => {
    if (fadingOut) return;
    setFadingOut(true);
    // Smooth 1.2s cinematic dissolve before unmounting
    setTimeout(() => {
      onComplete();
    }, 1180);
  };

  useEffect(() => {
    // Reveal skyrocket line 600ms into the ignition/liftoff sequence
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 600);

    // Trigger smooth fade out at 3.8s so the 1.2s fade finishes right at 5.0s
    const fadeTriggerMs = Math.max(2500, durationSeconds * 1000 - 1200);
    const completeTimer = setTimeout(() => {
      handleFinish();
    }, fadeTriggerMs);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [durationSeconds]);

  // Main Canvas 2D Physics & Parallax Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth || document.documentElement.clientWidth || 1200);
    let height = (canvas.height = window.innerHeight || document.documentElement.clientHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || document.documentElement.clientWidth || 1200;
      height = canvas.height = window.innerHeight || document.documentElement.clientHeight || 800;
    };
    window.addEventListener("resize", handleResize);

    // Generate Multi-Layer Parallax Stars
    const starCount = Math.floor(Math.min(width * 0.22, 260));
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const layer = Math.random() < 0.25 ? 3 : Math.random() < 0.55 ? 2 : 1;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: layer === 3 ? Math.random() * 2.2 + 1.2 : layer === 2 ? Math.random() * 1.5 + 0.8 : Math.random() * 0.9 + 0.4,
        baseAlpha: Math.random() * 0.5 + 0.4,
        alpha: Math.random() * 0.5 + 0.4,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        layer,
      });
    }

    const smokeParticles: SmokeParticle[] = [];
    const sparkParticles: SparkParticle[] = [];

    startTimeRef.current = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      const progress = Math.min(elapsed / durationSeconds, 1.0);

      ctx.clearRect(0, 0, width, height);

      // Rocket initial position on the ground/launchpad
      const groundBaseY = Math.min(height * 0.58, height - 230);
      const initialRocketY = groundBaseY - 50;

      let rocketY = initialRocketY;
      let shakeX = 0;
      let shakeY = 0;
      let rocketSpeed = 0;

      if (progress < 0.15) {
        // Ignition stage: Ground rumble & thruster vibration
        const intensity = (progress / 0.15) * 4.0;
        shakeX = (Math.random() - 0.5) * intensity;
        shakeY = (Math.random() - 0.5) * intensity;
        rocketY = initialRocketY;
      } else {
        // Liftoff: Smooth accelerating vertical flight straight up
        const normTime = (progress - 0.15) / 0.85;
        const easeVal = Math.pow(normTime, 2.35);
        const totalTravel = initialRocketY + 400;
        rocketY = initialRocketY - easeVal * totalTravel;
        rocketSpeed = easeVal * 44;
        shakeX = (Math.random() - 0.5) * Math.max(0, 3.0 - normTime * 3.5);
        shakeY = (Math.random() - 0.5) * Math.max(0, 3.0 - normTime * 3.5);
      }

      const rocketX = width / 2 + shakeX;
      const currentRocketY = rocketY + shakeY;

      // 1. SKY GRADIENT: Atmosphere into deep starry space
      const spaceProgress = Math.min(Math.max((progress - 0.22) / 0.68, 0), 1);
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (spaceProgress < 0.55) {
        const factor = spaceProgress * 1.8;
        skyGrad.addColorStop(0, "#040716");
        skyGrad.addColorStop(0.45, "#09122c");
        skyGrad.addColorStop(0.8, `rgba(16, 31, 68, ${1 - factor * 0.4})`);
        skyGrad.addColorStop(1, `rgba(28, 50, 102, ${1 - factor * 0.6})`);
      } else {
        skyGrad.addColorStop(0, "#010206");
        skyGrad.addColorStop(0.4, "#040612");
        skyGrad.addColorStop(0.8, "#080c1e");
        skyGrad.addColorStop(1, "#020309");
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Cosmic Nebula Ambient Glow
      const nebulaAlpha = Math.min(spaceProgress * 0.85, 0.5);
      if (nebulaAlpha > 0.02) {
        const radGlow = ctx.createRadialGradient(
          width * 0.5,
          height * 0.3,
          30,
          width * 0.5,
          height * 0.35,
          width * 0.75
        );
        radGlow.addColorStop(0, `rgba(59, 130, 246, ${nebulaAlpha * 0.45})`);
        radGlow.addColorStop(0.4, `rgba(99, 102, 241, ${nebulaAlpha * 0.3})`);
        radGlow.addColorStop(0.7, `rgba(168, 85, 247, ${nebulaAlpha * 0.18})`);
        radGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. PARALLAX STARFIELD EFFECT
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha = star.baseAlpha + Math.sin(now * star.twinkleSpeed) * 0.3;
        star.alpha = Math.max(0.15, Math.min(1, star.alpha));

        const starSpeed = (star.layer === 3 ? 2.6 : star.layer === 2 ? 1.4 : 0.7) * (1 + rocketSpeed * 1.3);
        star.y += starSpeed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        ctx.fillStyle = star.layer === 3 ? "#93c5fd" : star.layer === 2 ? "#e0e7ff" : "#ffffff";
        ctx.globalAlpha = star.alpha;
        
        if (rocketSpeed > 4 && star.layer >= 2) {
          const streakLen = Math.min(rocketSpeed * 1.8, 34);
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x, star.y + streakLen);
          ctx.lineWidth = star.size * 0.95;
          ctx.strokeStyle = star.layer === 3 ? "rgba(147, 197, 253, 0.75)" : "rgba(255, 255, 255, 0.65)";
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 3. GROUND & LAUNCHPAD (Sinks as rocket takes off)
      const groundShift = Math.max(0, (initialRocketY - currentRocketY) * 0.55);
      const currentGroundY = groundBaseY + groundShift;

      if (currentGroundY < height + 240) {
        ctx.save();
        ctx.fillStyle = "#080a14";
        ctx.fillRect(0, currentGroundY, width, height - currentGroundY + 120);

        ctx.strokeStyle = "rgba(59, 130, 246, 0.35)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, currentGroundY);
        ctx.lineTo(width, currentGroundY);
        ctx.stroke();

        const padX = width / 2;
        ctx.fillStyle = "#0f1322";
        ctx.strokeStyle = "#1e2742";
        ctx.lineWidth = 2;

        ctx.fillRect(padX - 90, currentGroundY - 16, 180, 18);
        ctx.strokeRect(padX - 90, currentGroundY - 16, 180, 18);

        ctx.fillRect(padX - 78, currentGroundY - 150, 20, 134);
        ctx.strokeRect(padX - 78, currentGroundY - 150, 20, 134);
        ctx.beginPath();
        for (let y = currentGroundY - 140; y < currentGroundY - 20; y += 22) {
          ctx.moveTo(padX - 78, y);
          ctx.lineTo(padX - 58, y + 16);
          ctx.moveTo(padX - 58, y);
          ctx.lineTo(padX - 78, y + 16);
        }
        ctx.strokeStyle = "#1b233a";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = "#0f1322";
        ctx.fillRect(padX + 58, currentGroundY - 110, 18, 94);
        ctx.strokeRect(padX + 58, currentGroundY - 110, 18, 94);

        const beaconAlpha = Math.sin(now * 0.009) > 0 ? 0.95 : 0.2;
        ctx.fillStyle = `rgba(244, 63, 94, ${beaconAlpha})`;
        ctx.beginPath();
        ctx.arc(padX - 68, currentGroundY - 154, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 4. SMOKE BILLOWS BEHIND ROCKET
      const nozzleY = currentRocketY + 54;
      const isFiring = progress < 0.96;

      if (isFiring) {
        const smokePuffs = progress < 0.2 ? 7 : 5;
        for (let i = 0; i < smokePuffs; i++) {
          const angle = (Math.PI / 2) + (Math.random() - 0.5) * 1.0;
          const speed = Math.random() * 4.5 + 2.5;
          const isFire = Math.random() < 0.35 && progress < 0.45;
          smokeParticles.push({
            x: rocketX + (Math.random() - 0.5) * 18,
            y: nozzleY + Math.random() * 10,
            vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2.5,
            vy: Math.sin(angle) * speed + 2.5 + rocketSpeed * 0.4,
            size: Math.random() * 14 + 10,
            maxSize: Math.random() * 52 + 38,
            alpha: 0.88,
            color: isFire
              ? Math.random() < 0.5 ? "rgba(251, 146, 60, " : "rgba(249, 115, 22, "
              : Math.random() < 0.4 ? "rgba(226, 232, 240, " : "rgba(148, 163, 184, ",
            life: 0,
            maxLife: Math.random() * 36 + 32,
          });
        }

        for (let i = 0; i < 4; i++) {
          sparkParticles.push({
            x: rocketX + (Math.random() - 0.5) * 14,
            y: nozzleY + Math.random() * 8,
            vx: (Math.random() - 0.5) * 7,
            vy: Math.random() * 9 + 6 + rocketSpeed * 0.5,
            size: Math.random() * 3 + 1.5,
            alpha: 1.0,
            color: Math.random() < 0.6 ? "#fef08a" : "#f97316",
            life: 0,
          });
        }
      }

      // Render Smoke
      ctx.save();
      for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.size += (p.maxSize - p.size) * 0.05;
        p.alpha = 0.88 * (1 - p.life / p.maxLife);

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          smokeParticles.splice(i, 1);
          continue;
        }

        const smokeGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        smokeGrad.addColorStop(0, `${p.color}${p.alpha})`);
        smokeGrad.addColorStop(0.5, `${p.color}${p.alpha * 0.5})`);
        smokeGrad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = smokeGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Render Sparks
      ctx.save();
      for (let i = sparkParticles.length - 1; i >= 0; i--) {
        const sp = sparkParticles[i];
        sp.life++;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha = Math.max(0, 1 - sp.life / 26);

        if (sp.life >= 26 || sp.alpha <= 0.02) {
          sparkParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 5. THRUSTER JET FLAME
      if (isFiring && currentRocketY < height + 80 && currentRocketY > -220) {
        ctx.save();
        const flameLength = (Math.random() * 26 + 68) * (1 + Math.min(rocketSpeed * 0.06, 0.75));
        const flameWidth = 20 + Math.random() * 4;

        const outerGlow = ctx.createRadialGradient(
          rocketX,
          nozzleY + 20,
          4,
          rocketX,
          nozzleY + 30,
          flameLength * 1.45
        );
        outerGlow.addColorStop(0, "rgba(59, 130, 246, 0.8)");
        outerGlow.addColorStop(0.3, "rgba(249, 115, 22, 0.65)");
        outerGlow.addColorStop(0.7, "rgba(239, 68, 68, 0.25)");
        outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(rocketX, nozzleY + 30, flameLength * 1.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(rocketX - flameWidth / 2, nozzleY);
        ctx.quadraticCurveTo(
          rocketX - flameWidth * 0.7,
          nozzleY + flameLength * 0.6,
          rocketX,
          nozzleY + flameLength
        );
        ctx.quadraticCurveTo(
          rocketX + flameWidth * 0.7,
          nozzleY + flameLength * 0.6,
          rocketX + flameWidth / 2,
          nozzleY
        );
        ctx.closePath();

        const flameGrad = ctx.createLinearGradient(
          rocketX,
          nozzleY,
          rocketX,
          nozzleY + flameLength
        );
        flameGrad.addColorStop(0, "#ffffff");
        flameGrad.addColorStop(0.2, "#38bdf8");
        flameGrad.addColorStop(0.5, "#fbbf24");
        flameGrad.addColorStop(0.85, "#f97316");
        flameGrad.addColorStop(1, "rgba(239, 68, 68, 0)");
        ctx.fillStyle = flameGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(rocketX - flameWidth * 0.25, nozzleY);
        ctx.lineTo(rocketX, nozzleY + flameLength * 0.45);
        ctx.lineTo(rocketX + flameWidth * 0.25, nozzleY);
        ctx.closePath();
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.restore();
      }

      // 6. 2D VECTOR SPACE ROCKET
      if (currentRocketY < height + 80 && currentRocketY > -180) {
        ctx.save();
        ctx.translate(rocketX, currentRocketY);

        const rocketBloom = ctx.createRadialGradient(0, 0, 10, 0, 0, 65);
        rocketBloom.addColorStop(0, "rgba(59, 130, 246, 0.38)");
        rocketBloom.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = rocketBloom;
        ctx.fillRect(-65, -85, 130, 170);

        // Left Fin
        ctx.beginPath();
        ctx.moveTo(-13, 18);
        ctx.lineTo(-34, 48);
        ctx.lineTo(-15, 46);
        ctx.closePath();
        const finGradL = ctx.createLinearGradient(-34, 18, -13, 48);
        finGradL.addColorStop(0, "#1d4ed8");
        finGradL.addColorStop(1, "#0284c7");
        ctx.fillStyle = finGradL;
        ctx.fill();
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Right Fin
        ctx.beginPath();
        ctx.moveTo(13, 18);
        ctx.lineTo(34, 48);
        ctx.lineTo(15, 46);
        ctx.closePath();
        const finGradR = ctx.createLinearGradient(13, 18, 34, 48);
        finGradR.addColorStop(0, "#1e40af");
        finGradR.addColorStop(1, "#0369a1");
        ctx.fillStyle = finGradR;
        ctx.fill();
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Main Fuselage Body
        ctx.beginPath();
        ctx.moveTo(0, -68);
        ctx.bezierCurveTo(16, -42, 18, 10, 14, 48);
        ctx.lineTo(-14, 48);
        ctx.bezierCurveTo(-18, 10, -16, -42, 0, -68);
        ctx.closePath();

        const bodyGrad = ctx.createLinearGradient(-18, 0, 18, 0);
        bodyGrad.addColorStop(0, "#d1d5db");
        bodyGrad.addColorStop(0.35, "#ffffff");
        bodyGrad.addColorStop(0.7, "#f8fafc");
        bodyGrad.addColorStop(1, "#94a3b8");
        ctx.fillStyle = bodyGrad;
        ctx.fill();
        ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Nose Cone Blue Accent
        ctx.beginPath();
        ctx.moveTo(0, -68);
        ctx.lineTo(7, -46);
        ctx.lineTo(-7, -46);
        ctx.closePath();
        ctx.fillStyle = "#2563eb";
        ctx.fill();

        // Cabin Window Porthole
        ctx.beginPath();
        ctx.arc(0, -18, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#0f172a";
        ctx.fill();
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-2, -20, 6, 0, Math.PI * 2);
        const glassGrad = ctx.createRadialGradient(-2, -20, 1, -2, -20, 6);
        glassGrad.addColorStop(0, "rgba(56, 189, 248, 0.9)");
        glassGrad.addColorStop(0.7, "rgba(14, 165, 233, 0.4)");
        glassGrad.addColorStop(1, "rgba(15, 23, 42, 0.9)");
        ctx.fillStyle = glassGrad;
        ctx.fill();

        // Racing Stripes Decal
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(-14, 12, 28, 4);
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(-14, 18, 28, 2.5);

        // Center Fin
        ctx.beginPath();
        ctx.moveTo(-2.5, 8);
        ctx.lineTo(0, 48);
        ctx.lineTo(2.5, 8);
        ctx.closePath();
        ctx.fillStyle = "#1e3a8a";
        ctx.fill();

        // Engine Bell Nozzle
        ctx.beginPath();
        ctx.moveTo(-10, 48);
        ctx.lineTo(-13, 54);
        ctx.lineTo(13, 54);
        ctx.lineTo(10, 48);
        ctx.closePath();
        ctx.fillStyle = "#334155";
        ctx.fill();
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      // Continue animation loop during the fade-out dissolve
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [durationSeconds]);

  const content = (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-[999999] flex flex-col justify-end pointer-events-auto select-none overflow-hidden cursor-pointer transition-all duration-[1200ms] ease-out ${
        fadingOut
          ? "opacity-0 backdrop-blur-none pointer-events-none scale-[1.015]"
          : "opacity-100 backdrop-blur-sm"
      }`}
      style={{ backgroundColor: "#02040a" }}
      aria-label="Welcome launch animation"
    >
      {/* 2D Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* ONLY The Skyrocket Line Below the Rocket */}
      <div
        className={`relative z-20 text-center max-w-4xl mx-auto px-6 pb-16 sm:pb-20 transition-all duration-1000 transform ${
          textVisible
            ? "opacity-100 translate-y-0 filter blur-0"
            : "opacity-0 translate-y-6 filter blur-sm"
        }`}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
          Get Ready to Skyrocket your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 drop-shadow-[0_0_35px_rgba(59,130,246,0.65)]">
            Credibility
          </span>
        </h1>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(content, document.body) : null;
}
