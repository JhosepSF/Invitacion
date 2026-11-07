import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Ticket,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  FileText,
  Share2,
  ShieldCheck,
  CheckCircle,
  Smartphone,
  Users,
  Award,
  Heart,
  Volume2,
  MessageSquare,
  Bell
} from "lucide-react";

import { ParticleBackground } from "../components/ParticleBackground";
import { FestivalAudio } from "../components/FestivalAudio";
import { CountdownTimer } from "../components/CountdownTimer";
import { InteractiveFlyerPhone } from "../components/InteractiveFlyerPhone";
import { RegistrationModal } from "../components/RegistrationModal";
import { FlyerModal } from "../components/FlyerModal";
import { InteractiveTest } from "../components/InteractiveTest";
import { SurpriseWheel } from "../components/SurpriseWheel";
import { InstitutionalLogos } from "../components/InstitutionalLogos";
import { NotificationIntro } from "../components/NotificationIntro";
import "../../styles/Presentation.css";

export function PanelPrincipal() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 5;

  const slidesInfo = [
    { title: "Portada Oficial", badge: "Inicio" },
    { title: "Consecuencias", badge: "Problemática" },
    { title: "Dinámicas & Juegos", badge: "El Festival" },
    { title: "Lugar & Fecha", badge: "Coordenadas" },
    { title: "Confirmar Asistencia", badge: "Pase Digital" },
  ];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isAutoPlay) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const triggerSparkles = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffee00", "#f72585", "#00f0ff", "#ffffff"],
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#090214] text-white flex flex-col justify-between overflow-x-hidden selection:bg-yellow-400 selection:text-slate-950 font-sans">
      {/* Dynamic Animated Cosmic Particles & Soundwave Lines Canvas */}
      <ParticleBackground />

      {/* TOP INSTITUTIONAL BAR */}
      <header className="relative z-30 w-full border-b border-purple-500/20 bg-[#0d031c]/85 backdrop-blur-md px-3 sm:px-6 py-2 flex items-center justify-between">
        {/* Institutional Logos: UNSM, FMH, EPF */}
        <div className="flex items-center">
          <InstitutionalLogos variant="header" />
        </div>

        {/* Action Controls & Music */}
        <div className="flex items-center gap-2">
          {/* Music Controller */}
          <FestivalAudio />

          {/* Flyer Modal Button */}
          <button
            onClick={() => setIsFlyerOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all hover:scale-105"
            title="Ver Afiche Oficial"
          >
            <FileText className="w-3.5 h-3.5 text-yellow-400" />
            <span>Afiche</span>
          </button>

          {/* Re-trigger Notification Intro */}
          <button
            onClick={() => setShowIntro(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-900/40 hover:bg-pink-800/60 border border-pink-500/40 text-pink-200 text-xs font-semibold transition-all hover:scale-105"
            title="Repetir notificación de entrada"
          >
            <Bell className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>Notificación</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-purple-300 transition-all"
            title={isFullscreen ? "Salir de Pantalla Completa" : "Pantalla Completa"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Call to action */}
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,238,0,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            Confirmar Asistencia
          </button>
        </div>
      </header>

      {/* SLIDE PROGRESS / NAVIGATION TABS */}
      <nav className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-3 pb-1">
        <div className="flex items-center justify-between gap-1 sm:gap-2 bg-purple-950/40 border border-purple-500/30 p-1.5 rounded-2xl backdrop-blur-md">
          {slidesInfo.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-center transition-all ${
                idx === currentSlide
                  ? "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-950 font-extrabold shadow-[0_0_15px_rgba(255,238,0,0.4)]"
                  : "text-purple-300 hover:text-white hover:bg-white/5 font-semibold"
              }`}
            >
              <span className="block text-[10px] sm:text-xs tracking-wider">
                {slide.badge}
              </span>
              <span className="hidden md:block text-[9px] opacity-80 truncate">
                {slide.title}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN PRESENTATION BODY */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center">
        {/* SLIDE 0: PORTADA & FLYER VIVO */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            {/* Left Content / Titles */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5">
              {/* Institutional 3 Logos Banner (UNSM - FMH - EPF) */}
              <div className="flex justify-center lg:justify-start">
                <InstitutionalLogos variant="banner" />
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-500 font-funky tracking-tight text-glow-yellow leading-none">
                  ¿QUIÉN CONTROLA A QUIÉN?
                </h2>
                <p className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 font-funky">
                  El Festival de la Desconexión: Consecuencias del uso del celular
                </p>
              </div>

              {/* Notification Bubble Highlight */}
              <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/15 to-cyan-500/10 border border-fuchsia-400/40 rounded-2xl p-4 backdrop-blur-md shadow-lg max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-xl bg-pink-500 text-white shadow-md flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-extrabold text-pink-300 uppercase tracking-wider mb-0.5">
                      Mensaje nuevo de la UNSM:
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-white">
                      ¡No es una charla más! Ven a compartir un espacio con dinámicas, juegos y sorpresas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Coordinates Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto lg:mx-0">
                <div className="bg-[#15072e]/80 border border-purple-500/30 rounded-xl p-3 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-pink-400 flex-shrink-0" />
                  <div className="text-left text-xs leading-tight">
                    <span className="text-gray-400 block text-[10px]">Punto de encuentro:</span>
                    <strong className="text-yellow-300">UNSM - Aula A6</strong>
                  </div>
                </div>

                <div className="bg-[#15072e]/80 border border-purple-500/30 rounded-xl p-3 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <div className="text-left text-xs leading-tight">
                    <span className="text-gray-400 block text-[10px]">Fecha:</span>
                    <strong className="text-white">30 de Noviembre</strong>
                  </div>
                </div>

                <div className="bg-[#15072e]/80 border border-purple-500/30 rounded-xl p-3 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div className="text-left text-xs leading-tight">
                    <span className="text-gray-400 block text-[10px]">Hora:</span>
                    <strong className="text-cyan-300">6:00 PM</strong>
                  </div>
                </div>
              </div>

              {/* Call to Actions & Free Entry Banner */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-black text-sm uppercase tracking-wider box-glow-btn hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4 text-slate-950" />
                  <span>CONFIRMAR ASISTENCIA</span>
                </button>

                <button
                  onClick={() => setCurrentSlide(1)}
                  className="px-5 py-3.5 rounded-2xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 font-bold text-sm transition-all hover:scale-105 flex items-center gap-1.5"
                >
                  <span>Explorar Presentación</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="w-full sm:w-auto text-center sm:text-left">
                  <span className="inline-block text-xs font-black text-yellow-300 tracking-wider uppercase px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30">
                    ¡INGRESO LIBRE! Te esperamos
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Interactive 3D Phone with Poster */}
            <div className="lg:col-span-5 flex justify-center">
              <InteractiveFlyerPhone
                onOpenRegister={() => setIsRegisterOpen(true)}
                onShowFlyer={() => setIsFlyerOpen(true)}
              />
            </div>
          </div>
        )}

        {/* SLIDE 1: CONSECUENCIAS DEL USO DEL CELULAR */}
        {currentSlide === 1 && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold text-pink-400 uppercase tracking-widest px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30">
                La Realidad Digital
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-funky">
                ¿Qué nos está haciendo el celular?
              </h2>
              <p className="text-sm sm:text-base text-purple-200/90 max-w-2xl mx-auto">
                No se trata de satanizar la tecnología, sino de recuperar el control de nuestras vidas y nuestra salud mental y física.
              </p>
            </div>

            {/* 4 Consequence Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-purple-950/50 border border-purple-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md hover:border-pink-500/60 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
                  Sobrecarga Mental & Fatiga
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  El scroll interminable agota los neurotransmisores de dopamina, provocando falta de concentración, cansancio crónico y bajo rendimiento en clases.
                </p>
              </div>

              <div className="bg-purple-950/50 border border-purple-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md hover:border-yellow-500/60 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                  👥
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors">
                  Pérdida de la Conexión Real
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  Estamos rodeados de amigos o familia pero cada uno encerrado en su pantalla. La verdadera empatía y las risas ocurren cara a cara.
                </p>
              </div>

              <div className="bg-purple-950/50 border border-purple-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md hover:border-cyan-500/60 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                  👁️
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  Salud y Ritmo del Sueño
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  La luz azul antes de dormir altera la melatonina, generando insomnio, dolor cervical y afecciones posturales respaldadas por la salud médica.
                </p>
              </div>

              <div className="bg-purple-950/50 border border-purple-500/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md hover:border-purple-400/60 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                  Nomofobia & Ansiedad Digital
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  El miedo irracional a quedarse sin batería, sin señal o sin revisar los mensajes genera estrés constante e interrupciones en tu tranquilidad.
                </p>
              </div>
            </div>

            {/* Interactive Test Component */}
            <InteractiveTest onConfirmClick={() => setIsRegisterOpen(true)} />
          </div>
        )}

        {/* SLIDE 2: DINÁMICAS, JUEGOS Y SORPRESAS */}
        {currentSlide === 2 && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold text-yellow-300 uppercase tracking-widest px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30">
                ¡No es una charla más!
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-funky">
                El Festival de la Desconexión
              </h2>
              <p className="text-sm sm:text-base text-purple-200/90 max-w-xl mx-auto">
                Ven a compartir un espacio vivencial único preparado por estudiantes y docentes de la Facultad de Medicina Humana y Escuela de Enfermería.
              </p>
            </div>

            {/* 3 Main Experience Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-b from-pink-950/60 to-purple-950/40 border border-pink-500/40 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-pink-500/20 text-pink-300 flex items-center justify-center font-bold text-2xl shadow-inner">
                  🎲
                </div>
                <h3 className="text-lg font-black text-white font-funky">
                  Juegos Sin Pantallas
                </h3>
                <p className="text-xs text-purple-200/80">
                  Desafíos grupales, juegos de mesa gigantes, retos de agilidad mental y risoterapia para reconectarte con tus compañeros.
                </p>
              </div>

              <div className="bg-gradient-to-b from-yellow-950/60 to-purple-950/40 border border-yellow-500/40 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-yellow-500/20 text-yellow-300 flex items-center justify-center font-bold text-2xl shadow-inner">
                  🎁
                </div>
                <h3 className="text-lg font-black text-white font-funky">
                  Sorteos y Premios
                </h3>
                <p className="text-xs text-purple-200/80">
                  Participa por premios sorpresa, kits universitarios y reconocimientos para quienes demuestren su desconexión activa.
                </p>
              </div>

              <div className="bg-gradient-to-b from-cyan-950/60 to-purple-950/40 border border-cyan-500/40 rounded-2xl p-5 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-2xl shadow-inner">
                  💬
                </div>
                <h3 className="text-lg font-black text-white font-funky">
                  Espacio Reflexivo & Salud
                </h3>
                <p className="text-xs text-purple-200/80">
                  Tips médicos prácticos para proteger tu visión, postura y mente sin desconectarte del mundo académico.
                </p>
              </div>
            </div>

            {/* Interactive Surprise Explorer */}
            <SurpriseWheel />

            <div className="text-center pt-2">
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,238,0,0.5)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Quiero Asistir (Ingreso Libre)</span>
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 3: COORDENADAS & CUENTA REGRESIVA */}
        {currentSlide === 3 && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto text-center">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                Punto de Encuentro Oficial
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-funky">
                ¿Dónde y Cuándo?
              </h2>
              <p className="text-sm sm:text-base text-purple-200/90 max-w-lg mx-auto">
                No faltes a esta cita con la vida real. Apunta las coordenadas:
              </p>
            </div>

            {/* Countdown Component */}
            <CountdownTimer />

            {/* 4 Detailed Event Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
              <div className="bg-[#15072e]/80 border-2 border-pink-500/40 rounded-2xl p-4 shadow-lg hover:border-pink-400 transition-all">
                <MapPin className="w-6 h-6 text-pink-400 mb-2" />
                <span className="text-[10px] text-gray-400 uppercase font-bold block">PUNTO DE ENCUENTRO:</span>
                <strong className="text-white text-base block font-funky">UNSM</strong>
                <span className="text-xs text-purple-200">Universidad Nacional de San Martín</span>
              </div>

              <div className="bg-[#15072e]/80 border-2 border-yellow-500/40 rounded-2xl p-4 shadow-lg hover:border-yellow-400 transition-all">
                <div className="w-6 h-6 rounded-lg bg-yellow-400/20 text-yellow-300 flex items-center justify-center font-bold text-xs mb-2">
                  🚪
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">AULA ASIGNADA:</span>
                <strong className="text-yellow-300 text-xl block font-funky">AULA : A6</strong>
                <span className="text-xs text-purple-200">Pabellón Principal</span>
              </div>

              <div className="bg-[#15072e]/80 border-2 border-cyan-500/40 rounded-2xl p-4 shadow-lg hover:border-cyan-400 transition-all">
                <Calendar className="w-6 h-6 text-cyan-400 mb-2" />
                <span className="text-[10px] text-gray-400 uppercase font-bold block">FECHA:</span>
                <strong className="text-white text-base block font-funky">30 de Noviembre</strong>
                <span className="text-xs text-cyan-300">Semestre 2026 - II</span>
              </div>

              <div className="bg-[#15072e]/80 border-2 border-purple-500/40 rounded-2xl p-4 shadow-lg hover:border-purple-400 transition-all">
                <Clock className="w-6 h-6 text-purple-400 mb-2" />
                <span className="text-[10px] text-gray-400 uppercase font-bold block">HORA:</span>
                <strong className="text-yellow-300 text-xl block font-funky">6:00 PM</strong>
                <span className="text-xs text-purple-200">¡Ingreso Puntual!</span>
              </div>
            </div>

            {/* Quick Actions (Google Calendar & Share) */}
            <div className="bg-purple-950/40 border border-purple-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-left">
                <strong className="text-white block text-sm">¿Quieres que tu calendario te avise?</strong>
                <span className="text-purple-300">Agrégalo a Google Calendar para no olvidarlo.</span>
              </div>

              <div className="flex gap-2">
                <a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=%C2%BFQui%C3%A9n+Controla+a+Qui%C3%A9n%3F+-+Festival+de+la+Desconexi%C3%B3n+UNSM&dates=20261130T230000Z/20261201T013000Z&details=%C2%A1No+es+una+charla+m%C3%A1s!+Ven+a+compartir+un+espacio+con+din%C3%A1micas%2C+juegos+y+sorpresas.+Organizado+por+Facultad+de+Medicina+Humana+y+Escuela+Profesional+de+Enfermer%C3%ADa.&location=Universidad+Nacional+de+San+Mart%C3%ADn%2C+Aula+A6"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Añadir a Google Calendar</span>
                </a>

                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black transition-all shadow-md"
                >
                  Confirmar Asistencia
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: CONFIRMACIÓN DE ASISTENCIA & PASE DIGITAL */}
        {currentSlide === 4 && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto text-center">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-green-400 uppercase tracking-widest px-3 py-1 rounded-full bg-green-950/60 border border-green-500/30">
                Paso Final
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-funky">
                Asegura Tu Cupo (Ingreso Libre)
              </h2>
              <p className="text-sm sm:text-base text-purple-200/90 max-w-lg mx-auto">
                El aforo del Aula A6 es limitado. Regístrate ahora para obtener tu Pase Digital de acceso al Festival de la Desconexión.
              </p>
            </div>

            {/* Direct Ticket Callout Box */}
            <div className="bg-gradient-to-br from-indigo-950/90 via-[#180630] to-purple-950/90 border-2 border-yellow-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(255,238,0,0.25)] text-left space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/30 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-xl border border-white/10 shadow-sm">
                      <img src="/logos/unsm_badge.png" alt="UNSM" className="w-5 h-5 object-contain" title="Universidad Nacional de San Martín" />
                      <img src="/logos/fmh_badge.png" alt="FMH" className="w-5 h-5 object-contain" title="Facultad de Medicina Humana" />
                      <img src="/logos/epf_badge.png" alt="EPF" className="w-5 h-5 object-contain" title="Escuela Profesional de Enfermería" />
                    </div>
                    <span className="text-xs uppercase font-extrabold text-yellow-300 tracking-wider">
                      UNSM • FMH • EPF
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-funky">
                    ¿Quién Controla a Quién?
                  </h3>
                  <p className="text-xs text-pink-300 font-semibold">
                    El Festival de la Desconexión • Medicina & Enfermería
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-md">
                  ¡INGRESO LIBRE!
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="text-gray-400 block text-[10px]">PUNTO DE ENCUENTRO:</span>
                  <strong className="text-white text-sm">UNSM - Aula A6</strong>
                </div>
                <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="text-gray-400 block text-[10px]">FECHA:</span>
                  <strong className="text-yellow-300 text-sm">30 de Noviembre</strong>
                </div>
                <div className="bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="text-gray-400 block text-[10px]">HORA:</span>
                  <strong className="text-cyan-300 text-sm">6:00 PM</strong>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-200 text-slate-950 font-black text-base uppercase tracking-wider shadow-[0_0_30px_rgba(255,238,0,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Ticket className="w-5 h-5 text-slate-950" />
                  <span>CLICK AQUÍ PARA CONFIRMAR ASISTENCIA</span>
                </button>
              </div>
            </div>

            {/* Share link pill */}
            <div className="flex items-center justify-center gap-3 text-xs text-purple-300">
              <span>Comparte con tus compañeros de clase:</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `¡Hola! Te invito al Festival de la Desconexión de la UNSM "¿Quién controla a quién?". Será este 30 de Noviembre a las 6 PM en el Aula A6. ¡Ingreso 100% libre con dinámicas y premios!`
                  );
                  alert("¡Enlace e invitación copiados para compartir en WhatsApp!");
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>Copiar Mensaje para WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM CONTROLLER & NAVIGATION BAR */}
      <footer className="relative z-30 w-full border-t border-purple-500/20 bg-[#0d031c]/85 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Previous Button */}
        <button
          disabled={currentSlide === 0}
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            currentSlide === 0
              ? "opacity-30 cursor-not-allowed text-gray-500"
              : "bg-purple-900/50 hover:bg-purple-800/60 text-purple-200 hover:text-white"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Center Indicators & AutoPlay Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isAutoPlay
                ? "bg-yellow-400 text-slate-950 border-yellow-300 shadow-[0_0_12px_rgba(255,238,0,0.5)]"
                : "bg-white/5 border-white/10 text-purple-300 hover:text-white"
            }`}
            title={isAutoPlay ? "Pausar Autoplay" : "Iniciar Autoplay"}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{isAutoPlay ? "Autoplay ON" : "Autoplay"}</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slidesInfo.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-6 bg-yellow-400 shadow-[0_0_8px_rgba(255,238,0,0.8)]"
                    : "w-2 bg-purple-500/40 hover:bg-purple-400/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            if (currentSlide < totalSlides - 1) {
              setCurrentSlide((prev) => prev + 1);
            } else {
              setIsRegisterOpen(true);
            }
          }}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-slate-950 shadow-[0_0_15px_rgba(255,238,0,0.4)] transition-all hover:scale-105 active:scale-95"
        >
          <span>{currentSlide === totalSlides - 1 ? "Confirmar" : "Siguiente"}</span>
          <ChevronRight className="w-4 h-4 text-slate-950" />
        </button>
      </footer>

      {/* MODALS */}
      {showIntro && (
        <NotificationIntro onOpenInvitation={() => setShowIntro(false)} />
      )}

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      <FlyerModal
        isOpen={isFlyerOpen}
        onClose={() => setIsFlyerOpen(false)}
      />
    </div>
  );
}
