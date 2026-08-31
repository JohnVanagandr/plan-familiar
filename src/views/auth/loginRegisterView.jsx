import { useEffect, useState } from "react";
import { loginSchema } from "@/features/auth/schemas/auth.schema.js";
import { registerSchema } from "@/features/auth/schemas/register.schema.js";
import { Alert } from "@/components/ui/alerts.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormValidation } from "@/features/auth/hooks/useFormValidation.js";
import { Select } from "@/components/ui/select.jsx";
import { Button, Input, Link } from '@/components/ui'; 
import { Building2, Calendar, CircleCheckBig, Hash, IdCard, Lock, Mail, MapPin, Phone, UserRound, VenusAndMars } from "lucide-react";

const initial_state = { correo: "", contrasena: "" };

const initial_state_register = {
  nombre: "",
  apellido: "",
  tipo_documento: "",
  numero_documento: "",
  genero: "",
  fecha_nacimiento: "",
  seccional: "",
  organizacion: "",
  telefono: "",
  correo: "",
  contrasena: "",
  confirmar_contrasena: "",
};

// Mock: reemplazar por catálogos reales cuando se reconecte la lógica
const tiposDocumento = [
  { value: "cc", label: "Cédula de ciudadanía" },
  { value: "ce", label: "Cédula de extranjería" },
  { value: "ti", label: "Tarjeta de identidad" },
  { value: "pa", label: "Pasaporte" },
];

const generos = [
  { value: "m", label: "Masculino" },
  { value: "f", label: "Femenino" },
  { value: "o", label: "Otro" },
];

const seccionales = [
  { value: "1", label: "Santander" },
];

const organizaciones = [
  { value: "1", label: "Girón" },
  { value: "2", label: "Arenal" },
  { value: "3", label: "Carrizal" },
  { value: "4", label: "Bucaramanga" },
];

