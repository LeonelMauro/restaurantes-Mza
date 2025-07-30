import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

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
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

  // Obtener el restaurante del usuario logueado
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
    setImagenes(files);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      if (imagenes[0]) data.append('imagen', imagenes[0]);

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

      resetForm();
      fetchEventos(restauranteId);
    } catch (error) {
      console.error('Error al guardar evento:', error.response?.data || error.message);
      alert(JSON.stringify(error.response?.data || error.message, null, 2));
    }
  };

  const handleEdit = (evento) => {
    setFormData({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha?.split('T')[0],
      hora: evento.hora,
      imagenUrl: evento.imagenUrl || '',
    });
    setEditingId(evento.id);
    setOpen(true);
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

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      imagenUrl: '',
    });
    setImagenes([]);
    setEditingId(null);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                mb: 3,
              }}
            >
              <Button
                onClick={handleOpen}
                sx={{ background: '#8B5E3C', color: '#fff', mr: 2 }}
              >
                Agregar Evento
              </Button>
      
              <Typography
                variant="h2"
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  fontFamily: 'Kaushan Script',
                  fontWeight: 'bold',
                }}
              >
                Eventos
              </Typography>
        </Box>
        
        {eventos.map((evento) => (
          <Box key={evento.id} my={2} p={2} border="1px solid #ccc" borderRadius={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{evento.titulo}</Typography>
            <Typography sx={{ textAlign: 'justify' }}>{evento.descripcion}</Typography>
            <Typography>Fecha: {new Date(evento.fecha).toLocaleDateString()}</Typography>
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
              <Button variant="outlined" onClick={() => handleEdit(evento)}>Editar</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(evento.id)}>Eliminar</Button>
            </Box>
          </Box>
        ))}
 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? 'Editar Evento' : 'Agregar Evento'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Complete los campos del evento</DialogContentText>
          <TextField
            margin="dense"
            label="Título"
            name="titulo"
            fullWidth
            value={formData.titulo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            fullWidth
            multiline
            minRows={3}
            value={formData.descripcion}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Fecha"
            name="fecha"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.fecha}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Hora"
            name="hora"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.hora}
            onChange={handleChange}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Subir Imagen
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingId ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Eventos;
