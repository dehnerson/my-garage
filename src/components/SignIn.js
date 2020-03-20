import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/styles";
import Copyright from "./Copyright";
import { signIn, signInWithGoogle } from "../actions/signIn";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withTranslation } from 'react-i18next';


const styles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {
  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  handleGoogleSignin = () => {
    this.props.signInWithGoogle();
  }

  render() {
    const { classes, signInError, isAuthenticated, t } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">{t('signIn')}</Typography>
              <form className={classes.form} noValidate>
                <TextField variant="outlined" margin="normal" required fullWidth id="email"
                  label={t('emailAdress')} name="email" autoComplete="email" autoFocus
                  onChange={this.handleEmailChange} />
                <TextField variant="outlined" margin="normal" required fullWidth id="password"
                  name="password" label={t('password')} type="password" autoComplete="current-password"
                  onChange={this.handlePasswordChange} />
                {signInError && (
                  <Typography component="p" className={classes.errorText}>
                    Incorrect email or password.
                  </Typography>
                )}
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                  onClick={this.handleSubmit}>
                  {t('signIn')}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">{t('forgotPassword')}</Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">{t('noAccountSignUp')}</Link>
                  </Grid>
                </Grid>
                <Button onClick={this.handleGoogleSignin}>{t('signInWithGoogle')}</Button>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSigningIn: state.signIn.isSigningIn,
    signInError: state.signIn.signInError,
    isAuthenticated: !state.firebase.auth.isEmpty,
    firebase: state.firebase
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signInWithGoogle: () => dispatch(signInWithGoogle())
  }
}

export default withStyles(styles)(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SignIn)));
