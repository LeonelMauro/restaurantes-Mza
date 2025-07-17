import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import {
  Typography,
  CardMedia,
  Container,
  Box,
  Button,
  TextField,
  Rating,
  Alert,
  MenuItem,
   Grid, Card, CardContent
} from '@mui/material';
import { Tooltip, IconButton } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LiquorIcon from '@mui/icons-material/Liquor';
import EventIcon from '@mui/icons-material/Event';
import dayjs from 'dayjs'; // si no lo tenés instalado: npm install dayjs


export default function RestauranteDetalle() {
  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
  };


  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  // debajo de const [restaurante, setRestaurante] = useState(null);
  const [resenas, setResenas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //menu
  const [menu, setMenu] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [categoriasMenu, setCategoriasMenu] = useState([]);



  //bebidas
  const [bebidas, setBebidas] = useState([]);
  const [mostrarBebidas, setMostrarBebidas] = useState(false);
  const [categoriasBebidas, setCategoriasBebida] = useState([]);
  //reserva
  const [cantidadPersonas, setCantidadPersonas] = useState(1);

  // Reseña
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);
  const [mensaje, setMensaje] = useState('');
  const [reseñaError, setReseñaError] = useState('');
  const [fechaReserva, setFechaReserva] = useState('');
  const generarHorarios = () => {
  const horarios = [];
  for (let h = 10; h <= 23; h++) {
    horarios.push(`${String(h).padStart(2, '0')}:00`);
    horarios.push(`${String(h).padStart(2, '0')}:30`);
  }
  horarios.push("00:00"); // agregar medianoche
  return horarios;
};
  const horarios = generarHorarios();
  const generarHorariosDisponibles = (fechaSeleccionada) => {
  const horaInicio = 10;
  const horaFin = 24;
  const intervalos = [];

  const ahora = dayjs();
  const fechaEsHoy = dayjs(fechaSeleccionada).isSame(ahora, 'day');

  for (let hora = horaInicio; hora < horaFin; hora++) {
    for (let min of [0, 30]) {
      const horaStr = `${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;

      if (fechaEsHoy) {
        const fechaHora = dayjs(`${fechaSeleccionada}T${horaStr}`);
        if (fechaHora.isAfter(ahora)) {
          intervalos.push(horaStr);
        }
      } else {
        intervalos.push(horaStr);
      }
    }
  }

  return intervalos;
};
  const hoy = dayjs().format('YYYY-MM-DD');


  useEffect(() => {
  fetch(`http://localhost:3000/restaurante/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setRestaurante(data);
      if (data.resenas) setResenas(data.resenas);
      if (data.menu) setMenu(data.menu);
      if (data.bebidas) setBebidas(data.bebidas);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [id]);

  useEffect(() => {
  fetch(`http://localhost:3000/category-menu/restaurante/${id}/categorias-con-menu`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Categorias con menú:", data); // <-- Añadí esto
      setCategoriasMenu(data);
    })
    .catch((err) => console.error("Error al traer categorías con menú:", err));
}, [id]);

  useEffect(() => {
  fetch(`http://localhost:3000/category-bebidas/restaurante/${id}/categorias-con-bebidas`)
    .then((res) => res.json())
    .then((data) => {
  console.log("categoriasBebidas recibidas:", data);
  if (Array.isArray(data)) {
    setCategoriasBebida(data);
  } else {
    setCategoriasBebida([]);
    console.warn("Se esperaba un array, pero se recibió:", data);
  }
})
    .catch((err) => console.error("Error al traer categorías con menú:", err));
}, [id]);


  const handleEnviarReseña = async (e) => {
  e.preventDefault(); // prevenimos comportamiento por defecto del form

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
    
  if (!userId || !token) {
    alert("Debes iniciar sesión para comentar y puntuar.");
    return;
  }

  if (!comentario || puntuacion === 0) {
    setReseñaError("Por favor completá tu comentario y puntuación.");
    return;
  }
  if (!comentario.trim()) { // trim() elimina espacios al inicio y fin
    setReseñaError('El comentario no puede estar vacío.');
    return; // corta la ejecución y no envía nada
  }

  try {
    const response = await fetch("http://localhost:3000/resenas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
      comentario,
      puntuacion,
      restauranteId: restaurante.id,
      userId: parseInt(localStorage.getItem("userId")),
    }),

    });

    if (!response.ok) throw new Error("Error al enviar reseña");

    const data = await response.json();
    setResenas((prev) => [data, ...prev]); // Agrega la nueva reseña
    console.log("Reseña enviada con éxito:", data);

    setMensaje("¡Gracias por tu reseña!");
    setComentario("");
    setPuntuacion(5);
    setReseñaError("");

  } catch (err) {
    console.error(err);
    setReseñaError("Error al enviar reseña");
  }
};

  const handleReserva = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!userId || !token) {
    alert("Debes iniciar sesión para realizar una reserva.");
    return;
  }

  if (!fechaReserva || !cantidadPersonas) {
    alert("Por favor completá la fecha y la cantidad de personas.");
    return;
  }
  

  try {
    const response = await fetch(`http://localhost:3000/reserva/crear/${restaurante.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fecha: new Date(fechaReserva).toISOString(),
        cantidadPersonas: parseInt(cantidadPersonas),
        usuarioId: parseInt(userId),
        restauranteId: restaurante.id,
      }),
    });

    if (!response.ok) throw new Error("Error al guardar la reserva");

    if (parseInt(cantidadPersonas) < 1 || parseInt(cantidadPersonas) > 8) {
    alert("La cantidad de personas debe ser entre 1 y 8.");
    return;
  }


    const data = await response.json();
    alert("¡Reserva registrada correctamente para: " + new Date(data.fecha).toLocaleString() + "!");

    // Limpiar campos si se desea
    setFechaReserva('');
    setCantidadPersonas(1);
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al guardar la reserva");
  }
};




  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!restaurante) return <Typography>Restaurante no encontrado</Typography>;

  return (
    <Container sx={{ py: 5, }}>
      <Typography variant="h1" align="center" sx={{ fontFamily: 'Kaushan Script', mb: 3 }}>
        {restaurante.nombre}
      </Typography>
      {restaurante.photos && restaurante.photos.length > 0 && (
        <Box
        sx={{
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
          backgroundColor: '#1C1C1C',
          overflow: 'hidden',
          mt: 2,
        }}
      >
        <Slider {...settings}>
          {restaurante.photos.map((photo) => (
            <Box
              key={photo.id}
              sx={{
                width: '100vw',
                height: 500,
                backgroundColor: '#1C1C1C',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardMedia
                component="img"
                image={`http://localhost:3000/${photo.url}`}
                alt={restaurante.nombre}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: 7,
                  
                }}
              />
            </Box>
          ))}
        </Slider>
        </Box>

        )}


      <Typography
          variant="body1"
          sx={{
            fontStyle: 'italic',
            color: '#3E3E3E', // Gris cálido
            fontSize: '1.15rem',
            lineHeight: 1.9,
            mt: 3,
            mb: 4,
            px: 3,
            py: 2,
            backgroundColor: '#F5E6D3', // Beige claro tipo montaña/tierra
            borderRadius: 4,
            boxShadow: '0 2px 8px rgba(15, 3, 13, 0.93)',
            fontFamily: 'Georgia, serif',
            textAlign: 'justify',
          }}
        >
          {restaurante.descripcion}
        </Typography>

      <Typography variant="body1" sx={{ color: 'black', mt: 1, textAlign: 'right', fontWeight: 'bold',  }}>{restaurante.direccion}</Typography>
      <Typography variant="body1" sx={{ color: 'black', mt: 1, textAlign: 'right', fontWeight: 'bold',  }}>{restaurante.horario}</Typography>
      <Typography variant="body1" sx={{ color: 'black', mt: 1, textAlign: 'right', fontWeight: 'bold',  }}>{restaurante.contacto}</Typography>
      
      {restaurante.promociones && restaurante.promociones.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{fontFamily: 'Kaushan Script', fontWeight: 'bold', color: 'black' }}>
              Promociones especiales
            </Typography>

            <Grid container spacing={3}>
              {restaurante.promociones.map((promo) => (
                <Grid item xs={12} sm={6} md={4} key={promo.id}>
                  <Card sx={{ height: '100%', backgroundColor: '#3D3C3B', borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffff' }}>
                        {promo.titulo}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: '#ffff' }}>
                        {promo.descripcion}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        Vigencia: {new Date(promo.fechaInicio).toLocaleDateString()} - {new Date(promo.fechaFin).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

      {/* Datos del usuario responsable */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        {/* Botón Menú */}
        <Tooltip title={mostrarMenu ? "Ocultar menú" : "Ver menú"}>
          <IconButton
            onClick={() => setMostrarMenu(!mostrarMenu)}
            sx={{
              backgroundColor: '#3D3C3B',
              color: '#fff',
              width: 48,
              height: 48,
              '&:hover': {
                backgroundColor: '#3D3C3B',
              },
              '&:active': {
                transform: 'none',
              },
            }}
          >
            <RestaurantMenuIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        {/* Botón Bebidas */}
        <Tooltip title={mostrarBebidas ? "Ocultar bebidas" : "Ver bebidas"}>
          <IconButton
            onClick={() => setMostrarBebidas(!mostrarBebidas)}
            sx={{
              backgroundColor: '#3D3C3B',
              color: '#fff',
              width: 48,
              height: 48,
              '&:hover': {
                backgroundColor: '#3D3C3B',
              },
              '&:active': {
                transform: 'none',
              },
            }}
          >
            <LiquorIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        {/* Botón Eventos */}
        <Tooltip title="Ver eventos">
          <IconButton
            onClick={() => {/* lógica para eventos */}}
            sx={{
              backgroundColor: '#3D3C3B',
              color: '#fff',
              width: 48,
              height: 48,
              '&:hover': {
                backgroundColor: '#3D3C3B',
              },
              '&:active': {
                transform: 'none',
              },
            }}
          >
            <EventIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

          
          {mostrarMenu && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h3" align="center" sx={{ fontFamily: 'Kaushan Script' }} gutterBottom>
                Menú 
              </Typography>

              {categoriasMenu.length === 0 ? (
                <Typography variant="body1">Este restaurante aún no cargó su menú.</Typography>
              ) : (
                categoriasMenu.map((categoria) => (
                  <Box key={categoria.id} sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#322B23' }}>
                      {categoria.nombre}
                    </Typography>
                    {categoria.menus.map((item) => (
                      <Box key={item.id} sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
                        <Typography variant="subtitle1">{item.nombre}</Typography>
                        <Typography variant="body2">{item.descripcion}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          ${item.precio}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ))
              )}
            </Box>
            )}
           {mostrarBebidas && (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h3" align="center" sx={{ fontFamily: 'Kaushan Script' }} gutterBottom>
      Bebidas
    </Typography>

    {categoriasBebidas.length === 0 ? (
      <Typography variant="body1">Este restaurante aún no cargó sus bebidas.</Typography>
    ) : (
      categoriasBebidas.map((categoria) => (
        <Box key={categoria.id} sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#322B23' }}>
            {categoria.nombre}
          </Typography>
          {categoria.bebidas?.map((item) => (
            <Box key={item.id} sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
              <Typography variant="subtitle1">{item.nombre}</Typography>
              <Typography variant="body2">{item.descripcion}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                ${item.precio}
              </Typography>
            </Box>
          ))}
        </Box>
      ))
    )}
  </Box>
)}


        </Box>
        
      

      {/* Formulario de Reseña */}
      <Box component="form" onSubmit={handleEnviarReseña} sx={{ mt: 6 }}>
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Comentarios
          </Typography>

          {resenas.length === 0 ? (
            <Typography variant="body1">Todavía no hay reseñas.</Typography>
          ) : (
            resenas.map((resena) => (
              <Box key={resena.id} sx={{ my: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {resena.usuario?.nombre } , {resena.usuario?.provincia }
                </Typography>
                <Rating value={resena.puntuacion} readOnly />
                <Typography variant="body2">{resena.comentario}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(resena.fecha).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          )}
        </Box>

        <Typography variant="h" gutterBottom>
          Dejá tu comentario
        </Typography>

        <Rating
          name="puntuacion"
          value={puntuacion}
          onChange={(event, newValue) => {
            setPuntuacion(newValue);
          }}
        />

        <TextField
          label="Comentario"
          multiline
          fullWidth
          rows={4}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          sx={{ my: 2 ,'& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // color normal
      },
      '&:hover fieldset': {
        borderColor: '#999', // color al pasar el mouse
      },
      '&.Mui-focused fieldset': {
        borderColor: '#322B23', // color al hacer foco (tu color deseado)
      },
    },
    '& .MuiInputLabel-root': {
      color: '#444', // color del label normal
      '&.Mui-focused': {
        color: '#322B23', // color del label al hacer foco
      },},}}
        />

        <Button variant="contained" color="3D3C3B" type="submit" 
        sx={{backgroundColor: '#3D3C3B', color: '#fff'}}>
          Enviar
        </Button>

        {mensaje && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
        {reseñaError && <Alert severity="error" sx={{ mt: 2 }}>{reseñaError}</Alert>}
      </Box>
    
<Box sx={{ mt: 6, p: 3, backgroundColor: '#B29C7D', borderRadius: 3 }}>
  <Typography variant="h5" gutterBottom>
    Hacer una reserva
  </Typography>
<TextField
    label="Seleccioná una fecha"
    type="date"
    fullWidth
    value={fechaReserva.split('T')[0] || ''}
    onChange={(e) => {
      const fecha = e.target.value;
      const hora = fechaReserva.split('T')[1] || '10:00';
      setFechaReserva(`${fecha}T${hora}`);
    }}
    InputLabelProps={{ shrink: true }}
    inputProps={{
      min: hoy, // ⛔ bloquea fechas pasadas
    }}
    sx={{ my: 2 ,backgroundColor: '#fff','& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // color normal
      },
      '&:hover fieldset': {
        borderColor: '#999', // color al pasar el mouse
      },
      '&.Mui-focused fieldset': {
        borderColor: '#322B23', // color al hacer foco (tu color deseado)
      },
    },
    '& .MuiInputLabel-root': {
      color: '#444', // color del label normal
      '&.Mui-focused': {
        color: '#322B23', // color del label al hacer foco
      },},}}
  />


  {/* Horario */}
  <TextField
  select
  label="Horario"
  fullWidth
  value={fechaReserva.split('T')[1] || '10:00'}
  onChange={(e) => {
    const hora = e.target.value;
    const fecha = fechaReserva.split('T')[0] || hoy;
    setFechaReserva(`${fecha}T${hora}`);
  }}
  sx={{ my: 2 ,backgroundColor: '#fff','& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // color normal
      },
      '&:hover fieldset': {
        borderColor: '#999', // color al pasar el mouse
      },
      '&.Mui-focused fieldset': {
        borderColor: '#322B23', // color al hacer foco (tu color deseado)
      },
    },
    '& .MuiInputLabel-root': {
      color: '#444', // color del label normal
      '&.Mui-focused': {
        color: '#322B23', // color del label al hacer foco
      },},}}
>
  {generarHorariosDisponibles(fechaReserva.split('T')[0] || hoy).map((hora) => (
    <MenuItem key={hora} value={hora}>
      {hora}
    </MenuItem>
  ))}
</TextField>


  {/* Cantidad de personas */}
  <TextField
    label="Cantidad de personas"
    type="number"
    fullWidth
    value={cantidadPersonas}
    onChange={(e) => setCantidadPersonas(e.target.value)}
    inputProps={{ min: 1, max: 8 }}
    sx={{ my: 2 ,backgroundColor: '#fff','& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // color normal
      },
      '&:hover fieldset': {
        borderColor: '#999', // color al pasar el mouse
      },
      '&.Mui-focused fieldset': {
        borderColor: '#322B23', // color al hacer foco (tu color deseado)
      },
    },
    '& .MuiInputLabel-root': {
      color: '#444', // color del label normal
      '&.Mui-focused': {
        color: '#322B23', // color del label al hacer foco
      },},}}
  />

  {/* Botón Reservar */}
  <Button
    variant="contained"
    sx={{ backgroundColor: '#322B23', color: '#fff', mt: 1 }}
    onClick={handleReserva}
  >
    Reservar
  </Button>
</Box>


    </Container>
  );
}
