import { Card, Input, Select } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { usePaginacion } from "@/features/auth/hooks/usePaginacion";
import { planCreateSchema } from "@/features/plans/schemas/planCreate.schema";
import { Building2, Compass, HouseHeart, MapPin, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "@/helpers/api";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation";


export const PlansCreateView = () => {

    const navigate = useNavigate();

    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [zonas, setZonas] = useState([]);
    const [loading, setLoading] = useState([]);
    const [loadingCiudades, setLoadingCiudades] = useState(false);

    const initialState = {
      apellidos: "",
      zona: "",
      departamento: "",
      ciudad: ""
    };
    
    const { values, setValues, errors, handleChange, validate } = useFormValidation(initialState, planCreateSchema);
    
    useEffect(()=>{

        const cargarDatos = async () => {
            
            try {
                const [departmentsData, zonesData] = await Promise.all([
                api.get("departments"),
                api.get("zones"),
                
                ]);

                setDepartamentos(
                  (departmentsData ?? []).map((department) => ({
                    value: String(department.id),
                    label: department.name ?? department.nombre,
                  }))
                );

                setZonas(
                  (zonesData ?? []).map((zone) => ({
                    value: String(zone.id),
                    label: zone.name ?? zone.nombre,
                  }))
                );

                // setValues({
                //     apellidos: last_names ?? "",
                //     zona: String(zone_id ?? ""),
                //     departamento: String(department_id ?? ""),
                //     ciudad: String(city_id ?? "")
                // });

            } catch (error) {
                console.error("Error cargando los datos solicitados:", error);
                setAlertVariant("danger");
                setAlertMessage("No se pudieron cargar los datos de departamentos, ciudades y zonas.");
                setShowToast(true);
            }finally {
                setLoading(false);
            }
        }

        cargarDatos();

    },[])

    useEffect(()=>{

        const cargarCiudades = async () => {

            if (!values.departamento) {
                setCiudades([]);
                return;
            }

            setLoadingCiudades(true);

            try {

                const data = await api.get(`cities/department/${values.departamento}`);
    
                setCiudades(
                    (data ?? []).map((city) => ({
                        value: String(city.id),
                        label: city.name ?? city.nombre,
                    }))
                );

            } catch (error) {

                console.error("Error cargando ciudades:", error.details ?? error);
                setCiudades([]);
                setAlertVariant("danger");
                setAlertMessage("No se pudieron cargar las ciudades.");
                setShowToast(true);

            } finally {
                setLoadingCiudades(false);
            }
    
        };

        cargarCiudades();

    },[values.departamento])

    const handleDepartamentoChange = (event) => {
        handleChange(event);
        setValues((previous) => ({ ...previous, ciudad: "" }));
    };

    return (
        <div className="flex flex-col gap-4">

            <HeaderSection
                icon={<PenBox />}
                title="Registro de nuevo plan familiar"
                description="Crea un nuevo plan familiar."
                buttonSection
                buttonText="Volver"
            />

            <Card className="flex flex-col gap-4">

                <form action="">

                    <Input
                        icon={HouseHeart}
                        type="text"
                        name="apellidos"
                        label="Nombre de la familia"
                        error={errors.zona}
                    />

                    <Select
                        icon={Compass}
                        name="zona"
                        label="Seleccione el tipo de zona"
                        value={values.zona}
                        onChange={handleChange}
                        arrayOptions={zonas}
                        error={errors.zona}
                    />

                    <Select
                        icon={MapPin}
                        name="departamento"
                        label="Seleccione el departamento"
                        value={values.departamento}
                        onChange={handleDepartamentoChange}
                        arrayOptions={departamentos}
                        error={errors.departamento}
                    />

                    <Select
                        icon={Building2}
                        name="ciudad"
                        label="Seleccione la ciudad"
                        value={values.ciudad}
                        onChange={handleChange}
                        arrayOptions={ciudades}
                        disabled={!values.departamento || loadingCiudades}
                        error={errors.ciudad}
                    />

                </form>


            </Card>

        </div>
    );
}