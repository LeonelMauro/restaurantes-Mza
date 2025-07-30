import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null); // 👈 para el dialogo
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchReservas();
  }, [token]);

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

  const handleOpenDialog = (reserva) => {
    setReservaSeleccionada(reserva);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setReservaSeleccionada(null);
    setDialogOpen(false);
  };

  const handleCancelarReserva = async () => {
    try {
      await axios.delete(`http://localhost:3000/reserva/${reservaSeleccionada.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservas(reservas.filter((r) => r.id !== reservaSeleccionada.id));
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
    } finally {
      handleCloseDialog();
    }
  };

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
        <Typography variant="h3"sx={{fontFamily: 'Kaushan Script'}}>No tenés reservas aún.</Typography>
      </Box>
    );
  }
  const reservasEvento = reservas.filter((r) => r.evento);
  const reservasNormales = reservas.filter((r) => !r.evento );


  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />

      {/* Contenido encima del overlay */}
      <Box sx={{ fontFamily: 'Kaushan Script', position: 'relative', zIndex: 2, p: 2, mt: 8 }}>
        <Typography variant="h4" mb={2} textAlign="center" color="white" sx={{fontFamily: 'Kaushan Script'}}>
          Mis Reservas
        </Typography>
        <Grid container spacing={2}>
          {reservasNormales.map((reserva) => (
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
                    Hora: {new Date(reserva.fecha).toLocaleTimeString('es-AR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                     Estado: {reserva.estado}
                  </Typography>
                  
                  
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleOpenDialog(reserva)}
                  >
                    Cancelar reserva
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" mb={2} textAlign="center" color="white" sx={{fontFamily: 'Kaushan Script'}}>
          Eventos 
        </Typography>
        <Grid container spacing={2}>
        {reservasEvento.map((reserva) => (
          <Grid item xs={12} sm={6} md={4} key={reserva.id}>
            <Card sx={{ backgroundColor: '#F5E6D3' }}>
              <CardContent>
                <Typography variant="h6">🎉 {reserva.evento?.titulo}</Typography>
                <Typography variant="body2">
                  Restaurante: {reserva.restaurante?.nombre}
                </Typography>
                <Typography variant="body2">
                  Fecha: {new Date(reserva.fecha).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Hora: {new Date(reserva.fecha).toLocaleTimeString('es-AR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
                <Typography variant="body2">
                  Personas: {reserva.cantidadPersonas}
                </Typography>
                <Typography variant="body2">Estado: {reserva.estado}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => handleOpenDialog(reserva)}
                >
                  Cancelar reserva
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>

      {/* Dialog de confirmación */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>¿Cancelar reserva?</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que querés cancelar esta reserva?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleCancelarReserva} color="error">
            Sí, cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MisReservas;
