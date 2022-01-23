import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Tooltip, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { signOut } from "../actions/auth";

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none'
    },
    flexGrow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    }
}));

const TopBar = (props) => {
    const { onSidebarOpen, t } = props;

    const [notifications] = useState([]);

    const dispatch = useDispatch();

    const classes = useStyles();

    return (
        <AppBar position={"relative"} className={classes.root}>
            <Toolbar>
                <Hidden lgUp >
                    <IconButton className={classes.menuButton} onClick={onSidebarOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Link component={RouterLink} to="/" variant="h6" color='inherit'>My Garage</Link>
                <div className={classes.flexGrow} />
                <Tooltip title={t('notifications')}>
                    <IconButton color="inherit">
                        <Badge badgeContent={notifications.length} color="primary" variant="dot"><NotificationsIcon /></Badge>
                    </IconButton>
                </Tooltip>
                <Hidden xsDown>
                    <Tooltip title={t('signOut')}>
                        <IconButton className={classes.signOutButton} onClick={e => dispatch(signOut())}><InputIcon /></IconButton>
                    </Tooltip>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default withTranslation()(TopBar);