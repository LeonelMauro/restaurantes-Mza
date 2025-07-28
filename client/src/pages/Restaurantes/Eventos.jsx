import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Eventos = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    imagenUrl: '',
  });
  const [imagenes, setImagenes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [restauranteId, setRestauranteId] = useState(null);

  //editar evento
  const [editingId, setEditingId] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchRestauranteId = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!token || !userId) return;
      try {
        const res = await axios.get(`http://localhost:3000/restaurante/by-user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const idRestaurante = res.data.id;
        setRestauranteId(idRestaurante);
        fetchEventos(idRestaurante);
        // fetchPromociones(idRestaurante); // podés descomentar si necesitás promociones
      } catch (err) {
        console.error('Error al obtener restaurante:', err);
      }
    };
    fetchRestauranteId();
  }, []);

  const fetchEventos = async (restauranteId) => {
    try {
      const res = await axios.get(`http://localhost:3000/eventos/restaurante/${restauranteId}`);
      setEventos(res.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  try {
    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('descripcion', formData.descripcion);
    data.append('fecha', formData.fecha);
    data.append('hora', formData.hora);
    if (imagenes[0]) {
      data.append('imagen', imagenes[0]);
    }

    let res;
    if (editingId) {
      res = await axios.patch(`http://localhost:3000/eventos/${editingId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Evento actualizado');
    } else {
      res = await axios.post(`http://localhost:3000/eventos/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Evento creado');
    }

    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      imagenUrl: '',
    });
    setImagenes([]);
    setEditingId(null);
    fetchEventos(restauranteId);
  } catch (error) {
    console.error('Error al guardar evento:', error.response?.data || error.message);
    alert(JSON.stringify(error.response?.data || error.message, null, 2));
  }
};

  const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  if (!window.confirm('¿Estás seguro de que querés eliminar este evento?')) return;

  try {
    await axios.delete(`http://localhost:3000/eventos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Evento eliminado correctamente');
    fetchEventos(restauranteId);
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    alert('No se pudo eliminar el evento');
  }
};
const handleEdit = (evento) => {
  setFormData({
    titulo: evento.titulo,
    descripcion: evento.descripcion,
    fecha: evento.fecha.split('T')[0], // asegurás formato yyyy-mm-dd
    hora: evento.hora,
    imagenUrl: evento.imagenUrl || '',
  });
  setEditingId(evento.id);
};


  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Agregar Evento
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <TextField
            label="Nombre de Evento"
            name="titulo"
            fullWidth
            value={formData.titulo}
            onChange={handleChange}
            required
          />
          <TextField
            label="Descripción"
            name="descripcion"
            fullWidth
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          <TextField
            label="Fecha"
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora"
            name="hora"
            fullWidth
            value={formData.hora}
            onChange={handleChange}
            required
          />

          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              component="label"
              sx={{ color: '#3D3C3B', borderColor: '#3D3C3B' }}
            >
              Subir Imágenes
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Button>

            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              {imagenes.map((img, index) => (
                <Box key={index} position="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${index}`}
                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#3D3C3B',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#2b2b2a',
                },
              }}
            >
              Guardar Evento
            </Button>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>Eventos existentes</Typography>
          {eventos.map((evento) => (
            <Box key={evento.id} my={2} p={2} border="1px solid #ccc" borderRadius={2}>
              <Typography variant="h6">{evento.titulo}</Typography>
              <Typography>{evento.descripcion}</Typography>
              <Typography>Fecha: {evento.fecha}</Typography>
              <Typography>Hora: {evento.hora}</Typography>

              {evento.imagenUrl && (
                <Box
                  component="img"
                  src={`http://localhost:3000/${evento.imagenUrl}`}
                  alt={evento.titulo}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    mt: 1,
                    borderRadius: 2,
                  }}
                />
              )}

              <Box mt={1} display="flex" gap={2}>
                <Button variant="outlined" onClick={() => handleEdit(evento)}>
                  Editar
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(evento.id)}>
                  Eliminar
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

      </Box>
    </Paper>
  );
};

export default Eventos;
