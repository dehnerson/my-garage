import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Paper, Avatar, Typography } from '@material-ui/core';
import FieldsMaintenance from './FieldsMaintenance';

const useStyles = makeStyles(theme => ({
    paper: {
        alignItems: 'center',
        padding: theme.spacing(2, 0, 2, 0)
    },
    spacer: {
        padding: theme.spacing(1, 0)
    },
    avatar: {
        width: 60,
        height: 60
    },
    name: {
        marginTop: theme.spacing(1)
    }
}));


const Profile = () => {
    const classes = useStyles();

    const profile = useSelector(state => state.firebase.profile);

    return (
        <div>
            <Paper className={classes.paper}>
                <Avatar alt="Person" className={classes.avatar} component={Link} src={profile.avatarUrl} to="/profile" />
                <Typography className={classes.name} variant="h6">{profile.displayName}</Typography>
                <Typography variant="body2" color="textSecondary">{profile.email}</Typography>
            </Paper>
            <div className={classes.spacer} />
            <FieldsMaintenance />
        </div>
    );
};


export default Profile;