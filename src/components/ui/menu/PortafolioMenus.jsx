import { Link } from "react-router";
import "./PortafolioMenus.css";

function MenuPortafolios() {
  return (
    <nav className="menu-container">
      {/* Usar la ruta completa /Portafolios/... evita que se acumulen en la URL */}
      <Link to="/Portafolios/rios" className="menu-item">Rios</Link>
      <Link to="/Portafolios/david" className="menu-item">David</Link>
    </nav>
  );
}

export default MenuPortafolios;