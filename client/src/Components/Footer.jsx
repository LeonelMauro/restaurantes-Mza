import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#8B5E3C', color: 'white', p: 4, mt: 10 }}>
      <Typography variant="h6">
        Comer Entre Montañas
      </Typography>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Explorá lo mejor de la gastronomía mendocina con vistas inigualables.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2">
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
          <IconButton href="mailto:contacto@comerentremontanas.com" sx={{ color: 'white' }}>
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

      <Typography variant="caption" align="center" display="block" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} Comer Entre Montañas - Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
