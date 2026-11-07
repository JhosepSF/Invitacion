import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: November 30, 2026, 18:00:00 (Local Time)
    const targetDate = new Date(2026, 10, 30, 18, 0, 0).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEG", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-purple-950/60 border border-purple-500/40 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-[0_0_25px_rgba(157,78,221,0.25)]">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 text-yellow-300 font-semibold text-xs tracking-wider uppercase">
          <Clock className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Cuenta Regresiva Oficial</span>
        </div>
        <span className="text-[11px] text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-500/30 font-medium">
          30 Nov • 6:00 PM
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-[#120727]/80 border border-pink-500/20 shadow-inner group hover:border-yellow-400/50 transition-all"
          >
            <span className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-amber-200 to-yellow-500 font-funky group-hover:scale-105 transition-transform">
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-cyan-300/80 tracking-widest mt-0.5">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

