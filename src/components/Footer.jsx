import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, ArrowUp, Heart, Sparkles, MessageSquare } from "lucide-react";
import { TwitterIcon, YoutubeIcon, GithubIcon, DiscordIcon } from "./SocialIcons";
import { studioInfo } from "../data/portfolioData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#06080d] border-t border-white/5 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative gradient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-purple-900/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Studio Brand and Description */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-[#0d101d] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <span className="font-heading font-black tracking-wider text-xl text-white">
                NoisyStudios
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Estudio indie comprometido con crear juegos que impactan, con mecánicas envolventes y dirección de arte que trasciende los años.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-gray-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Sistemas en línea • Desarrollando en Unity & Unreal</span>
            </div>
          </div>

          {/* Column 2: Navegación */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              NAVEGACIÓN
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/juegos" className="text-gray-400 hover:text-white transition-colors">
                  Juegos & Proyectos
                </Link>
              </li>
              <li>
                <Link to="/Nosotros" className="text-gray-400 hover:text-white transition-colors">
                  Nosotros & Equipo
                </Link>
              </li>
              <li>
                <Link to="/contactanos" className="text-gray-400 hover:text-white transition-colors">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Redes Sociales */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              REDES SOCIALES
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a
                href={studioInfo.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-all border border-white/5"
              >
                <DiscordIcon className="w-4 h-4 text-indigo-400" /> Discord
              </a>
              <a
                href={studioInfo.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-all border border-white/5"
              >
                <TwitterIcon className="w-4 h-4 text-sky-400" /> Twitter / X
              </a>
              <a
                href={studioInfo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-all border border-white/5"
              >
                <YoutubeIcon className="w-4 h-4 text-red-400" /> YouTube
              </a>
              <a
                href={studioInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-all border border-white/5"
              >
                <GithubIcon className="w-4 h-4 text-purple-400" /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal + Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2024 NoisyStudios. Todos los derechos reservados.</span>
            <span>•</span>
            <a href="#terminos" className="hover:text-gray-300 transition-colors">Aviso Legal</a>
            <span>•</span>
            <a href="#privacidad" className="hover:text-gray-300 transition-colors">Privacidad</a>
            <span>•</span>
            <a href="#cookies" className="hover:text-gray-300 transition-colors">Cookies</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Volver arriba"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
