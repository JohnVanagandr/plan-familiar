import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, Button, Input, Link } from "@/components/ui";
import HeaderSection from "@/components/ui/headerSection";
import { MapPin, Search, Locate, UsersRound, Radius } from "lucide-react";

const iconFamilia = L.icon({
  iconUrl: "/svg/pinFamilia.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const iconBusqueda = L.icon({
  iconUrl: "/svg/pinBusqueda.svg",
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -40],
});

const colombiaBounds = [
  [-4.5, -82.0],
  [13.5, -66.8],
];

// Mock: reemplazar por la petición real (GET /families/geolocated) cuando se reconecte la lógica
const familiasMock = [
  { id: 1, nombre: "Familia García Pérez", lat: 7.1193, lng: -73.1227 },
  { id: 2, nombre: "Familia Rojas Ibáñez", lat: 7.0631, lng: -73.0864 },
  { id: 3, nombre: "Familia Suárez Moreno", lat: 7.1254, lng: -73.0000 },
  { id: 4, nombre: "Familia Ortiz Camacho", lat: 7.3873, lng: -73.4014 },
  { id: 5, nombre: "Familia Pabón Duarte", lat: 6.6919, lng: -73.0714 },
  { id: 6, nombre: "Familia Villamizar Ríos", lat: 7.8891, lng: -72.4967 },
  { id: 7, nombre: "Familia Amaya Serrano", lat: 6.4536, lng: -73.2596 },
];

function FlyToPoint({ point }) {
  const map = useMap();
  if (point) {
    map.flyTo([point.lat, point.lng], 13, { duration: 1.2 });
  }
  return null;
}

export const MapaView = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [errores, setErrores] = useState({});

  const [puntoBuscado, setPuntoBuscado] = useState(null);
  const [radio, setRadio] = useState("");

  const validarCoordenadas = () => {
    const nuevosErrores = {};

    if (!lat.trim()) nuevosErrores.lat = "La latitud es obligatoria";
    else if (isNaN(Number(lat))) nuevosErrores.lat = "Debe ser un número";

    if (!lng.trim()) nuevosErrores.lng = "La longitud es obligatoria";
    else if (isNaN(Number(lng))) nuevosErrores.lng = "Debe ser un número";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleBuscar = () => {
    if (!validarCoordenadas()) return;
    setPuntoBuscado({ lat: Number(lat), lng: Number(lng), radio: Number(radio) });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderSection
        icon={<MapPin />}
        title="Mapa"
        description="Ubica las familias registradas o busca un punto específico por coordenadas."
        image="/svg/ilustracion_colombia_mitad.svg"
      />

      <Card padding="md" className="w-full flex flex-col gap-4 items-start sm:items-end">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <Input
            icon={Locate}
            type="text"
            placeholder="Latitud (ej. 7.1193)"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            error={errores.lat}
          />
          <Input
            icon={Locate}
            type="text"
            placeholder="Longitud (ej. -73.1227)"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            error={errores.lng}
          />

          <Input
            icon={Radius}
            type="text"
            placeholder="Radio de búsqueda (ej. 1000)"
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
          />

          <Button variant="accent" onClick={handleBuscar} className="shrink-0">
            <Search className="size-5" /> Buscar punto
          </Button>
        </div>

        <MapContainer
          center={[7.1193, -73.1227]}
          zoom={6}
          minZoom={5}
          maxBounds={colombiaBounds}
          maxBoundsViscosity={1.0}
          style={{ height: "450px", maxHeight: "900px", width: "100%", borderRadius: "15px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {puntoBuscado && <FlyToPoint point={puntoBuscado} />}

          {familiasMock.map((familia) => (
            <Marker key={familia.id} position={[familia.lat, familia.lng]} icon={iconFamilia}>
              <Popup>
                <Link href="/planes-familiares/1">
                  <UsersRound className="text-(--color_azul)"/>
                  <strong className="text-(--color_azul)">{familia.nombre}</strong>
                </Link>
              </Popup>
            </Marker>
          ))}

          {puntoBuscado && (
            <>
              <Marker position={[puntoBuscado.lat, puntoBuscado.lng]} icon={iconBusqueda}>
                <Popup>Punto buscado</Popup>
              </Marker>,
              <Circle 
                center={[puntoBuscado.lat, puntoBuscado.lng]}
                radius={puntoBuscado.radio}
                pathOptions={{ fillColor: "blue", fillOpacity: 0.3, }}
              />
            </>

          )}
        </MapContainer>
      </Card>
    </div>
  );
};

export default MapaView;