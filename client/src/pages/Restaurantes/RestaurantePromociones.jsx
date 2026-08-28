import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export default function RestaurantePromociones({ promociones }) {
  if (!promociones || promociones.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "Kaushan Script",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Promociones especiales
      </Typography>

      <Grid container spacing={3} align="center">
        {promociones.map((promo) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={promo.id}
          >
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#3D3C3B",
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {promo.titulo}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    color: "#fff",
                  }}
                >
                  {promo.descripcion}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 1,
                    color: "#fff",
                  }}
                >
                  ${promo.precio}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    display: "block",
                    color: "#fff",
                  }}
                >
                  Vigencia:{" "}
                  {new Date(
                    promo.fechaInicio
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    promo.fechaFin
                  ).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
