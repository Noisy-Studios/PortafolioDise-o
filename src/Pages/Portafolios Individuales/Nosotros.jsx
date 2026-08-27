import { Routes, Route } from "react-router";
import "./Portafolios.css";
import Rios from "./Rios/Rios";
import Estefania from "./estefania/estefania";
import MenuPortafolios from "../../components/ui/menu/PortafolioMenus";

function Nosotros() {
  return (
    <div>
      <MenuPortafolios />
      <Routes>
        <Route path="rios" element={<Rios />} />
        <Route path="estefania" element={<Estefania />} />
        {/* Agrega aquí las demás pestañas/rutas */}
        {/* <Route path="otra-pestana" element={<OtraPestana />} /> */}
      </Routes>
    </div>
  );
}

export default Nosotros;