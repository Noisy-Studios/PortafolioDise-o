import React, { useState } from "react";
import { 
  MessageSquare, 
  ExternalLink, 
  Users, 
  Sparkles, 
  Radio, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { TwitterIcon, YoutubeIcon, DiscordIcon } from "../../components/SocialIcons";
import ContactSection from "../../components/ContactSection";
import { socialChannels } from "../../data/portfolioData";

export function Contactanos() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <div className="min-h-screen text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* =====================================================================
            1. CONTACT FORM & DIRECT CHANNELS (Wireframe 4 & 5)
        ===================================================================== */}
        <ContactSection showHeader={true} />

        {/* =====================================================================
            2. SECTION: SÍGUENOS (Wireframe 4 & 5 - 3 Community / Follow Cards)
        ===================================================================== */}
        <section className="space-y-8 pt-6 border-t border-white/10" id="siguenos">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
                COMUNIDAD INDIE
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading">
              Síguenos
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl">
              Acompáñanos día a día en el proceso de desarrollo, participa en playtests y debate con los creadores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialChannels.map((channel, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-[#0f1322] border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center text-center shadow-xl hover:-translate-y-2 relative"
              >
                {/* Large circular avatar matching wireframe */}
                <div className="w-28 h-28 rounded-full bg-[#182035] border-2 border-purple-500/30 group-hover:border-purple-400 flex items-center justify-center text-purple-300 group-hover:text-cyan-300 mb-6 transition-colors shadow-lg shadow-purple-950/40">
                  {idx === 0 && <DiscordIcon className="w-12 h-12 text-indigo-400" />}
                  {idx === 1 && <TwitterIcon className="w-12 h-12 text-sky-400" />}
                  {idx === 2 && <YoutubeIcon className="w-12 h-12 text-red-400" />}
                </div>

                <div className="mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-950/40 text-purple-300 border border-purple-500/30">
                    {channel.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                  {channel.name}
                </h3>
                <p className="text-xs font-mono text-gray-400 mb-4">
                  {channel.handle}
                </p>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  {channel.desc}
                </p>

                {/* Purple Button matching wireframe */}
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  {channel.actionText} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Security & Response Guarantee Banner */}
        <section className="p-6 rounded-2xl bg-[#0e1220] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm font-heading">Privacidad & Seguridad Garantizada</h4>
              <p className="text-xs text-gray-400">Tus datos nunca son compartidos con terceros ni utilizados para spam.</p>
            </div>
          </div>
          <span className="text-xs font-mono text-purple-300">
            ENCRIPTACIÓN TLS 1.3
          </span>
        </section>

      </div>
    </div>
  );
}

export default Contactanos;
