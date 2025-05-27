"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      radius: number;
      life: number;
      vx: number;
      vy: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 4 + 2;
        this.life = 100;
        this.vx = Math.random() * 1 - 0.5;
        this.vy = -Math.random() * 1.5 - 0.5;
        this.color = `rgba(255, ${Math.floor(Math.random() * 150)}, 0, 1)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.radius *= 0.96;
        this.life--;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Always generate fire at last known position
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(position.x, position.y));
      }

      particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.radius <= 0.5) {
          particles.splice(i, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x =
        (e as MouseEvent).clientX ?? (e as TouchEvent).touches?.[0]?.clientX;
      const y =
        (e as MouseEvent).clientY ?? (e as TouchEvent).touches?.[0]?.clientY;
      if (x != null && y != null) {
        setPosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [position]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-50 pointer-events-none"
    />
  );
}
