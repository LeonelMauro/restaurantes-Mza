import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useAuth} from '../context/AuthContext'


const LoginForm = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
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
  e.preventDefault();

  if (!data.email || !data.password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    // 1. Enviamos las credenciales al backend.
    const res = await axios.post(
      "http://localhost:3000/auth/login",
      {
        email: data.email,
        password: data.password,
      }
    );

    // 2. Obtenemos el usuario y el JWT.
    const { user, access_token } = res.data;

    // 3. Guardamos la sesión mediante AuthContext.
    login(user, access_token);

    // 4. Redirigimos según el tipo de usuario.
    if (user.tipo === "restaurante") {
      const restauranteRes = await axios.get(
        `http://localhost:3000/restaurante/by-user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (restauranteRes.data) {
        navigate(`/mi-restaurante/${restauranteRes.data.id}`);
      } else {
        navigate("/addrestaurantes");
      }
    } else if (user.tipo === "turista") {
      navigate("/VistaMontaña");
    } else if (user.tipo === "admin") {
      navigate("/");
    } else {
      alert("El tipo de usuario no es válido.");
    }
  } catch (err) {
    console.error("Error durante el inicio de sesión:", err);
    alert("No se pudo iniciar sesión o verificar los datos del usuario.");
  }
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
