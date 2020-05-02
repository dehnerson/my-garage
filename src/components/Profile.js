import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import { Paper, Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        alignItems: 'center',
        padding: theme.spacing(2, 0, 2, 0)
    },
    avatar: {
        width: 60,
        height: 60
    },
    name: {
        marginTop: theme.spacing(1)
    }
}));


const Profile = (props) => {
    const classes = useStyles();

    const { profile } = props;

    return (
        <Paper className={classes.root}>
            <Avatar alt="Person" className={classes.avatar} component={Link} src={profile.avatarUrl} to="/profile" />
            <Typography className={classes.name} variant="h6">{profile.displayName}</Typography>
            <Typography variant="body2" color="textSecondary">{profile.email}</Typography>
        </Paper>
    );
};


const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    };
}

export default connect(mapStateToProps)(Profile);