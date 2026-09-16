import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const RestauranteInformacion = ({ restaurante, onEditar }) => {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
        mb: 5,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Kaushan Script",
          fontSize: "2rem",
          color: "#3D3C3B",
          mb: 2,
        }}
      >
        Información
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <LocationOnIcon sx={{ color: "#3D3C3B" }} />

          <Typography sx={{ fontWeight: "bold", mt: 1, color: "#3D3C3B" }}>
            Dirección
          </Typography>

          <Typography sx={{ color: "#555", mt: 0.5 }}>
            {restaurante.direccion}

            <IconButton
              onClick={() => onEditar("direccion")}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <PhoneIcon sx={{ color: "#3D3C3B" }} />

          <Typography sx={{ fontWeight: "bold", mt: 1, color: "#3D3C3B" }}>
            Contacto
          </Typography>

          <Typography sx={{ color: "#555", mt: 0.5 }}>
            {restaurante.contacto}

            <IconButton
              onClick={() => onEditar("contacto")}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <AccessTimeIcon sx={{ color: "#3D3C3B" }} />

          <Typography sx={{ fontWeight: "bold", mt: 1, color: "#3D3C3B" }}>
            Horario
          </Typography>

          <Typography sx={{ color: "#555", mt: 0.5 }}>
            {restaurante.horario}

            <IconButton
              onClick={() => onEditar("horario")}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RestauranteInformacion;
