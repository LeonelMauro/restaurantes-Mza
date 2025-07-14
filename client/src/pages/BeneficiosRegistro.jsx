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
      <Typography variant="h2" align="center" gutterBottom sx={{ fontFamily: 'Kaushan Script'}}>
        ¿Por qué registrar tu restaurante o bar?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
      {beneficios.map((beneficio, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: '#FFF9F2',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
              },
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontFamily: 'Kaushan Script',
                color: '#8B5E3C',
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              {beneficio.titulo}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                color: '#3E3E3E',
                fontSize: '1.15rem',
                lineHeight: 1.9,
                backgroundColor: '#F5E6D3',
                borderRadius: 2,
                padding: 3,
                fontFamily: 'Georgia, serif',
                textAlign: 'justify',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
              }}
            >
              {beneficio.descripcion}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    </Box>
  );
};

export default BeneficiosRegistro;
