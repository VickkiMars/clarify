// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    allVariants: {
      fontFamily: 'Inter, sans-serif',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Space Grotesk, sans-serif',
        },
      },
    },
  },
});

export default theme;
