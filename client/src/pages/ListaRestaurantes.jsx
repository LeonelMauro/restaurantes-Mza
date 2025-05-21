import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
} from '@mui/material';

import andeluna from '../assets/img/restaurantes/andeluna.jpg';
import atamisque from '../assets/img/restaurantes/atamisque.jpg';
import laazul from '../assets/img/restaurantes/la-azul.jpg';
import lacumbre from '../assets/img/restaurantes/la-cumbre.jpg';
import restodeViñedo from '../assets/img/restaurantes/resto-de-viñedo.jfif';
import maipu from '../assets/img/restaurantes/maipu.jpg';
import valledeuco from '../assets/img/restaurantes/valledeuco.jfif';
import lujan from '../assets/img/restaurantes/lujan.jfif';


const restaurantes = [
  {
    nombre: 'Rincón Atamisque',
    imagen: atamisque,
    descripcion: 'Gastronomía de autor, rodeada de viñedos y con vistas a la Cordillera de los Andes.',
    url: 'https://www.atamisque.com/',
  },
  {
    nombre: 'La Azul',
    imagen: laazul,
    descripcion: 'Restaurante con un ambiente relajado y vistas a los Andes.',
    url: 'https://bodegalaazul.com/',
  },
  {
    nombre: 'Andeluna Cellars',
    imagen: andeluna,
    descripcion: 'Restaurante en la bodega con amplias ventanas que enmarcan los Andes.',
    url: 'https://www.andeluna.com.ar/',
  },
  {
    nombre: 'La Cumbre',
    imagen: lacumbre,
    descripcion: 'Cocina regional en una terraza con paisajes de montaña incomparables.',
    url: 'https://www.instagram.com/resto_lacumbre/',
  },
  {
    nombre: 'Resto de Viñedo',
    imagen: restodeViñedo,
    descripcion: 'Sabores locales rodeados de viñedos y paz natural.',
    url: 'https://restodevinedo.com/', // Cambia esta URL si tienes una mejor
  },
];

const lugares = [
  {
    nombre: 'Valle de Uco',
    imagen: valledeuco,
  },
  {
    nombre: 'Luján de Cuyo',
    imagen: lujan,
  },
  {
    nombre: 'Maipú',
    imagen: maipu,
  },
];

export default function VistaMontaña() {
  return (
    <Box sx={{ backgroundColor: '#fff', py: 6 }}>
      <Container>
        {/* Restaurantes */}
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontFamily: 'Kaushan Script',
            fontWeight: 'bold',
            color: 'black',
            mb: 4,
          }}
        >
          Restaurantes
        </Typography>

        <Grid container spacing={4}>
          {restaurantes.map((resto, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <a
                href={resto.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    backgroundColor: '#d2b48c',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={resto.imagen}
                    alt={resto.nombre}
                    sx={{ borderRadius: '12px 12px 0 0' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                      {resto.nombre}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      {resto.descripcion}
                    </Typography>
                  </CardContent>
                </Card>
              </a>
              
            </Grid>
          ))}
        </Grid>
        

        {/* Lugares */}
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontFamily: 'Kaushan Script',
            fontWeight: 'bold',
            color: 'black',
            my: 6,
          }}
        >
          Lugares
        </Typography>

        <Grid container spacing={4}>
          {lugares.map((lugar, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: '#f5e6d3',
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={lugar.imagen}
                  alt={lugar.nombre}
                  sx={{ borderRadius: '12px 12px 0 0' }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {lugar.nombre}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
