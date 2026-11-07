import React, { useState } from "react";

export function CodeSnippetCard({
  recipientName = "Mi Amor",
  onOpenLetter,
  onSparkleBurst,
  isMinimized,
  setIsMinimized,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = `.Flores_Amarillas {
  position: absolute;
  width: 90%;
  font-size: 2rem;
  font-family: "Te Amo";
  height: var(--letter-love);
  transform: translateX(-50%);
  background: var(--letter);
  /* Para: ${recipientName} 🌻💛 */
}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (onSparkleBurst) onSparkleBurst();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`romantic-code-window transition-all duration-300 ${
        isMinimized ? "minimized-window" : ""
      }`}
    >
      {/* Window Header */}
      <div className="window-header flex items-center justify-between">
        <div className="window-dots flex items-center gap-2">
          <button
            className="dot dot-red"
            title="Cerrar / Minimizar"
            onClick={() => setIsMinimized(!isMinimized)}
          />
          <button
            className="dot dot-yellow"
            title="Efecto Estelar"
            onClick={() => onSparkleBurst && onSparkleBurst()}
          />
          <button
            className="dot dot-green"
            title="Abrir Carta"
            onClick={onOpenLetter}
          />
        </div>
        <div className="window-title flex items-center gap-1.5 font-mono text-xs text-amber-200/90 font-medium">
          <span className="file-icon">✨</span>
          <span>Style.css</span>
        </div>
        <div className="header-actions">
          <button
            onClick={handleCopy}
            className="copy-btn text-xs px-2 py-0.5 rounded text-amber-300/80 hover:text-amber-100 hover:bg-amber-500/20 transition-colors"
            title="Copiar Código"
          >
            {copied ? "¡Copiado! ✓" : "Copiar"}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      {!isMinimized && (
        <div className="code-body font-mono text-sm leading-relaxed p-4 select-text">
          <div className="code-line">
            <span className="line-number">1</span>
            <span className="selector text-yellow-300 font-semibold">
              .Flores_Amarillas
            </span>{" "}
            <span className="bracket text-amber-100">&#123;</span>
          </div>

          <div className="code-line">
            <span className="line-number">2</span>
            <span className="property text-amber-100 ml-4">position:</span>{" "}
            <span className="value text-rose-400">absolute;</span>
          </div>

          <div className="code-line">
            <span className="line-number">3</span>
            <span className="property text-amber-100 ml-4">width:</span>{" "}
            <span className="value text-amber-300">90%;</span>
          </div>

          <div className="code-line">
            <span className="line-number">4</span>
            <span className="property text-amber-100 ml-4">font-size:</span>{" "}
            <span className="value text-amber-400">2rem;</span>
          </div>

          <div className="code-line">
            <span className="line-number">5</span>
            <span className="property text-amber-100 ml-4">font-family:</span>{" "}
            <span className="value text-rose-300">"Te Amo";</span>
          </div>

          <div className="code-line">
            <span className="line-number">6</span>
            <span className="property text-amber-100 ml-4">height:</span>{" "}
            <span className="value text-pink-400">
              var(--letter-love);
            </span>
          </div>

          <div className="code-line">
            <span className="line-number">7</span>
            <span className="property text-amber-100 ml-4">transform:</span>{" "}
            <span className="value text-rose-400">translateX(-50%);</span>
          </div>

          <div className="code-line">
            <span className="line-number">8</span>
            <span className="property text-amber-100 ml-4">background:</span>{" "}
            <span className="value text-amber-200">
              var(--letter);
            </span>
          </div>

          <div className="code-line">
            <span className="line-number">9</span>
            <span className="bracket text-amber-100">&#125;</span>
          </div>

          {/* Quick Action in Card */}
          <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between">
            <span className="text-[11px] text-amber-300/70 font-sans italic">
              Dedicatoria para:{" "}
              <span className="text-amber-200 font-semibold not-italic">
                {recipientName}
              </span>
            </span>
            <button
              onClick={onOpenLetter}
              className="open-letter-badge text-xs px-2.5 py-1 rounded-full font-sans font-medium flex items-center gap-1 shadow-sm"
            >
              <span>💌 Leer Carta</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
