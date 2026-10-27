
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LiquorIcon from "@mui/icons-material/Liquor";
import EventIcon from "@mui/icons-material/Event";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SettingsIcon from "@mui/icons-material/Settings";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import RestauranteHeader from "./RestauranteHeader";
import RestauranteInformacion from "./RestauranteInformacion";
import RestauranteAdministracion from "./RestauranteAdministracion";

const API_URL = "http://localhost:3000";

const MiRestaurante = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurante, setRestaurante] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [promedio, setPromedio] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);

  const [openCampo, setOpenCampo] = useState(false);
  const [openImagen, setOpenImagen] = useState(false);

  const [campoActual, setCampoActual] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    direccion: "",
    contacto: "",
    horario: "",
  });

  const [nuevasFotos, setNuevasFotos] = useState([]);
  const [previewFotos, setPreviewFotos] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Carga los datos del restaurante y sus estadísticas.
  useEffect(() => {
    let activo = true;

    const cargarDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const resultados = await Promise.allSettled([
          axios.get(`${API_URL}/restaurante/${id}`),
          axios.get(`${API_URL}/reserva/reservas-recibidas`, {
            headers,
          }),
          axios.get(`${API_URL}/resenas/restaurante/${id}`),
          axios.get(`${API_URL}/resenas/promedio/${id}`),
        ]);

        if (!activo) return;

        const [restauranteRes, reservasRes, resenasRes, promedioRes] =
          resultados;

        if (restauranteRes.status === "rejected") {
          throw new Error("No se pudo cargar la información del restaurante.");
        }

        setRestaurante(restauranteRes.value.data);

        if (reservasRes.status === "fulfilled") {
          setReservas(Array.isArray(reservasRes.value.data)
            ? reservasRes.value.data
            : []);
        } else {
          setReservas([]);
          console.error("No se pudieron cargar las reservas.");
        }

        if (resenasRes.status === "fulfilled") {
          setResenas(Array.isArray(resenasRes.value.data)
            ? resenasRes.value.data
            : []);
        } else {
          setResenas([]);
          console.error("No se pudieron cargar las reseñas.");
        }

        if (promedioRes.status === "fulfilled") {
          setPromedio(
            Number(promedioRes.value.data?.promedio) || 0
          );
        } else {
          setPromedio(0);
          console.error("No se pudo cargar el promedio.");
        }
      } catch (err) {
        if (activo) {
          setError(
            err.message || "Ocurrió un error al cargar el dashboard."
          );
        }
      } finally {
        if (activo) setLoading(false);
      }
    };

    cargarDashboard();

    return () => {
      activo = false;
    };
  }, [id]);

  // Actualiza los datos del restaurante después de editar o subir fotos.
  const recargarRestaurante = async () => {
    const respuesta = await axios.get(`${API_URL}/restaurante/${id}`);
    setRestaurante(respuesta.data);
  };

  const getCampoNombreBonito = (campo) => {
    const nombres = {
      nombre: "Nombre del restaurante",
      descripcion: "Descripción",
      direccion: "Dirección",
      contacto: "Contacto",
      horario: "Horario",
    };

    return nombres[campo] || campo;
  };

  const handleEditClick = (campo) => {
    setCampoActual(campo);

    setForm((prev) => ({
      ...prev,
      [campo]: restaurante[campo] || "",
    }));

    setOpenCampo(true);
  };

  const handleCloseCampos = () => {
    setOpenCampo(false);
    setCampoActual("");
  };

  const handleCampoSubmit = async () => {
    if (!campoActual) return;

    setGuardando(true);

    try {
      await axios.patch(
        `${API_URL}/restaurante/${id}`,
        { [campoActual]: form[campoActual] },
        { headers }
      );

      await recargarRestaurante();
      handleCloseCampos();
    } catch (err) {
      console.error("Error al actualizar el restaurante:", err);
      setError("No se pudo guardar el cambio.");
    } finally {
      setGuardando(false);
    }
  };

  const handleCloseImagen = () => {
    previewFotos.forEach((url) => URL.revokeObjectURL(url));

    setNuevasFotos([]);
    setPreviewFotos([]);
    setOpenImagen(false);
  };

  const handleSeleccionFotos = (event) => {
    const archivos = Array.from(event.target.files || []);

    previewFotos.forEach((url) => URL.revokeObjectURL(url));

    setNuevasFotos(archivos);
    setPreviewFotos(archivos.map((archivo) => URL.createObjectURL(archivo)));
  };

  const handleAgregarFotos = async () => {
    if (!nuevasFotos.length) return;

    const formData = new FormData();

    nuevasFotos.forEach((archivo) => {
      formData.append("imagen", archivo);
    });

    setGuardando(true);

    try {
      await axios.post(
        `${API_URL}/photos/restaurante/${id}`,
        formData,
        { headers }
      );

      await recargarRestaurante();
      handleCloseImagen();
    } catch (err) {
      console.error("Error al subir fotos:", err);
      setError("No se pudieron subir las fotos.");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminarFoto = async (photoId) => {
    const confirmar = window.confirm(
      "¿Querés eliminar esta foto del restaurante?"
    );

    if (!confirmar) return;

    try {
      await axios.delete(`${API_URL}/photos/${photoId}`, {
        headers,
      });

      await recargarRestaurante();
    } catch (err) {
      console.error("Error al eliminar la foto:", err);
      setError("No se pudo eliminar la foto.");
    }
  };

  // Controla la navegación del menú lateral.
  const handleNavegacion = (opcion) => {
    setMenuAbierto(false);

    if (opcion.ruta) {
      const ruta = opcion.ruta === "/eventos"
        ? `/eventos/${id}`
        : opcion.ruta;

      navigate(ruta);
      return;
    }

    setSeccionActiva(opcion.seccion);
  };

  const reservasPendientes = reservas.filter(
    (reserva) =>
      String(reserva.estado).toLowerCase() === "pendiente"
  ).length;

  const reservasConfirmadas = reservas.filter(
    (reserva) =>
      String(reserva.estado).toLowerCase() === "confirmada"
  ).length;

  const reservasCompletadas = reservas.filter(
    (reserva) =>
      ["asistido", "completada", "completado"].includes(
        String(reserva.estado).toLowerCase()
      )
  ).length;

  const estadisticas = [
    {
      titulo: "Total de reservas",
      valor: reservas.length,
      icono: <CalendarMonthIcon />,
    },
    {
      titulo: "Pendientes",
      valor: reservasPendientes,
      icono: <DashboardIcon />,
    },
    {
      titulo: "Confirmadas",
      valor: reservasConfirmadas,
      icono: <CalendarMonthIcon />,
    },
    {
      titulo: "Completadas",
      valor: reservasCompletadas,
      icono: <RestaurantMenuIcon />,
    },
    {
      titulo: "Reseñas recibidas",
      valor: resenas.length,
      icono: <ReviewsIcon />,
    },
    {
      titulo: "Puntuación promedio",
      valor: promedio.toFixed(1),
      icono: <StarIcon />,
    },
  ];

  const renderInicio = () => (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Inicio
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Resumen general de {restaurante.nombre}.
      </Typography>

      <Grid container spacing={2}>
        {estadisticas.map((estadistica) => (
          <Grid item xs={12} sm={6} lg={4} key={estadistica.titulo}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid #E8E5DD",
                boxShadow: "0 3px 12px rgba(0,0,0,0.04)",
              }}
            >
              <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "#F5E6D3",
                    color: "#3D3C3B",
                    width: 48,
                    height: 48,
                  }}
                >
                  {estadistica.icono}
                </Avatar>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {estadistica.titulo}
                  </Typography>

                  <Typography variant="h4" fontWeight="bold">
                    {estadistica.valor}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Accesos rápidos
          </Typography>

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<CalendarMonthIcon />}
              onClick={() => navigate("/ReservasResto")}
              sx={{ bgcolor: "#3D3C3B" }}
            >
              Ver reservas
            </Button>

            <Button
              variant="outlined"
              startIcon={<RestaurantMenuIcon />}
              onClick={() => navigate("/menu/create")}
            >
              Administrar menú
            </Button>

            <Button
              variant="outlined"
              startIcon={<ReviewsIcon />}
              onClick={() => setSeccionActiva("resenas")}
            >
              Ver reseñas
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderResenas = () => (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Reseñas
      </Typography>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography color="text.secondary">
            Puntuación promedio
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h3" fontWeight="bold">
              {promedio.toFixed(1)}
            </Typography>

            <Rating value={promedio} precision={0.1} readOnly />
          </Box>

          <Typography color="text.secondary">
            {resenas.length} reseña(s)
          </Typography>
        </CardContent>
      </Card>

      {resenas.length === 0 ? (
        <Alert severity="info">
          Todavía no hay reseñas para este restaurante.
        </Alert>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {resenas.map((resena) => (
            <Card key={resena.id} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography fontWeight="bold">
                  {resena.usuario?.nombre || "Usuario"}
                </Typography>

                <Rating
                  value={Number(resena.puntuacion) || 0}
                  readOnly
                  size="small"
                />

                <Typography sx={{ mt: 1 }}>
                  {resena.comentario || "Sin comentario"}
                </Typography>

                {resena.fecha && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 1 }}
                  >
                    {new Date(resena.fecha).toLocaleDateString("es-AR")}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );

  const renderFotos = () => (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Fotos del restaurante
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Administrá las imágenes que ven los visitantes.
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddPhotoAlternateIcon />}
        onClick={() => setOpenImagen(true)}
        sx={{ mb: 3, bgcolor: "#3D3C3B" }}
      >
        Agregar fotos
      </Button>

      {restaurante.photos?.length ? (
        <Grid container spacing={2}>
          {restaurante.photos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  image={`${API_URL}/${photo.url}`}
                  alt={restaurante.nombre}
                  sx={{ height: 190, objectFit: "cover" }}
                />

                <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    color="error"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => handleEliminarFoto(photo.id)}
                  >
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info">
          Todavía no hay fotos cargadas.
        </Alert>
      )}
    </Box>
  );

  const renderRestaurante = () => (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Mi restaurante
      </Typography>

      <RestauranteHeader
        restaurante={restaurante}
        onEditar={() => handleEditClick("nombre")}
      />

      <Box sx={{ mt: 3 }}>
        <RestauranteInformacion
          restaurante={restaurante}
          onEditar={() => handleEditClick("direccion")}
        />
      </Box>

      <Card sx={{ mt: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Editar información
          </Typography>

          {["nombre", "descripcion", "direccion", "contacto", "horario"].map(
            (campo) => (
              <Button
                key={campo}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
                onClick={() => handleEditClick(campo)}
              >
                Editar {getCampoNombreBonito(campo).toLowerCase()}
              </Button>
            )
          )}
        </CardContent>
      </Card>
    </Box>
  );

  const renderContenido = () => {
    switch (seccionActiva) {
      case "inicio":
        return renderInicio();

      case "resenas":
        return renderResenas();

      case "fotos":
        return renderFotos();

      case "restaurante":
        return renderRestaurante();

      default:
        return renderInicio();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !restaurante) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!restaurante) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          No se pudo cargar el restaurante.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 120px)",
        bgcolor: "#F8F8F6",
      }}
    >
      {/* Menú lateral para escritorio */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: 260,
          flexShrink: 0,
          p: 2,
        }}
      >
        <RestauranteAdministracion
          seccionActiva={seccionActiva}
          onNavigate={handleNavegacion}
        />
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, minWidth: 0, p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Panel de administración
            </Typography>

            <Typography variant="h5" fontWeight="bold">
              {restaurante.nombre}
            </Typography>
          </Box>

          <IconButton
            onClick={() => setMenuAbierto(true)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {error && (
          <Alert
            severity="warning"
            onClose={() => setError("")}
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        {renderContenido()}
      </Box>

      {/* Navegación móvil */}
      <Dialog
        open={menuAbierto}
        onClose={() => setMenuAbierto(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Navegación
          <IconButton onClick={() => setMenuAbierto(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <RestauranteAdministracion
            seccionActiva={seccionActiva}
            onNavigate={handleNavegacion}
          />
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar datos */}
      <Dialog
        open={openCampo}
        onClose={handleCloseCampos}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Editar {getCampoNombreBonito(campoActual)}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label={getCampoNombreBonito(campoActual)}
            value={form[campoActual] || ""}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                [campoActual]: event.target.value,
              }))
            }
            multiline={campoActual === "descripcion"}
            minRows={campoActual === "descripcion" ? 4 : 1}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseCampos} disabled={guardando}>
            Cancelar
          </Button>

          <Button
            onClick={handleCampoSubmit}
            variant="contained"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para subir fotos */}
      <Dialog
        open={openImagen}
        onClose={handleCloseImagen}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Agregar nuevas fotos</DialogTitle>

        <DialogContent>
          <Button
            component="label"
            variant="outlined"
            startIcon={<AddPhotoAlternateIcon />}
            sx={{ mt: 1 }}
          >
            Seleccionar imágenes

            <input
              hidden
              type="file"
              accept="image/*"
              multiple
              onChange={handleSeleccionFotos}
            />
          </Button>

          {previewFotos.length > 0 && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {previewFotos.map((src, index) => (
                <Grid item xs={6} sm={4} key={src}>
                  <CardMedia
                    component="img"
                    image={src}
                    alt={`Vista previa ${index + 1}`}
                    sx={{
                      height: 110,
                      borderRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseImagen} disabled={guardando}>
            Cancelar
          </Button>

          <Button
            onClick={handleAgregarFotos}
            variant="contained"
            disabled={guardando || nuevasFotos.length === 0}
          >
            {guardando ? "Subiendo..." : "Subir fotos"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MiRestaurante;
