import Slider from "react-slick";
import { Box, CardMedia, Typography } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import { restaurantesStyles } from "../../styles/restaurantesStyles";


type Photo = {
  id: number;
  url: string;
};

type Restaurante = {
  nombre: string;
  descripcion: string;
  photos: Photo[];
};

type RestauranteGaleriaProps = {
  restaurante: Restaurante;
};

const NextArrow = (props: any) => {
  const { onClick } = props;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: 10,
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
        color: "white",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
        p: 1,
      }}
    >
      <ArrowForwardIos />
    </Box>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
        color: "white",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
        p: 1,
      }}
    >
      <ArrowBackIos />
    </Box>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default function RestauranteGaleria({
  restaurante,
}: RestauranteGaleriaProps) {
  return (
    <>
      <Typography
        variant="h1"
        align="center"
        sx={{
          ...restaurantesStyles.title,
        }}
      >
        {restaurante.nombre}
      </Typography>

      {restaurante.photos && restaurante.photos.length > 0 && (
        <Box
          sx={{
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            width: "100vw",
            backgroundColor: "#1C1C1C",
            overflow: "hidden",
            mt: 2,
          }}
        >
          <Slider {...settings}>
            {restaurante.photos.map((photo) => (
              <Box
                key={photo.id}
                sx={{
                  width: "100vw",
                  height: {
                  xs: 280,
                  sm: 400,
                  md: 500,
                },
                  backgroundColor: "#1C1C1C",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:3000/${photo.url}`}
                  alt={restaurante.nombre}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: 7,
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      )}

      <Typography
        variant="body1"
        sx={{
  fontStyle: "italic",
  color: "#3E3E3E",

  fontSize: {
    xs: "0.95rem",
    sm: "1.05rem",
    md: "1.15rem",
  },

  lineHeight: {
    xs: 1.6,
    md: 1.9,
  },

  mt: {
    xs: 2,
    md: 3,
  },

  mb: {
    xs: 3,
    md: 4,
  },

  px: {
    xs: 2,
    sm: 3,
  },

  py: 2,

  backgroundColor: "#F5E6D3",
  borderRadius: {
    xs: 2,
    md: 4,
  },

  boxShadow: "0 2px 8px rgba(15, 3, 13, 0.93)",
  fontFamily: "Georgia, serif",
  textAlign: "justify",
}}
      >
        {restaurante.descripcion}
      </Typography>
    </>
  );
}