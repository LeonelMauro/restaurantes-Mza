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
      default: '#ffffffff', // beige claro (color tierra suave)
    },
  },
});

export default theme;
