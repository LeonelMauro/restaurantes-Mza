import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
    <Box 
    display="flex" 
    flexDirection='column'
    justifyContent="center" 
    alignItems="center" 
    height="100vh"
    >
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
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          width: 320,
          mx: 'auto',
          borderRadius: 4,
          backgroundColor: '#FFF9F2',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Kaushan Script',
            fontWeight: 'bold',
            color: '#8B5E3C',
            mb: 3,
          }}
        >
          Iniciar sesión
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={data.email}
            onChange={handleChange}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: '#F5E6D3',
              },
            }}
          />

          <TextField
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={data.password}
            onChange={handleChange}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: '#F5E6D3',
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: '#8B5E3C' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#3D3C3B',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#2E2D2C' },
              borderRadius: 2,
            }}
          >
            Iniciar
          </Button>

          <Button
            component={Link}
            to="/register"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#3D3C3B',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#2E2D2C' },
              borderRadius: 2,
            }}
          >
            Registrarse
          </Button>
        </form>
      </Paper>

    </Box>
  );
};

export default LoginForm;
