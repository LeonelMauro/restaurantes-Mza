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
       <Paper elevation={6} sx={{
          padding: 5,
          width: 320,
          mx: 'auto',
          borderRadius: 4,
          backgroundColor: '#FFF9F2',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        }}>
        <Typography variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Kaushan Script',
            fontWeight: 'bold',
            color: '#8B5E3C',
            mb: 3,
          }}
          >Registro</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="nombre"
            label="Nombre"
            fullWidth
            margin="normal"
            
            value={data.nombre}
            onChange={handleChange}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: '#F5E6D3',
              },
            }}
          />
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
            type="password"
            fullWidth
            margin="normal"
            value={data.password}
            onChange={handleChange}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: '#F5E6D3',
              },
            }}
          />
          <Button type="submit" sx={{  mt: 2,backgroundColor: '#3D3C3B', color: '#fff' }} fullWidth>Registrarse</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
