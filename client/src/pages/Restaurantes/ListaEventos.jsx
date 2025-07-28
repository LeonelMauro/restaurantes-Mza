import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
} from '@mui/material';

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
        {eventos.map((evento) => (
            <Box key={evento.id} my={2} p={2} border="1px solid #ccc">
            <Typography variant="h6">{evento.titulo}</Typography>
            <Typography>{evento.descripcion}</Typography>
            <Typography>Fecha: {new Date(evento.fecha).toLocaleDateString()}</Typography>
            <Typography>Hora: {evento.hora}</Typography>
            {evento.imagenUrl && (
                <Box
                component="img"
                src={`http://localhost:3000/uploads/${evento.imagenUrl}`}
                alt={evento.titulo}
                sx={{
                    width: '100%',
                    height: { xs: 250, sm: 350, md: 400 },
                    objectFit: 'cover',
                    borderRadius: 2,
                }}
                />
            )}
            </Box>
        ))}
    </Box>

  );
};

export default ListaEventos;
