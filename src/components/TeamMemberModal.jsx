import React, { useEffect } from "react";
import { X, Code2, Sparkles, ExternalLink, Award, Terminal, Cpu } from "lucide-react";
import { Link } from "react-router";

export function TeamMemberModal({ member, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0f1320] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/60 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header background with banner */}
        <div className="h-32 bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-cyan-900/50 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all border border-white/10"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar & Basic Info */}
        <div className="px-6 md:px-8 pb-8 relative pt-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 mb-6">
            <div className="relative">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#0f1320] shadow-xl ring-2 ring-purple-500/50"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0f1320]" title="Disponible para desarrollo" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white font-heading">
                {member.name}
              </h2>
              <p className="text-sm text-cyan-400 font-mono">
                {member.role}
              </p>
            </div>
          </div>

          {/* Quote */}
          {member.quote && (
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 mb-6 italic text-sm text-purple-200">
              {member.quote}
            </div>
          )}

          {/* Bio */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" /> Biografía & Trayectoria
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-3 mb-6">
            <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" /> Habilidades Clave & Herramientas
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.skills && member.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-purple-500/20 text-gray-200 hover:border-purple-500/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <Link
              to={member.socials?.portfolio || "/Nosotros"}
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-center text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              Ver Portafolio Individual <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium text-sm transition-all cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberModal;
