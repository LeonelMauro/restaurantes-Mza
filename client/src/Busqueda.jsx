import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';

const Busqueda = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  const [resultados, setResultados] = useState([]);

  const handleRedirect = (id) => {
    navigate(`/restaurante/${id}`);
  };

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/restaurante/search?query=${query}`);
        setResultados(res.data);
      } catch (err) {
        console.error('Error en búsqueda:', err);
      }
    };

    if (query) fetchResultados();
  }, [query]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {resultados.length > 0 ? (
          resultados.map((restaurante) => (
            <Grid item xs={12} sm={6} md={4} key={restaurante.id}>
              <Card
                onClick={() => handleRedirect(restaurante.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 }
                }}
              >
                
                <CardContent>
                  <Typography variant="h6">{restaurante.nombre}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6">No se encontraron resultados.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Busqueda;
