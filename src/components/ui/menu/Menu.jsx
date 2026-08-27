function Menu() {
  return (
    <nav>
      <a href={import.meta.env.BASE_URL}>Inicio</a>
      <a href={`${import.meta.env.BASE_URL}nosotros`}>Nosotros</a>&nbsp;
      <a href={`${import.meta.env.BASE_URL}juegos`}>Juegos</a>&nbsp;
      <a href={`${import.meta.env.BASE_URL}contactanos`}>Contactanos</a>
    </nav>
  );
}

export default Menu;
