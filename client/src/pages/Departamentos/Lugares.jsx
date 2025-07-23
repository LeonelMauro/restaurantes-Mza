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

export default function Lugares() {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/departamento')
      .then(res => setDepartamentos(res.data))
      .catch(err => console.error('Error cargando departamentos:', err));
  }, []);

  return (
    <Box sx={{ backgroundColor: '#fff', py: 6 }}>
      <Container>
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
          Departamentos
        </Typography>

        <Grid container spacing={4}>
          {departamentos.map((dep, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/departamento/${dep.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    maxWidth: 320,
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
                  {dep.imagenUrl && (
                    <CardMedia
                      component="img"
                      image={`http://localhost:3000/${dep.imagenUrl}`}
                      alt={dep.nombre}
                      sx={{
                        height: 180,
                        objectFit: 'cover',
                        borderRadius: '12px 12px 0 0',
                      }}
                    />
                  )}

                  <CardContent>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{
                        fontFamily: 'Kaushan Script',
                        fontWeight: 'bold',
                        color: '#000',
                      }}
                    >
                      {dep.nombre}
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
