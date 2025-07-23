import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';

const FormPromocion = () => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    precio: '',
  });

  const [restauranteId, setRestauranteId] = useState(null);
  const [mensaje, setMensaje] = useState('');
const [promociones, setPromociones] = useState([]);
  

  useEffect(() => {
     const fetchRestauranteId = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!token || !userId) return;
      try {
        const res = await axios.get(`http://localhost:3000/restaurante/by-user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestauranteId(res.data.id);
        fetchPromociones(res.data.id)
      } catch (err) {
        console.error('Error al obtener restaurante:', err);
      }
    };
    fetchRestauranteId();


  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fetchPromociones = async (restauranteId) => {
  try {
    const res = await axios.get(`http://localhost:3000/promociones/restaurante/${restauranteId}`);
    setPromociones(res.data);
  } catch (err) {
    console.error('Error al obtener promociones:', err);
  }
};

  const formatDateISO = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.length === 16 ? dateStr + ':00' : dateStr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token || !restauranteId) return;

    try {
      await axios.post(
        'http://localhost:3000/promociones',
        {
          titulo: form.titulo,
          descripcion: form.descripcion,
          fechaInicio: formatDateISO(form.fechaInicio),
          fechaFin: formatDateISO(form.fechaFin),
          precio: parseFloat(form.precio),
          restauranteId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMensaje('✅ Promoción agregada exitosamente');
      setForm({
        titulo: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        precio: '',
      });
    } catch (err) {
      console.error('Error al agregar promoción:', err);
      setMensaje('❌ Error al agregar la promoción');
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Agregar Promoción
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Título de la promoción"
            name="titulo"
            fullWidth
            margin="normal"
            value={form.titulo}
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
            label="Fecha de inicio"
            type="datetime-local"
            name="fechaInicio"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.fechaInicio}
            onChange={handleChange}
            required
          />
          <TextField
            label="Fecha de fin"
            type="datetime-local"
            name="fechaFin"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.fechaFin}
            onChange={handleChange}
            required
          />
          <TextField
            label="Precio"
            name="precio"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{ step: '0.01', min: 0 }}
            value={form.precio}
            onChange={handleChange}
            required
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
      {promociones.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h3" align="center" gutterBottom sx={{fontFamily: 'Kaushan Script', fontWeight: 'bold', color: 'black' }}>
                    Promociones especiales
                  </Typography>
      
                  <Grid container spacing={3}>
                    {promociones.map((promo) => (
                      <Grid item xs={12} sm={6} md={4} key={promo.id}>
                        <Card sx={{ height: '100%', backgroundColor: '#3D3C3B', borderRadius: 3, boxShadow: 3 }}>
                          <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffff' }}>
                              {promo.titulo}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, color: '#ffff' }}>
                              {promo.descripcion}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, color: '#ffff' }}>
                              ${promo.precio}
                            </Typography>
                            <Typography variant="caption" color="#ffff" sx={{ mt: 2, display: 'block' }}>
                              Vigencia: {new Date(promo.fechaInicio).toLocaleDateString()} - {new Date(promo.fechaFin).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
    </Box>
  );
};

export default FormPromocion;
