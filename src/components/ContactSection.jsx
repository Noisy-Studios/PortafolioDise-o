import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";
import { studioInfo } from "../data/portfolioData";

export function ContactSection({ showHeader = true }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCopy = (email) => {
    navigator.clipboard?.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Por favor completa todos los campos del formulario.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatus("error");
      setErrorMessage("Por favor ingresa un correo electrónico válido.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    // Simulate sending with realistic feedback & confetti!
    setTimeout(() => {
      setStatus("success");
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#7c3aed", "#00f5d4", "#ec4899", "#3b82f6"]
        });
      } catch {
        // fallback
      }
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  const contactCards = [
    {
      title: "CORREO GENERAL",
      email: studioInfo.email,
      desc: "Consultas generales, feedback de juegos y alianzas indie."
    },
    {
      title: "PRENSA & PARTNERS",
      email: studioInfo.pressEmail,
      desc: "Códigos de review, press kit oficial e invitaciones a eventos."
    },
    {
      title: "SOPORTE TÉCNICO",
      email: studioInfo.supportEmail,
      desc: "Reporte de bugs, problemas de rendimiento y compatibilidad."
    }
  ];

  return (
    <section className="py-16 md:py-24 relative" id="contacto">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/15 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {showHeader && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                CONTACTO
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
              Contáctanos
            </h2>
            <p className="mt-3 text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
              ¿Prensa, colaboración, o simplemente quieres decirnos algo? Escríbenos y respondemos en menos de 24 horas.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#101424]/90 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl shadow-purple-950/20">
            {status === "success" ? (
              <div className="py-12 px-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">
                  ¡Mensaje Recibido!
                </h3>
                <p className="text-gray-300 max-w-md mx-auto text-sm leading-relaxed">
                  Gracias por ponerte en contacto con PixelRift Studios. Uno de nuestros desarrolladores responderá en menos de 24 horas.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Alex Turner"
                    className="w-full px-4 py-3 rounded-xl bg-[#161c30] border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#161c30] border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Tu mensaje...
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre tu idea, propuesta o consulta..."
                    className="w-full px-4 py-3 rounded-xl bg-[#161c30] border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.99] transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 border border-purple-400/30 cursor-pointer disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Enviando mensaje...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Cards matching wireframe */}
          <div className="lg:col-span-5 space-y-4">
            {contactCards.map((card, idx) => (
              <div
                key={idx}
                className="group p-5 md:p-6 rounded-2xl bg-[#101424]/90 border border-white/10 hover:border-cyan-500/40 transition-all backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </span>
                  <button
                    onClick={() => handleCopy(card.email)}
                    className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Copiar correo"
                  >
                    {copiedEmail === card.email ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${card.email}`}
                  className="text-base sm:text-lg font-mono font-bold text-cyan-400 hover:text-cyan-300 hover:underline block break-all"
                >
                  {card.email}
                </a>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}

            {/* Quick response badge */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center gap-3 text-xs text-purple-200">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shrink-0" />
              <span>Tiempo promedio de respuesta actual: <strong>2 a 4 horas</strong> en días laborales.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;
