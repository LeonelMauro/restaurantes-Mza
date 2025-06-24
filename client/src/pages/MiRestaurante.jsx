import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const MiRestaurante = () => {
  const { id } = useParams(); // ID del restaurante
  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/restaurante/${id}`)
      .then((res) => {
        setRestaurante(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el restaurante", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!restaurante) return <Typography>Error cargando restaurante</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Mi Restaurante</Typography>
      <Typography variant="h6">{restaurante.nombre}</Typography>
      <Typography variant="body1">{restaurante.descripcion}</Typography>
      <Typography variant="body2">{restaurante.direccion}</Typography>
      <Typography variant="body2">Contacto: {restaurante.contacto}</Typography>

      <Box mt={4}>
        <Button
          variant="contained"
          onClick={() => navigate(`/menu/${id}`)}
          sx={{ mr: 2 }}
        >
          Menú
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/promociones/${id}`)}
          sx={{ mr: 2 }}
        >
          Promociones
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/eventos/${id}`)}
          sx={{ mr: 2 }}
        >
          Eventos
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(`/editar-restaurante/${id}`)}
        >
          Editar datos
        </Button>
      </Box>
    </Box>
  );
};

export default MiRestaurante;
