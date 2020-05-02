import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
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
