import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#FA3723',
    },
    secondary: {
      main: '#E51A05',
    },
  },
};

export const theme = createTheme(themeOptions);
