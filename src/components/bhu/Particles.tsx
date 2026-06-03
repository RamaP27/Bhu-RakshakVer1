import { useEffect, useRef } from "react";

export function Particles({ density = 60, color = "#00f5d4" }: { density?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const parts = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: 0.1 + Math.random() * 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.8 + 0.3,
      a: Math.random() * 0.6 + 0.2,
      type: Math.random() > 0.7 ? "data" : "drop",
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.y += p.vy * dpr;
        p.x += p.vx * dpr;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        ctx.beginPath();
        if (p.type === "data") {
          ctx.fillStyle = `rgba(0,245,212,${p.a})`;
          ctx.fillRect(p.x, p.y, p.r * 2, p.r * 2);
        } else {
          ctx.fillStyle = `rgba(90,240,224,${p.a})`;
          ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [density, color]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full pointer-events-none" />;
}