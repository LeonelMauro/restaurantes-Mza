import { Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Bebida = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
};

type CategoriaBebida = {
  id: number;
  nombre: string;
  bebidas?: Bebida[];
};

type RestauranteBebidasProps = {
  id: string | undefined;
};

export default function RestauranteBebidas({
  id,
}: RestauranteBebidasProps) {
  const [categoriasBebidas, setCategoriasBebida] = useState<
    CategoriaBebida[]
  >([]);

  useEffect(() => {
    if (!id) return;

    fetch(
      `http://localhost:3000/category-bebidas/restaurante/${id}/categorias-con-bebidas`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("categoriasBebidas recibidas:", data);

        if (Array.isArray(data)) {
          setCategoriasBebida(data);
        } else {
          setCategoriasBebida([]);
          console.warn(
            "Se esperaba un array, pero se recibió:",
            data
          );
        }
      })
      .catch((err) =>
        console.error(
          "Error al traer categorías de bebidas:",
          err
        )
      );
  }, [id]);

  return (
    <Box sx={{ width: "100%", px: 3 }}>
      <Card
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ fontFamily: "Kaushan Script" }}
          gutterBottom
        >
          ~ Bebidas ~
        </Typography>

        {categoriasBebidas.length === 0 ? (
          <Typography variant="body1" align="center">
            Este restaurante aún no cargó sus bebidas.
          </Typography>
        ) : (
          categoriasBebidas.map((categoria) => (
            <Box key={categoria.id} sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#322B23",
                }}
              >
                {categoria.nombre}
              </Typography>

              {categoria.bebidas?.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    py: 1.5,
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                  >
                    ~ {item.nombre}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ textAlign: "justify" }}
                  >
                    {item.descripcion}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold" }}
                  >
                    ${item.precio}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))
        )}
      </Card>
    </Box>
  );
}