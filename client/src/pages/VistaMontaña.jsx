import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rating from '@mui/material/Rating';
import { restaurantesStyles } from '../styles/restaurantesStyles';



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



export default function VistaMontaña() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/departamento')
      .then(res => setDepartamentos(res.data))
      .catch(err => console.error('Error cargando departamentos:', err));
  }, []);


  useEffect(() => {
  axios.get('http://localhost:3000/restaurante')
    .then(async res => {
      const restaurantesConPromedio = await Promise.all(
        res.data.map(async (restaurante) => {
          try {
            const promedioRes = await axios.get(`http://localhost:3000/resenas/promedio/${restaurante.id}`);
            return {
              ...restaurante,
              promedio: promedioRes.data.promedio
            };
          } catch (err) {
            console.error('Error obteniendo promedio de restaurante', restaurante.id, err);
            return { ...restaurante, promedio: 0 };
          }
        })
      );
      // 🔽 Acá se ordenan de mayor a menor promedio
      restaurantesConPromedio.sort((a, b) => b.promedio - a.promedio);
    console.log(restaurantesConPromedio)
      setRestaurantes(restaurantesConPromedio);
    })
    .catch(err => console.error('Error cargando restaurantes:', err));
}, []);

  return (
    <Box sx={restaurantesStyles.section}>
  <Container sx={restaurantesStyles.container}>

    <Typography
      variant="h1"
      align="center"
      sx={{
        ...restaurantesStyles.title,
      }}
    >
      Restaurantes
    </Typography>

    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
    >
      {restaurantes.map((resto, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          sx={restaurantesStyles.restaurantGridItem}
        >
          <Link
            to={`/restaurante/${resto.id}`}
            style={restaurantesStyles.link}
          >
            <Card sx={restaurantesStyles.restaurantCard}>

              <Box sx={restaurantesStyles.restaurantImageContainer}>
                {resto.photos?.[0]?.url ? (
                  <CardMedia
                    component="img"
                    image={`http://localhost:3000/${resto.photos[0].url}`}
                    alt={resto.nombre}
                    sx={restaurantesStyles.image}
                  />
                ) : (
                  <Box sx={restaurantesStyles.noImage} />
                )}
              </Box>

              <CardContent sx={restaurantesStyles.restaurantContent}>
                <Typography
                  variant="h5"
                  align="center"
                  sx={restaurantesStyles.restaurantName}
                >
                  {resto.nombre}
                </Typography>

                <Rating
                  name={`rating-${resto.id}`}
                  value={resto.promedio}
                  readOnly
                  precision={0.5}
                  sx={restaurantesStyles.rating}
                />
              </CardContent>

            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
        {/* Lugares */}
        <Typography
          variant="h1"
          align="center"
          sx={{
          ...restaurantesStyles.title,
        }}
        >
          Lugares
        </Typography>
        <Slider
          dots
          infinite
          speed={500}
          slidesToScroll={1}
          arrows
          autoplay
          autoplaySpeed={3000}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {departamentos.map((dep) => (
            <Box key={dep.id} sx={{ px: 1 }}>
              <Link to={`/departamento/${dep.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#f5e6d3' }}>
                  {dep.imagenUrl && (
                    <CardMedia
                      component="img"
                      image={`http://localhost:3000/${dep.imagenUrl}`}
                      alt={dep.nombre}
                      sx={{
                        width: '100%',
                        height: {
                          xs: 160,
                          sm: 170,
                          md: 180,
                        },
                        objectFit: 'cover',
                        borderRadius: '12px 12px 0 0',
                      }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                      {dep.nombre}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))}
        </Slider> 
      </Container>
    </Box>
  );
}