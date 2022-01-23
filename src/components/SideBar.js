import React from 'react';
import { connect } from "react-redux";
import { signOut } from "../actions/auth";
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader, Divider, Drawer, Button } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountIcon from '@material-ui/icons/AccountBox';
import InputIcon from '@material-ui/icons/Input';
import ProfileCompact from './ProfileCompact';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            paddingTop: 64,
        }
    },
    root: {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(2)
    },
    divider: {
        marginBottom: theme.spacing(3)
    }
}));


const SideBar = (props) => {
    const { open, variant, onClose, signOut } = props;

    const classes = useStyles();

    return (
        <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
            <nav className={classes.root}>
                <ProfileCompact />
                <Divider className={classes.divider} />
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="My vehicles" />
                    </ListItem>
                </List>
                <Divider className={classes.divider} />
                <List>
                    <ListSubheader inset>Help and settings</ListSubheader>
                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon><AccountIcon /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </List>
                <Divider className={classes.divider} />
                <Button onClick={signOut} startIcon={<InputIcon />}>Sign out</Button>
            </nav>
        </Drawer>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SideBar);