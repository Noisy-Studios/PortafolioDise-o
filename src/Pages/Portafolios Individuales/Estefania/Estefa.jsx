import { teamMembers } from "../../../data/portfolioData";
import ProfilePortfolio from "../../../components/ProfilePortfolio";
import MagicRoom from "./MagicRoom";

export function Estefa() {
  const member = teamMembers.find((person) => person.id === "estefania") ?? teamMembers[2];

  const projects = [
    { title: "Biblia de universo y lore: Aetheria", category: "WORLDBUILDING", tech: "Narrativa / Diseño de mundo", description: "Documento de referencia que define la cosmología, las facciones y las historias que dan coherencia al universo del juego." },
    { title: "Diálogos ramificados & HUD", category: "UI / UX", tech: "Figma / Narrativa interactiva", description: "Sistema de elecciones con consecuencias y una interfaz clara que mantiene al jugador dentro de la experiencia." },
    { title: "Iconografía retro-futurista", category: "DISEÑO VISUAL", tech: "Aseprite / Pixel UI", description: "Conjunto de glifos e iconos diegéticos que amplían el lenguaje visual del juego y acompañan la exploración." },
  ];

  return (
    <>
      <ProfilePortfolio
        member={member}
        specialty="Diseño narrativo & UI/UX para videojuegos"
        biographyTitle="De las historias a interfaces que acompañan la aventura"
        biography={[
          "Me enfoco en construir mundos, personajes e interfaces que ayuden a que cada jugador comprenda y sienta la experiencia. Para mí, una buena interfaz acompaña la historia sin interponerse.",
          "En Noisy Studios conecto narrativa, diseño visual y experiencia de usuario: desde el lore de un proyecto hasta los detalles de su HUD e iconografía.",
        ]}
        projects={projects}
        accent="pink"
      />

      {/* Habitación isométrica mágica: camina con clic, enciende las linternas, sienta a la bruja... */}
      <section
        aria-label="Habitación de Estefa"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 16px 72px" }}
      >
        <MagicRoom name={member?.name ?? "Estefa"} />
      </section>
    </>
  );
}

export default Estefa;