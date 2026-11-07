import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { MessageSquare, Bell, Sparkles, ChevronDown, Lock } from "lucide-react";

export function NotificationIntro({ onOpenInvitation }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState("6:00");

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setCurrentTimeStr(`${hours % 12 || 12}:${minutes}`);

    // Try subtle initial vibration if supported
    if (navigator.vibrate) {
      try {
        navigator.vibrate([80, 50, 100]);
      } catch (e) {}
    }
  }, []);

  // Play realistic smartphone notification sound using Web Audio API
  const playNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;

      // Tone 1: High crisp chime
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, now); // A5
      osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.5);

      // Tone 2: Warm bell resonance
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1760, now + 0.1); // A6
      gain2.gain.setValueAtTime(0.001, now + 0.1);
      gain2.gain.linearRampToValueAtTime(0.2, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.6);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  const triggerHaptic = () => {
    if (navigator.vibrate) {
      try {
        navigator.vibrate([120, 80, 180]);
      } catch (e) {}
    }
  };

  const handleOpen = () => {
    playNotificationSound();
    triggerHaptic();

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.3 },
      colors: ["#ffee00", "#f72585", "#00f0ff", "#ffffff"],
    });

    setIsDismissing(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 550);
  };

  return (
    <div
      onClick={handleOpen}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[#120426] via-[#090214] to-black transition-all duration-500 cursor-pointer select-none ${
        isDismissing ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Top Phone Status Bar */}
      <div className="w-full max-w-md flex items-center justify-between text-purple-200/80 text-xs px-2 pt-2">
        <div className="flex items-center gap-1.5 font-bold">
          <span>UNSM Red</span>
          <span className="text-[10px] text-yellow-400">● 5G</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Lock className="w-3.5 h-3.5 text-gray-400" />
          <span>{currentTimeStr} PM</span>
          <span>🔋 100%</span>
        </div>
      </div>

      {/* Center Phone Lockscreen Clock */}
      <div className="text-center my-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-purple-300/80 font-bold">
          Sábado, 30 de Noviembre
        </span>
        <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300 font-funky tracking-tight">
          06:00
        </h1>
        <p className="text-xs text-yellow-300/90 font-semibold tracking-wide">
          Facultad de Medicina Humana & Enfermería UNSM
        </p>
      </div>

      {/* The Incoming Notification Banner (Matching the Poster) */}
      <div className="w-full max-w-md my-auto animate-bounce-short">
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="relative bg-gradient-to-br from-white via-pink-50 to-purple-100 text-slate-900 rounded-3xl p-4 sm:p-5 shadow-[0_15px_45px_rgba(247,37,133,0.4)] border-2 border-fuchsia-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {/* Subtle pulse light */}
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500"></span>
          </span>

          {/* Header of Notification */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-md">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-black text-purple-950 uppercase tracking-tight block">
                  Mensaje nuevo de la UNSM
                </strong>
                <span className="text-[10px] text-gray-500">Ahora • Medicina & Enfermería</span>
              </div>
            </div>
            <span className="text-[10px] bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
              NUEVO
            </span>
          </div>

          {/* Message Text (From the Flyer) */}
          <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug mb-3">
            ¡No es una charla más! Ven a compartir un espacio con dinámicas, juegos y sorpresas.
          </p>

          {/* Location & Time preview pill */}
          <div className="bg-purple-950/10 border border-purple-500/20 rounded-xl px-3 py-2 text-xs flex items-center justify-between text-purple-950 font-bold mb-3">
            <span>📍 Aula A6 • UNSM</span>
            <span>⏰ 6:00 PM</span>
          </div>

          {/* Interactive Call to Action Bar */}
          <div className="flex items-center justify-between pt-1 border-t border-purple-200/60">
            <span className="text-xs font-black text-fuchsia-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              Toca para abrir la invitación
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-950 text-white text-[11px] font-black uppercase tracking-wider">
              Abrir ➔
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center pb-4 text-xs text-purple-300/70 flex flex-col items-center gap-1 animate-pulse">
        <ChevronDown className="w-4 h-4" />
        <span>Toca la pantalla o la notificación para entrar</span>
      </div>
    </div>
  );
}

