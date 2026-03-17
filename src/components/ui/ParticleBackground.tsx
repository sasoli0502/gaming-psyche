"use client";

import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", resize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        if (!canvas) throw new Error("Canvas is null");
        this.x = Math.random() * canvas.width;
        // Start from bottom mostly
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        // Move upwards and slightly drift
        this.speedY = -(Math.random() * 0.5 + 0.1);
        
        this.opacity = Math.random() * 0.5 + 0.1;
        // Warm dust colors (golds, oranges, soft whites)
        const colors = [
          "255, 184, 77",   // dawn-gold
          "255, 123, 48",   // dawn-orange
          "255, 238, 209",  // dawn-highlight
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Gentle swaying motion
        this.x += Math.sin(this.y * 0.01) * 0.2;

        if (this.size > 0.2) this.size -= 0.005;

        // Reset if it goes off screen
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height + 50;
          this.size = Math.random() * 2 + 0.5;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add soft glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, ${this.opacity * 2})`;
      }
    }

    function init() {
      if (!canvas) return;
      particlesArray = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 8000, 150);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen"
    />
  );
}
