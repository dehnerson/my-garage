import React, { Component } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Button, TextField, Paper, Grid, Typography, Divider, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import BackdropProgress from "./BackdropProgress";
import Footer from "./Footer";
import { signIn, signInWithGoogle } from "../actions/auth";


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
    const { classes, isSigningIn, signInError, isAuthenticated, t } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      let emailErrorMsg;
      let passwordErrorMsg;
      let genericError;

      if (signInError) {
        if (signInError.code.includes('email')) {
          emailErrorMsg = signInError.message;
        } else if (signInError.code.includes('password')) {
          passwordErrorMsg = signInError.message;
        } else {
          genericError = signInError.message;
        }
      }

      return (
        <div>
          <BackdropProgress open={isSigningIn}></BackdropProgress>

          <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{t('signIn')}</Typography>
                <form className={classes.form} noValidate>
                  <TextField variant="outlined" margin="normal" required fullWidth id="email" label={t('emailAdress')} name="email" autoComplete="email" autoFocus onChange={this.handleEmailChange}
                    error={Boolean(emailErrorMsg)} helperText={emailErrorMsg} />
                  <TextField variant="outlined" margin="normal" required fullWidth id="password" name="password" label={t('password')} type="password" autoComplete="current-password" onChange={this.handlePasswordChange}
                    error={Boolean(passwordErrorMsg)} helperText={passwordErrorMsg} />
                  {genericError && (
                    <Typography variant="caption" className={classes.errorText}>{genericError}</Typography>
                  )}
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={this.handleSubmit}>{t('signIn')}</Button>
                  <Grid container>
                    <Grid item xs>
                      <Link component={RouterLink} to="/" variant="body2">{t('forgotPassword')}</Link>
                    </Grid>
                    <Grid item>
                      <Link component={RouterLink} to="/signUp" variant="body2">{t('noAccountSignUp')}</Link>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider}></Divider>
                  <Button onClick={this.handleGoogleSignin} fullWidth variant="contained" color="secondary" >{t('signInWithGoogle')}</Button>
                </form>

              </div>
              <Footer />
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSigningIn: state.auth.isSigningIn,
    signInError: state.auth.signInError,
    isAuthenticated: !state.firebase.auth.isEmpty
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signInWithGoogle: () => dispatch(signInWithGoogle())
  }
}

export default withStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/492901)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(6, 4),
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
  errorText: {
    color: theme.palette.error.main
  },
  divider: {
    margin: theme.spacing(4, 0)
  }
}))(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SignIn)));
