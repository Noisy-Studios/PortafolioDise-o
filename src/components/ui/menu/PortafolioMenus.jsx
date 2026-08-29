import { Link } from "react-router";
import "./PortafolioMenus.css";

function MenuPortafolios() {
  return (
    <nav className="menu-container">
      <Link
        to={`${import.meta.env.BASE_URL}Nosotros/rios`}
        className="menu-item"
      >
        Rios{" "}
      </Link>
      ```
      <Link
        to={`${import.meta.env.BASE_URL}Nosotros/david`}
        className="menu-item"
      >
        David
      </Link>
      <Link
        to={`${import.meta.env.BASE_URL}Nosotros/estefania`}
        className="menu-item"
      >
        Estefania
      </Link>
    </nav>
  );
}

export default MenuPortafolios;
