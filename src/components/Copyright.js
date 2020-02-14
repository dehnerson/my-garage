import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
});

const Copyright = (props) => {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">{'Copyright © '}<Link color="inherit" href="/">My Garage</Link>{' '}{new Date().getFullYear()}{'.'}</Typography>
      </Container>
    </footer>
  );
}

export default withStyles(styles)(Copyright);
