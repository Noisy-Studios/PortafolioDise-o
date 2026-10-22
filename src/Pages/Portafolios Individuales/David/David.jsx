import { teamMembers } from "../../../data/portfolioData";
import ProfilePortfolio from "../../../components/ProfilePortfolio";

export function David() {
  const member = teamMembers.find((person) => person.id === "david") ?? teamMembers[0];

  const projects = [
    {
      title: "Motor de Físicas y Movimiento Cinético",
      category: "GAMEPLAY & C#",
      tech: "C# / Unity ECS",
      description: "Sistema de control de personaje con coyote-time, buffer de salto y detección continua de colisiones, diseñado para que cada movimiento responda con precisión.",
      preview: `public class PlayerKinematics : MonoBehaviour {
  [SerializeField] private float coyoteDuration = 0.15f;
  [SerializeField] private float jumpBufferDuration = 0.12f;

  void Update() {
    if (controller.isGrounded)
      coyoteCounter = coyoteDuration;
    else
      coyoteCounter -= Time.deltaTime;

    if (coyoteCounter > 0f && jumpBufferCounter > 0f) {
      ExecuteJumpVelocity();
      jumpBufferCounter = 0f;
    }
  }
}`,
    },
    {
      title: "Arquitectura de IA Procedimental",
      category: "IA & SISTEMAS",
      tech: "Unity / C# / NavMesh",
      description: "Árbol de comportamiento dinámico con alerta grupal y coordinación de enemigos para construir encuentros tácticos que reaccionan al jugador.",
    },
    {
      title: "Pipeline de Guardado en la Nube",
      category: "TOOLS & PLATAFORMAS",
      tech: "Steamworks SDK / JSON",
      description: "Sistema asíncrono de serialización de partidas con sincronización y resolución de conflictos entre dispositivos.",
    },
  ];

  return (
    <ProfilePortfolio
      member={member}
      specialty="Gameplay & arquitectura de sistemas"
      biographyTitle="De las ideas a sistemas que se sienten en cada partida"
      biography={[
        "Me especializo en arquitectura de software, programación de gameplay y sistemas de físicas en Unity. Mi objetivo es que la tecnología sea sólida y que cada interacción se sienta natural para quien juega.",
        "En Noisy Studios trabajo en experiencias que puedan ejecutarse desde el navegador, cuidando tanto la respuesta de los controles como el rendimiento de las compilaciones WebGL.",
      ]}
      projects={projects}
      accent="purple"
    />
  );
}

export default David;
