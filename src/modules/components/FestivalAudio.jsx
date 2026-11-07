import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Music } from "lucide-react";

export function FestivalAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Sound effect: Notification ping (WhatsApp / alert style)
  const playNotificationPing = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn(e);
    }
  };

  // Upbeat synth rhythm & festival chord progression
  const startFestivalBeat = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      // Master output
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.09, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Uplifting melodic synth notes (Am - F - C - G energetic pop scale)
      const notes = [
        440, 523.25, 659.25, 523.25, // A C E C
        349.23, 440, 523.25, 440,    // F A C A
        523.25, 659.25, 783.99, 659.25, // C E G E
        392.00, 493.88, 587.33, 493.88  // G B D B
      ];

      let step = 0;

      intervalRef.current = setInterval(() => {
        if (!audioCtxRef.current || !isPlayingRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const freq = notes[step % notes.length];

        // Synth note
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = step % 4 === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Envelope
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.2, now + 0.03);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.3);

        // Subtle kick beat on quarters
        if (step % 2 === 0) {
          const kickOsc = ctx.createOscillator();
          const kickGain = ctx.createGain();
          kickOsc.frequency.setValueAtTime(130, now);
          kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
          kickGain.gain.setValueAtTime(0.3, now);
          kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

          kickOsc.connect(kickGain);
          kickGain.connect(masterGain);
          kickOsc.start(now);
          kickOsc.stop(now + 0.15);
        }

        step++;
      }, 240);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  const stopFestivalBeat = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      isPlayingRef.current = true;
      setIsPlaying(true);
      startFestivalBeat();
    } else {
      isPlayingRef.current = false;
      setIsPlaying(false);
      stopFestivalBeat();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      stopFestivalBeat();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
          isPlaying
            ? "bg-fuchsia-600/40 border-fuchsia-400 text-fuchsia-200 shadow-[0_0_15px_rgba(247,37,133,0.5)]"
            : "bg-purple-950/50 border-purple-500/30 text-purple-300 hover:border-purple-400"
        } backdrop-blur-md text-xs font-semibold`}
        title={isPlaying ? "Pausar Música Festival" : "Activar Música Festival"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>Música ON</span>
            <span className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 bg-yellow-400 animate-bounce h-2" />
              <span className="w-0.5 bg-pink-400 animate-bounce h-3 delay-75" />
              <span className="w-0.5 bg-cyan-400 animate-bounce h-1.5 delay-150" />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-purple-400" />
            <span>Música OFF</span>
          </>
        )}
      </button>

      <button
        onClick={playNotificationPing}
        className="px-2.5 py-1.5 rounded-full bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-medium transition-all"
        title="Sonar alerta de notificación"
      >
        🔔 Ping
      </button>
    </div>
  );
}

