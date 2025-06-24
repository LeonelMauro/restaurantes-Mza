import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const BebidasDialog = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '' });
  const [bebidas, setBebidas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [restauranteId, setRestauranteId] = useState(null);

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
        fetchBebidas(res.data.id);
      } catch (err) {
        console.error('Error al obtener restaurante:', err);
      }
    };
    fetchRestauranteId();
  }, []);

  const fetchBebidas = async (restauranteId) => {
    try {
      const res = await axios.get('http://localhost:3000/bebidas');
      const bebidasFiltradas = res.data.filter(b => b.restaurante.id === restauranteId);
      setBebidas(bebidasFiltradas);
    } catch (err) {
      console.error('Error al cargar bebidas:', err);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ nombre: '', descripcion: '', precio: '' });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const data = { ...form, precio: parseFloat(form.precio), restauranteId };
    try {
      if (editingId) {
        await axios.patch(`http://localhost:3000/bebidas/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:3000/bebidas/create', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchBebidas(restauranteId);
      handleClose();
    } catch (err) {
      console.error('Error al guardar bebida:', err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/bebidas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBebidas(restauranteId);
    } catch (err) {
      console.error('Error al eliminar bebida:', err);
    }
  };

  const handleEdit = (bebida) => {
    setForm({ nombre: bebida.nombre, descripcion: bebida.descripcion, precio: bebida.precio });
    setEditingId(bebida.id);
    setOpen(true);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Agregar Bebida</Button>
      {bebidas.map(b => (
        <Box key={b.id} sx={{ mb: 1, border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
          <Typography variant="h6">{b.nombre} - ${b.precio}</Typography>
          <Typography>{b.descripcion}</Typography>
          <IconButton onClick={() => handleEdit(b)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDelete(b.id)}><DeleteIcon /></IconButton>
        </Box>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? 'Editar Bebida' : 'Agregar Bebida'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Complete los campos de la bebida</DialogContentText>
          <TextField
            margin="dense"
            label="Nombre"
            name="nombre"
            fullWidth
            variant="outlined"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            fullWidth
            multiline
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Precio"
            name="precio"
            type="number"
            fullWidth
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BebidasDialog;
