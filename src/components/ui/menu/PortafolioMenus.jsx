import { Link } from "react-router";
import "./PortafolioMenus.css";

function MenuPortafolios() {
  return (
    <nav className="menu-container">
      <Link to="/Nosotros/rios" className="menu-item">Rios</Link>
      <Link to="/Nosotros/david" className="menu-item">David</Link>
      <Link to="/Nosotros/estefania" className="menu-item">Estefania</Link>
    </nav>
  );
}

export default MenuPortafolios;