import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d4cd7',
    },
    secondary: {
      main: '#6dd230',
    },
    error: {
      main: '#ff3162',
    },
    grey: {
      main: '#f6f6f6',
    },
    green: {
      main: '#38888b',
    },
    black: {
      main: '#1c1c21',
    },
    darkGrey: {
      main: '#949494',
    },
    lightGrey: {
      main: '#eeeeee',
    },
    white: {
      main: '#ffffff',
    },
    greyLight: {
      main: '#778ca2',
    },
    blueGrey: {
      main: '#98a9bc',
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: '#949494',
        '&:hover': {
          backgroundColor: '#fff',
        },
      },
    },
    MuiIcon: {
      root: {
        color: '#949494',
      },
    },
    MuiButton: {
      contained: {
        color: '#f8fafb',
        backgroundColor: '#1d4cd7',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#1d4cd7',
        },
        padding: '5px',
      },
      outlined: {
        color: '#949494',
        backgroundColor: '#fff',
        border: '1px solid #949494',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#fff',
        },
        fontWeight: 500,
      },
    },
  },
  typography: {
    h1: {
      fontFamily: 'Roboto',
      fontSize: '36px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.39',
      letterSpacing: '0.25px',
    },
    h2: {
      fontFamily: 'Roboto',
      fontSize: '26px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 300,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: '18px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h5: {
      fontFamily: 'Roboto',
      fontSize: '22px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.55,
      letterSpacing: 'normal',
    },
    h6: {
      fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.05,
      letterSpacing: 'normal',
      color: '#1c1c21',
      width: '287px',
      height: '21px',
    },
    subtitle1: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.5,
      letterSpacing: 'normal',
      textTransform: 'none',
    },
    caption: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textTransform: 'none',
    },
    body1: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.14,
      letterSpacing: 'normal',
    },
    body2: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.14,
      letterSpacing: 'normal',
      fontWeight: 500,
    },
    button: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.33,
      letterSpacing: 'normal',
      textTransform: 'none',
    },
  },
});

export default theme;
