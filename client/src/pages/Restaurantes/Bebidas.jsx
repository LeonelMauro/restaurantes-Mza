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
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '',categoryBebidaId: '' });
  const [bebidas, setBebidas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [restauranteId, setRestauranteId] = useState(null);
  //categorias
  const [categorias, setCategorias] = useState([]);
  const [formCat, setFormCat] = useState({ nombre: '' });
  const [mensaje, setMensaje] = useState('');



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
        fetchCategorias(res.data.id);
      } catch (err) {
        console.error('Error al obtener restaurante:', err);
      }
    };
    fetchRestauranteId();
  }, []);

  //categoria bebidas
    const fetchCategorias = async (restauranteId) => {
        try {
          const res = await axios.get('http://localhost:3000/category-bebidas');
          console.log('CATEGORÍAS:', res.data); // 👈 esto te mostrará si llegan o no
          const filtradas = res.data.filter(cat => cat.restaurante.id === restauranteId);
          setCategorias(filtradas);
        } catch (err) {
          console.error('Error al cargar categorías:', err);
        }
      };
    const handleSubmitcategoryBebida= async (e) =>{
        e.preventDefault();
        const token= localStorage.getItem('token');
        if(!token || !restauranteId){
          alert('Falta token o restaurante');
          return;
        }
        try{
          await axios.post(
            'http://localhost:3000/category-bebidas',
            {
              ...formCat,
              nombre: (formCat.nombre),
              restauranteId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMensaje('Menú agregado exitosamente');
          setFormCat({ nombre: '' });
        } catch (err) {
          console.error(err);
          setMensaje('Error al agregar menú');
        }
      };    



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
    setForm({ nombre: '', descripcion: '', precio: '', categoryBebidaId: '' });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const data = { ...form, precio: parseFloat(form.precio), restauranteId ,categoryBebidaId: parseInt(form.categoryBebidaId)};
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
    setForm({
        nombre: bebida.nombre,
        descripcion: bebida.descripcion,
        precio: bebida.precio,
        categoryBebidaId: bebida.categoryBebidas?.id || ''
      });
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
            select
            
            fullWidth
            margin="dense"
            value={form.categoryBebidaId || ''}
            onChange={(e) => setForm({ ...form, categoryBebidaId: e.target.value })}
            SelectProps={{ native: true }}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </TextField>
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
            minRows={4}
            maxRows={10}
            inputProps={{ style: { textAlign: 'justify' } }}
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
          <Box sx={{ mt: 2, p: 2, border: '1px dashed #ccc', borderRadius: 2 }}>
            <Typography variant="subtitle1">Agregar nueva categoría</Typography>
            <TextField
              label="Nombre de la categoría"
              fullWidth
              margin="dense"
              value={formCat.nombre}
              onChange={(e) => setFormCat({ nombre: e.target.value })}
            />
            <Button
              variant="outlined"
              onClick={handleSubmitcategoryBebida}
              sx={{ mt: 1 }}
            >
              Crear Categoría
            </Button>
            {mensaje && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                {mensaje}
              </Typography>
            )}
          </Box>
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
