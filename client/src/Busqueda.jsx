import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography
} from '@mui/material';

const Busqueda = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  const [restaurantes, setRestaurantes] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRedirectRestaurante = (id) => {
    navigate(`/restaurante/${id}`);
  };

  const handleRedirectDepartamento = (id) => {
    navigate(`/departamento/${id}`);
  };

  useEffect(() => {
    const fetchResultados = async () => {
      setLoading(true);
      try {
        const [resRestaurantes, resDepartamentos] = await Promise.all([
          axios.get(`http://localhost:3000/restaurante/search?query=${query}`),
          axios.get(`http://localhost:3000/departamento/search/${query}`)
        ]);
        setRestaurantes(resRestaurantes.data);
        setDepartamentos(resDepartamentos.data);
      } catch (err) {
        console.error('Error en búsqueda:', err);
        setRestaurantes([]);
        setDepartamentos([]);
      }
      setLoading(false);
    };

    if (query) fetchResultados();
  }, [query]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Resultados para "{query}"
      </Typography>

      {/* Resultados Restaurantes */}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Restaurantes
      </Typography>
      <Grid container spacing={2}>
        {restaurantes.length > 0 ? (
          restaurantes.map((restaurante) => (
            <Grid item xs={12} sm={6} md={4} key={restaurante.id}>
              <Card
                onClick={() => handleRedirectRestaurante(restaurante.id)}
                sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
              >
                <CardContent>
                  <Typography variant="subtitle1">{restaurante.nombre}</Typography>
                  {/* Podés agregar más info como fotos o descripción */}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No se encontraron restaurantes.</Typography>
          </Grid>
        )}
      </Grid>

      {/* Resultados Departamentos */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Departamentos
      </Typography>
      <Grid container spacing={2}>
        {departamentos.length > 0 ? (
          departamentos.map((departamento) => (
            <Grid item xs={12} sm={6} md={4} key={departamento.id}>
              <Card
                onClick={() => handleRedirectDepartamento(departamento.id)}
                sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
              >
                <CardContent>
                  <Typography variant="subtitle1">{departamento.nombre}</Typography>
                  {/* Podés agregar más info como descripción */}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No se encontraron departamentos.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Busqueda;
