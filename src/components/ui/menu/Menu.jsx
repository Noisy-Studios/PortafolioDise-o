import { Link } from "react-router";
import "./Menu.css"; // si tienes uno

function Menu() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/Nosotros">Nosotros</Link>&nbsp;
      <Link to="/juegos">Juegos</Link>&nbsp;
      <Link to="/contactanos">Contactanos</Link>
    </nav>
  );
}

export default Menu;