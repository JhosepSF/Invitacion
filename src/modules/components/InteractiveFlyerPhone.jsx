import React, { useState } from "react";
import confetti from "canvas-confetti";
import { MessageSquare, Bell, Heart, Smile, Music, Sparkles } from "lucide-react";

export function InteractiveFlyerPhone({ onOpenRegister, onShowFlyer }) {
  const [likes, setLikes] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);

  const handlePhoneClick = () => {
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 500);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6, x: 0.5 },
      colors: ["#ffee00", "#f72585", "#00f0ff"],
    });
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7, x: 0.5 },
        colors: ["#f72585", "#ff0055"],
      });
    }
  };

  return (
    <div className="relative mx-auto flex items-center justify-center max-w-[340px] sm:max-w-[380px] select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-600/30 via-purple-600/20 to-transparent blur-3xl -z-10 rounded-full" />

      {/* Floating Sparkles & Music Notes around phone */}
      <span className="absolute -top-4 -left-4 text-yellow-300 text-2xl animate-bounce">✨</span>
      <span className="absolute top-1/4 -right-5 text-cyan-300 text-xl animate-pulse">🎵</span>
      <span className="absolute bottom-1/3 -left-6 text-pink-400 text-2xl animate-float">🎉</span>
      <span className="absolute -bottom-2 right-2 text-yellow-400 text-xl animate-spin" style={{ animationDuration: '6s' }}>⭐</span>

      {/* Smartphone Body */}
      <div
        onClick={handlePhoneClick}
        className={`relative w-full rounded-[42px] p-3 sm:p-3.5 bg-gradient-to-b from-[#220738] via-[#120324] to-[#0a0117] border-[3.5px] border-pink-500/80 phone-border-anim shadow-[0_0_40px_rgba(247,37,133,0.5)] cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
          isVibrating ? "animate-[wiggle_0.2s_ease-in-out_infinite]" : ""
        }`}
      >
        {/* Phone Speaker Notch / Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-center gap-2 border border-white/10 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-purple-500/40" />
          <div className="w-8 h-1 rounded-full bg-slate-800" />
        </div>

        {/* Screen Content */}
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#260a45] via-[#180430] to-[#0c021a] border border-fuchsia-500/30 pt-7 pb-4 px-3 sm:px-4 text-center">
          {/* Top Screen Bar */}
          <div className="flex items-center justify-between text-[10px] text-purple-200/70 mb-2 px-1">
            <span>6:00 PM</span>
            <div className="flex items-center gap-1.5">
              <span>UNSM 5G</span>
              <span>🔋 100%</span>
            </div>
          </div>

          {/* Poster Illustration / Characters Image */}
          <div className="relative rounded-2xl overflow-hidden my-1 border border-pink-500/20 group">
            <img
              src="/flyer.jpg"
              alt="Festival de la Desconexión"
              className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140428] via-transparent to-transparent opacity-80" />

            {/* Quick Badge overlay */}
            <div className="absolute top-2 left-2 bg-yellow-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-md">
              30 NOV • 6 PM
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowFlyer();
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/90 text-yellow-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-yellow-400/40 backdrop-blur-sm transition-all"
            >
              🔍 Ver Afiche
            </button>
          </div>

          {/* Floating Message Notification Bubble (From the Poster) */}
          <div className="relative -mt-6 z-10 mx-auto bg-gradient-to-r from-pink-50 via-purple-50 to-pink-100 text-slate-900 rounded-2xl p-3 shadow-xl border-2 border-fuchsia-400 animate-bubble-pulse">
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-full bg-pink-500 text-white">
                <MessageSquare className="w-3 h-3" />
              </span>
              <span className="text-xs font-extrabold text-purple-950 tracking-tight">
                Mensaje nuevo de la UNSM:
              </span>
            </div>
            <p className="text-[12px] sm:text-[13px] font-bold text-slate-800 leading-snug">
              ¡No es una charla más! Ven a compartir un espacio con dinámicas, juegos y sorpresas.
            </p>
          </div>

          {/* Event Quick Coordinates Pill */}
          <div className="mt-3 bg-purple-950/70 border border-purple-500/30 rounded-xl p-2.5 text-left text-[11px] text-purple-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Punto de encuentro:</span>
              <span className="font-bold text-yellow-300">UNSM - Aula A6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Fecha & Hora:</span>
              <span className="font-bold text-cyan-300">30 Nov • 6:00 PM</span>
            </div>
          </div>

          {/* Interaction Bar */}
          <div className="mt-3 flex items-center justify-between px-1">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                hasLiked
                  ? "bg-pink-600 text-white shadow-[0_0_12px_rgba(247,37,133,0.6)]"
                  : "bg-white/10 hover:bg-white/20 text-pink-300"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-white" : ""}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenRegister();
              }}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              Confirmar
            </button>
          </div>
        </div>

        {/* Bottom home indicator line */}
        <div className="w-28 h-1 bg-white/40 rounded-full mx-auto mt-2" />
      </div>
    </div>
  );
}

