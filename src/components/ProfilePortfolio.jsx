import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Code2, ExternalLink, UserRound } from "lucide-react";

const socialLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  behance: "Behance",
  artstation: "ArtStation",
  twitter: "X / Twitter",
};

export function ProfilePortfolio({
  member,
  specialty,
  biographyTitle,
  biography,
  projects,
  accent = "purple",
}) {
  const accentStyles = {
    purple: {
      border: "border-purple-500/30",
      text: "text-purple-300",
      glow: "bg-purple-600/15",
      label: "text-purple-300",
      button: "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
      hover: "hover:border-purple-500/50",
      tag: "border-purple-500/30 text-purple-200",
      bullet: "bg-purple-400",
    },
    cyan: {
      border: "border-cyan-500/30",
      text: "text-cyan-300",
      glow: "bg-cyan-600/15",
      label: "text-cyan-300",
      button: "from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500",
      hover: "hover:border-cyan-500/50",
      tag: "border-cyan-500/30 text-cyan-200",
      bullet: "bg-cyan-400",
    },
    pink: {
      border: "border-pink-500/30",
      text: "text-pink-300",
      glow: "bg-pink-600/15",
      label: "text-pink-300",
      button: "from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500",
      hover: "hover:border-pink-500/50",
      tag: "border-pink-500/30 text-pink-200",
      bullet: "bg-pink-400",
    },
  };
  const colors = accentStyles[accent] ?? accentStyles.purple;
  const externalLinks = Object.entries(member.socials ?? {}).filter(
    ([name, url]) => name !== "portfolio" && url,
  );
  const [featuredProject, ...otherProjects] = projects;

  return (
    <div className="min-h-screen overflow-hidden bg-[#080a0f] pb-16 pt-36 text-slate-100 md:pt-28">
      <div className="mx-auto max-w-6xl space-y-14 px-4 sm:px-6 lg:px-8 md:space-y-20">
        <Link
          to="/Nosotros"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-mono text-cyan-400 transition-colors hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al equipo
        </Link>

        <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12" aria-labelledby="profile-name">
          <div className="space-y-5">
            <div className={`inline-flex items-center gap-2 rounded-full border ${colors.border} bg-white/[0.03] px-3 py-1.5 text-xs font-mono uppercase tracking-wider ${colors.label}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${colors.bullet}`} />
              {specialty}
            </div>
            <div className="space-y-2">
              <h1 id="profile-name" className="text-4xl font-extrabold leading-tight text-white font-heading sm:text-5xl">
                {member.name}
              </h1>
              <p className={`text-sm font-mono leading-relaxed sm:text-base ${colors.text}`}>
                {member.role}
              </p>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
              {member.bio}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/contactanos"
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all ${colors.button}`}
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Hablemos de un proyecto
              </Link>
              <a
                href="#proyectos"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-gray-200 transition-colors hover:border-white/30 hover:bg-white/5"
              >
                <Code2 className="h-4 w-4" />
                Ver proyectos
              </a>
            </div>
            {externalLinks.length > 0 && (
              <nav aria-label={`Redes profesionales de ${member.name}`} className="flex flex-wrap gap-2 pt-1">
                {externalLinks.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-medium text-gray-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {socialLabels[name] ?? name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </nav>
            )}
          </div>

          <div className={`relative mx-auto flex aspect-[4/3] w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border ${colors.border} bg-[#111626] shadow-2xl`}>
            <div className={`absolute -right-16 -top-20 h-64 w-64 rounded-full blur-[100px] ${colors.glow}`} />
            {member.avatar ? (
              <img src={member.avatar} alt={`Retrato de ${member.name}`} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="relative z-10 flex flex-col items-center gap-3 text-gray-500">
                <div className={`flex h-24 w-24 items-center justify-center rounded-full border ${colors.border} bg-[#0b0e18]`}>
                  <UserRound className={`h-12 w-12 ${colors.text}`} aria-hidden="true" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest">Noisy Studios</span>
              </div>
            )}
            <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-300">
              {member.ownerBadge}
            </span>
          </div>
        </section>

        <section className="grid gap-5 border-y border-white/10 py-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 md:py-10">
          <div>
            <p className={`mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] ${colors.label}`}>
              SOBRE MÍ
            </p>
            <h2 className="max-w-md text-2xl font-bold leading-tight text-white font-heading sm:text-3xl">
              {biographyTitle}
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-gray-300 sm:text-base">
            {biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="flex flex-wrap gap-2 pt-1">
              {member.skills.map((skill) => (
                <span key={skill} className={`rounded-md border bg-white/[0.03] px-2.5 py-1 text-xs font-mono ${colors.tag}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" className="scroll-mt-36 space-y-6" aria-labelledby="projects-title">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className={`mb-2 text-xs font-mono font-bold uppercase tracking-[0.2em] ${colors.label}`}>
                TRABAJO SELECCIONADO
              </p>
              <h2 id="projects-title" className="text-2xl font-extrabold text-white font-heading sm:text-3xl">
                Proyectos personales y portafolio
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-500">{projects.length} proyectos destacados</span>
          </div>

          {featuredProject && (
            <article className={`grid overflow-hidden rounded-2xl border border-white/10 bg-[#0f1322] md:grid-cols-2 ${colors.hover}`}>
              <div className="relative flex min-h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-[#182039] via-[#111626] to-[#090b12] p-6 sm:min-h-72">
                <div className={`absolute -left-12 -top-16 h-48 w-48 rounded-full blur-[90px] ${colors.glow}`} />
                {featuredProject.image ? (
                  <img src={featuredProject.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                ) : featuredProject.preview ? (
                  <pre className="relative z-10 max-h-full w-full max-w-sm overflow-x-auto rounded-xl border border-white/10 bg-[#080a0f]/90 p-4 text-[10px] leading-relaxed text-gray-300 shadow-2xl sm:text-xs">
                    <code>{featuredProject.preview}</code>
                  </pre>
                ) : (
                  <div className="relative z-10 w-full max-w-sm rounded-xl border border-white/10 bg-[#080a0f]/90 p-4 shadow-2xl">
                    <div className="mb-3 flex items-center gap-1.5 border-b border-white/10 pb-3">
                      <span className="h-2 w-2 rounded-full bg-rose-400" />
                      <span className="h-2 w-2 rounded-full bg-amber-300" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="ml-2 truncate text-[10px] font-mono text-gray-500">{featuredProject.category}</span>
                    </div>
                    <div className="space-y-2">
                      <span className={`block text-xs font-mono ${colors.text}`}>{featuredProject.title}</span>
                      <span className="block h-2 w-4/5 rounded bg-white/10" />
                      <span className="block h-2 w-3/5 rounded bg-white/10" />
                      <span className={`block h-2 w-2/5 rounded opacity-70 ${colors.bullet}`} />
                    </div>
                  </div>
                )}
                <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-200">
                  {featuredProject.category}
                </span>
              </div>
              <div className="flex flex-col justify-center gap-4 p-5 sm:p-8">
                <span className={`text-xs font-mono uppercase tracking-wider ${colors.label}`}>PROYECTO DESTACADO</span>
                <h3 className="text-xl font-bold text-white font-heading sm:text-2xl">{featuredProject.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{featuredProject.description}</p>
                {featuredProject.tech && (
                  <p className="text-xs font-mono text-gray-400">{featuredProject.tech}</p>
                )}
                {featuredProject.link && (
                  <a href={featuredProject.link} target="_blank" rel="noreferrer" className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-lg bg-gradient-to-r px-4 text-sm font-semibold text-white ${colors.button}`}>
                    Explorar proyecto <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          )}

          {otherProjects.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {otherProjects.map((project) => (
                <article key={project.title} className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0f1322] transition-colors ${colors.hover}`}>
                  <div className="relative flex h-36 items-end overflow-hidden bg-gradient-to-br from-[#182039] to-[#090b12] p-4">
                    {project.image && <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75" />}
                    <div className={`absolute -right-8 -top-12 h-36 w-36 rounded-full blur-[70px] ${colors.glow}`} />
                    <span className="relative z-10 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10px] font-mono uppercase text-gray-200">
                      {project.category}
                    </span>
                  </div>
                  <div className="space-y-2 p-5">
                    <h3 className="text-lg font-bold text-white font-heading">{project.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{project.description}</p>
                    {project.tech && <p className={`pt-1 text-xs font-mono ${colors.text}`}>{project.tech}</p>}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className={`inline-flex min-h-10 items-center gap-1.5 pt-1 text-sm font-semibold ${colors.text}`}>
                        Ver proyecto <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="grid gap-5 rounded-2xl border border-white/10 bg-[#0f1322] p-5 sm:p-8 md:grid-cols-2 md:items-center md:gap-10">
          <div className="space-y-3">
            <p className={`text-xs font-mono font-bold uppercase tracking-[0.2em] ${colors.label}`}>¿TRABAJAMOS JUNTOS?</p>
            <h2 className="text-2xl font-bold text-white font-heading sm:text-3xl">
              ¿Creamos algo que merezca ser explorado?
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Estoy abierto a colaborar en proyectos de videojuegos, experiencias interactivas y nuevas ideas.
            </p>
            <Link
              to="/contactanos"
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all ${colors.button}`}
            >
              Contactar <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3 border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">Áreas de trabajo</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {member.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${colors.bullet}`} />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePortfolio;
