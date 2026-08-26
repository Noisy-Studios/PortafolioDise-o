import { Link } from "react-router";
import "./Home.css";

function Home() {
  return (
    <>
      <h1>Inicio</h1>
      <div className="home-buttons">
        <Link to="/registro" className="btn">
          Registro
        </Link>
        <Link to="/galeria" className="btn">
          Galeria
        </Link>
        <Link to="/creditos" className="btn">
          Creditos
        </Link>
      </div>
    </>
  );
}

export default Home;
