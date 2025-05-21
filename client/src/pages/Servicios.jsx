import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TableBarIcon from '@mui/icons-material/TableBar';
import serviciosImg from '../assets/img/home/servicios.png';

const Servicios = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        pt: 12,
        pb: 8,
        backgroundColor: '#f5e6d3',
        overflow: 'hidden',
      }}
    >
      {/* Imagen de fondo */}
      <Box
        component="img"
        src={serviciosImg}
        alt="Ilustración de servicios"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.2,
        }}
      />

      {/* Contenido */}
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'black', mb: 2, textAlign: 'center' }}>
          Nuestros Servicios
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'black', mb: 5, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
          Comer entre Montañas conecta a turistas con experiencias gastronómicas inolvidables en los mejores restaurantes de Mendoza.
        </Typography>

        <Grid container spacing={4}>
          {/* Turistas */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: '#e7d9cd',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <TableBarIcon sx={{ fontSize: 40, color: '#8B5E3C' }} />
                <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold' }}>
                  Para Turistas
                </Typography>
              </Stack>
              <ul style={{ paddingLeft: '1rem', color: 'black', lineHeight: 1.8 }}>
                <li>Reservá tu mesa de forma rápida y segura.</li>
                <li>Explorá menús, precios y vistas antes de decidir.</li>
                <li>Leé reseñas de otros turistas.</li>
              </ul>
              <Button
                variant="contained"
                sx={{ mt: 3, backgroundColor: '#8B5E3C', '&:hover': { backgroundColor: '#A7714C' } }}
                href="/login"
              >
                Reservar Ahora
              </Button>
            </Paper>
          </Grid>

          {/* Restaurantes */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: '#e7d9cd',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <RestaurantMenuIcon sx={{ fontSize: 40, color: '#8B5E3C' }} />
                <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold' }}>
                  Para Restaurantes
                </Typography>
              </Stack>
              <ul style={{ paddingLeft: '1rem', color: 'black', lineHeight: 1.8 }}>
                <li>Publicá tus menús y promociones.</li>
                <li>Recibí reservas directamente desde la app.</li>
                <li>Destacá tu restaurante ante miles de visitantes.</li>
              </ul>
              <Button
                variant="contained"
                sx={{ mt: 3, backgroundColor: '#8B5E3C', '&:hover': { backgroundColor: '#A7714C' } }}
                href="/register"
              >
                Publicar Mi Restaurante
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Servicios;
