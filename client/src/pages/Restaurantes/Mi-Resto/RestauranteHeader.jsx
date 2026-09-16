import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const RestauranteHeader = ({ restaurante, onEditar }) => {
  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "Kaushan Script",
          fontSize: {
            xs: "2.5rem",
            sm: "3.2rem",
            md: "4rem",
          },
          color: "#3D3C3B",
          mb: 2,
        }}
      >
        {restaurante.nombre}

        <IconButton
          onClick={() => onEditar("nombre")}
          size="small"
          sx={{ ml: 1 }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Typography>

      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: 2,
          backgroundColor: "#F5E6D3",
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(15, 3, 13, 0.15)",
        }}
      >
        <Typography
          sx={{
            fontStyle: "italic",
            color: "#3E3E3E",
            fontSize: { xs: "1rem", sm: "1.1rem" },
            lineHeight: 1.8,
            fontFamily: "Georgia, serif",
            textAlign: "justify",
          }}
        >
          {restaurante.descripcion}

          <IconButton
            onClick={() => onEditar("descripcion")}
            size="small"
            sx={{ ml: 1 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Typography>
      </Box>
    </Box>
  );
};

export default RestauranteHeader;

