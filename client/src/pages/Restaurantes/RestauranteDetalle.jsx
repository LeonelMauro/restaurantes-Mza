import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Rating,
  Alert,
  MenuItem,
   Grid, Card, CardContent,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions
} from '@mui/material';
import { Tooltip, IconButton } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LiquorIcon from '@mui/icons-material/Liquor';
import EventIcon from '@mui/icons-material/Event';
import dayjs from 'dayjs'; // si no lo tenés instalado: npm install dayjs
import RestauranteGaleria from './RestauranteGaleria';
import RestauranteMenu from './RestauranteMenu';
import RestauranteBebidas from './RestauranteBebidas';
import RestauranteResenas from './RestauranteResenas';
import RestauranteEventos from './RestauranteEventos';
import RestaurantePromociones from './RestaurantePromociones';



export default function RestauranteDetalle() {

  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  // debajo de const [restaurante, setRestaurante] = useState(null);
  const [resenas, setResenas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //menu
  const [mostrarMenu, setMostrarMenu] = useState(false);

  //evento
  const [mostrarEventos, setMostrarEventos] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [dialogoReservaAbierto, setDialogoReservaAbierto] = useState(false);
  const [cantidadPersonasEvento, setCantidadPersonasEvento] = useState(1);
  

  const abrirDialogoReservaEvento = (evento) => {
    setEventoSeleccionado(evento);
    setCantidadPersonasEvento(1);
    setDialogoReservaAbierto(true);
  };

  const cerrarDialogoReservaEvento = () => {
    setEventoSeleccionado(null);
    setDialogoReservaAbierto(false);
  };



  //bebidas
  const [mostrarBebidas, setMostrarBebidas] = useState(false);

  //reserva
  const [cantidadPersonas, setCantidadPersonas] = useState(1);

 
  const [fechaReserva, setFechaReserva] = useState('');
  const generarHorarios = () => {
  const horarios = [];
  for (let h = 0; h <= 24; h++) {
    horarios.push(`${String(h).padStart(2, '0')}:00`);
    horarios.push(`${String(h).padStart(2, '0')}:30`);
  }
  horarios.push("00:00"); // agregar medianoche
  return horarios;
};
  const horarios = generarHorarios();
  const generarHorariosDisponibles = (fechaSeleccionada) => {
  const horaInicio = 0;
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
      if (data.resenas) {
        setResenas(data.resenas);
      }
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [id]);

 

 



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
  if (parseInt(cantidadPersonas) < 1 || parseInt(cantidadPersonas) > 6) {
    alert("La cantidad de personas debe ser entre 1 y 6.");
    return;
  }
  

  try {
    const body = {
      fecha: new Date(fechaReserva).toISOString(),
      cantidadPersonas: parseInt(cantidadPersonas),
    };

    const response = await fetch(`http://localhost:3000/reserva/crear/${restaurante.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text(); // para saber qué responde Nest
      console.error("Error del backend:", errorText);
      throw new Error("Error al guardar la reserva");
    }

    const data = await response.json();
    alert("¡Reserva registrada correctamente para: " + new Date(data.fecha).toLocaleString() + "!");
    
    setFechaReserva('');
    setCantidadPersonas(1);
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    alert("Ocurrió un error al guardar la reserva");
  }
};
  const handleReservaEvento = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!userId || !token) {
    alert("Debes iniciar sesión para realizar una reserva.");
    return;
  }

  if (!eventoSeleccionado || !cantidadPersonasEvento) {
    alert("Faltan datos para la reserva del evento.");
    return;
  }

  if (parseInt(cantidadPersonasEvento) < 1 || parseInt(cantidadPersonasEvento) > 6) {
    alert("La cantidad de personas debe ser entre 1 y 6.");
    return;
  }

  try {
    // Usá directamente eventoSeleccionado.fecha si tiene hora incluida
    const fechaIso = new Date(eventoSeleccionado.fecha).toISOString();

    const body = {
      fecha: fechaIso,
      cantidadPersonas: parseInt(cantidadPersonasEvento),
     
    };

    const response = await fetch(`http://localhost:3000/reserva/crear-evento/${restaurante.id}/${eventoSeleccionado.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del backend:", errorText);
      throw new Error("No se pudo reservar el evento");
    }

    const data = await response.json();
    alert(`¡Reserva realizada con éxito para el evento "${eventoSeleccionado.titulo}"!`);
    cerrarDialogoReservaEvento();
  } catch (error) {
    console.error("Error al reservar evento", error);
    alert("Ocurrió un error al reservar el evento.");
  }
};




  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!restaurante) return <Typography>Restaurante no encontrado</Typography>;

  return (
    <Container sx={{ py: 5, }}>
      <RestauranteGaleria restaurante={restaurante} />
      <RestaurantePromociones
        promociones={restaurante.promociones}
      />
      {/* Datos del usuario responsable */}
      <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
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
            onClick={() => setMostrarEventos(!mostrarEventos)}
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
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: mostrarMenu && mostrarBebidas ? 'space-between' : 'center',
            gap: 3,
            mt: 2,
            flexWrap: 'wrap',
            transition: 'all 0.5s ease',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
            {mostrarMenu && (
              <Box
                sx={{
                  width: mostrarMenu && mostrarBebidas ? '50%' : '100%',
                  px: 3,
                }}
              >
            <RestauranteMenu id={id} />
          </Box>
          )}
          {mostrarEventos && (
            <RestauranteEventos
              id={id}
              onReservar={abrirDialogoReservaEvento}
            />
          )}
          {mostrarBebidas && (
            <Box
              sx={{
                width: mostrarMenu && mostrarBebidas ? "50%" : "100%",
                px: 3,
              }}
            >
              <RestauranteBebidas id={id} />
            </Box>
          )} 
        </Box>
        </Box>
      <RestauranteResenas
        restauranteId={restaurante.id}
        resenasIniciales={resenas}
      />
    
      <Box sx={{ mt: 6, p: 3, backgroundColor: '#B29C7D', borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Vamos hace una reserva .!
        </Typography>
        <TextField
            
            type="date"
            
            fullWidth
            value={fechaReserva.split('T')[0] || ''}
            onChange={(e) => {
              const fecha = e.target.value;
              const hora = fechaReserva.split('T')[1] || '00:00';
              const fechaSeleccionada = dayjs(fecha);
              const hoyFecha = dayjs().startOf('day');

              if (fechaSeleccionada.isBefore(hoyFecha)) {
                setMensaje('⚠️ La fecha seleccionada ya pasó.');
              } else {
                setMensaje('');
              }

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
            value={fechaReserva.split('T')[1] }
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
          type="number"
          fullWidth
          value={cantidadPersonas}
          onChange={(e) => setCantidadPersonas(e.target.value)}
          inputProps={{ min: 1, max: 6 }}
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
      <Dialog open={dialogoReservaAbierto} onClose={cerrarDialogoReservaEvento} fullWidth maxWidth="sm">
        <DialogTitle>Reservar Evento</DialogTitle>
        <DialogContent>
          {eventoSeleccionado && (
            <>
              <Typography variant="h6">{eventoSeleccionado.titulo}</Typography>
              <Typography>📅 {new Date(eventoSeleccionado.fecha).toLocaleDateString()}</Typography>
              <Typography>⏰ {new Date(eventoSeleccionado.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
              <TextField
                label="Cantidad de personas"
                type="number"
                fullWidth
                margin="normal"
                value={cantidadPersonasEvento}
                onChange={(e) => setCantidadPersonasEvento(e.target.value)}
                inputProps={{ min: 1, max: 6 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarDialogoReservaEvento}>Cancelar</Button>
          <Button onClick={handleReservaEvento} variant="contained" color="primary">
            Confirmar Reserva
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
