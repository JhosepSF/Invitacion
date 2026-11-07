import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Gift, Sparkles, Smile, Users, Award, Coffee } from "lucide-react";

export function SurpriseWheel() {
  const surprises = [
    {
      title: "🎁 Sorteos & Premios Especiales",
      desc: "Kits de estudio, recuerdos del festival y premios sorpresa para los asistentes que participen en las dinámicas.",
      color: "from-pink-500 to-rose-600",
      icon: Gift,
    },
    {
      title: "📦 El Gran Reto 'Cero Pantallas'",
      desc: "Guarda tu teléfono en el cofre del reto. Quienes logren la desconexión total durante el festival recibirán un distintivo especial.",
      color: "from-amber-400 to-yellow-600",
      icon: Award,
    },
    {
      title: "🤝 Dinámicas de Integración Real",
      desc: "Juegos grupales, risas y actividades para romper el hielo y conectar con compañeros de Medicina, Enfermería y otras carreras.",
      color: "from-cyan-400 to-blue-600",
      icon: Users,
    },
    {
      title: "☕ Espacio de Compartir & Relax",
      desc: "Desconecta del estrés de los parciales y exámenes en un ambiente cálido, divertido y libre de notificaciones.",
      color: "from-purple-500 to-indigo-600",
      icon: Coffee,
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleNextSurprise = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % surprises.length);
      setIsRevealing(false);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ffee00", "#f72585", "#00f0ff"],
      });
    }, 250);
  };

  const item = surprises[currentIdx];
  const IconComp = item.icon;

  return (
    <div className="bg-gradient-to-br from-[#1b0833]/80 via-black/60 to-[#100324]/80 border border-fuchsia-500/30 rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-xl text-left">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> ¿Qué habrá en el festival?
          </span>
          <h4 className="text-lg sm:text-xl font-black text-white font-funky">
            Dinámicas & Sorpresas Reveladas
          </h4>
        </div>
        <span className="text-xs bg-fuchsia-950/80 text-fuchsia-300 px-2.5 py-1 rounded-full border border-fuchsia-500/40 font-bold">
          {currentIdx + 1} / {surprises.length}
        </span>
      </div>

      <div
        className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} text-slate-950 shadow-lg transition-all duration-300 transform ${
          isRevealing ? "scale-95 opacity-50" : "scale-100 opacity-100"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-black/20 rounded-xl">
            <IconComp className="w-6 h-6 text-slate-950" />
          </div>
          <h5 className="text-base sm:text-lg font-black tracking-tight font-funky">
            {item.title}
          </h5>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
          {item.desc}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {surprises.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIdx ? "w-6 bg-yellow-400" : "w-2 bg-purple-500/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNextSurprise}
          className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/60 border border-purple-400/40 text-purple-200 text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Ver Siguiente Sorpresa</span>
        </button>
      </div>
    </div>
  );
}

