import { Link } from 'react-router-dom';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

import valledeuco from '../assets/img/restaurantes/valledeuco.jfif';
import lujan from '../assets/img/restaurantes/lujan.jfif';
import maipu from '../assets/img/restaurantes/maipu.jpg';

const lugares = [
  { nombre: 'Valle de Uco', imagen: valledeuco },
  { nombre: 'Luján de Cuyo', imagen: lujan },
  { nombre: 'Maipú', imagen: maipu },
];

export default function VistaMontaña() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/restaurante') // Cambiá esto si tu API tiene otro puerto o URL
      .then(res => setRestaurantes(res.data))
      .catch(err => console.error('Error cargando restaurantes:', err));
  }, []);

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
              <Link
                    to={`/RestauranteDetalle`}
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
                {/* Asegurate que la propiedad 'photos' y 'url' existan en el objeto que devuelve tu backend */}
                {resto.photos && resto.photos[0]?.url && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={`http://localhost:3000/${resto.photos[0].url}`} // ruta pública a la imagen
                    alt={resto.nombre}
                    sx={{ borderRadius: '12px 12px 0 0' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                    {resto.nombre}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    {resto.descripcion}
                  </Typography>
                </CardContent>
              </Card>
              </Link>
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
             <Link
                to={`/restaurantes/${lugar.nombre}`} // Asegurate que el objeto tenga el id
                style={{ textDecoration: 'none' }}
            >
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
            </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
