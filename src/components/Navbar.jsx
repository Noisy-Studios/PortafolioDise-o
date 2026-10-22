import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Play } from "lucide-react";

export function Navbar({ onOpenPlayModal }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Juegos", path: "/juegos" },
    { name: "Nosotros", path: "/Nosotros" },
    { name: "Contacto", path: "/contactanos" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "";
    return location.pathname.toLowerCase().startsWith(path.toLowerCase());
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#090b12]/95 backdrop-blur-md border-b border-purple-500/20 py-2 md:py-3 shadow-xl shadow-black/50"
          : "bg-[#090b12]/90 backdrop-blur-sm border-b border-white/5 py-2 md:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Studio Brand */}
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 md:gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0d101d] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-300 transition-colors group-hover:text-purple-400" />
              </div>
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="font-heading font-black tracking-wide md:tracking-wider text-base md:text-xl text-white flex items-center gap-1.5 whitespace-nowrap">
                NoisyStudios
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </span>
              <span className="hidden md:block text-[10px] uppercase font-mono tracking-widest text-purple-400 -mt-1 font-semibold">
                INDIE GAME STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121626]/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-cyan-300 font-semibold bg-cyan-950/60 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Play action */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={onOpenPlayModal}
              aria-label="Jugar ahora"
              className="relative group inline-flex min-h-10 items-center gap-1.5 px-3 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 border border-purple-400/30 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-white" />
                <span className="md:hidden">Jugar</span>
                <span className="hidden md:inline">Jugar Ahora</span>
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </div>
        </div>

        <nav aria-label="Navegación principal" className="grid grid-cols-4 gap-1 pt-2 md:hidden">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 min-w-0 items-center justify-center rounded-lg px-1 text-[11px] font-semibold leading-tight transition-colors ${
                  active
                    ? "text-cyan-300 bg-cyan-950/60 border border-cyan-500/40"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
