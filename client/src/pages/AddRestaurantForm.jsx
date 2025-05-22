import React, { useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    descripcion: '',
    horario: '',
    imagen: '',
    contacto: '',
  });

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
  } catch (error) {
    console.error('Error al crear restaurante:', error.response?.data || error.message);
  }
};


  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Agregar Restaurante
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="nombre"
              fullWidth
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Dirección"
              name="direccion"
              fullWidth
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Tipo de comida"
              name="descripcion"
              fullWidth
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ej: Parrilla, Italiana, Vegana"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Horario de atención"
              name="horario"
              fullWidth
              value={formData.horario}
              onChange={handleChange}
              placeholder="Ej: Lunes a Domingo, 12:00 a 00:00"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contacto"
              name="contacto"
              fullWidth
              value={formData.contacto}
              onChange={handleChange}
              placeholder="Ej: +54 9 261 1234567"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
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
              color="primary"
              fullWidth
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
