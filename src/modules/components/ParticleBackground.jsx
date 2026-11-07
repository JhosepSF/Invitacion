import React, { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle types: stars, glowing orbs, music notes
    const particles = [];
    const notes = ["♪", "♫", "✨", "💬", "❤️", "⚡"];
    const colors = ["#ffee00", "#f72585", "#7209b7", "#4cc9f0", "#ffffff"];

    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        isSymbol: Math.random() > 0.75,
        symbol: notes[Math.floor(Math.random() * notes.length)],
        fontSize: Math.floor(Math.random() * 10 + 12),
      });
    }

    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle dynamic neon sound waves (as seen on the poster)
      ctx.lineWidth = 1.5;
      const waveColors = [
        "rgba(247, 37, 133, 0.18)",
        "rgba(114, 9, 183, 0.22)",
        "rgba(76, 201, 240, 0.16)",
      ];

      for (let w = 0; w < 3; w++) {
        ctx.strokeStyle = waveColors[w];
        ctx.beginPath();
        const baseHeight = height * (0.65 + w * 0.08);
        for (let x = 0; x < width; x += 15) {
          const y =
            baseHeight +
            Math.sin(x * 0.003 + waveOffset + w * 1.2) * 55 +
            Math.cos(x * 0.007 + waveOffset * 0.6) * 25;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      waveOffset += 0.012;

      // Draw & update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;
        const currentAlpha = Math.max(0.15, Math.min(0.9, p.alpha));

        ctx.save();
        ctx.globalAlpha = currentAlpha;

        if (p.isSymbol) {
          ctx.font = `${p.fontSize}px sans-serif`;
          ctx.fillStyle = p.color;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}

