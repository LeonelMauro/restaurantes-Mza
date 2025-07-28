import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ✅ FALTABA ESTA LÍNEA

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);

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
          <Card sx={{ height: '100%', backgroundColor: '#3D3C3B', color: '#fff', borderRadius: 3, }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {evento.titulo}
              </Typography>

              <Typography sx={{ textAlign: 'justify', mb: 1 }}>
                {evento.descripcion}
              </Typography>

              <Typography>📅 Fecha: {evento.fecha}</Typography>
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

              {/* Botón Reservar centrado */}
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
                  onClick={() => navigate(`/reservar-evento/${evento.id}`)}
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
