import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define the theme options for light mode
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#06c',
      light: '#007AFF',
      dark: '#0050a0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#86868b',
      light: '#a1a1a6',
      dark: '#6e6e73',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fbfbfd',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#86868b',
    },
    divider: '#d2d2d7',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: '-0.003em',
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.002em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#86868b',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.75rem 1.5rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#007AFF',
          },
        },
        outlined: {
          borderColor: '#06c',
          '&:hover': {
            backgroundColor: 'rgba(0, 102, 204, 0.04)',
            borderColor: '#007AFF',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1.5rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#007AFF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#06c',
          },
        },
        notchedOutline: {
          borderColor: '#d2d2d7',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#86868b',
          '&.Mui-focused': {
            color: '#06c',
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#1d1d1f',
          },
        },
      },
    },
  },
};

// Define the theme options for dark mode
const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2997ff',
      light: '#5eb3ff',
      dark: '#0071e3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#86868b',
      light: '#a1a1a6',
      dark: '#6e6e73',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#1d1d1f',
    },
    text: {
      primary: '#f5f5f7',
      secondary: '#86868b',
    },
    divider: '#424245',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: '-0.003em',
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.002em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#86868b',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.75rem 1.5rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#0071e3',
          },
        },
        outlined: {
          borderColor: '#2997ff',
          '&:hover': {
            backgroundColor: 'rgba(41, 151, 255, 0.04)',
            borderColor: '#0071e3',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1.5rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0071e3',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2997ff',
          },
        },
        notchedOutline: {
          borderColor: '#424245',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#86868b',
          '&.Mui-focused': {
            color: '#2997ff',
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#1d1d1f',
          },
        },
      },
    },
  },
};

// Create and export the themes
export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

// Helper function to get the current theme based on the data-theme attribute
export const getCurrentTheme = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return isDark ? darkTheme : lightTheme;
};