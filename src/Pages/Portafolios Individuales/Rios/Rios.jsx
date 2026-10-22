import { teamMembers } from "../../../data/portfolioData";
import ProfilePortfolio from "../../../components/ProfilePortfolio";

export function Rios() {
  const member = teamMembers.find((person) => person.id === "rios") ?? teamMembers[1];

  const projects = [
    {
      title: "Ruinas Ciberpunk — Sector 09",
      category: "ENTORNO 3D",
      tech: "Blender / Environment Art",
      image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1000&q=80",
      description: "Entorno modular de estructuras metálicas e iluminación volumétrica para construir una ciudad nocturna con identidad propia.",
    },
    {
      title: "Cripta Mecánica Ancestral",
      category: "LEVEL DESIGN",
      tech: "Iluminación / Composición",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      description: "Escenario subterráneo que guía la mirada con fuentes de luz emisivas turquesa y violeta.",
    },
    {
      title: "Estación Espacial Void",
      category: "HARD SURFACE",
      tech: "Modelado / Texturizado",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      description: "Conjunto de assets modulares y materiales optimizados para mantener el detalle visual en tiempo real.",
    },
  ];

  return (
    <ProfilePortfolio
      member={member}
      specialty="Dirección de arte & entornos 3D"
      biographyTitle="De los espacios vacíos a mundos que cuentan historias"
      biography={[
        "Me interesa crear escenarios que comuniquen una historia antes de que aparezca un diálogo. Combino modelado 3D, composición e iluminación para dar profundidad y carácter a cada espacio.",
        "En Noisy Studios desarrollo entornos y recursos visuales para videojuegos, desde el diseño modular inicial hasta el acabado de materiales y luces.",
      ]}
      projects={projects}
      accent="cyan"
    />
  );
}

export default Rios;
