import React from "react";

export function InstitutionalLogos({ variant = "header" }) {
  const logos = [
    {
      id: "unsm",
      acronym: "UNSM",
      title: "UNIVERSIDAD NACIONAL DE SAN MARTÍN",
      subtitle: "Universidad Licenciada",
      badgeImg: "/logos/unsm_badge.png",
      glowColor: "rgba(52, 211, 153, 0.4)", // emerald
      borderAccent: "border-emerald-500/40",
      tagColor: "text-emerald-300",
    },
    {
      id: "fmh",
      acronym: "FMH",
      title: "Facultad de Medicina Humana",
      subtitle: "FMH - UNSM",
      badgeImg: "/logos/fmh_badge.png",
      glowColor: "rgba(168, 85, 247, 0.4)", // purple
      borderAccent: "border-purple-500/40",
      tagColor: "text-purple-300",
    },
    {
      id: "epf",
      acronym: "EPF",
      title: "ESCUELA PROFESIONAL DE ENFERMERÍA",
      subtitle: "EPF / EPE - UNSM",
      badgeImg: "/logos/epf_badge.png",
      glowColor: "rgba(250, 204, 21, 0.4)", // yellow/gold
      borderAccent: "border-yellow-500/40",
      tagColor: "text-yellow-300",
    },
  ];

  if (variant === "header") {
    return (
      <div className="flex items-center gap-1.5 sm:gap-3">
        {logos.map((logo, index) => (
          <React.Fragment key={logo.id}>
            <div
              className={`flex items-center gap-2 px-2 sm:px-2.5 py-1 rounded-xl bg-purple-950/40 border ${logo.borderAccent} hover:border-white/50 backdrop-blur-md transition-all group`}
              title={logo.title}
            >
              {/* Logo Emblem Icon */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden bg-black/60 p-0.5 flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                <img
                  src={logo.badgeImg}
                  alt={logo.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text for desktop & medium screens */}
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-[10px] font-black tracking-wider text-white uppercase group-hover:text-yellow-300 transition-colors">
                  {logo.id === "unsm" ? "UNSM" : logo.id === "fmh" ? "Medicina Humana" : "Enfermería"}
                </span>
                <span className={`text-[8.5px] font-semibold ${logo.tagColor} truncate max-w-[120px]`}>
                  {logo.acronym}
                </span>
              </div>
            </div>

            {index < logos.length - 1 && (
              <span className="hidden sm:inline text-purple-500/40 text-xs font-bold">
                •
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Variant "banner" (for display at the top of the main presentation slide)
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-purple-950/80 via-[#180530]/90 to-purple-950/80 border border-purple-500/30 rounded-2xl p-2.5 sm:p-3.5 backdrop-blur-md shadow-[0_0_25px_rgba(157,78,221,0.2)]">
      <div className="flex flex-wrap items-center justify-around gap-2 sm:gap-4">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="flex items-center gap-2.5 group hover:scale-[1.02] transition-transform"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-black/70 p-1 border border-white/20 shadow-md">
              <img
                src={logo.badgeImg}
                alt={logo.title}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
              />
            </div>

            <div className="text-left">
              <span className="text-[9px] sm:text-[10px] font-extrabold text-white block uppercase tracking-wider leading-none">
                {logo.title}
              </span>
              <span className={`text-[8px] sm:text-[9px] font-bold ${logo.tagColor}`}>
                {logo.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

