import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Gamepad2,
  MonitorCog,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import { gamesCatalog, teamMembers } from "../../../data/portfolioData";
import HabboRoom, { AvatarPortrait } from "./habbo-room/HabboRoom";

/* ------------------------------------------------------------------ */
/*  Datos                                                              */
/* ------------------------------------------------------------------ */

const gameOrder = ["tessera", "mil-gatitos", "galactic-decree"];
const featuredGames = [...gamesCatalog].sort(
  (first, second) => gameOrder.indexOf(first.id) - gameOrder.indexOf(second.id),
);

const roomStops = [
  {
    id: "gameplay",
    label: "Gameplay",
    Icon: Gamepad2,
    bubble: "¡A jugar! Así pienso el gameplay.",
    text: "Diseño programación de gameplay en Unity y C#: controles precisos, físicas y sistemas de movimiento que hacen que cada acción se sienta natural.",
  },
  {
    id: "systems",
    label: "Sistemas",
    Icon: Code2,
    bubble: "Aquí armo la arquitectura.",
    text: "Estructuro sistemas claros y escalables, desde arquitectura ECS hasta comportamientos de IA, para que las mecánicas puedan crecer con el proyecto.",
  },
  {
    id: "webgl",
    label: "WebGL",
    Icon: MonitorCog,
    bubble: "Esto corre directo en el navegador.",
    text: "Preparo experiencias para navegador y optimizo compilaciones WebGL, cuidando el rendimiento y la respuesta de los controles.",
  },
  {
    id: "contact",
    label: "Contacto",
    Icon: ArrowDownRight,
    bubble: "¿Hablamos de tu proyecto?",
    text: "¿Buscas desarrollar un juego o llevar una idea interactiva a la siguiente etapa? Me interesa conversar sobre nuevos proyectos y colaboraciones.",
  },
];

const welcomeMessage =
  "¡Hola, soy David! Camina por la habitación, siéntate donde quieras y usa la arcade, el escritorio, la tele o el buzón para conocer cómo trabajo.";

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */

