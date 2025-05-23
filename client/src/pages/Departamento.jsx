import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const beneficiosPorZona = [
  {
    zona: 'Maipú',
    beneficios: [
      'Mayor visibilidad para los turistas que visitan bodegas de la zona.',
      'Acceso a promociones conjuntas con actividades enoturísticas.',
      'Mapa interactivo de atracciones gastronómicas y vínicas.',
    ],
  },
  {
    zona: 'Luján de Cuyo',
    beneficios: [
      'Destacar tu restaurante cerca de las bodegas más prestigiosas.',
      'Promoción en rutas gastronómicas y circuitos turísticos organizados.',
      'Difusión de eventos especiales (degustaciones, noches temáticas).',
    ],
  },
  {
    zona: 'Valle de Uco',
    beneficios: [
      'Promoción especial en temporadas altas de turismo.',
      'Exposición en la guía gourmet de montaña y vino.',
      'Soporte personalizado para gestión de reservas online.',
    ],
  },
];

export default function BeneficiosDep() {
  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Beneficios de Registrar tu Restaurante o Bar
      </Typography>

      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        El turismo gastronómico crece cada año en Mendoza. Sumá tu negocio a nuestra plataforma y aprovechá beneficios únicos según tu ubicación.
      </Typography>

      <Grid container spacing={4}>
        {beneficiosPorZona.map((zona) => (
          <Grid item xs={12} md={4} key={zona.zona}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {zona.zona}
                </Typography>
                <ul>
                  {zona.beneficios.map((beneficio, index) => (
                    <li key={index}>
                      <Typography variant="body2">{beneficio}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
