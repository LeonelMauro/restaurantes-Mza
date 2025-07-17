import React from 'react';
import { Box, Typography, IconButton, Link, Container, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#5A3B2B', color: 'white', py: 3, mt: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h6" align="center" gutterBottom>
          Comer Entre Montañas
        </Typography>

        <Typography variant="body2" align="center">
          Explorá lo mejor de la gastronomía mendocina con vistas inigualables.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            underline:"hover",
            gap: 1,
          }}
        >
          <Typography variant="body2" align="center">
            Contacto:{" "}
            <Link
              href="mailto:contacto@comerentremontanas.com"
              color="inherit"
              underline="hover"
            >
              contacto@comerentremontanas.com
            </Link>{" "}
            | Tel: +54 9 261 123 4567
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              href="mailto:contacto@comerentremontanas.com"
              sx={{ color: 'white' }}
            >
              <EmailIcon />
            </IconButton>
            <IconButton href="tel:+5492611234567" sx={{ color: 'white' }}>
              <PhoneIcon />
            </IconButton>
            <IconButton
              href="https://facebook.com/comerentremontanas"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'white' }}
            >
              <FacebookIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Typography variant="caption" align="center" display="block">
          © {new Date().getFullYear()} Comer Entre Montañas · Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
