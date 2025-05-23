import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import BackgroundCarousel from '../Components/BackgroundCarousel';
import descubrir from '../assets/img/nosotros/descubrir1.jpg';
import reservar from '../assets/img/nosotros/reservar.jpg';
import experiencia from '../assets/img/nosotros/experiencia.jpg';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const features = [descubrir, reservar, experiencia];

const pasos = [
  {
    icon: <SearchIcon sx={{ fontSize: 50, color: '#8B5E3C' }} />,
    title: 'Descubrí',
    description: 'Explorá los mejores restaurantes entre montañas.'
  },
  {
    icon: <EventAvailableIcon sx={{ fontSize: 50, color: '#8B5E3C' }} />,
    title: 'Reservá',
    description: 'Elegí tu lugar favorito y reservá con un clic.'
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 50, color: '#8B5E3C' }} />,
    title: 'Disfrutá',
    description: 'Viví una experiencia única con sabores y paisajes.'
  }
];

const testimonios = [
  {
    text: 'Una experiencia única, excelente comida y vistas increíbles.',
    autor: 'Juan, turista chileno'
  },
  {
    text: 'Ideal para escapadas románticas, ¡la comida es deliciosa!',
    autor: 'María, Mendoza'
  },
  {
    text: '¡Volveré cada vez que venga a la montaña!',
    autor: 'Lucas, Córdoba'
  }
];

const Home = () => {
  return (
    <Box id="inicio" sx={{ mt: '64px' }}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <BackgroundCarousel />
        <Box sx={{ position: 'absolute', zIndex: 1, p: 4 }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px rgba(0,0,0,1)`
            }}
          >
            CEM
          </Typography>

          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: 'white',
              textShadow: `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 2px rgba(0,0,0,1)`
            }}
          >
            COMER ENTRE MONTAÑAS
          </Typography>

        </Box>
      </Box>

      {/* Cómo funciona */}
      <Box sx={{ py: 8, px: 4, textAlign: 'center', backgroundColor: '#F5E6D3' }}>
        <Typography variant="h2" sx={{ fontFamily: 'Kaushan Script', mb: 6, fontWeight: 'bold', color: 'black' }}>
          ¿Cómo funciona?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {pasos.map((paso, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {paso.icon}
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>{paso.title}</Typography>
                <Typography variant="body1" sx={{ mt: 1, maxWidth: 300 }}>{paso.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Comidas destacadas */}
      <Box id="nosotros" sx={{ py: 10, px: 4, textAlign: 'center', backgroundColor: '#D2B48C' }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontFamily: 'Kaushan Script', mb: 6, fontWeight: 'bold', color: 'black' }}
        >
          Comidas destacadas
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0px 12px 24px rgba(0,0,0,0.3)',
                  },
                }}
              >
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

      {/* Testimonios */}
      <Box sx={{ py: 8, px: 4, backgroundColor: '#B29C7D', textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontFamily: 'Kaushan Script', mb: 6, fontWeight: 'bold', color: 'black' }}>
          Lo que dicen nuestros visitantes
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonios.map((testi, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Typography>"{testi.text}"</Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, fontStyle: 'italic', color: '#8B5E3C' }}>
                  — {testi.autor}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA: Agregar restaurante */}
      <Box sx={{ textAlign: 'center', py: 6, backgroundColor: '#fff' }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          ¿Sos dueño de un restaurante?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Agregá tu restaurante a la plataforma y recibí más visitantes.
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to="/beneficios"
          sx={{
            color: '#8B5E3C',
            borderColor: '#8B5E3C',
            '&:hover': {
              backgroundColor: '#8B5E3C',
              color: 'white'
            }
          }}
        >
          Agregá tu restaurante
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
