import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ nombre: "", email: "", password: "", tipo: "turista" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/user", data);
      alert("Registro exitoso!");
      navigate("/login");
    } catch (error) {
      alert("Error al registrarse");
      console.error(error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection='column' alignItems="center" height="100vh">
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
                Comenza yá.!! 
              </Typography>
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" mb={2}>Registro</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="nombre"
            label="Nombre"
            fullWidth
            margin="normal"
            value={data.nombre}
            onChange={handleChange}
          />
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
          <Button type="submit" sx={{ backgroundColor: '#3D3C3B', color: '#fff' }} fullWidth>Registrarse</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
