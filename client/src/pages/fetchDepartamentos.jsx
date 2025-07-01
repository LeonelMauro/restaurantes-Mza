import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const DepartamentoDialog = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [imagen, setImagen] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/departamento');
      setDepartamentos(res.data);
    } catch (err) {
      console.error('Error al obtener departamentos:', err);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ nombre: '', descripcion: '' });
    setImagen(null);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('descripcion', form.descripcion);
    if (imagen) formData.append('image', imagen);

    try {
      if (editingId) {
        await axios.patch(`http://localhost:3000/departamento/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:3000/departamento', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchDepartamentos();
      handleClose();
    } catch (err) {
      console.error('Error al guardar departamento:', err);
    }
  };

  const handleEdit = (d) => {
    setForm({ nombre: d.nombre, descripcion: d.descripcion });
    setEditingId(d.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/departamento/${id}`);
      fetchDepartamentos();
    } catch (err) {
      console.error('Error al eliminar departamento:', err);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>Agregar Departamento</Button>

      {departamentos.map((d) => (
        <Box key={d.id} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h6">{d.nombre}</Typography>
          <Typography>{d.descripcion}</Typography>
          {d.imagenUrl && (
            <img
              src={`http://localhost:3000/${d.imagenUrl}`}
              alt={d.nombre}
              style={{ width: '100px', marginTop: '10px' }}
            />
          )}
          <Box>
            <IconButton onClick={() => handleEdit(d)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDelete(d.id)}><DeleteIcon /></IconButton>
          </Box>
        </Box>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? 'Editar Departamento' : 'Agregar Departamento'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Complete los campos del departamento</DialogContentText>
          <TextField
            fullWidth
            margin="dense"
            label="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            style={{ marginTop: 15 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartamentoDialog;
