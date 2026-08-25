import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type MenuItem = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
};

type CategoriaMenu = {
  id: number;
  nombre: string;
  menus: MenuItem[];
};

type RestauranteMenuProps = {
  id: string | undefined;
};

export default function RestauranteMenu({
  id,
}: RestauranteMenuProps) {
  const [categoriasMenu, setCategoriasMenu] = useState<CategoriaMenu[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(
      `http://localhost:3000/category-menu/restaurante/${id}/categorias-con-menu`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Categorías con menú:", data);
        setCategoriasMenu(data);
      })
      .catch((err) =>
        console.error("Error al traer categorías con menú:", err)
      );
  }, [id]);

  return (
    <Box>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontFamily: "Kaushan Script" }}
        gutterBottom
      >
        ~ Menú ~
      </Typography>

      {categoriasMenu.length === 0 ? (
        <Typography variant="body1" align="center">
          Este restaurante aún no cargó su menú.
        </Typography>
      ) : (
        categoriasMenu.map((categoria) => (
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

            {categoria.menus.map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 2,
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
    </Box>
  );
}