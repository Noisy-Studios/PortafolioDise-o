import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Contactanos from "./Pages/Creditos/Contactanos.jsx";
import Galeria from "./Pages/galeria/galeria.jsx";
import Home from "./Pages/Home/Home.jsx";
import Juegos from "./Pages/registro/Juegos.jsx";
import Menu from "./components/ui/menu/Menu.jsx";
import Nosotros from "./Pages/Portafolios Individuales/Nosotros.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/PortafolioDise-o">
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
