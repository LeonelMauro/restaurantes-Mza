import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { restaurantesStyles } from '../../../styles/restaurantesStyles';
import {
  Add as AddIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";


const Eventos = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    imagenUrl: '',
  });
  const { user,token ,loading} = useAuth()
  const [imagenes, setImagenes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [restauranteId, setRestauranteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const userId = user?.id;

  // Obtener el restaurante del usuario logueado
  useEffect(() => {
    const fetchRestauranteId = async () => {
      console.log("Sesión en Header",{
      user,
      tokenExistente: Boolean(token),
      loading
    })
      
      if (!token || !userId) return;
      try {
        const res = await axios.get(`http://localhost:3000/restaurante/by-user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const idRestaurante = res.data.id;
        setRestauranteId(idRestaurante);
        fetchEventos(idRestaurante);
      } catch (err) {
        console.error('Error al obtener restaurante:', err);
      }
    };
    fetchRestauranteId();
  }, [user,token,loading]);

  const fetchEventos = async (restauranteId) => {
    try {
      const res = await axios.get(`http://localhost:3000/eventos/restaurante/${restauranteId}`);
      setEventos(res.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  if (file) {
    setImagenes([file]);
    setFormData({ ...formData, imagenPreview: URL.createObjectURL(file) });
  }
};
const handleRemoveImage = () => {
  setImagenes([]);
  setFormData({ ...formData, imagenPreview: '' });
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const fechaHora = `${formData.fecha}T${formData.hora}:00`;

      const data = new FormData();
      data.append('titulo', formData.titulo);
      data.append('descripcion', formData.descripcion);
      data.append('fecha', fechaHora); 
      if (imagenes[0]) data.append('imagen', imagenes[0]);
      

      let res;
      if (editingId) {
        res = await axios.patch(`http://localhost:3000/eventos/${editingId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Evento actualizado');
      } else {
        res = await axios.post(`http://localhost:3000/eventos/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Evento creado');
      }

      resetForm();
      fetchEventos(restauranteId);
    } catch (error) {
      console.error('Error al guardar evento:', error.response?.data || error.message);
      alert(JSON.stringify(error.response?.data || error.message, null, 2));
    }
  };

  const handleEdit = (evento) => {
     const fechaISO = new Date(evento.fecha).toISOString();
    setFormData({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: fechaISO.split('T')[0],         // YYYY-MM-DD
      hora: fechaISO.split('T')[1].substring(0, 5), // HH:mm
      imagenUrl: evento.imagenUrl || '',
    });
    setEditingId(evento.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('¿Estás seguro de que querés eliminar este evento?')) return;

    try {
      await axios.delete(`http://localhost:3000/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Evento eliminado correctamente');
      fetchEventos(restauranteId);
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      alert('No se pudo eliminar el evento');
    }
  };

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      imagenUrl: '',
    });
    setImagenes([]);
    setEditingId(null);
  };

  
return (
  <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 2, md: 3 }, py: 4 }}>

    {/* Encabezado */}
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h4" sx={restaurantesStyles.sectionTitle}>
          Eventos
        </Typography>

        <Typography color="text.secondary">
          Administrá los eventos de tu restaurante.
        </Typography>
      </Box>

      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          bgcolor: "#3D3C3B",
          color: "#fff",
          borderRadius: 2,
          px: 2.5,
          py: 1.2,
          textTransform: "none",
          fontWeight: 600,
          "&:hover": { bgcolor: "#625D57" },
        }}
      >
        Crear evento
      </Button>
    </Box>

    {/* Listado de eventos */}
    {eventos.length === 0 ? (
      <Box
        sx={{
          textAlign: "center",
          py: 7,
          px: 2,
          border: "1px dashed #C8BBAA",
          borderRadius: 3,
          bgcolor: "#FAF8F5",
        }}
      >
        <CalendarMonthOutlinedIcon
          sx={{ fontSize: 55, color: "#9b8b7f", mb: 1 }}
        />

        <Typography variant="h6" fontWeight={600}>
          Todavía no hay eventos
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Publicá tu primer evento para que tus clientes puedan conocerlo.
        </Typography>

        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{
            color: "#3D3C3B",
            borderColor: "#3D3C3B",
            textTransform: "none",
          }}
        >
          Crear primer evento
        </Button>
      </Box>
    ) : (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {eventos.map((evento) => (
          <Box
            key={evento.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "#fff",
              border: "1px solid #E8E2DB",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              },
            }}
          >
            {/* Imagen */}
            {evento.imagenUrl ? (
              <Box
                component="img"
                src={`http://localhost:3000/${evento.imagenUrl}`}
                alt={evento.titulo}
                sx={{
                  width: "100%",
                  height: 190,
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                sx={{
                  height: 190,
                  bgcolor: "#F0E9E0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CalendarMonthOutlinedIcon
                  sx={{ fontSize: 55, color: "#9b8b7f" }}
                />
              </Box>
            )}

            {/* Información */}
            <Box
              sx={{
                p: 2.5,
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#3D3C3B",
                  mb: 1,
                  overflowWrap: "anywhere",
                }}
              >
                {evento.titulo}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  mb: 2,
                  whiteSpace: "pre-line",
                  overflowWrap: "anywhere",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {evento.descripcion}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <CalendarMonthOutlinedIcon
                  sx={{ color: "#9b8b7f", fontSize: 21 }}
                />
                <Typography variant="body2">
                  {new Date(evento.fecha).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <AccessTimeOutlinedIcon
                  sx={{ color: "#9b8b7f", fontSize: 21 }}
                />
                <Typography variant="body2">
                  {evento.hora
                    ? evento.hora.slice(0, 5)
                    : new Date(evento.fecha).toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                  hs
                </Typography>
              </Box>

              {/* Acciones al pie */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: "auto",
                  pt: 2,
                  borderTop: "1px solid #EEE8E1",
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => handleEdit(evento)}
                  sx={{
                    color: "#3D3C3B",
                    borderColor: "#D6CEC4",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#3D3C3B",
                      bgcolor: "#F8F5F1",
                    },
                  }}
                >
                  Editar
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => handleDelete(evento.id)}
                  sx={{ textTransform: "none" }}
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId ? 'Editar Evento' : 'Agregar Evento'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Complete los campos del evento</DialogContentText>
          <TextField
            margin="dense"
            label="Título"
            name="titulo"
            fullWidth
            value={formData.titulo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            fullWidth
            multiline
            minRows={3}
            value={formData.descripcion}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Fecha"
            name="fecha"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.fecha}
            onChange={handleChange}
            inputProps={{
              min: new Date().toISOString().split("T")[0], // Fecha mínima = hoy
            }}
          />

          <TextField
            margin="dense"
            label="Hora"
            name="hora"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.hora}
            onChange={handleChange}
          />

          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Subir Imagen
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          {formData.imagenPreview && (
          <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
            <img
              src={formData.imagenPreview}
              alt="Vista previa"
              style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
            />
            <IconButton
              size="small"
              onClick={handleRemoveImage}
              sx={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingId ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Eventos;
