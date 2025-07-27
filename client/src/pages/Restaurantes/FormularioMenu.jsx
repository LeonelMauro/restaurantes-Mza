import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';

const FormularioMenu = () => {
  const [form, setForm] = useState({
    categoria: '',
    nombre: '',
    descripcion: '',
    precio: '',
  });
  const [restauranteId, setRestauranteId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const [formCat, setFormCat]= useState({
    nombre:'',
  })
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  useEffect(() => {
  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    if (!token || !restauranteId) return;

    try {
      const response = await axios.get(`http://localhost:3000/category-menu/by-restaurante/${restauranteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  if (restauranteId) {
    fetchCategories();
  }
}, [restauranteId]);




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
  
  const handleSubmitcategoryMenu= async (e) =>{
    e.preventDefault();
    const token= localStorage.getItem('token');
    if(!token || !restauranteId){
      alert('Falta token o restaurante');
      return;
    }
    try{
      await axios.post(
        'http://localhost:3000/category-menu',
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
    
      
  const handleChangeCat = (e) => {
  setFormCat({ ...formCat, [e.target.name]: e.target.value });
};

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
          categoryMenuId: categoryId, // 🔴 este campo es importante
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje('Menú agregado exitosamente');
      setForm({ nombre: '', descripcion: '', precio: '' });
      setCategoryId('');
    } catch (err) {
      console.error(err);
      setMensaje('Error al agregar menú');
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        
        <Typography variant="h5" gutterBottom>
          Agregar Categoria
        </Typography>
        <form onSubmit={handleSubmitcategoryMenu}>
          <TextField
            label="Nombre de la categoría"
            name="nombre"
            fullWidth
            margin="normal"
            value={formCat.nombre}
            onChange={handleChangeCat}
            required
          />
          <Button
            type="submit"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#8B5E3C', color: 'white' }}
          >
            Guardar Categoría
          </Button>
        </form>
        <Typography variant="h5" gutterBottom>
          Agregar ítem al Menú
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            multiline
            minRows={4}
            maxRows={10}
            inputProps={{ style: { textAlign: 'justify' } }}
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