export function David() {
  const member = teamMembers.find((person) => person.id === "david") ?? teamMembers[0];
  const firstName = member.name.split(" ")[0];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStop, setActiveStop] = useState(null);
  const touchStartX = useRef(null);
  const total = featuredGames.length;
  const selectedGame = featuredGames[activeIndex];
  const activeMessage = roomStops.find((stop) => stop.id === activeStop);

  const goTo = (index) => setActiveIndex(((index % total) + total) % total);

  const getOffset = (index) => {
    const half = Math.floor(total / 2);
    let offset = index - activeIndex;
    if (offset > half) offset -= total;
    if (offset < -half) offset += total;
    return offset;
  };

  return (
    <div className="overflow-hidden pb-16 pt-28 text-slate-100 md:pt-32">
      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8 md:space-y-20">
        <Link
          to="/Nosotros"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-mono text-cyan-300 transition-colors hover:text-cyan-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al equipo
        </Link>

        <section className="space-y-8" aria-labelledby="david-intro">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.55fr)] md:items-center">
            <div className="max-w-2xl space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-400/5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-purple-200">
                <Sparkles className="h-3.5 w-3.5" />
                Sobre mí
              </p>
              <h1 id="david-intro" className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Hola, soy {firstName}.
                <span className="mt-2 block text-purple-300">
                  Desarrollador de videojuegos y arquitecto de sistemas
                </span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">{member.bio}</p>
            </div>
            <div className="relative mx-auto w-full max-w-[240px]">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-purple-500/25 via-cyan-400/10 to-transparent blur-xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-purple-300/30 bg-[#111626] p-1.5 shadow-2xl shadow-purple-950/30">
                <img
                  src={member.avatar}
                  alt={`Retrato de ${member.name}`}
                  className="h-full w-full rounded-[1.35rem] object-cover object-[center_35%]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {member.skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Proyectos desarrollados
                </p>
                <h2 className="text-2xl font-bold text-white font-heading sm:text-3xl">
                  Un vistazo a lo que hemos creado
                </h2>
              </div>
              <div className="hidden shrink-0 gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-200"
                  aria-label="Proyecto anterior"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-200"
                  aria-label="Proyecto siguiente"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Carrusel tipo coverflow: el del centro grande, los laterales pequeños */}
            <div
              className="relative overflow-hidden py-4"
              role="region"
              aria-roledescription="carrusel"
              aria-label="Carrusel de juegos desarrollados"
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") goTo(activeIndex - 1);
                if (event.key === "ArrowRight") goTo(activeIndex + 1);
              }}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return;
                const delta = event.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(delta) > 40) goTo(activeIndex + (delta < 0 ? 1 : -1));
                touchStartX.current = null;
              }}
            >
              <div className="mx-auto aspect-[1.7/1] w-[72%] sm:w-[56%] lg:w-[52%]" aria-hidden="true" />
              {featuredGames.map((game, index) => {
                const offset = getOffset(index);
                const isCenter = offset === 0;
                const isVisible = Math.abs(offset) <= 1;
                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={isCenter}
                    aria-hidden={!isVisible}
                    tabIndex={isVisible ? 0 : -1}
                    className={`group absolute left-1/2 top-4 aspect-[1.7/1] w-[72%] overflow-hidden rounded-2xl border text-left transition-all duration-500 ease-out motion-reduce:transition-none sm:w-[56%] lg:w-[52%] ${
                      isCenter
                        ? "border-purple-300/70 shadow-[0_18px_50px_-20px_rgba(168,85,247,0.85)]"
                        : "border-white/10 hover:border-white/30"
                    } ${isVisible ? "" : "pointer-events-none"}`}
                    style={{
                      transform: `translateX(calc(-50% + ${offset * 62}%)) scale(${isCenter ? 1 : 0.68})`,
                      zIndex: isCenter ? 30 : isVisible ? 20 : 10,
                      opacity: isCenter ? 1 : isVisible ? 0.55 : 0,
                      filter: isCenter ? "none" : "brightness(0.7) saturate(0.8)",
                    }}
                  >
                    <img
                      src={game.image}
                      alt={`Portada de ${game.title}`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                    <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <span>
                        <span className="block text-lg font-bold text-white font-heading sm:text-xl">
                          {game.title}
                        </span>
                        <span className="mt-1 block text-xs text-gray-300">{game.tags.slice(0, 2).join(" · ")}</span>
                      </span>
                      {isCenter && <ArrowUpRight className="mb-1 h-4 w-4 shrink-0 text-white/80" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center gap-2">
              {featuredGames.map((game, index) => (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Ver ${game.title}`}
                  className="flex h-6 items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      index === activeIndex ? "w-6 bg-purple-300" : "w-1.5 bg-white/25"
                    }`}
                  />
                </button>
              ))}
            </div>

            {selectedGame && (
              <div className="flex flex-col gap-3 border-l-2 border-purple-400/60 pl-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-relaxed text-gray-400" aria-live="polite">
                  <span className="font-semibold text-gray-200">{selectedGame.title}:</span>{" "}
                  {selectedGame.description}
                </p>
                <Link
                  to="/juegos"
                  className="inline-flex min-h-10 shrink-0 items-center gap-2 text-sm font-semibold text-purple-200 transition-colors hover:text-white"
                >
                  Ver juegos <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="room-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
                Una mini experiencia interactiva
              </p>
              <h2 id="room-title" className="text-2xl font-extrabold text-white sm:text-3xl">
                Entra a mi espacio de trabajo
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">
                Camina por la habitación, siéntate en el sofá, la silla o el puff, y usa la arcade, el escritorio, la tele o
                el buzón para descubrir cómo puedo aportar a tu próximo proyecto.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-mono text-gray-400">
              <MousePointer2 className="h-4 w-4 text-cyan-300" />
              Clic para caminar · flechas / WASD · E para usar
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_40%,#1f1838,#0b0a14_70%)] shadow-2xl shadow-black/30">
            <div className="relative px-2 py-4 sm:px-4">
              <HabboRoom name={firstName} stops={roomStops} onStop={setActiveStop} />
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-300">
                Estudio de {firstName} · Unity / C#
              </span>
            </div>

            <div className="flex gap-4 border-t border-white/10 bg-[#0b1019] p-4 sm:p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-purple-300/20 bg-purple-300/5">
                <AvatarPortrait className="h-11 w-[52px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-purple-200">
                  {firstName} · {activeMessage?.label ?? "Bienvenida"}
                </p>
                <p className="text-sm leading-relaxed text-gray-200" aria-live="polite">
                  {activeMessage?.text ?? welcomeMessage}
                </p>
                {activeStop === "contact" && (
                  <Link
                    to="/contactanos"
                    className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-cyan-200 transition-colors hover:text-white"
                  >
                    Hablemos de un proyecto <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default David;
