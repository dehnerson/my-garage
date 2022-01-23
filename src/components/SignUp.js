import React, { Component } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Button, Link, TextField, Paper, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from "@material-ui/styles";
import Footer from "./Footer";
import { signUp } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import BackdropProgress from "./BackdropProgress";
import ImageDropzone from "./ImageDropzone";


class SignUp extends Component {
    state = { credentials: { email: "", password: "" }, profile: { displayName: "" }, avatarImages: [] };

    handleCredChange = (comp, { target }) => {
        this.setState(prevState => {
            return { credentials: { ...prevState.credentials, [comp]: target.value } };
        });
    };

    handleProfileChange = (comp, { target }) => {
        this.setState(prevState => {
            return { profile: { ...prevState.profile, [comp]: target.value } };
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state.credentials, this.state.profile, this.state.avatarImages[0]);
    };

    render() {
        const { classes, isSigningUp, signUpError, isAuthenticated, t } = this.props;

        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            let emailErrorMsg;
            let passwordErrorMsg;
            let genericError;

            if (signUpError) {
                if (signUpError.code && signUpError.code.includes('email')) {
                    emailErrorMsg = signUpError.message;
                } else if (signUpError.code && signUpError.code.includes('password')) {
                    passwordErrorMsg = signUpError.message;
                } else {
                    genericError = signUpError.message;
                }
            }

            return (
                <div>
                    <BackdropProgress open={isSigningUp}></BackdropProgress>

                    <Grid container component="main" className={classes.root}>
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography variant="h5" className={classes.heading}>{t('signUp')}</Typography>
                                <ImageDropzone title="Profile picture" imageAmount={1} files={this.state.avatarImages} setFiles={newFiles => this.setState({ avatarImages: newFiles })} />
                                <form className={classes.form} noValidate>
                                    <TextField variant="outlined" margin="normal" required label={t('name')} autoComplete="name" autoFocus onChange={e => this.handleProfileChange('displayName', e)} />
                                    <div className={classes.emailPassword}>
                                        <TextField variant="outlined" fullWidth margin="normal" required label={t('emailAdress')} autoComplete="email" onChange={e => this.handleCredChange('email', e)}
                                            error={Boolean(emailErrorMsg)} helperText={emailErrorMsg} />
                                        <TextField variant="outlined" fullWidth margin="normal" required label={t('password')} type="password" autoComplete="current-password" onChange={e => this.handleCredChange('password', e)}
                                            error={Boolean(passwordErrorMsg)} helperText={passwordErrorMsg} />
                                    </div>
                                    {genericError && (
                                        <Typography variant="caption" className={classes.errorText}>{genericError}</Typography>
                                    )}
                                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={this.handleSubmit}>{t('signUp')}</Button>
                                </form>
                                <Link className={classes.signInLink} component={RouterLink} to="/signIn" variant="body2">{t('accountAlreadySignIn')}</Link>
                            </div>
                            <Footer />
                        </Grid>
                        <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    </Grid>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isSigningUp: state.auth.isSigningUp,
        signUpError: state.auth.signUpError,
        isAuthenticated: !state.firebase.auth.isEmpty
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds, profile, avatarImage) => dispatch(signUp(creds, profile, avatarImage))
    }
}

export default withStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/collection/492901)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    heading: {
        marginBottom: theme.spacing(2)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    emailPassword: {
        marginTop: theme.spacing(4)
    },
    errorText: {
        color: theme.palette.error.main
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signInLink: {
        alignSelf: 'flex-end'
    }
}))(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SignUp)));
