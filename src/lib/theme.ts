// lib/mui-theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark' if needed
    primary: {
      main: '#463a85', // Tailwind blue-700
    },
    secondary: {
      main: '#9a1b39', // Tailwind gray-500
    },
    background: {
      default: '#f9fafb', // Tailwind gray-50
      paper: '#ffffff',
    },
    text: {
      primary: '#111827', // Tailwind gray-900
      secondary: '#6b7280', // Tailwind gray-500
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default theme;
