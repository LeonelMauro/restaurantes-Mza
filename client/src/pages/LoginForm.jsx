import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

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
      navigate(`/AddRestaurantForm`);
    } else if (user.tipo === "turista") {
      navigate("/VistaMontaña");
    }
  })
  .catch((err) => {
    console.error(err);
    alert("Error al iniciar sesión");
  });
 };



  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" mb={2}>Iniciar sesión</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={data.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={data.password}
            onChange={handleChange}
          />
          <Button type="submit" sx={{ backgroundColor: '#3D3C3B', color: '#fff' }} fullWidth>Iniciar</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
