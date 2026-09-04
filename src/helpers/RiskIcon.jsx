import { 
  BrickWall,
  Bug,
  Flame,
  Mountain,
  TreeDeciduous,
  TriangleAlert,
  WavesArrowUp,
  Waves
} from 'lucide-react';

const riskIcons = {
  "inundación": Waves,
  "deslizamiento": Mountain,
  "creciente súbita": WavesArrowUp,
  "caída colapso estructural": BrickWall,
  "contaminación plagas": Bug,
  "caída de árboles rocas": TreeDeciduous,
  "colapso estructural traumas quemaduras": Flame,
  "riesgo de accidentes": TriangleAlert,
};

export const RiskIcon = (riesgo, className) => {
  if (!riesgo) return <TriangleAlert className={className} />;

  const key = riesgo.toLowerCase().trim();

  const IconComponent = riskIcons[key] || TriangleAlert;

  return <IconComponent className={className} />;
};