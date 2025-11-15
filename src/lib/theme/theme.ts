import { createTheme } from '@mui/material';

export const palette = {
  mode: 'light',
  primaryMain: '#2449C3',
  secondaryMain: '#F8E912',
  secondaryContrastText: '#455A64',
  textPrimary: '#37474F',
  textSecondary: '#455A64',
  infoMain: '#0055E9',
  fontPrimary: 'var(--font-poppins)',
  fontSecondary: 'var(--font-open-sans)',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primaryMain,
    },
    secondary: {
      main: palette.secondaryMain,
      contrastText: palette.secondaryContrastText,
    },
    text: {
      primary: palette.textPrimary,
      secondary: palette.textSecondary,
    },
    info: {
      main: palette.infoMain,
    },
  },
  typography: {
    fontFamily: palette.fontPrimary,
  },
});
