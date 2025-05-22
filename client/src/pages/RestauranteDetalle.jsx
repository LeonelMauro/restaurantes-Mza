import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  CardMedia,
  Container,
  Box,
  Button,
  TextField,
  Rating,
  Alert
} from '@mui/material';

export default function RestauranteDetalle() {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Reseña
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);
  const [mensaje, setMensaje] = useState('');
  const [reseñaError, setReseñaError] = useState('');

  // ⚠️ Reemplaza esto con el userId real del usuario logueado
 // const userId = 21; // Ejemplo temporal

  useEffect(() => {
    fetch(`http://localhost:3000/restaurante/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar restaurante');
        return res.json();
      })
      .then((data) => {
        setRestaurante(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleEnviarReseña = async (e) => {
  e.preventDefault(); // prevenimos comportamiento por defecto del form

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!userId || !token) {
    alert("Debes iniciar sesión para comentar y puntuar.");
    return;
  }

  if (!comentario || puntuacion === 0) {
    setReseñaError("Por favor completá tu comentario y puntuación.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/resenas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comentario,
        puntuacion,
        restauranteId: restaurante.id,
        usuarioId: Number(userId),
      }),
    });

    if (!response.ok) throw new Error("Error al enviar reseña");

    const data = await response.json();
    console.log("Reseña enviada con éxito:", data);

    setMensaje("¡Gracias por tu reseña!");
    setComentario("");
    setPuntuacion(5);
    setReseñaError("");

  } catch (err) {
    console.error(err);
    setReseñaError("Error al enviar reseña");
  }
};



  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!restaurante) return <Typography>Restaurante no encontrado</Typography>;

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h1" align="center" sx={{ fontFamily: 'Kaushan Script', mb: 3 }}>
        {restaurante.nombre}
      </Typography>

      {restaurante.photos && restaurante.photos.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, overflowX: 'auto' }}>
          {restaurante.photos.map((photo) => (
            <CardMedia
              key={photo.id}
              component="img"
              image={`http://localhost:3000/${photo.url}`}
              alt={restaurante.nombre}
              sx={{ height: 200, borderRadius: 3 }}
            />
          ))}
        </Box>
      )}

      <Typography variant="body1">{restaurante.descripcion}</Typography>

      {/* Datos del usuario responsable */}
      {restaurante.usuario && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">
            Responsable: {restaurante.usuario.nombre}
          </Typography>
          <Typography variant="subtitle2">Email: {restaurante.usuario.email}</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
              sx={{ fontWeight: 'bold' }}
            >
              Ver más
            </Button>
          </Box>
        </Box>
      )}

      {/* Formulario de Reseña */}
      <Box component="form" onSubmit={handleEnviarReseña} sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Dej&aacute; tu reseña
        </Typography>

        <Rating
          name="puntuacion"
          value={puntuacion}
          onChange={(event, newValue) => {
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
          sx={{ my: 2 }}
        />

        <Button variant="contained" color="secondary" type="submit">
          Enviar reseña
        </Button>

        {mensaje && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
        {reseñaError && <Alert severity="error" sx={{ mt: 2 }}>{reseñaError}</Alert>}
      </Box>
    </Container>
  );
}
