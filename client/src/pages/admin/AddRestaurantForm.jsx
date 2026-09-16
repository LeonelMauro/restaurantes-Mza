import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

const AddRestaurantForm = () => {

  const navigate = useNavigate()
  
  useEffect(() => {
  const fetchDepartamentos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/departamento');
      setDepartamentos(res.data);
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
    }
  };

  fetchDepartamentos();
}, []);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    descripcion: '',
    horario: '',
    imagen: '',
    contacto: '',
    departamentoId: '', // 👈 nuevo campo
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [imagenes, setImagenes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  

  try {
    const token = localStorage.getItem('token');

    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('direccion', formData.direccion);
    data.append('descripcion', formData.descripcion);
    data.append('horario', formData.horario);
    data.append('contacto', formData.contacto);
    data.append('departamentoId', formData.departamentoId);
    imagenes.forEach((img) => {
      data.append('images', img);
    });
    
    const res = await axios.post('http://localhost:3000/restaurante/create', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Restaurante creado:', res.data);
    // Podés agregar un mensaje de éxito o redireccionar
    navigate(`/mi-restaurante/${res.data.id}`);
  } catch (error) {
    console.error('Error al crear restaurante:', error.response?.data || error.message);
    alert(JSON.stringify(error.response?.data || error.message, null, 2)); // 👈 para mostrar el detalle
  }
};


  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography  variant="h2" align="center" gutterBottom>
        Agregar Restaurante
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
            <TextField
              label="Nombre de Resto"
              name="nombre"
              color="#3D3C3B"
              fullWidth
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            

            <TextField
              label="Dirección"
              name="direccion"
              color="#3D3C3B"
              fullWidth
              value={formData.direccion}
              onChange={handleChange}
              required
            />
            <Grid item xs={12}>
              <TextField
                select
                
                name="departamentoId"
                value={formData.departamentoId}
                onChange={handleChange}
                fullWidth
                required
                SelectProps={{ native: true }}
              >
                <option value="">Seleccione un departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.nombre}
                  </option>
                ))}
              </TextField>
            </Grid>

            <TextField
              label="Descripción"
              name="descripcion"
              color="#3D3C3B"
              fullWidth
              multiline
              minRows={4}
              maxRows={10}
              inputProps={{ style: { textAlign: 'justify' } }}
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ej: Parrilla, Italiana, Vegana"
              required
            />

            <TextField
              label="Horario de atención"
              name="horario"
              color="#3D3C3B"
              fullWidth
              value={formData.horario}
              onChange={handleChange}
              placeholder="Ej: Lunes a Domingo, 12:00 a 00:00"
            />

            <TextField
              label="Contacto"
              name="contacto"
              color="#3D3C3B"
              fullWidth
              value={formData.contacto}
              onChange={handleChange}
              placeholder="Ej: +54 9 261 1234567"
            />

          <Grid item xs={12}>
            <Button variant="outlined" fullWidth component="label" sx={{ color: '#3D3C3B', borderColor: '#3D3C3B' }}>
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
                Guardar Restaurante
              </Button>
          </Grid>

        </Grid>
      </Box>
    </Paper>
  );
};

export default AddRestaurantForm;
