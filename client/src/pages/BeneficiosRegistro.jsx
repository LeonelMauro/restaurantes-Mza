import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

const beneficios = [
  {
    titulo: 'Mayor visibilidad',
    descripcion: 'Tu negocio estará visible para miles de turistas y locales que usan nuestra plataforma cada día.',
  },
  {
    titulo: 'Promoción personalizada',
    descripcion: 'Mostrá tus platos estrella, promociones y eventos en una ficha única y atractiva.',
  },
  {
    titulo: 'Gestión de menú y promociones',
    descripcion: 'Cargá y actualizá fácilmente tu menú y ofertas desde el panel administrativo.',
  },
  {
    titulo: 'Reseñas verificadas',
    descripcion: 'Recibí valoraciones de clientes reales que ayudan a mejorar tu reputación.',
  },
  {
    titulo: 'Estadísticas de rendimiento',
    descripcion: 'Accedé a datos sobre visitas, reservas y comportamiento de tus clientes.',
  },
  {
    titulo: 'Soporte dedicado',
    descripcion: 'Nuestro equipo te acompaña en la configuración y optimización de tu perfil.',
  },
];

const BeneficiosRegistro = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 6, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        ¿Por qué registrar tu restaurante o bar?
      </Typography>
      <Grid container spacing={3}>
        {beneficios.map((beneficio, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>{beneficio.titulo}</Typography>
              <Typography variant="body1">{beneficio.descripcion}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BeneficiosRegistro;
