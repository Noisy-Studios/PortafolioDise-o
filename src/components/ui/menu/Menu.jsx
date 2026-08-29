import { Link } from "react-router";

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