const LoginRegisterView = () => {

  const location = useLocation();
  const navigate = useNavigate();
  
  const showLogin = location.pathname !== "/register"

  const { values, errors, handleChange, validate, resetForm } =
    useFormValidation(initial_state, loginSchema);

  const {
    values: registerValues,
    errors: registerErrors,
    handleChange: handleRegisterChange,
    validate: validateRegister,
    resetForm: resetRegisterForm,
  } = useFormValidation(initial_state_register, registerSchema);

  const [showToast, setShowToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigateWithFade = (navigateUrl) => {

    setIsVisible(false);

    setTimeout(() => {
      navigate(navigateUrl);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      localStorage.setItem("auth", "auth");
      localStorage.setItem("rol", "voluntario");
      // localStorage.setItem("rol", "supervisor");
      // localStorage.setItem("rol", "administrador");

      setShowToast(true);
      setAlertMessage("¡Sesión iniciada con éxito!");
      resetForm();
      handleNavigateWithFade("/dashboard");
    } else {
      console.warn("El formulario tiene errores de validación que deben corregirse.");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (validateRegister()) {
      setAlertMessage("¡Usuario registrado con éxito!");
      setShowToast(true);
      resetRegisterForm();
      navigate("/login");
    } else {
      console.warn("Errores de validación:", registerErrors);
    }
  };

  const classCard =
  "w-full h-fit p-8 max-w-xl min-h-[700px] rounded-4xl bg-(image:--white-gra-b) flex flex-col gap-4 items-center gap-10 lg:min-w-xl";

  const wrapperLogin = `${showLogin ? "block" : "hidden lg:block"} transition-all duration-500 ${
    showLogin
      ? "w-full max-w-xl opacity-100 pointer-events-auto scale-100 block"
      : "w-0 max-w-0 opacity-0 pointer-events-none scale-50"
  }`;

  const wrapperRegister = `${!showLogin ? "block" : "hidden lg:block"} transition-all duration-500 ${
    !showLogin
      ? "w-full max-w-xl opacity-100 pointer-events-auto scale-100 block"
      : "w-0 max-w-0 opacity-0 pointer-events-none scale-50"
  }`;

  const cardLoginTransform = `transition-transform duration-500 ${

    showLogin ? "scale-100" : "scale-50"

  }`;

  const cardRegisterTransform = `transition-transform duration-500 ${

    !showLogin ? "scale-100 -translate-x-0" : "scale-50 -translate-x-110"

  }`;

  const wraperImg = `absolute top-30 w-[450px] max-w-none z-10 transition-transform duration-1000 ${
    showLogin ? "translate-x-20" : "-translate-x-10"
  }`;

  const fieldPair = "flex flex-col gap-4 lg:gap-2 lg:flex-row";

  return (
    
    <div className={`w-full min-h-screen flex flex-col items-center justify-center p-4 gap-8 overflow-hidden transition-all duration-500 ease-in-out sm:p-6 lg:flex-row lg:gap-20`}>


      {/* SECCIÓN LOGIN */}
      <section className={`${wrapperLogin}`}>
        <div className={`${classCard} ${cardLoginTransform}`}>
          <img src="/logo.png" alt="logo" className="w-56 sm:w-72" />

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full flex items-center justify-center flex-col gap-7"
          >
            <Input
              icon={UserRound}
              type="email"
              label="Correo"
              value={values.correo}
              name="correo"
              onChange={handleChange}
              error={errors.correo}
            />

            <Input
              icon={Lock}
              type="password"
              label="Contraseña"
              value={values.contrasena}
              name="contrasena"
              onChange={handleChange}
              error={errors.contrasena}
            />

            <Button type="submit" variant="primary" size="lg">
              Iniciar sesión
            </Button>

            <Link href="/forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>

          </form>

          <div className="flex flex-col justify-center items-center gap-4">

            <p className="text-(--color_azul)">¿no tienes un perfil?</p>

            <Button variant="secondary" onClick={() => navigate("/register")}>
              Registrate
            </Button>


          </div>

        </div>
      </section>

      {/* SECCIÓN ILUSTRACION — solo desde lg, no aplica en tablet/mobile */}
      <section className="hidden lg:block min-h-175 w-lg relative overflow-visible">

        <div className="size-20 rounded-full bg-(image:--white-gra) absolute top-1 -left-10 z-60 animate-float"/>
        <div className="size-10 rounded-full bg-(image:--white-gra) absolute -top-10 left-10 z-60 animate-float"/>
        <div className="size-10 rounded-full bg-(image:--white-gra) absolute bottom-60 -right-15 z-60 animate-float"/>

        <p className="text-center first-line:uppercase text-(--color_azul) first-line:text-(--color_naranja) first-line:font-bold">
          Plan Familiar de Emergencia <br />
          de la Defensa Civil Colombiana <br />
          Es una herramienta preventiva esencial <br />
          para organizar a familias ante riesgos.
        </p>

        <img src="../../public/svg/ilustracion_montana.svg" alt="" className={wraperImg} />

        <img
          src="../../public/svg/ilustracion_familia_d.svg"
          alt=""
          className="absolute top-50 left-1/2 -translate-x-1/2 w-180 max-w-none z-10"
        />

      </section>

      {/* SECCIÓN REGISTRO */}
      <section className={`${wrapperRegister}`}>
        <div className={`${classCard} ${cardRegisterTransform}`}>
          <h1 className="text-(--color_azul) text-3xl font-bold">Registro</h1>

          <form
            className="flex flex-col gap-7 h-full justify-center w-full"
            onSubmit={handleRegisterSubmit}
            noValidate
          >
            <div className="flex flex-col gap-4">
              <div className={fieldPair}>
                <Input
                  icon={UserRound}
                  type="text"
                  label="Nombres"
                  value={registerValues.nombre}
                  name="nombre"
                  onChange={handleRegisterChange}
                  error={registerErrors.nombre}
                />

                <Input
                  icon={UserRound}
                  type="text"
                  label="Apellidos"
                  value={registerValues.apellido}
                  name="apellido"
                  onChange={handleRegisterChange}
                  error={registerErrors.apellido}
                />
              </div>

              <div className={fieldPair}>
                <Select
                  icon={IdCard}
                  label="Tipo de documento"
                  value={registerValues.tipo_documento}
                  name="tipo_documento"
                  onChange={handleRegisterChange}
                  arrayOptions={tiposDocumento}
                  error={registerErrors.tipo_documento}
                />

                <Input
                  icon={Hash}
                  type="text"
                  label="Número de documento"
                  value={registerValues.numero_documento}
                  name="numero_documento"
                  onChange={handleRegisterChange}
                  error={registerErrors.numero_documento}
                />
              </div>

              <div className={fieldPair}>
                <Select
                  icon={VenusAndMars}
                  label="Género"
                  value={registerValues.genero}
                  name="genero"
                  onChange={handleRegisterChange}
                  arrayOptions={generos}
                  error={registerErrors.genero}
                />

                <Input
                  icon={Calendar}
                  type="date"
                  label="Fecha de nacimiento"
                  value={registerValues.fecha_nacimiento}
                  name="fecha_nacimiento"
                  onChange={handleRegisterChange}
                  error={registerErrors.fecha_nacimiento}
                />
              </div>

              <div className={fieldPair}>
                <Select
                  icon={MapPin}
                  label="Seccional"
                  value={registerValues.seccional}
                  name="seccional"
                  onChange={handleRegisterChange}
                  arrayOptions={seccionales}
                  error={registerErrors.seccional}
                />

                <Select
                  icon={Building2}
                  label="Organización"
                  value={registerValues.organizacion}
                  name="organizacion"
                  onChange={handleRegisterChange}
                  arrayOptions={organizaciones}
                  error={registerErrors.organizacion}
                />
              </div>

              <Input
                icon={Phone}
                type="text"
                label="Teléfono"
                value={registerValues.telefono}
                name="telefono"
                onChange={handleRegisterChange}
                error={registerErrors.telefono}
              />

              <Input
                icon={Mail}
                type="email"
                label="Correo"
                value={registerValues.correo}
                name="correo"
                onChange={handleRegisterChange}
                error={registerErrors.correo}
              />

              <div className={fieldPair}>
                <Input
                  icon={Lock}
                  type="password"
                  label="Contraseña"
                  value={registerValues.contrasena}
                  name="contrasena"
                  onChange={handleRegisterChange}
                  error={registerErrors.contrasena}
                />

                <Input
                  icon={Lock}
                  type="password"
                  label="Confirmar contraseña"
                  value={registerValues.confirmar_contrasena}
                  name="confirmar_contrasena"
                  onChange={handleRegisterChange}
                  error={registerErrors.confirmar_contrasena}
                />
              </div>

            </div>

            <Button type="submit" variant="primary" size="lg">
              Registrarse
            </Button>
          </form>

          <Button type="button" variant="secondary" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
        </div>
      </section>

      <Alert
        variant="success"
        text={alertMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default LoginRegisterView;