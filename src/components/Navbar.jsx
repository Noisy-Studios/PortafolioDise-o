import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Menu as MenuIcon, X, Sparkles, Play } from "lucide-react";

export function Navbar({ onOpenPlayModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Juegos", path: "/juegos" },
    { name: "Nosotros", path: "/Nosotros" },
    { name: "Contáctanos", path: "/contactanos" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "";
    return location.pathname.toLowerCase().startsWith(path.toLowerCase());
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#090b12]/90 backdrop-blur-md border-b border-purple-500/20 py-3 shadow-xl shadow-black/50"
          : "bg-[#090b12]/60 backdrop-blur-sm border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Studio Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0d101d] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-300 transition-colors group-hover:text-purple-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black tracking-wider text-xl text-white flex items-center gap-1.5">
                NoisyStudios
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 -mt-1 font-semibold">
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

          {/* Right CTA Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPlayModal}
              className="relative group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 border border-purple-400/30 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-white" /> Jugar Ahora
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#14192a] border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/40 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d16]/98 border-b border-purple-500/20 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-colors ${
                    active
                      ? "text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 font-semibold"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenPlayModal) onOpenPlayModal();
              }}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" /> Jugar Ahora
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
