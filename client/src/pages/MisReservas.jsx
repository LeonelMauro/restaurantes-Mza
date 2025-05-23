import React, { useEffect, useState } from 'react';
import mendoza from '../assets/img/home/mendoza-argentina.jpg'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from '@mui/material';
import axios from 'axios';

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reserva/mis-reservas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservas(response.data);
      } catch (error) {
        console.error('Error al obtener reservas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (reservas.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">No tenés reservas aún.</Typography>
      </Box>
    );
  }

 return (
  <Box
    sx={{
      position: 'relative',
      minHeight: '100vh',
      backgroundImage: `url(${mendoza})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Overlay oscuro */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opacidad negra
        zIndex: 1,
      }}
    />

    {/* Contenido encima del overlay */}
    <Box sx={{ fontFamily: 'Kaushan Script', position: 'relative', zIndex: 2, p: 2, mt: 8 }}>
      <Typography variant="h4" mb={2} textAlign="center" color="white">
        Mis Reservas
      </Typography>
      <Grid container spacing={2}>
        {reservas.map((reserva) => (
          <Grid item xs={12} sm={6} md={4} key={reserva.id}>
            <Card sx={{ backgroundColor: '#F5E6D3' }}>
              <CardContent>
                <Typography variant="h6">{reserva.restaurante?.nombre}</Typography>
                <Typography variant="body2">
                  Fecha: {new Date(reserva.fecha).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Personas: {reserva.cantidadPersonas}
                </Typography>
                <Typography variant="body2">
                  Hora: {reserva.fecha}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

};

export default MisReservas;
