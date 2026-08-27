import { Routes, Route } from "react-router";
import "./Portafolios.css";
import Rios from "./Rios/Rios";
import David from "./David/David";
import MenuPortafolios from "../../components/ui/menu/PortafolioMenus";

function Nosotros() {
  return (
    <div>
      <MenuPortafolios />
      <Routes>
        <Route path="rios" element={<Rios />} />
        <Route path="david" element={<David />} />

        {/* Agrega aquí las demás pestañas/rutas */}
        {/* <Route path="otra-pestana" element={<OtraPestana />} /> */}
      </Routes>
    </div>
  );
}

export default Nosotros;