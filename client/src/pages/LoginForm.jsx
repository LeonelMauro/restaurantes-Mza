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
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/user/login", data);

    // Guardar token en localStorage
    localStorage.setItem("token", res.data.access_token);

    alert("Inicio de sesión exitoso!");
    navigate("/addrestaurantes"); // O redirigí a donde registrás restaurante
  } catch (error) {
    alert("Error al iniciar sesión");
    console.error(error);
  }
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
          <Button type="submit" variant="contained" fullWidth>Ingresar</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
