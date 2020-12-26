import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7a3700',
    },
    secondary: {
      main: '#91cf40',
    },
  },
  breakpoints: {  // changed breakpoints to fit recipe card symbols
    values: {
      xs: 0,
      sm: 670,
      md: 1000,
      lg: 1320,
      xl: 1950,
    },
  },
});

export default theme;