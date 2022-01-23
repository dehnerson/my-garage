import React from "react";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';


const Footer = (props) => {
  const { classes } = props;

  return (
    <Grid component={'footer'} container direction="column" justify="center" className={clsx(classes.footer, classes.appBarHeighter)}>
      <Typography variant="body2" color="textSecondary" align="center">Copyright © <Link color="inherit" href="/">My Garage</Link> {new Date().getFullYear()}</Typography>
    </Grid>
  );
}


export default withStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    marginTop: 'auto',
    padding: theme.spacing(0, 2, 0, 2)
  },
  appBarHeighter: theme.mixins.toolbar,
}))(Footer);
