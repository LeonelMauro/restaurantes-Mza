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
  Alert,
   Grid, Card, CardContent
} from '@mui/material';

export default function RestauranteDetalle() {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  // debajo de const [restaurante, setRestaurante] = useState(null);
  const [resenas, setResenas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //menu
  const [menu, setMenu] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  //reserva
  const [cantidadPersonas, setCantidadPersonas] = useState(1);

  // Reseña
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);
  const [mensaje, setMensaje] = useState('');
  const [reseñaError, setReseñaError] = useState('');
  const [fechaReserva, setFechaReserva] = useState('');
  

  useEffect(() => {
  fetch(`http://localhost:3000/restaurante/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setRestaurante(data);
      if (data.resenas) setResenas(data.resenas);
      if (data.menu) setMenu(data.menu);
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
  if (!comentario.trim()) { // trim() elimina espacios al inicio y fin
    setReseñaError('El comentario no puede estar vacío.');
    return; // corta la ejecución y no envía nada
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
      userId: parseInt(localStorage.getItem("userId")),
    }),

    });

    if (!response.ok) throw new Error("Error al enviar reseña");

    const data = await response.json();
    setResenas((prev) => [data, ...prev]); // Agrega la nueva reseña
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

  const handleReserva = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!userId || !token) {
    alert("Debes iniciar sesión para realizar una reserva.");
    return;
  }

  if (!fechaReserva || !cantidadPersonas) {
    alert("Por favor completá la fecha y la cantidad de personas.");
    return;
  }
  

  try {
    const response = await fetch(`http://localhost:3000/reserva/crear/${restaurante.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fecha: new Date(fechaReserva).toISOString(),
        cantidadPersonas: parseInt(cantidadPersonas),
        usuarioId: parseInt(userId),
        restauranteId: restaurante.id,
      }),
    });

    if (!response.ok) throw new Error("Error al guardar la reserva");

    if (parseInt(cantidadPersonas) < 1 || parseInt(cantidadPersonas) > 8) {
    alert("La cantidad de personas debe ser entre 1 y 8.");
    return;
  }


    const data = await response.json();
    alert("¡Reserva registrada correctamente para: " + new Date(data.fecha).toLocaleString() + "!");

    // Limpiar campos si se desea
    setFechaReserva('');
    setCantidadPersonas(1);
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al guardar la reserva");
  }
};




  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!restaurante) return <Typography>Restaurante no encontrado</Typography>;

  return (
    <Container sx={{ py: 5, }}>
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

      <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            color: '#4E4B4B',
            fontSize: '1.1rem',
            lineHeight: 1.8,
            mt: 1,
            mb: 2,
          }}
        >
          {restaurante.descripcion}
        </Typography>

      <Typography variant="body1" sx={{ color: 'black', mt: 1, textAlign: 'right', fontWeight: 'bold',  }}>{restaurante.direccion}</Typography>
      <Typography variant="body1" sx={{ color: 'black', mt: 1, textAlign: 'right', fontWeight: 'bold',  }}>{restaurante.horario}</Typography>
      <Typography variant="body1" sx={{ color: 'black', mt: 1, textAlign: 'right', fontWeight: 'bold',  }}>{restaurante.contacto}</Typography>
      
      {restaurante.promociones && restaurante.promociones.length > 0 && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h3" align="center" gutterBottom sx={{fontFamily: 'Kaushan Script', fontWeight: 'bold', color: 'black' }}>
      Promociones especiales
    </Typography>

    <Grid container spacing={3}>
      {restaurante.promociones.map((promo) => (
        <Grid item xs={12} sm={6} md={4} key={promo.id}>
          <Card sx={{ height: '100%', backgroundColor: '#3D3C3B', borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffff' }}>
                {promo.titulo}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: '#ffff' }}>
                {promo.descripcion}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Vigencia: {new Date(promo.fechaInicio).toLocaleDateString()} - {new Date(promo.fechaFin).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)}




      {/* Datos del usuario responsable */}
      {restaurante.usuario && (
        <Box sx={{ mt: 3 }}>
          
          <Button
            variant="outlined"
            color="#3D3C3B"
            onClick={() => setMostrarMenu(!mostrarMenu)}
            sx={{ backgroundColor: '#3D3C3B', color: '#fff' }}
          >
            {mostrarMenu ? "Ocultar menú" : "Ver menú"}
          </Button>
          {mostrarMenu && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Menú del restaurante
                </Typography>
                {menu.length === 0 ? (
                  <Typography variant="body1">Este restaurante aún no cargó su menú.</Typography>
                ) : (
                  menu.map((item) => (
                    <Box key={item.id} sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
                      <Typography variant="subtitle1">{item.nombre}</Typography>
                      <Typography variant="body2">{item.descripcion}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>${item.precio}</Typography>
                    </Box>
                  ))
                )}
              </Box>
            )}
        </Box>
      )}

      {/* Formulario de Reseña */}
      <Box component="form" onSubmit={handleEnviarReseña} sx={{ mt: 6 }}>
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Reseñas de otros usuarios
          </Typography>

          {resenas.length === 0 ? (
            <Typography variant="body1">Todavía no hay reseñas.</Typography>
          ) : (
            resenas.map((resena) => (
              <Box key={resena.id} sx={{ my: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {resena.usuario?.nombre || "Usuario anónimo"}
                </Typography>
                <Rating value={resena.puntuacion} readOnly />
                <Typography variant="body2">{resena.comentario}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(resena.fecha).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          )}
        </Box>

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

        <Button variant="contained" color="3D3C3B" type="submit" 
        sx={{backgroundColor: '#3D3C3B', color: '#fff'}}>
          Enviar reseña
        </Button>

        {mensaje && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
        {reseñaError && <Alert severity="error" sx={{ mt: 2 }}>{reseñaError}</Alert>}
      </Box>
    <Box sx={{ mt: 6 }}>
  <Typography variant="h5" gutterBottom>
    Hacer una reserva
  </Typography>

  <TextField
    label="Seleccioná fecha y hora"
    type="datetime-local"
    fullWidth
    value={fechaReserva}
    onChange={(e) => setFechaReserva(e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
    sx={{ my: 2 }}
  />

  <TextField
  label="Cantidad de personas"
  type="number"
  fullWidth
  value={cantidadPersonas}
  onChange={(e) => setCantidadPersonas(e.target.value)}
  inputProps={{ min: 1, max: 8 }}
  sx={{ my: 2 }}
  />


  <Button
     variant="contained"
    sx={{ backgroundColor: '#322B23', color: '#fff' }}
    onClick={handleReserva}
  >
    Reservar
  </Button>
</Box>


    </Container>
  );
}
