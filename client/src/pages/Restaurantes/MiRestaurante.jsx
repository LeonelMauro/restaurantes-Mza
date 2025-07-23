import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// ...importaciones iguales
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const MiRestaurante = () => {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCampo, setOpenCampo] = useState(false);
  const [openImagen, setOpenImagen] = useState(false);
  const [form, setForm] = useState({ nombre: '', descripcion: '', direccion: '', contacto: '', horario: '' });
  const [nuevasFotos, setNuevasFotos] = useState([]);
  const [previewFotos, setPreviewFotos] = useState([]);
  const [campoActual, setCampoActual] = useState(null);
  const navigate = useNavigate();

  const getCampoNombreBonito = (campo) => {
    switch (campo) {
      case 'nombre': return 'Nombre del restaurante';
      case 'descripcion': return 'Descripción';
      case 'direccion': return 'Dirección';
      case 'contacto': return 'Contacto';
      case 'horario': return 'Horario';
      default: return campo;
    }
  };

  const handleCloseCampos = () => {
    setOpenCampo(false);
    setCampoActual(null);
    setForm({ nombre: '', descripcion: '', direccion: '', contacto: '', horario: '' });
  };

  const handleCloseImagen = () => {
    setNuevasFotos([]);
    setPreviewFotos([]);
    setOpenImagen(false);
  };

  const handleEditClick = (campo) => {
    setCampoActual(campo);
    setForm((prev) => ({
      ...prev,
      [campo]: restaurante[campo] || '',
    }));
    setOpenCampo(true);
  };

  const handleAgregarFotos = async () => {
  const token = localStorage.getItem('token');

  const formData = new FormData(); // ← esto es lo que faltaba

  nuevasFotos.forEach((file) => {
    formData.append('imagen', file); // debe coincidir con el campo del backend
  });

  try {
    await axios.post(`http://localhost:3000/photos/restaurante/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const res = await axios.get(`http://localhost:3000/restaurante/${id}`);
    setRestaurante(res.data);
    handleCloseImagen();
  } catch (err) {
    console.error('Error al subir fotos', err);
  }
};


  const handleCampoSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:3000/restaurante/${id}`,
        { [campoActual]: form[campoActual] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const res = await axios.get(`http://localhost:3000/restaurante/${id}`);
      setRestaurante(res.data);
      handleCloseCampos();
    } catch (err) {
      console.error('Error al actualizar campo:', err);
    }
  };

  const handleEliminarFoto = async (photoId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/photos/${photoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await axios.get(`http://localhost:3000/restaurante/${id}`);
      setRestaurante(res.data);
    } catch (err) {
      console.error('Error al eliminar foto', err);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/restaurante/${id}`)
      .then((res) => {
        setRestaurante(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar el restaurante', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!restaurante) return <Typography>Error cargando restaurante</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4">
        {restaurante.nombre}
        <IconButton onClick={() => handleEditClick('nombre')} size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>

      <Typography variant="body1">
        {restaurante.descripcion}
        <IconButton onClick={() => handleEditClick('descripcion')} size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>

      <Typography variant="body2">
        {restaurante.direccion}
        <IconButton onClick={() => handleEditClick('direccion')} size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>

      <Typography variant="body2">
        Contacto: {restaurante.contacto}
        <IconButton onClick={() => handleEditClick('contacto')} size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>

      <Typography variant="body2">
        Horario: {restaurante.horario}
        <IconButton onClick={() => handleEditClick('horario')} size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, mt: 2 }}>
        {restaurante.photos.map((photo) => (
          <Box key={photo.id} sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              image={`http://localhost:3000/${photo.url}`}
              alt={restaurante.nombre}
              sx={{ height: 150, width: 200, borderRadius: 2 }}
            />
            <IconButton
              onClick={() => handleEliminarFoto(photo.id)}
              sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
            >
              ✖
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button
        startIcon={<AddPhotoAlternateIcon />}
        variant="contained"
        color="#2E2D2C"
        onClick={() => setOpenImagen(true)}
      >
        Agregar nuevas fotos
      </Button>

      <Box mt={4}>
        <Button variant="contained" onClick={() => navigate(`/menu/create`)} sx={{ mr: 2,backgroundColor: '#2E2D2C', color: 'white' }}>
          Menú
        </Button>
        <Button variant="contained" onClick={() => navigate(`/promos`)} sx={{ mr: 2 ,backgroundColor: '#2E2D2C', color: 'white'}}>
          Promociones
        </Button>
        <Button variant="contained" onClick={() => navigate(`/eventos/${id}`)} sx={{ mr: 2, backgroundColor: '#2E2D2C', color: 'white' }}>
          Eventos
        </Button><Button variant="contained" onClick={() => navigate(`/bebidas`)} sx={{ mr: 2 ,backgroundColor: '#2E2D2C', color: 'white'}}>
          Bebidas
        </Button>
      </Box>

      {/* Diálogo para campos */}
      <Dialog open={openCampo} onClose={handleCloseCampos}>
        <DialogTitle>Editar {getCampoNombreBonito(campoActual)}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label={getCampoNombreBonito(campoActual)}
            value={form[campoActual] || ''}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, [campoActual]: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCampos}>Cancelar</Button>
          <Button onClick={handleCampoSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para imágenes */}
      <Dialog open={openImagen} onClose={handleCloseImagen}>
        <DialogTitle>Agregar nuevas fotos</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setNuevasFotos(files);
              setPreviewFotos(files.map((file) => URL.createObjectURL(file)));
            }}
          />
          {previewFotos.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              {previewFotos.map((src, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={src}
                  alt="preview"
                  sx={{ height: 100, width: 130, borderRadius: 2 }}
                />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImagen}>Cancelar</Button>
          <Button onClick={handleAgregarFotos} variant="contained">
            Subir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MiRestaurante;
