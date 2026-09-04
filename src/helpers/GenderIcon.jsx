import { Circle, Mars, Venus } from "lucide-react";

export const GenderIcon = (genero, classname) => {
    
    if (!genero) return "ri-genderless-line";

    const normalizado = genero.toLowerCase().trim();

    //masculino
    if (["m", "macho", "hombre", "masculino", "male"].includes(normalizado)) {
        return <Mars className={classname}/>;
    }

    //femenino
    if (["f", "hembra", "mujer", "femenino", "female"].includes(normalizado)) {
        return <Venus className={classname}/>;
    }

    //agenero / no binario / ninguno
    return <Circle className={classname}/>;
};