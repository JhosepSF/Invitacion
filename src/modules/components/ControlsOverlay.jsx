import React, { useState } from "react";

export function ControlsOverlay({
  theme,
  setTheme,
  heartSpeed,
  setHeartSpeed,
  isImmersive,
  setIsImmersive,
  onSparkleBurst,
}) {
  const [showSettings, setShowSettings] = useState(false);

  const themes = [
    { id: "gold", name: "Oro Girasol", color: "#ffd700" },
    { id: "amber", name: "Ámbar Cálido", color: "#ff9100" },
    { id: "sunflower", name: "Prado Solar", color: "#84cc16" },
    { id: "romantic", name: "Nebulosa Rosa", color: "#f43f5e" },
  ];

  if (isImmersive) {
    return (
      <button
        onClick={() => setIsImmersive(false)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2 rounded-full bg-black/60 border border-amber-500/40 text-amber-200 text-xs font-medium backdrop-blur-md hover:bg-black/80 transition-all shadow-lg animate-fadeIn"
      >
        👁 Mostrar Interfaz
      </button>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Bar Navigation */}
      <div className="pointer-events-auto flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-black/40 border border-amber-500/30 backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(255,200,0,0.2)]">
            <span className="text-xl animate-bounce">🌻</span>
            <h1 className="text-sm sm:text-base font-serif font-bold text-amber-100 tracking-wide">
              Galaxia de Girasoles
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Sunflower Burst Button */}
          <button
            onClick={onSparkleBurst}
            className="w-10 h-10 rounded-full bg-black/40 border border-amber-500/30 hover:border-amber-400 text-yellow-300 flex items-center justify-center text-lg backdrop-blur-md hover:scale-105 active:scale-95 transition-all shadow-md"
            title="Lanzar Destellos Solares"
          >
            ✨
          </button>

          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 rounded-full bg-black/40 border border-amber-500/30 hover:border-amber-400 text-amber-200 flex items-center justify-center text-base backdrop-blur-md hover:scale-105 active:scale-95 transition-all shadow-md"
            title="Ajustes de Galaxia"
          >
            ⚙️
          </button>

          {/* Inmersive Mode */}
          <button
            onClick={() => setIsImmersive(true)}
            className="px-3 py-2 rounded-full bg-black/40 border border-amber-500/30 hover:border-amber-400 text-amber-200 text-xs font-medium backdrop-blur-md hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1"
            title="Modo Inmersivo (Ocultar UI)"
          >
            <span>🌌</span>
            <span className="hidden sm:inline">Inmersivo</span>
          </button>
        </div>
      </div>

      {/* Settings Dropdown Popover */}
      {showSettings && (
        <div className="pointer-events-auto absolute top-20 right-6 z-40 w-72 bg-[#120d1c]/95 border border-amber-500/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(255,191,0,0.25)] backdrop-blur-xl text-amber-100 animate-scaleUp">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/20 mb-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Ajustes de la Galaxia
            </span>
            <button
              onClick={() => setShowSettings(false)}
              className="text-xs text-amber-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Palette Selection */}
          <div className="mb-4">
            <label className="text-xs text-amber-200/80 block mb-2 font-medium">
              Paleta de Color Cósmica:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                    theme === t.id
                      ? "border-yellow-400 bg-yellow-400/20 text-yellow-200 font-semibold"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.color }}
                  />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Solar Pulse Speed Slider */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-amber-200/80 mb-1">
              <span>Ritmo / Pulso Solar:</span>
              <span className="font-mono text-yellow-400">{heartSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={heartSpeed}
              onChange={(e) => setHeartSpeed(parseFloat(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Bottom Hint Banner */}
      <div className="pointer-events-none flex flex-col items-center justify-center gap-1.5 mb-1 text-center">
        <div className="pointer-events-auto px-4 py-1.5 rounded-full bg-black/40 border border-amber-500/20 backdrop-blur-md text-[11px] sm:text-xs text-amber-200/80 shadow-md">
          🖱️ <span className="text-amber-100 font-medium">Arrastra</span> para rotar 360° &nbsp;•&nbsp; 
          🔍 <span className="text-amber-100 font-medium">Zoom</span> con rueda o pellizco &nbsp;•&nbsp; 
          ✨ <span className="text-amber-100 font-medium">Toca</span> para destellos solares
        </div>
      </div>
    </div>
  );
}
