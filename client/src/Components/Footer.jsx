import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#8B5E3C', color: 'white', p: 3, mt: 5 }}>
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} Servicios Técnicos Industriales - Todos los derechos reservados.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <IconButton href="mailto:contacto@empresa.com" sx={{ color: 'white' }}>
          <EmailIcon />
        </IconButton>
        <IconButton href="tel:+5492610000000" sx={{ color: 'white' }}>
          <PhoneIcon />
        </IconButton>
        <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white' }}>
          <FacebookIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        Contacto: contacto@empresa.com | Tel: +54 9 261 000 0000
      </Typography>
    </Box>
  );
};

export default Footer;
