"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  speedX: number;
  speedY: number;
  pulseDirection: 1 | -1;
  opacity: number;
};

type FlameParticle = {
  x: number;
  y: number;
  radius: number;
  life: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
};

export function AnimatedBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: -100,
    y: -100
  });

  const backgroundParticles = useRef<Particle[]>([]);
  const flameParticles = useRef<FlameParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Background glowing orbs init
    const PARTICLE_COUNT = 60;
    backgroundParticles.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      backgroundParticles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: 3 + Math.random() * 4,
        radius: 3 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        opacity: 0.3 + Math.random() * 0.5
      });
    }

    const drawBackgroundParticle = (p: Particle) => {
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius * 4
      );
      gradient.addColorStop(0, `rgba(255, 140, 0, ${p.opacity})`);
      gradient.addColorStop(1, "rgba(255, 140, 0, 0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 69, 0, ${p.opacity})`;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawFlameParticle = (p: FlameParticle) => {
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius * 5
      );
      gradient.addColorStop(0, `rgba(255, ${p.color}, 0, ${p.opacity})`);
      gradient.addColorStop(1, `rgba(255, ${p.color}, 0, 0)`);

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, ${p.color}, 0, ${p.opacity})`;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // subtle dark overlay for contrast
      ctx.fillStyle = "rgba(20, 20, 20, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Update & draw background orbs
      for (const p of backgroundParticles.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
        p.radius += 0.02 * p.pulseDirection;
        if (p.radius > p.baseRadius * 1.4 || p.radius < p.baseRadius * 0.6) {
          p.pulseDirection *= -1;
        }
        p.opacity += 0.005 * p.pulseDirection;
        if (p.opacity > 0.8) p.opacity = 0.8;
        if (p.opacity < 0.3) p.opacity = 0.3;

        drawBackgroundParticle(p);
      }

      // Cursor flame particles
      for (let i = 0; i < 3; i++) {
        flameParticles.current.push({
          x: cursorPos.x + (Math.random() * 10 - 5),
          y: cursorPos.y + (Math.random() * 10 - 5),
          radius: Math.random() * 3 + 1,
          life: 30 + Math.random() * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 1.5 - 0.5,
          color: `${Math.floor(Math.random() * 100 + 50)}`,
          opacity: 1
        });
      }

      // Update & draw flame particles
      for (let i = flameParticles.current.length - 1; i >= 0; i--) {
        const p = flameParticles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.radius *= 0.96;
        p.life--;
        p.opacity -= 0.03;
        if (p.life <= 0 || p.radius <= 0.5 || p.opacity <= 0) {
          flameParticles.current.splice(i, 1);
          continue;
        }
        drawFlameParticle(p);
      }

      requestAnimationFrame(animate);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x =
        (e as MouseEvent).clientX ?? (e as TouchEvent).touches?.[0]?.clientX;
      const y =
        (e as MouseEvent).clientY ?? (e as TouchEvent).touches?.[0]?.clientY;
      if (x !== undefined && y !== undefined) {
        setCursorPos({ x, y });
      }
    };

    // Scroll reaction: sparks from bottom center on scroll
    let lastScrollTop = window.scrollY;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > lastScrollTop) {
        // scrolling down
        for (let i = 0; i < 5; i++) {
          flameParticles.current.push({
            x: width / 2 + (Math.random() * 200 - 100),
            y: height - 20 + (Math.random() * 10 - 5),
            radius: Math.random() * 3 + 2,
            life: 40 + Math.random() * 20,
            vx: (Math.random() - 0.5) * 0.7,
            vy: -Math.random() * 2 - 1,
            color: `${Math.floor(Math.random() * 100 + 100)}`,
            opacity: 0.8
          });
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    // Click reaction: big fiery explosion
    const handleClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 4 + 1;
        flameParticles.current.push({
          x: cx,
          y: cy,
          radius: Math.random() * 4 + 2,
          life: 50 + Math.random() * 30,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: `${Math.floor(Math.random() * 150 + 100)}`,
          opacity: 1
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [cursorPos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "#111"
      }}
    />
  );
}
