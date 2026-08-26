import {
  Alert,
  Box,
  Button,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Resena = {
  id: number;
  comentario: string;
  puntuacion: number;
  fecha: string;
  usuario?: {
    nombre?: string;
    provincia?: string;
  };
};

type RestauranteResenasProps = {
  restauranteId: number;
  resenasIniciales?: Resena[];
};

export default function RestauranteResenas({
  restauranteId,
  resenasIniciales = [],
}: RestauranteResenasProps) {
  const [resenas, setResenas] = useState<Resena[]>(
    resenasIniciales
  );

  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState<number | null>(5);
  const [mensaje, setMensaje] = useState("");
  const [resenaError, setResenaError] = useState("");

  const handleEnviarResena = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!userId || !token) {
      alert("Debes iniciar sesión para comentar y puntuar.");
      return;
    }

    if (!comentario.trim() || !puntuacion) {
      setResenaError(
        "Por favor completá tu comentario y puntuación."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/resenas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comentario,
            puntuacion,
            restauranteId,
            userId: parseInt(userId),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar reseña");
      }

      const data = await response.json();

      setResenas((prev) => [data, ...prev]);

      setMensaje("¡Gracias por tu reseña!");
      setComentario("");
      setPuntuacion(5);
      setResenaError("");
    } catch (err) {
      console.error(err);

      setResenaError(
        "Error al enviar reseña. Primero debe tener usuario y haber asistido recientemente para dejar una reseña."
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleEnviarResena}
      sx={{ mt: 6 }}
    >
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Comentarios
        </Typography>

        {resenas.length === 0 ? (
          <Typography variant="body1">
            Todavía no hay reseñas.
          </Typography>
        ) : (
          resenas.map((resena) => (
            <Box
              key={resena.id}
              sx={{
                my: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold" }}
              >
                {resena.usuario?.nombre}{" "}
                {resena.usuario?.provincia &&
                  `· ${resena.usuario.provincia}`}
              </Typography>

              <Rating
                value={resena.puntuacion}
                readOnly
              />

              <Typography variant="body2">
                {resena.comentario}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {new Date(
                  resena.fecha
                ).toLocaleDateString()}
              </Typography>
            </Box>
          ))
        )}
      </Box>

      <Typography variant="h6" gutterBottom>
        Dejá tu comentario
      </Typography>

      <Rating
        name="puntuacion"
        value={puntuacion}
        onChange={(_event, newValue) => {
          setPuntuacion(newValue);
        }}
      />

      <TextField
        label="Comentario"
        multiline
        fullWidth
        rows={4}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        sx={{
          my: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc",
            },
            "&:hover fieldset": {
              borderColor: "#999",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#322B23",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#444",
            "&.Mui-focused": {
              color: "#322B23",
            },
          },
        }}
      />

      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: "#3D3C3B",
          color: "#fff",
        }}
      >
        Enviar
      </Button>

      {mensaje && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {mensaje}
        </Alert>
      )}

      {resenaError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {resenaError}
        </Alert>
      )}
    </Box>
  );
}