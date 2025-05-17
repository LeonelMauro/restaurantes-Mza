import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import descubrir from '../assets/img/nosotros/descubrir1.jpg';
import reservar from '../assets/img/nosotros/reservar.jpg';
import experiencia from '../assets/img/nosotros/experiencia.jpg';

const features = [
    descubrir,reservar,experiencia,
];

const Nosotros = () => {
  return (
    <Box id='nosotros' sx={{ py: 8, px: 4, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Comidas
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
                        borderRadius: 4,
                        border: '1px solid rgba(0, 0, 0, 0,7)', // borde sutil gris claro
                        boxShadow: '0px 8px 20px rgba(0,0,0,0.2)', // sombra moderada
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: '0px 12px 24px rgba(0,0,0,0.3)',
                        },
                    }}>
              <CardMedia
                component="img"
                height="280"
                image={feature}
                alt={`feature-${index}`}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Nosotros;
