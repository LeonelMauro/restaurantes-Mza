import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

const DepartamentoDetalle = () => {
  const { id } = useParams();
  const [departamento, setDepartamento] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/departamento/${id}`)
      .then(res => setDepartamento(res.data))
      .catch(err => console.error('Error cargando departamento:', err));
  }, [id]);

  if (!departamento) return <p>Cargando...</p>;

  return (
    <Box p={4}>
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontFamily: 'Kaushan Script',
          fontWeight: 'bold',
          color: 'black',
          mb: 3,
        }}
      >
        {departamento.nombre}
      </Typography>

      {/* Imagen del Departamento con diseño flexible */}
      <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 3, maxWidth: 1000, mx: 'auto', mb: 3 }}>
        <Box
          component="img"
          src={`http://localhost:3000/${departamento.imagenUrl}`}
          alt={departamento.nombre}
          sx={{
            width: '100%',
            height: { xs: 250, sm: 350, md: 400 },
            objectFit: 'cover',
          }}
        />
      </Paper>

      {/* Descripción */}
      <Typography
        variant="body1"
        sx={{
          fontStyle: 'italic',
          color: '#4E4B4B',
          fontSize: '1.1rem',
          lineHeight: 1.8,
          mb: 4,
          textAlign: 'center',
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        {departamento.descripcion}
      </Typography>

      {/* Lista de Restaurantes */}
      <Grid container spacing={3} justifyContent="center">
        {departamento.restaurantes.map((r) => (
        <Grid item xs={12} sm={6} md={4} key={r.id}>
          <Link to={`/restaurante/${r.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ height: '100%', cursor: 'pointer' }}>
              {r.photos && r.photos[0]?.url && (
                <CardMedia
                  component="img"
                  image={`http://localhost:3000/${r.photos[0].url}`}
                  alt={r.nombre}
                  sx={{ height: 200, objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>{r.nombre}</Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>{r.descripcion}</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
      </Grid>
    </Box>
  );
};

export default DepartamentoDetalle;
