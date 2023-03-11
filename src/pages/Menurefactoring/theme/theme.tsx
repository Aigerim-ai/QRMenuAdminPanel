import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#0EB378',
    },
  },
  typography: {
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          height: '40px',
          fontSize: '16px',
          border: '1px solid #0EB378',
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            textTransform: 'none',
            color: '#0EB378',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            textTransform: 'none',
            color: '#0EB378',
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontStyle: 'italic',
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
      },
    },
  },
})

export default theme
