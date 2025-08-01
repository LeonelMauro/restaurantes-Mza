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
  Paper,
  Grid,
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
  // buscador
  const [busqueda, setBusqueda] = useState('');



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
      const res = await axios.get('http://localhost:3000/bebidas/');
      const bebidasFiltradas = res.data.filter(b => b.restaurante.id === restauranteId);
      setBebidas(bebidasFiltradas);
    } catch (err) {
      console.error('Error al cargar bebidas:', err);
    }
  };
  //buscador
  const bebidasFiltradas = bebidas.filter((b) =>
  b.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

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
  const agruparBebidasPorCategoria = (bebidas) => {
  const grupos = {};
  bebidas.forEach((b) => {
    const categoria = b.categoryBebidas?.nombre || 'Sin categoría';
    if (!grupos[categoria]) {
      grupos[categoria] = [];
    }
    grupos[categoria].push(b);
  });
  return grupos;
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          mb: 3,
        }}
        >
        {/* Botón izquierdo */}
        <Button
          onClick={handleOpen}
          sx={{ background: '#9b8b7fff', color: '#fff', mr: 2 }}
        >
          Agregar Bebida
        </Button>

        {/* Título centrado */}
        <Typography
          variant="h2"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontFamily: 'Kaushan Script',
            fontWeight: 'bold',
            color: '#9b8b7fff',
          }}
        >
          Bebidas 
        </Typography>

        {/* Buscador derecho */}
        <TextField
          size="small"
          placeholder="Buscar bebida..."
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ minWidth: 200 }}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        {bebidas.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No hay bebidas cargadas.</Typography>
        ) : (
          <Grid container spacing={2}>
            {Object.entries(agruparBebidasPorCategoria(bebidasFiltradas)).map(([categoria, items]) => (
              <Grid item xs={12} key={categoria}>
                <Typography variant="h4" align='center' sx={{ 
                  
                  mt:2,
                  fontFamily: 'Kaushan Script',
                  fontWeight: 'bold', }}>{categoria}</Typography>
                <Grid container spacing={4}>
                  {items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle1">{item.nombre}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.descripcion}</Typography>
                        <Typography variant="body2" fontWeight="bold">Precio: ${Number(item.precio).toFixed(2)}</Typography>
                        <Button size="small" onClick={() => handleEdit(item)}>Editar</Button>
                        <Button size="small" color="error" onClick={() => handleDelete(item.id)}>Eliminar</Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

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
