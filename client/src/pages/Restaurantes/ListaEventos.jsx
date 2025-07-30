import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/eventos');
        setEventos(res.data);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h1" align="center" sx={{ fontFamily: 'Kaushan Script', mb: 3 }}>
        Eventos 
      </Typography>
      <Grid container spacing={3} align="center" mt={4}>
        {eventos.map((evento) => (
          <Grid item xs={12} sm={6} md={4} key={evento.id}>
            <Card
              sx={{
                height: '100%',
                maxWidth: 500,
                backgroundColor: '#3D3C3B',
                color: '#fff',
                borderRadius: 3,
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                flexDirection: 'column',
                justifyContent: 'space-between',
                    
                },
              }}
              onClick={() => navigate(`/restaurante/${evento.restaurante.id}`)}
            >
              <CardContent>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontFamily: 'Kaushan Script' }}>
                  {evento.titulo}
                </Typography>

                <Typography sx={{ textAlign: 'justify', mb: 1 }}>
                  {evento.descripcion}
                </Typography>

                <Typography>📅 Fecha: {new Date(evento.fecha).toLocaleDateString()}</Typography>
                <Typography>⏰ Hora: {evento.hora}</Typography>

                {evento.imagenUrl && (
                  <Box
                    component="img"
                    src={`http://localhost:3000/${evento.imagenUrl}`}
                    alt={evento.titulo}
                    sx={{
                      width: '100%',
                      height: 180,
                      objectFit: 'cover',
                      mt: 2,
                      borderRadius: 2,
                    }}
                  />
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#F5E6D3',
                      color: '#3D3C3B',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#e2d3c1',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // para que no se dispare el onClick del Card
                      navigate(`/reservar-evento/${evento.id}`);
                    }}
                  >
                    Reservar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListaEventos;
