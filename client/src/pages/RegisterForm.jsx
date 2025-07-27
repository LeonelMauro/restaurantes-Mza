import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const paisesExtranjeros = [
  "Uruguay",
  "Chile",
  "Brasil",
  "Paraguay",
  "Bolivia",
  "Perú",
  "Colombia",
  "Venezuela",
  "México",
  "España",
  "Estados Unidos",
  "Italia",
  "Francia",
  "Alemania",
  "Canadá",
  "España",
  "Otro",
];


const provinciasArgentinas = [
  "Buenbos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones",
  "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
  "Santiago del Estero", "Tierra del Fuego", "Tucumán"
];

const RegisterForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    nombre: "",
    email: "",
    password: "",
    tipo: "turista",
    nacionalidad: "",
    provincia: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    // Si cambia la nacionalidad y no es Argentina, limpiamos provincia
    if (e.target.name === "nacionalidad" && e.target.value !== "Argentina") {
      setData((prev) => ({ ...prev, provincia: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/user", data);
      alert("Registro exitoso!");
      navigate("/login");
    } catch (error) {
      alert("Error al registrarse");
      console.error(error);
    }
  };

  return (
    <Box
      
       display="flex" 
    flexDirection='column'
    justifyContent="center" 
    alignItems="center" 
    height="100vh"
      pt={10} // este valor crea espacio arriba
    >
      <Box>

      <Typography
        variant="h2"
        align="center"
        sx={{
          fontFamily: "Kaushan Script",
          fontWeight: "bold",
          color: "black",
          mb: 4,
        }}
      >
        ¡Comenzá ya!
      </Typography>
      </Box>
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          width: 320,
          mx: "auto",
          borderRadius: 4,
          backgroundColor: "#FFF9F2",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "Kaushan Script",
            fontWeight: "bold",
            color: "#8B5E3C",
            mb: 3,
          }}
        >
          Registro
        </Typography>

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
                backgroundColor: "#F5E6D3",
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
                backgroundColor: "#F5E6D3",
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
                backgroundColor: "#F5E6D3",
              },
            }}
          />

          <TextField
            select
            name="nacionalidad"
            label="Nacionalidad"
            fullWidth
            margin="normal"
            value={data.nacionalidad}
            onChange={handleChange}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: "#F5E6D3",
              },
            }}
          >
            <MenuItem value="Argentina">Argentina</MenuItem>
            <MenuItem value="Otra">Otra</MenuItem>
          </TextField>

          {data.nacionalidad === "Argentina" && (
            <TextField
              select
              name="provincia"
              label="Provincia"
              fullWidth
              margin="normal"
              value={data.provincia}
              onChange={handleChange}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: "#F5E6D3",
                },
              }}
            >
              {provinciasArgentinas.map((prov) => (
                <MenuItem key={prov} value={prov}>
                  {prov}
                </MenuItem>
              ))}
            </TextField>
          )}

          {data.nacionalidad === "Otra" && (
            <TextField
              select
              name="provincia"
              label="País"
              fullWidth
              margin="normal"
              value={data.provincia}
              onChange={handleChange}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: "#F5E6D3",
                },
              }}
            >
              {paisesExtranjeros.map((pais) => (
                <MenuItem key={pais} value={pais}>
                  {pais}
                </MenuItem>
              ))}
            </TextField>
          )}

          <Button
            type="submit"
            sx={{ mt: 2, backgroundColor: "#3D3C3B", color: "#fff" }}
            fullWidth
          >
            Registrarse
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
