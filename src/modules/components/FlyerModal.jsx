import React from "react";
import { X, Download, ExternalLink, Sparkles } from "lucide-react";

export function FlyerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-md w-full bg-[#120626] border-2 border-yellow-400/50 rounded-3xl p-4 sm:p-5 shadow-[0_0_50px_rgba(255,238,0,0.3)] text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
            Afiche Oficial del Festival
          </h3>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl max-h-[75vh] flex items-center justify-center bg-black">
          <img
            src="/flyer.jpg"
            alt="Afiche Oficial - ¿Quién Controla a Quién? UNSM"
            className="w-full h-auto object-contain max-h-[72vh] rounded-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-300">
          <span>Universidad Nacional de San Martín • 2026-II</span>
          <a
            href="/flyer.jpg"
            download="Festival_Desconexion_UNSM.jpg"
            className="flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-bold bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-500/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar</span>
          </a>
        </div>
      </div>
    </div>
  );
}

