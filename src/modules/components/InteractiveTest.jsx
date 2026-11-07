import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2, RotateCcw, AlertTriangle } from "lucide-react";

export function InteractiveTest({ onConfirmClick }) {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      q: "1. ¿Qué es lo primero que haces apenas abres los ojos por la mañana?",
      options: [
        { text: "Revisar WhatsApp, TikTok o Instagram en la cama", points: 2 },
        { text: "Levantarme, lavarme la cara o tomar agua", points: 0 },
      ],
    },
    {
      id: 2,
      q: "2. ¿Has sentido alguna vez 'vibraciones fantasma' en el bolsillo?",
      options: [
        { text: "¡Sí! Juraba que vibró pero no había nada", points: 2 },
        { text: "Casi nunca, no estoy tan pendiente", points: 0 },
      ],
    },
    {
      id: 3,
      q: "3. En reuniones con amigos o en clases, ¿puedes pasar 1 hora sin revisar el móvil?",
      options: [
        { text: "Difícil, el scroll involuntario me gana", points: 2 },
        { text: "Sí, prefiero charlar y prestar atención", points: 0 },
      ],
    },
  ];

  const handleSelect = (qId, points) => {
    setAnswers((prev) => ({ ...prev, [qId]: points }));
  };

  const calculateResult = () => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    setShowResult(true);
    if (total >= 4) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f72585", "#ffee00", "#00f0ff"],
      });
    }
  };

  const resetTest = () => {
    setAnswers({});
    setShowResult(false);
  };

  const isComplete = Object.keys(answers).length === questions.length;
  const score = Object.values(answers).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-gradient-to-br from-purple-950/70 via-[#15072e]/80 to-slate-950/80 border border-purple-500/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_30px_rgba(157,78,221,0.25)] text-left backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 mb-4">
        <div>
          <span className="text-[11px] font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Dinámica Interactiva
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white font-funky">
            Test: ¿Quién controla a quién?
          </h3>
        </div>
        {showResult && (
          <button
            onClick={resetTest}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        )}
      </div>

      {!showResult ? (
        <div className="space-y-4">
          {questions.map((item) => (
            <div key={item.id} className="bg-black/40 rounded-2xl p-3.5 border border-purple-500/20">
              <p className="text-sm font-semibold text-purple-100 mb-2.5">{item.q}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.options.map((opt, idx) => {
                  const isSelected = answers[item.id] === opt.points;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(item.id, opt.points)}
                      className={`text-left text-xs p-2.5 rounded-xl border transition-all flex items-start gap-2 ${
                        isSelected
                          ? "bg-yellow-400 text-slate-950 font-bold border-yellow-300 shadow-md"
                          : "bg-purple-950/40 text-purple-200 border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/40"
                      }`}
                    >
                      <span className="mt-0.5">•</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            disabled={!isComplete}
            onClick={calculateResult}
            className={`w-full py-3 rounded-2xl font-black text-sm uppercase tracking-wider transition-all ${
              isComplete
                ? "bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-950 shadow-[0_0_20px_rgba(255,238,0,0.5)] hover:scale-[1.02] cursor-pointer"
                : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
            }`}
          >
            {isComplete ? "Ver Mi Diagnóstico ➔" : "Responde las 3 preguntas para ver tu resultado"}
          </button>
        </div>
      ) : (
        <div className="text-center py-4 space-y-4 animate-fade-in">
          <div className="inline-flex p-3 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
            {score >= 4 ? <AlertTriangle className="w-8 h-8 text-yellow-400" /> : <CheckCircle2 className="w-8 h-8 text-cyan-400" />}
          </div>

          <div>
            <h4 className="text-xl sm:text-2xl font-black text-white font-funky">
              {score >= 4 ? "¡Alerta de Sobredosis Digital! 📱⚡" : "¡Tienes Buen Control! 🧘‍♂️🌱"}
            </h4>
            <p className="text-sm text-purple-200 mt-2 max-w-md mx-auto">
              {score >= 4
                ? "Tu celular tiene más control de tus tiempos del que crees. Notificaciones, ansiedad y scroll te están robando momentos irreemplazables."
                : "Tienes un uso consciente, pero siempre podemos fortalecer hábitos saludables y desconectarnos para compartir de verdad."}
            </p>
          </div>

          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-4 text-xs text-yellow-200 max-w-md mx-auto">
            <p className="font-bold text-sm text-yellow-300 mb-1">
              🎉 ¡Te esperamos en el Festival de la Desconexión!
            </p>
            <p>
              Ven a compartir dinámicas vivenciales, juegos sin celulares y sorpresas organizadas por la UNSM.
            </p>
            <p className="mt-2 text-cyan-300 font-extrabold">
              📍 UNSM - Aula A6 | 📅 30 de Noviembre | ⏰ 6:00 PM
            </p>
          </div>

          <button
            onClick={onConfirmClick}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Confirmar Mi Asistencia (Ingreso Libre)</span>
          </button>
        </div>
      )}
    </div>
  );
}

