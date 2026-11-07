import React, { useState } from "react";
import confetti from "canvas-confetti";

export function LoveLetterModal({
  isOpen,
  onClose,
  recipientName = "Mi Amor",
  setRecipientName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [customLetter, setCustomLetter] = useState(
    `En cada rincón de esta galaxia infinita, brillas con una luz única e inigualable. 
    
Como los girasoles que siempre buscan el sol, mi corazón siempre encuentra su camino hacia ti. Eres mi estrella más brillante y mi universo entero.

¡Gracias por existir y llenar mi vida de luz y alegría! 🌻💛✨`
  );

  if (!isOpen) return null;

  const triggerLoveConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffd700", "#ffb703", "#ffa200", "#ffffff", "#f59e0b"],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
      {/* Background click to close */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-gradient-to-b from-[#181328]/95 via-[#120d1c]/95 to-[#090710]/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,191,0,0.25)] text-amber-50 animate-scaleUp">
        {/* Glowing Top Sunflower Accent */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(255,215,0,0.6)] text-2xl animate-pulse">
          🌻
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-amber-200 transition-colors"
          title="Cerrar"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            ✦ Dedicatoria Especial ✦
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-amber-200 mt-1 flex items-center justify-center gap-2">
            <span>Para:</span>
            {isEditing ? (
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="bg-black/40 border border-amber-400/50 rounded-lg px-2 py-0.5 text-yellow-300 font-serif text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-44 text-center"
                autoFocus
              />
            ) : (
              <span
                onClick={() => setIsEditing(true)}
                className="text-yellow-300 border-b border-dashed border-amber-400/60 cursor-pointer hover:text-yellow-100 transition-colors"
                title="Clic para editar nombre"
              >
                {recipientName} ✎
              </span>
            )}
          </h3>
        </div>

        {/* Letter Body */}
        <div className="bg-black/30 border border-amber-500/20 rounded-2xl p-5 mb-6 shadow-inner relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 text-7xl opacity-5 select-none pointer-events-none">
            💛
          </div>

          {isEditing ? (
            <textarea
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              rows={6}
              className="w-full bg-black/40 border border-amber-400/40 rounded-xl p-3 text-amber-100 font-sans text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            />
          ) : (
            <div className="font-serif italic text-amber-100/90 text-base sm:text-lg leading-relaxed whitespace-pre-line text-center">
              "{customLetter}"
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/20 transition-all"
          >
            {isEditing ? "Guardar Mensaje ✓" : "Editar Carta ✎"}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerLoveConfetti}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-semibold text-sm shadow-[0_0_20px_rgba(255,200,0,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Lluvia Dorada ✨</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
