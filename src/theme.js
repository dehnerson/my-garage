import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#556cd6',
    },
    error: {
      main: red.A400,
    },
  }
});

theme.overrides = {
  MuiPaper: {
    root: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  MuiFab: {
    root: {
      margin: theme.spacing(2),
      alignSelf: 'flex-end'
    }
  }
}

export default theme;
