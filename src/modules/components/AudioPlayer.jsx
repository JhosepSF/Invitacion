import React, { useState, useEffect, useRef } from "react";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Initialize Web Audio Synth for sweet romantic music box melody
  const startRomanticMelody = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Chord progression & melody (Flores Amarillas / Romantic theme notes in Hz)
      // G - D - Em - C arpeggios with gentle music box timbre
      const melodyNotes = [
        // G chord
        392.0, 493.88, 587.33, 783.99,
        // D chord
        369.99, 440.0, 587.33, 739.99,
        // Em chord
        329.63, 392.0, 493.88, 659.25,
        // C chord
        261.63, 329.63, 392.0, 523.25,
        // Second phrase
        392.0, 587.33, 659.25, 783.99,
        739.99, 587.33, 440.0, 493.88,
        523.25, 659.25, 783.99, 987.77,
        880.0, 783.99, 659.25, 587.33,
      ];

      let noteIndex = 0;

      const playPluck = (freq, time) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Warm chime/bell tone with subtle harmonic
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        // Exponential decay envelope
        noteGain.gain.setValueAtTime(0.001, time);
        noteGain.gain.linearRampToValueAtTime(0.35, time + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

        // Add warm sub-harmonic
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = "triangle";
        subOsc.frequency.setValueAtTime(freq / 2, time);
        subGain.gain.setValueAtTime(0.08, time);
        subGain.gain.exponentialRampToValueAtTime(0.0001, time + 1.4);

        osc.connect(noteGain);
        subOsc.connect(subGain);
        noteGain.connect(masterGain);
        subGain.connect(masterGain);

        osc.start(time);
        subOsc.start(time);
        osc.stop(time + 2.0);
        subOsc.stop(time + 2.0);
      };

      intervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const note = melodyNotes[noteIndex % melodyNotes.length];
        playPluck(note, now);

        // Occasional lower bass pulse
        if (noteIndex % 4 === 0) {
          playPluck(note / 2, now);
        }

        noteIndex++;
      }, 420);
    } catch (e) {
      console.warn("Audio Context init error:", e);
    }
  };

  const stopRomanticMelody = () => {
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
      startRomanticMelody();
      setIsPlaying(true);
    } else {
      stopRomanticMelody();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        volume * 0.15,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopRomanticMelody();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="audio-player-pill flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md bg-black/40 border border-amber-500/30 shadow-[0_0_20px_rgba(255,200,0,0.2)] text-amber-200">
      <button
        onClick={toggleMusic}
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
        title={isPlaying ? "Pausar Melodía" : "Reproducir Melodía Romántica"}
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold tracking-wide text-amber-100">
            Flores Amarillas
          </span>
          <span className="text-[10px] text-amber-400">♫</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          {/* Animated Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3">
            <span
              className={`w-0.5 bg-amber-400 rounded-full transition-all ${
                isPlaying ? "animate-bar-1" : "h-1"
              }`}
            />
            <span
              className={`w-0.5 bg-amber-300 rounded-full transition-all ${
                isPlaying ? "animate-bar-2" : "h-1.5"
              }`}
            />
            <span
              className={`w-0.5 bg-yellow-400 rounded-full transition-all ${
                isPlaying ? "animate-bar-3" : "h-1"
              }`}
            />
            <span
              className={`w-0.5 bg-amber-200 rounded-full transition-all ${
                isPlaying ? "animate-bar-4" : "h-2"
              }`}
            />
          </div>
          <span className="text-[10px] text-amber-300/70 ml-1">
            {isPlaying ? "Sonando..." : "Melodía de Amor"}
          </span>
        </div>
      </div>
    </div>
  );
}
