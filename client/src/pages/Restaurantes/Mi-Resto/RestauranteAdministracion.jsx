import { Box, Card, CardContent, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LiquorIcon from "@mui/icons-material/Liquor";
import EventIcon from "@mui/icons-material/Event";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const RestauranteAdministracion = ({ onNavigate }) => {
  const opciones = [
    {
      titulo: "Menú",
      descripcion: "Administrar platos y categorías",
      icono: <RestaurantMenuIcon />,
      ruta: "/menu/create",
    },
    {
      titulo: "Bebidas",
      descripcion: "Administrar bebidas y categorías",
      icono: <LiquorIcon />,
      ruta: "/bebidas",
    },
    {
      titulo: "Eventos",
      descripcion: "Administrar eventos",
      icono: <EventIcon />,
      ruta: "/eventos",
    },
    {
      titulo: "Promociones",
      descripcion: "Administrar promociones",
      icono: <LocalOfferIcon />,
      ruta: "/promos",
    },
  ];

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto" }}>
      <Typography
        sx={{
          fontFamily: "Kaushan Script",
          fontSize: "2rem",
          color: "#3D3C3B",
          mb: 2,
        }}
      >
        Administración
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 2,
        }}
      >
        {opciones.map((opcion) => (
          <Card
            key={opcion.titulo}
            onClick={() => onNavigate(opcion.ruta)}
            sx={{
              cursor: "pointer",
              borderRadius: 3,
              backgroundColor: "#3D3C3B",
              color: "#fff",
              transition: "0.2s",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2.5,
                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  backgroundColor: "#F5E6D3",
                  color: "#3D3C3B",
                  flexShrink: 0,
                }}
              >
                {opcion.icono}
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {opcion.titulo}
                </Typography>

                <Typography variant="body2" sx={{ color: "#ddd", mt: 0.5 }}>
                  {opcion.descripcion}
                </Typography>
              </Box>

              <ArrowForwardIcon />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RestauranteAdministracion;
