import { Box, Button, TextField, Typography ,MenuItem} from "@mui/material";
import dayjs from 'dayjs'; // si no lo tenés instalado: npm install dayjs
import { useState } from "react";


export default function RestauranteReservas(){
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
  

  return(
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

    )
}