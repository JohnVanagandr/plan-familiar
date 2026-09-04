import { 
  Bird, 
  Rabbit, 
  Cat, 
  Bug, 
  Dog, 
  Fish,
  Rat,
  Worm,
  Turtle,
  PawPrint
} from 'lucide-react';


const species_icon = {
  ave: Bird,
  conejo: Rabbit,
  gato: Cat,
  insecto: Bug,
  perro: Dog,
  pez: Fish,
  roedor: Rat,
  ruedor: Rat,
  serpiente: Worm,
  tortuga: Turtle,
};


export const SpecieIcon = (especie , className) => {


    if (!especie) return <PawPrint className={className}/>;

    const name = especie.toLowerCase().trim();

    const IconComponent = species_icon[name] || PawPrint;

    return <IconComponent className={className} />;
}