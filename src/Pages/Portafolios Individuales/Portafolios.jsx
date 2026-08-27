import { Routes, Route } from "react-router";
import "./Portafolios.css";
import Rios from "./Rios/Rios";
import MenuPortafolios from "../../components/ui/menu/PortafolioMenus";

function Portafolios() {
  return (
    <div>
      <MenuPortafolios />
      <Routes>
        <Route path="rios" element={<Rios />} />
        {/* Agrega aquí las demás pestañas/rutas */}
        {/* <Route path="otra-pestana" element={<OtraPestana />} /> */}
      </Routes>
    </div>
  );
}

export default Portafolios;