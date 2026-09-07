import { Card, Input, Select } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { Building, Calendar, Hash, IdCard, Lock, Mail, MapPin, Phone, UserRound, VenusAndMars } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const usuarioMock = {
    id: 1,
    email: "ana.perez@correo.com",
    estado: "Activo",
    profile: {
      names: "Ana",
      lastNames: "Pérez",
      documentTypeId: "1",
      documentNumber: "1098765432",
      birthDate: "1995-04-12",
      genderId: "2",
      sectionalId: "5",
      organizationId: "3",
      phone: "3001234567",
    },
};

const documentOptions = [
    { value: "1", label: "Cédula de Ciudadanía" },
    { value: "2", label: "Cédula de Extranjería" },
    { value: "3", label: "Tarjeta de Identidad" },
    { value: "4", label: "Pasaporte" },
];

const genderOptions = [
    { value: "1", label: "Masculino" },
    { value: "2", label: "Femenino" },
    { value: "3", label: "Otro" },
];

const sectionalOptions = [
    { value: "1", label: "Seccional 1" },
    { value: "2", label: "Seccional 2" },
    { value: "3", label: "Seccional 3" },
];

const organizationOptions = [
    { value: "1", label: "Organización 1" },
    { value: "2", label: "Organización 2" },
    { value: "3", label: "Organización 3" },
];

const UsuarioDetailView = () => {

    const { usuarioId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const soloLectura = location.pathname.includes("peticiones-acceso");

    return(

        <div className="w-full flex flex-col gap-6">

            <HeaderSection
                icon={<UserRound />}
                title={soloLectura ? "Revisión de Petición" : "Gestión de Usuario"}
                description={soloLectura ? "Consulta los datos antes de aprobar o rechazar." : "Consulta y edita la información del usuario."}
                buttonSection
                buttonText="Volver"
                onButtonClick={() => navigate(-1)}
            />

            <Card padding="md" className="w-full flex flex-col gap-4">
                
                <form className="w-full flex flex-col gap-4">

                    <Input
                        icon={UserRound}
                        type="text"
                        name="names"
                        label="Nombres"
                        value={usuarioMock.profile.names}
                    />

                    <Input
                        icon={UserRound}
                        type="text"
                        name="lastNames"
                        label="Apellidos"
                        value={usuarioMock.profile.lastNames}
                    />

                    <Select
                        icon={IdCard}
                        type="text"
                        name="documentType"
                        label="Tipo de Documento"
                        value={usuarioMock.profile.documentTypeId}
                        options={documentOptions}
                    />

                    <Input
                        icon={Hash}
                        type="text"
                        name="documentNumber"
                        label="Número de Documento"
                        value={usuarioMock.profile.documentNumber}
                    />

                    <Input
                        icon={Calendar}
                        type="date"
                        name="birthDate"
                        label="Fecha de Nacimiento"
                        value={usuarioMock.profile.birthDate}
                    />

                    <Select
                        icon={VenusAndMars}
                        type="text"
                        name="genderId"
                        label="Género"
                        value={usuarioMock.profile.genderId}
                        options={genderOptions}
                    />

                    <Select
                        icon={MapPin}
                        type="text"
                        name="sectionalId"
                        label="Seccional"
                        value={usuarioMock.profile.sectionalId}
                        options={sectionalOptions}
                    />

                    <Select
                        icon={Building}
                        type="text"
                        name="organizationId"
                        label="Organización"
                        value={usuarioMock.profile.organizationId}
                        options={organizationOptions}
                    />



                </form>

            </Card>

            <Card>

                <Input
                    icon={Mail}
                    type="text"
                    name="email"
                    label="Correo"
                    value={usuarioMock.profile.email}
                />

                <Input
                    icon={Phone}
                    type="text"
                    name="phone"
                    label="Teléfono"
                    value={usuarioMock.profile.phone}
                />

                <Input
                    icon={Lock}
                    type="password"
                    label="Contraseña"
                    
                />

            </Card>


        </div>
    );
}

export default UsuarioDetailView;