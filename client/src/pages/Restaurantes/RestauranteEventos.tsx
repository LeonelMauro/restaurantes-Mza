import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

type Evento = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  imagenUrl?: string;
};

type RestauranteEventosProps = {
  id: string | undefined;
  onReservar: (evento: Evento) => void;
};

export default function RestauranteEventos({
  id,
  onReservar,
}: RestauranteEventosProps) {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/eventos/restaurante/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEventos(data);
      })
      .catch((err) =>
        console.error("Error al obtener eventos:", err)
      );
  }, [id]);

  return (
    <Box mt={4}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontFamily: "Kaushan Script",
        }}
      >
        Eventos del restaurante
      </Typography>

      <Grid container spacing={3}>
        {eventos.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            sx={{ width: "100%" }}
          >
            No hay eventos disponibles en este restaurante.
          </Typography>
        ) : (
          eventos.map((evento) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={evento.id}>
              <Card
                sx={{
                  backgroundColor: "#3D3C3B",
                  color: "#fff",
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {evento.titulo}
                  </Typography>

                  <Typography sx={{ textAlign: "justify" }}>
                    {evento.descripcion}
                  </Typography>

                  <Typography>
                    📅{" "}
                    {new Date(
                      evento.fecha
                    ).toLocaleDateString()}
                  </Typography>

                  <Typography>
                    ⏰ {evento.hora}
                  </Typography>

                  {evento.imagenUrl && (
                    <Box
                      component="img"
                      src={`http://localhost:3000/${evento.imagenUrl}`}
                      alt={evento.titulo}
                      sx={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderRadius: 2,
                        mt: 2,
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#F5E6D3",
                        color: "#3D3C3B",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#e2d3c1",
                        },
                      }}
                      onClick={() => onReservar(evento)}
                    >
                      Reservar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}