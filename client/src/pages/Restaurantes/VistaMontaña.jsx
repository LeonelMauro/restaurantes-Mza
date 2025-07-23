import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rating from '@mui/material/Rating';


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
    <Box sx={{ backgroundColor: '#fff', py: 6 }}>
      <Container>
        {/* Restaurantes */}
        <Typography
          variant="h1"
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
            <Grid item xs={12} sm={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/restaurante/${resto.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%', // Para que todas las tarjetas se expandan igual
                    maxWidth: 320, // Ancho fijo para todas las tarjetas
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
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
                  {resto.photos && resto.photos[0]?.url && (
                    <CardMedia
                      component="img"
                      image={`http://localhost:3000/${resto.photos[0].url}`}
                      alt={resto.nombre}
                      sx={{
                        height: 180,
                        objectFit: 'cover',
                        borderRadius: '12px 12px 0 0',
                      }}
                    />
                  )}

                  <CardContent sx={{ flexGrow: 1 }} >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                          fontFamily: 'Kaushan Script',
                          fontWeight: 'bold',
                          color: '#000',
                          display: '-webkit-box',
                          WebkitLineClamp: 2, // Máximo 2 líneas
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          minHeight: '64px', // Espacio reservado para evitar tarjetas más bajas
                        }}
                      >
                        {resto.nombre}
                        <Box display="flex" justifyContent="center" mt={1}>
                          <Rating 
                            name="read-only" 
                            value={resto.promedio} 
                            readOnly 
                            precision={0.5} 
                          />
                        </Box>
                      </Typography>
                      

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
            fontFamily: 'Kaushan Script',
            fontWeight: 'bold',
            color: 'black',
            my: 6,
          }}
        >
          Lugares
        </Typography>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={1}
          arrows={true}        // 👈 activa las flechas
          autoplay={true}      // 👈 mueve automáticamente
          autoplaySpeed={3000} // 👈 cada 3 segundos
                >
          {departamentos.map((dep) => (
            <Box key={dep.id} sx={{ px: 1 }}>
              <Link to={`/departamento/${dep.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#f5e6d3' }}>
                  {dep.imagenUrl && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={`http://localhost:3000/${dep.imagenUrl}`}
                      alt={dep.nombre}
                      sx={{ borderRadius: '12px 12px 0 0' }}
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