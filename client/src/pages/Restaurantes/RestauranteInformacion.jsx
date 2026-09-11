import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RestauranteInformacion({ restaurante }) {
  const [coordenadas, setCoordenadas] = useState(null);

  useEffect(() => {
    if (!restaurante?.direccion) return;

    const obtenerCoordenadas = async () => {
      try {
        const parametros = new URLSearchParams({
          q: restaurante.direccion,
          format: "json",
          limit: "1",
        });

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${parametros.toString()}`
        );

        if (!response.ok) {
          throw new Error("Error en la consulta a Nominatim");
        }

        const data = await response.json();

        if (data.length > 0) {
          setCoordenadas({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          });
        } else {
          console.log("No se encontraron coordenadas");
        }
      } catch (error) {
        console.error("Error obteniendo coordenadas:", error);
      }
    };

    obtenerCoordenadas();
  }, [restaurante?.direccion]);

  return (
    <Box sx={{ mt: 4 }}>
      {/* Información del restaurante */}
      <Box
        sx={{
          mt: 4,
          color: "#322B23",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography>
          {restaurante.horario}
        </Typography>

        <Typography>
          {restaurante.contacto}
        </Typography>

        <Typography>
          {restaurante.direccion}
        </Typography>
      </Box>

      {/* Mapa */}
      <Box sx={{ mt: 3 }}>
        {coordenadas && (
          <MapContainer
            center={[coordenadas.lat, coordenadas.lon]}
            zoom={16}
            style={{
              width: "100%",
              height: "400px",
            }}
          >
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker
              position={[coordenadas.lat, coordenadas.lon]}
            >
              <Popup>
                <strong>{restaurante.nombre}</strong>
                <br />
                {restaurante.direccion}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </Box>
    </Box>
  );
}