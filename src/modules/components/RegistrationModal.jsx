import React, { useState } from "react";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import { X, CheckCircle, Ticket, Sparkles, MapPin, Calendar, Clock, QrCode, Share2 } from "lucide-react";

export function RegistrationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    career: "",
    phone: "",
    expectation: "",
  });
  const [ticketGenerated, setTicketGenerated] = useState(null);

  if (!isOpen) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ffee00", "#f72585", "#7209b7", "#00f0ff", "#ffffff"],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const ticketCode = "UNSM-FEST-" + Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      ...formData,
      code: ticketCode,
      seat: "Aula A6",
      date: "30 de Noviembre, 2026",
      time: "6:00 PM",
      location: "Universidad Nacional de San Martín",
    };

    setTicketGenerated(newTicket);
    triggerCelebration();

    Swal.fire({
      title: "¡Asistencia Confirmada! 🎉",
      text: `¡Bienvenido(a), ${formData.name}! Tu pase digital para el Festival de la Desconexión ya está listo.`,
      icon: "success",
      background: "#16072b",
      color: "#ffffff",
      confirmButtonColor: "#00f0ff",
      confirmButtonText: "Ver mi Pase Digital",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1c0836] via-[#140526] to-[#0c0217] border-2 border-fuchsia-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(247,37,133,0.35)] text-white max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!ticketGenerated ? (
          <div>
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> INGRESO 100% LIBRE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 font-funky">
                Confirmar Asistencia
              </h2>
              <p className="text-sm text-purple-200/80 mt-1">
                El Festival de la Desconexión: ¿Quién controla a quién?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Alessandra"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-white placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
                    Escuela / Facultad
                  </label>
                  <input
                    type="text"
                    value={formData.career}
                    onChange={(e) => setFormData({ ...formData, career: e.target.value })}
                    placeholder="Ej. Enf. / Med. Humana"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-white placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
                    WhatsApp / Celular
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej. 123 456 789"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-white placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
                  ¿Por qué quieres participar? (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={formData.expectation}
                  onChange={(e) => setFormData({ ...formData, expectation: e.target.value })}
                  placeholder="Quiero aprender a controlar el tiempo en pantalla y divertirme en las dinámicas..."
                  className="w-full px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-white placeholder-purple-400/50 focus:outline-none focus:border-cyan-400 text-sm resize-none"
                />
              </div>

              {/* Event Quick Recap */}
              <div className="bg-black/40 border border-purple-500/20 rounded-xl p-3 text-xs space-y-1.5 text-purple-200/90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span><strong>Lugar:</strong> UNSM - Aula A6</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                  <span><strong>Fecha:</strong> 30 de Noviembre | <strong>Hora:</strong> 6:00 PM</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-950 font-black text-base uppercase tracking-wider shadow-[0_0_25px_rgba(255,238,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-slate-900" />
                <span>¡Confirmar mi Asistencia!</span>
              </button>
            </form>
          </div>
        ) : (
          /* Rendered Digital Ticket */
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-bold">
              <CheckCircle className="w-5 h-5" />
              <span>¡Pase Digital Generado con Éxito!</span>
            </div>

            {/* Ticket Card */}
            <div className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 border-2 border-yellow-400/60 rounded-2xl p-5 shadow-[0_0_35px_rgba(255,238,0,0.3)] text-left overflow-hidden">
              {/* Decorative side cuts */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#140526] rounded-full border-r-2 border-yellow-400/60" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#140526] rounded-full border-l-2 border-yellow-400/60" />

              <div className="border-b border-dashed border-yellow-400/40 pb-3 mb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-lg border border-white/10">
                    <img src="/logos/unsm_badge.png" alt="UNSM" className="w-5 h-5 object-contain" title="UNSM" />
                    <img src="/logos/fmh_badge.png" alt="FMH" className="w-5 h-5 object-contain" title="Facultad de Medicina Humana" />
                    <img src="/logos/epf_badge.png" alt="EPF" className="w-5 h-5 object-contain" title="Escuela Profesional de Enfermería" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-yellow-300 tracking-wider">
                    UNSM • FMH • EPF
                  </span>
                </div>
                <h3 className="text-lg font-black text-white font-funky leading-tight">
                  Festival de la Desconexión
                </h3>
                <p className="text-xs text-pink-300 font-semibold">
                  "¿Quién Controla a Quién?"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-[10px] text-gray-400 block">ASISTENTE:</span>
                  <span className="font-bold text-white text-sm">{ticketGenerated.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">WHATSAPP:</span>
                  <span className="font-mono font-bold text-cyan-300">{ticketGenerated.phone || "Confirmado"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">LUGAR & AULA:</span>
                  <span className="font-bold text-yellow-300">UNSM - Aula A6</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">FECHA & HORA:</span>
                  <span className="font-bold text-yellow-300">30 Nov • 6:00 PM</span>
                </div>
              </div>

              <div className="bg-black/50 p-2.5 rounded-xl flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-2">
                  <QrCode className="w-10 h-10 text-cyan-300" />
                  <div className="text-[11px] leading-tight text-gray-300">
                    <p className="font-bold text-white">Ingreso Libre</p>
                    <p className="text-gray-400">Presenta este pase en la entrada</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-green-500/20 text-green-300 text-[10px] font-bold border border-green-500/40">
                  VÁLIDO
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `¡Ya confirmé mi asistencia al Festival de la Desconexión UNSM! Fecha: 30 de Noviembre, 6 PM en Aula A6. Pase: ${ticketGenerated.code}`
                  );
                  Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Información copiada al portapapeles",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-800/60 hover:bg-purple-700/60 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir / Copiar</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-black transition-all"
              >
                ¡Listo, Nos Vemos!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

