import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import axios from 'axios';

const FormularioMenu = () => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
  });
  const [restauranteId, setRestauranteId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchRestauranteId = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!token || !userId) return;

      try {
        const res = await axios.get(`http://localhost:3000/restaurante/by-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRestauranteId(res.data.id);
      } catch (err) {
        console.error('Error al obtener restaurante:', err);
      }
    };

    fetchRestauranteId();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token || !restauranteId) {
      alert('Falta token o restaurante.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/menu/create',
        {
          ...form,
          precio: parseFloat(form.precio),
          restauranteId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje('Menú agregado exitosamente');
      setForm({ nombre: '', descripcion: '', precio: '' });
    } catch (err) {
      console.error(err);
      setMensaje('Error al agregar menú');
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Agregar ítem al Menú
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre del plato"
            name="nombre"
            fullWidth
            margin="normal"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <TextField
            label="Descripción"
            name="descripcion"
            fullWidth
            margin="normal"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
          <TextField
            label="Precio"
            name="precio"
            type="number"
            fullWidth
            margin="normal"
            value={form.precio}
            onChange={handleChange}
            required
            inputProps={{ step: "0.01", min: 0 }}
          />
          <Button
            type="submit"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#8B5E3C', color: 'white' }}
          >
            Guardar
          </Button>
          {mensaje && (
            <Typography mt={2} color={mensaje.includes('Error') ? 'error' : 'green'}>
              {mensaje}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default FormularioMenu;
