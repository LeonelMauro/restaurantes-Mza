import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem, Select, InputLabel, FormControl,
  Container
} from '@mui/material';
import axios from 'axios';
// Agrupar por categoría
const agruparPorCategoria = (menu) => {
  const grupos = {};
  menu.forEach((item) => {
    const categoria = item.categoryMenu?.nombre || 'Sin categoría';
    if (!grupos[categoria]) {
      grupos[categoria] = [];
    }
    grupos[categoria].push(item);
  });

  return grupos;
};


const FormularioMenu = () => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [menuIdEditando, setMenuIdEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [menu, setMenu] = useState([]); // ✅ Aquí está bien
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


  const eliminarMenuItem = async (id) => {
  const confirm = window.confirm("¿Estás seguro de que querés eliminar este ítem?");
  if (!confirm) return;
  

  const token = localStorage.getItem('token');
  try {
    await axios.delete(`http://localhost:3000/menu/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMensaje('Ítem eliminado correctamente');
    fetchMenu(); // refresca el menú
  } catch (error) {
    console.error('Error al eliminar el ítem:', error);
    setMensaje('Error al eliminar el ítem');
  }
};
const cargarParaEditar = (item) => {
  setForm({
    nombre: item.nombre,
    descripcion: item.descripcion,
    precio: item.precio,
  });
  setCategoryId(item.categoryMenuId);
  setModoEdicion(true);
  setMenuIdEditando(item.id);
  setMostrarFormulario(true);
};

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
      setForm({ nombre: '', descripcion: '', precio: '' });
      setCategoryId('');
      fetchMenu(); // 🔄 actualiza sin depender de useEffect

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
  
  const fetchMenu = async () => {
  try {
    const response = await axios.get('http://localhost:3000/menu');
    setMenu(response.data); // <- este se llena si el backend responde bien
  } catch (error) {
    console.error('Error al obtener el menú', error);
  }
};



useEffect(() => {
  if (restauranteId) {
    fetchMenu();
  }
}, [restauranteId, mensaje]); // opcional: que recargue al cambiar el mensaje


  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!token || !restauranteId) {
    alert('Falta token o restaurante.');
    return;
  }

  try {
    if (modoEdicion) {
      // 🟡 EDITAR
      await axios.patch(
        `http://localhost:3000/menu/${menuIdEditando}`,
        {
          ...form,
          precio: parseFloat(form.precio),
          restauranteId,
          categoryMenuId: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje('Ítem actualizado correctamente');
    } else {
      // 🟢 CREAR
      await axios.post(
        'http://localhost:3000/menu/create',
        {
          ...form,
          precio: parseFloat(form.precio),
          restauranteId,
          categoryMenuId: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje('Menú agregado exitosamente');
    }

    // Limpiar campos
    setForm({ nombre: '', descripcion: '', precio: '' });
    setCategoryId('');
    setModoEdicion(false);
    setMenuIdEditando(null);
    fetchMenu();
  } catch (err) {
    console.error(err);
    setMensaje('Error al guardar el ítem');
  }
};


  return (
    <Container sx={{ py: 5, }}>
      <Button
        variant="contained"
        sx={{ mb: 2, backgroundColor: '#8B5E3C', color: 'white' }}
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? 'Cerrar Formulario' : 'Agregar/Editar Producto'}
      </Button>
      {mostrarFormulario && (
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
          {modoEdicion && (
          <Button
            fullWidth
            sx={{ mt: 2, backgroundColor: '#8B5E3C', color: 'white' }}
            color="inherit"
            onClick={() => {
              setModoEdicion(false);
              setMenuIdEditando(null);
              setForm({ nombre: '', descripcion: '', precio: '' });
              setCategoryId('');
              setMensaje('');
            }}
          >
            Cancelar edición
          </Button>
        )}
        </form>
      </Paper>
      )}
      <Box sx={{ width: 400, ml: 4 }}>
          <Typography variant="h5" gutterBottom>Menú Actual</Typography>
          {menu.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No hay ítems cargados.</Typography>
          ) : (
            Object.entries(agruparPorCategoria(menu)).map(([categoria, items]) => (
              <Box key={categoria} sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  {categoria}
                </Typography>
                {items.map((item) => (
                  <Paper key={item.id} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">{item.nombre}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.descripcion}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      Precio: ${Number(item.precio).toFixed(2)}
                    </Typography>
                    <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => cargarParaEditar(item)}
                    sx={{ mr: 1, mt: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => eliminarMenuItem(item.id)}
                    sx={{ mt: 1 }}
                  >
                    Eliminar
                  </Button>

                  </Paper>
                ))}
              </Box>
            ))
          )}
        </Box>

    </Container>
  );
};

export default FormularioMenu;
