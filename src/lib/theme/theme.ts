import { createTheme } from '@mui/material';

export const flexCol = { display: 'flex', flexDirection: 'column' };
export const palette = {
  mode: 'light',
  background: '#F6F7F8',
  primaryMain: '#1976D2',
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
    background: { default: palette.background },
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
