// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Merriweather', serif`,
    h1: {
      fontFamily: `'Kaushan Script', cursive`,
    },
    h2: {
      fontFamily: `'Kaushan Script', cursive`,
    },
  },
  palette: {
    background: {
      default: '#F5E6D3', // beige claro (color tierra suave)
    },
  },
});

export default theme;
