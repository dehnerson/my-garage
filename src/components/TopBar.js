import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { Link, AppBar, Toolbar, Badge, Hidden, IconButton, Typography, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { connect } from "react-redux";
import { signOut } from "../actions/auth";

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none'
    },
    title: {
        [theme.breakpoints.up('lg')]: {
            marginLeft: 240
        },
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
    const { onSidebarOpen, signOut, t } = props;

    const classes = useStyles();

    const [notifications] = useState([]);

    return (
        <AppBar position={"relative"} className={classes.root}>
            <Toolbar>
                <Hidden lgUp>
                    <IconButton className={classes.menuButton} onClick={onSidebarOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography className={classes.title} variant="h6"><Link color="inherit" href="/">My Garage</Link></Typography>
                <div className={classes.flexGrow} />
                <Tooltip title={t('notifications')}>
                    <IconButton color="inherit">
                        <Badge badgeContent={notifications.length} color="primary" variant="dot"><NotificationsIcon /></Badge>
                    </IconButton>
                </Tooltip>
                <Hidden xsDown>
                    <Tooltip title={t('signOut')}>
                        <IconButton className={classes.signOutButton} onClick={signOut}><InputIcon /></IconButton>
                    </Tooltip>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default withTranslation()(connect(null, mapDispatchToProps)(TopBar));