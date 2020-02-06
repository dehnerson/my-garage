import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/styles";
import Copyright from "./Copyright";
import { signIn } from "../actions/signIn";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";


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

  render() {
    const { classes, signInError, isAuthenticated } = this.props;

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
              <Typography component="h1" variant="h5">Sign in</Typography>
              <form className={classes.form} noValidate>
                <TextField variant="outlined" margin="normal" required fullWidth id="email"
                  label="Email Address" name="email" autoComplete="email" autoFocus
                  onChange={this.handleEmailChange} />
                <TextField variant="outlined" margin="normal" required fullWidth id="password"
                  name="password" label="Password" type="password" autoComplete="current-password"
                  onChange={this.handlePasswordChange} />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {signInError && (
                  <Typography component="p" className={classes.errorText}>
                    Incorrect email or password.
                  </Typography>
                )}
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                  onClick={this.handleSubmit}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">Don't have an account? Sign Up</Link>
                  </Grid>
                </Grid>
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

function mapStateToProps(state) {
  return {
    isLoggingIn: state.signIn.isSigningIn,
    signInError: state.signIn.signInError,
    isAuthenticated: !state.firebase.auth.isEmpty
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default compose(withStyles(styles), (connect(mapStateToProps, mapDispatchToProps)(SignIn)));
