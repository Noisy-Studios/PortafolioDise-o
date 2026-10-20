import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./Pages/Home/Home.jsx";
import Juegos from "./Pages/registro/Juegos.jsx";
import Nosotros from "./Pages/Portafolios Individuales/Nosotros.jsx";
import David from "./Pages/Portafolios Individuales/David/David.jsx";
import Rios from "./Pages/Portafolios Individuales/Rios/Rios.jsx";
import Estefa from "./Pages/Portafolios Individuales/Estefania/Estefa.jsx";
import Contactanos from "./Pages/Creditos/Contactanos.jsx";
import Galeria from "./Pages/galeria/galeria.jsx";

// Get base URL for GitHub Pages / Vite, ensuring NO trailing slash for React Router
const rawBase = import.meta.env.BASE_URL || "/";
const basename = rawBase.length > 1 ? rawBase.replace(/\/+$/, "") : undefined;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Juegos */}
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/Juegos" element={<Juegos />} />
            
            {/* Nosotros & Dueños Subroutes */}
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/nosotros/david" element={<David />} />
            <Route path="/Nosotros/david" element={<David />} />
            <Route path="/nosotros/estefania" element={<Estefa />} />
            <Route path="/Nosotros/estefania" element={<Estefa />} />
            <Route path="/nosotros/rios" element={<Rios />} />
            <Route path="/Nosotros/rios" element={<Rios />} />
            <Route path="/nosotros/*" element={<Nosotros />} />
            <Route path="/Nosotros/*" element={<Nosotros />} />

            {/* Contacto & Galeria */}
            <Route path="/contactanos" element={<Contactanos />} />
            <Route path="/Contactanos" element={<Contactanos />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/Galeria" element={<Galeria />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
