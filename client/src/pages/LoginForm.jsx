import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault(); // ¡No te olvides de prevenir el submit por defecto!

  if (!data.email || !data.password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  axios
  .post("http://localhost:3000/user/login", {
    email: data.email,
    password: data.password,
  })
  .then((res) => {
    const { user, access_token } = res.data;
    localStorage.setItem("token", access_token);
    localStorage.setItem("tipo", user.tipo);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("nombre", user.nombre);

    // Recuperar datos desde localStorage
    const tipo = localStorage.getItem("tipo");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombre");

    console.log("Usuario logueado:", { tipo, userId, token,nombre });

    if (tipo && userId) {
      console.log(`El usuario logueado es de tipo "${tipo}" con ID ${userId}`);
    } else {
      console.log("No hay usuario logueado.");
    }

    // Redirigir según el tipo
    if (user.tipo === "restaurante") {
        axios
          .get(`http://localhost:3000/restaurante/by-user/${user.id}`)
          .then((res) => {
            if (res.data) {
              // Ya tiene datos del restaurante cargados
              navigate(`/mi-restaurante/${res.data.id}`);
            } else {
              // No tiene restaurante asociado, lo mandamos al formulario
              navigate("/addrestaurantes");
            }
          })
          .catch((err) => {
            console.error("Error al verificar restaurante:", err);
            alert("Hubo un problema al verificar tus datos.");
          });
          } else if (user.tipo === "turista") {
          navigate("/VistaMontaña"); // 👈 o la ruta que tengas como home para turistas
        

      }

  })
  .catch((err) => {
    console.error(err);
    alert("Error al iniciar sesión");
  });
 };



  return (
    <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" height="100vh">
      <Box>
      <Typography
          variant="h2"
          align="center"
          sx={{
            fontFamily: 'Kaushan Script',
            fontWeight: 'bold',
            color: 'black',
            mb: 4,
          }}
        >
          Bienvenidos
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" mb={2}>Iniciar sesión</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            color='#3D3C3B'
            margin="normal"
            value={data.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={data.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" sx={{ backgroundColor: '#3D3C3B', color: '#fff' }} fullWidth>Iniciar</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
