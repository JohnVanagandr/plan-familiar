import { Alert, Button, Card, Input, Select } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { planCreateSchema } from "@/features/plans/schemas/planCreate.schema";
import { Building2, Compass, HouseHeart, MapPin, PenBox } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

    const [showConsentAlert, setShowConsentAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Guarda la función para responder al modal (Aceptar/Cancelar) y continuar con la petición
    const consentResolverRef = useRef(null);

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

    },[]);

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

    },[values.departamento]);

    const handleDepartamentoChange = (event) => {
        handleChange(event);
        setValues((previous) => ({ ...previous, ciudad: "" }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
          console.warn("El formulario tiene errores de validación que deben corregirse.");
          return;
        }

        // Abre el modal y espera aquí mismo a que el usuario decida
        const acepto = await new Promise((resolve) => {
            consentResolverRef.current = resolve;
            setShowConsentAlert(true);
        });

        if (!acepto) return;

        try {
            await api.post("familyPlans", {
                last_names: values.apellidos,
                zone_id: values.zona,
                department_id: values.departamento,
                city_id: values.ciudad,
                sectional_id: Number(localStorage.getItem("sectional_id")),
                user_id: Number(localStorage.getItem("id")),
                family_type_id: 3,
            });

            setAlertVariant("success");
            setAlertMessage("Plan familiar registrado con éxito.");
            setShowToast(true);
            navigate("/planes-familiares");

        } catch (error) {
            console.error("Error creando el plan:", error);
            setAlertVariant("danger");
            setAlertMessage("No se pudo registrar el plan familiar.");
            setShowToast(true);
        }
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

            <Card className="flex">
                <form onSubmit={handleSubmit} className="flex flex-col gap-7 items-center">

                    <Input
                        icon={HouseHeart}
                        type="text"
                        name="apellidos"
                        label="Nombre de la familia"
                        value={values.apellidos}
                        onChange={handleChange}
                        error={errors.apellidos}
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

                    <Button type="submit">
                        Registrar Familia
                    </Button>

                </form>
            </Card>

            <Alert
                variant="consent"
                isVisible={showConsentAlert}
                text="Tratamiento de datos personales"
                confirmText="Aceptar y registrar"
                cancelText="Cancelar"
                onConfirm={() => {
                    setShowConsentAlert(false);
                    consentResolverRef.current?.(true);
                }}
                onCancel={() => {
                    setShowConsentAlert(false);
                    consentResolverRef.current?.(false);
                }}
                onClose={() => {
                    setShowConsentAlert(false);
                    consentResolverRef.current?.(false);
                }}
            />

            <Alert
                variant={alertVariant}
                isVisible={showToast}
                text={alertMessage}
                onClose={() => setShowToast(false)}
            />

        </div>
    );
}