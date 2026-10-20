import React from "react";
import { Link } from "react-router";
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Gamepad2, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  GitBranch, 
  CheckCircle2 
} from "lucide-react";
import { teamMembers } from "../../../data/portfolioData";

export function David() {
  const data = teamMembers.find((m) => m.id === "david") || teamMembers[0];

  const projects = [
    {
      title: "Motor de Físicas y Movimiento Cinético",
      role: "Lead Programmer",
      tech: "C# / Unity ECS",
      desc: "Implementación de un sistema de control de personaje a 120Hz con coyote-time, buffer de saltos y detección continua de colisiones."
    },
    {
      title: "Arquitectura de IA Procedimental de Enemigos",
      role: "Systems Architect",
      tech: "Unity / C# / NavMesh",
      desc: "Diseño de un árbol de comportamiento (Behavior Tree) dinámico con alerta grupal y coordinación de emboscadas."
    },
    {
      title: "Pipeline de Guardado & Steam Cloud",
      role: "Tools Engineer",
      tech: "Steamworks SDK / JSON Encriptado",
      desc: "Mecanismo de serialización asíncrono para partidas guardadas con resolución automática de conflictos en la nube."
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link */}
        <Link
          to="/Nosotros"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al equipo de Noisy Studios
        </Link>

        {/* Profile Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0f1322] border border-purple-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
            <div className="w-36 h-36 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-purple-600 to-cyan-400 shrink-0 shadow-xl">
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>

            <div className="space-y-4 text-center sm:text-left flex-1">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
                  <Terminal className="w-3.5 h-3.5" /> GAMEPLAY & ARCHITECTURE
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
                  {data.name}
                </h1>
                <p className="text-base sm:text-lg text-purple-400 font-mono font-medium mt-1">
                  {data.role}
                </p>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {data.bio}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-[#182035] text-gray-200 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Projects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2">
            <Code2 className="w-6 h-6 text-purple-400" /> Proyectos & Contribuciones Técnicas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0f1322] border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-lg"
              >
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  {proj.tech}
                </span>
                <h3 className="text-lg font-bold text-white font-heading">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {proj.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Snippet Showcase */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" /> Muestra de Código (C# Kinematic Controller)
          </h2>
          <div className="p-5 rounded-2xl bg-[#0a0d16] border border-white/10 font-mono text-xs text-purple-200 overflow-x-auto shadow-inner leading-relaxed">
            <pre>{`// Smooth Adaptive Coyote Time & Jump Buffer
public class PlayerKinematics : MonoBehaviour {
    [SerializeField] private float coyoteDuration = 0.15f;
    [SerializeField] private float jumpBufferDuration = 0.12f;
    private float coyoteCounter;
    private float jumpBufferCounter;

    void Update() {
        if (controller.isGrounded) coyoteCounter = coyoteDuration;
        else coyoteCounter -= Time.deltaTime;

        if (Input.GetButtonDown("Jump")) jumpBufferCounter = jumpBufferDuration;
        else jumpBufferCounter -= Time.deltaTime;

        if (coyoteCounter > 0f && jumpBufferCounter > 0f) {
            ExecuteJumpVelocity();
            jumpBufferCounter = 0f;
        }
    }
}`}</pre>
          </div>
        </section>

      </div>
    </div>
  );
}

export default David;
