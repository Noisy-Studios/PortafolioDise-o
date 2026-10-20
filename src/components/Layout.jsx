import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PlayMiniGameModal from "./PlayMiniGameModal";
import { gameJamPrototypes } from "../data/portfolioData";

export function Layout({ children }) {
  const [playModalOpen, setPlayModalOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080a0f] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Global Top Navbar */}
      <Navbar onOpenPlayModal={() => setPlayModalOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Global Footer matching wireframes 4 & 5 */}
      <Footer />

      {/* Quick Play Mini-Game Modal triggered by 'Jugar Ahora' */}
      <PlayMiniGameModal
        isOpen={playModalOpen}
        onClose={() => setPlayModalOpen(false)}
        prototype={gameJamPrototypes[0]}
      />
    </div>
  );
}

export default Layout;
