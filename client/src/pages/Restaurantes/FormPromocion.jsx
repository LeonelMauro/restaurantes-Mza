import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false); // Faltaba este estado

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({
      titulo: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      precio: '',
    });
    setEditingId(null);
    setMensaje('');
  };

  
    useEffect(() => {
  const fetchRestauranteId = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    console.log('token:', token);
    console.log('restauranteId:', restauranteId);

    if (!token || !userId) return;
    try {
      const res = await axios.get(`http://localhost:3000/restaurante/by-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRestauranteId(res.data.id);
      fetchPromociones(res.data.id);
    } catch (err) {
      console.error('Error al obtener restaurante:', err);
    }
  };
  fetchRestauranteId();
}, []);



  const fetchPromociones = async (restauranteId) => {
    try {
      const res = await axios.get(`http://localhost:3000/promociones/restaurante/${restauranteId}`);
      setPromociones(res.data);
    } catch (err) {
      console.error('Error al obtener promociones:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token || !restauranteId) return;

    const data = {
      ...form,
      precio: parseFloat(form.precio),
      fechaInicio: new Date(form.fechaInicio).toISOString(),
      fechaFin: new Date(form.fechaFin).toISOString(),
      restauranteId,
    };

    try {
      if (editingId) {
        await axios.patch(`http://localhost:3000/promociones/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMensaje('✅ Promoción actualizada correctamente');
      } else {
        await axios.post('http://localhost:3000/promociones', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMensaje('✅ Promoción agregada exitosamente');
      }

      setForm({
        titulo: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        precio: '',
      });

      fetchPromociones(restauranteId);
      setEditingId(null);
      setOpen(false);
    } catch (err) {
      console.error('Error al guardar promoción:', err);
      setMensaje('❌ Error al guardar la promoción');
    }
  };

  const handleEdit = (promo) => {
    setForm({
      titulo: promo.titulo,
      descripcion: promo.descripcion,
      fechaInicio: promo.fechaInicio.slice(0, 16),
      fechaFin: promo.fechaFin.slice(0, 16),
      precio: promo.precio,
    });
    setEditingId(promo.id);
    setOpen(true);
  };
  const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  if (!window.confirm('¿Estás seguro de que querés eliminar esta promoción?')) return;

  try {
    await axios.delete(`http://localhost:3000/promociones/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMensaje('✅ Promoción eliminada correctamente');
    fetchPromociones(restauranteId); // Recargar lista
  } catch (err) {
    console.error('Error al eliminar promoción:', err);
    setMensaje('❌ Error al eliminar la promoción');
  }
};


  return (
    <Box>
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
          Agregar Promo
        </Button>

        <Typography
          variant="h2"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontFamily: 'Kaushan Script',
            fontWeight: 'bold',
            color: '#8B5E3C',
          }}
        >
          Promociones
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? 'Editar Promo' : 'Agregar Promo'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Complete los campos de la promo</DialogContentText>

          <TextField
            margin="dense"
            label="Título"
            name="titulo"
            fullWidth
            variant="outlined"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
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
            name="fechaInicio"
            type="datetime-local"
            fullWidth
            value={form.fechaInicio}
            onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
            inputProps={{
              min: new Date().toISOString().slice(0, 16), // formato: YYYY-MM-DDTHH:MM
            }}
          />
          <TextField
            margin="dense"
            name="fechaFin"
            type="datetime-local"
            fullWidth
            value={form.fechaFin}
            onChange={(e) => setForm({ ...form, fechaFin: e.target.value })}
            inputProps={{
              min: form.fechaInicio || new Date().toISOString().slice(0, 16)

            }}
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
          <Button onClick={handleSubmit} variant="contained" disabled={!restauranteId} // <-- desactiva si aún no está
>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Box mt={4}>
        <Grid container spacing={3} align="center" mt={4}>
        {promociones.map((promo) => (
          <Grid item xs={12} sm={6} md={4} key={promo.id}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: '#3D3C3B',
                borderRadius: 3,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
                  {promo.titulo}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1, color: '#fff', textAlign: 'justify' }}>
                  {promo.descripcion}
                </Typography>

                <Typography variant="h6" sx={{ mt: 1, color: '#fff' }}>
                  ${promo.precio}
                </Typography>

                <Typography variant="caption" color="#fff" sx={{ mt: 2, display: 'block' }}>
                  Vigencia: {new Date(promo.fechaInicio).toLocaleDateString()} -{' '}
                  {new Date(promo.fechaFin).toLocaleDateString()}
                </Typography>
              </CardContent>

              {/* Botones abajo */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleEdit(promo)}
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(promo.id)}
                >
                  Eliminar
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      </Box>


      {mensaje && (
        <Typography mt={2} color={mensaje.startsWith('✅') ? 'green' : 'red'}>
          {mensaje}
        </Typography>
      )}
    </Box>
  );
};

export default FormPromocion;
