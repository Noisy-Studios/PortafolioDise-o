import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Contactanos from "./Pages/Creditos/Contactanos.jsx";
import Galeria from "./pages/galeria/Galeria.jsx";
import Home from "./pages/home/Home.jsx";
import Juegos from "./pages/registro/Juegos.jsx";
import Menu from "./components/ui/menu/Menu.jsx";
import Nosotros from "./Pages/Portafolios Individuales/Nosotros.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/juegos" element={<Juegos />} />
      <Route path="/Nosotros/*" element={<Nosotros />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>,
);
