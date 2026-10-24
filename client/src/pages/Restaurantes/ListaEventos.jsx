import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

import {
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
} from "@mui/icons-material";

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/eventos');
        setEventos(res.data);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  
return (
  <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: 4 }}>
    {/* Encabezado */}
    <Box sx={{ textAlign: "center", mb: 5 }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Kaushan Script",
          color: "#3D3C3B",
          fontSize: { xs: "2.4rem", md: "3.2rem" },
          mb: 1,
        }}
      >
        Eventos
      </Typography>

      <Typography color="text.secondary">
        Descubrí las experiencias y propuestas de nuestros restaurantes.
      </Typography>
    </Box>

    {/* Listado de eventos */}
    {eventos.length === 0 ? (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          No hay eventos disponibles por el momento.
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {eventos.map((evento) => { 
          
        console.log("Evento:", evento.titulo, {
          fecha: evento.fecha,
          hora: evento.hora,
        });
          return ( 
          <Card
            key={evento.id}
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #E8E2DB",
              bgcolor: "#fff",
              transition: "transform 0.25s, box-shadow 0.25s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardActionArea
              onClick={() =>
                navigate(`/restaurante/${evento.restaurante.id}`)
              }
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                flexGrow: 1,
                height: "100%",
              }}
            >
              {/* Imagen del evento */}
              {evento.imagenUrl ? (
                <CardMedia
                  component="img"
                  image={`http://localhost:3000/${evento.imagenUrl}`}
                  alt={evento.titulo}
                  sx={{
                    height: 210,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: 210,
                    bgcolor: "#F0E9E0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <CalendarMonthOutlinedIcon
                    sx={{ fontSize: 55, color: "#9b8b7f" }}
                  />
                </Box>
              )}

              {/* Información */}
              <CardContent
                sx={{
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "Kaushan Script",
                    fontWeight: "bold",
                    color: "#3D3C3B",
                    mb: 1.5,
                    overflowWrap: "anywhere",
                  }}
                >
                  {evento.titulo}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    mb: 2,
                    overflowWrap: "anywhere",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "4.8em",
                  }}
                >
                  {evento.descripcion}
                </Typography>

                {/* Fecha */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <CalendarMonthOutlinedIcon
                    sx={{ color: "#9b8b7f", fontSize: 21 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(evento.fecha).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </Typography>
                </Box>

                {/* Hora del evento */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeOutlinedIcon
                    sx={{ color: "#9b8b7f", fontSize: 21 }}
                  />

                  <Typography variant="body2" color="text.secondary">
                    {new Date(evento.fecha).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "America/Argentina/Mendoza",
                    })}{" "}
                    hs
                  </Typography>
                </Box>
                {/* Enlace visual */}
                <Typography
                  sx={{
                    mt: 2.5,
                    pt: 1.5,
                    borderTop: "1px solid #EEE8E1",
                    color: "#75604B",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Conocer restaurante →
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
         );
        })};
      </Box>
    )}
  </Box>
);
}
export default ListaEventos;
