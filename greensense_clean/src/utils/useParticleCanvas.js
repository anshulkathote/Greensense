// GreenSense — useParticleCanvas Hook
// Renders an animated floating particle field on a canvas element.

import { useEffect, useRef } from "react";

export function useParticleCanvas({ count = 35, maxOpacity = 0.4, speed = 0.5 } = {}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: count }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      r:       Math.random() * 2 + 0.5,
      vx:      (Math.random() - 0.5) * 0.3,
      vy:      -(Math.random() * speed + 0.1),
      opacity: Math.random() * maxOpacity + 0.05,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(82, 183, 136, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) { p.y = H; p.x = Math.random() * W; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [count, maxOpacity, speed]);

  return canvasRef;
}
