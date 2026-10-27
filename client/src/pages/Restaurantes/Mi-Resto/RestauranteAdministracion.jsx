import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LiquorIcon from "@mui/icons-material/Liquor";
import EventIcon from "@mui/icons-material/Event";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SettingsIcon from "@mui/icons-material/Settings";

const RestauranteAdministracion = ({
  onNavigate,
  seccionActiva = "inicio",
}) => {
  const opciones = [
    {
      titulo: "Inicio",
      icono: <DashboardIcon />,
      seccion: "inicio",
    },
    {
      titulo: "Reservas",
      icono: <CalendarMonthIcon />,
      ruta: "/ReservasResto",
      seccion: "reservas",
    },
    {
      titulo: "Reseñas",
      icono: <ReviewsIcon />,
      seccion: "resenas",
    },
    {
      titulo: "Fotos",
      icono: <PhotoLibraryIcon />,
      seccion: "fotos",
    },
    {
      titulo: "Menú",
      icono: <RestaurantMenuIcon />,
      ruta: "/menu/create",
      seccion: "menu",
    },
    {
      titulo: "Bebidas",
      icono: <LiquorIcon />,
      ruta: "/bebidas",
      seccion: "bebidas",
    },
    {
      titulo: "Eventos",
      icono: <EventIcon />,
      ruta: `/eventos/:id`,
      seccion: "eventos",
    },
    {
      titulo: "Promociones",
      icono: <LocalOfferIcon />,
      ruta: "/promos",
      seccion: "promociones",
    },
    {
      titulo: "Mi restaurante",
      icono: <SettingsIcon />,
      seccion: "restaurante",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { md: 260 },
        flexShrink: 0,
        bgcolor: "#292D2A",
        color: "#fff",
        borderRadius: 3,
        p: 2,
        alignSelf: "flex-start",
      }}
    >
      <Typography
        sx={{
          color: "#D8BD68",
          fontWeight: "bold",
          fontSize: "1.1rem",
          px: 2,
          py: 1,
        }}
      >
        Administración
      </Typography>

      <List>
        {opciones.map((opcion) => (
          <ListItemButton
            key={opcion.seccion}
            selected={seccionActiva === opcion.seccion}
            onClick={() => onNavigate(opcion)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: "#fff",
              "& .MuiListItemIcon-root": {
                color: "#D8BD68",
                minWidth: 40,
              },
              "&.Mui-selected": {
                bgcolor: "#454941",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#454941",
              },
              "&:hover": {
                bgcolor: "#3B403A",
              },
            }}
          >
            <ListItemIcon>{opcion.icono}</ListItemIcon>
            <ListItemText primary={opcion.titulo} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default RestauranteAdministracion;