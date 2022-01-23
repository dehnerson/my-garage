import React, { useState } from "react";
import { Route } from "react-router-dom";
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Container, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import TopBar from "./TopBar";
import SideBar from './SideBar';
import Footer from "./Footer";
import VehicleLists from "./VehicleLists";
import Vehicle from "./Vehicle";
import Profile from "./Profile";
import BackNavigation from "./BackNavigation";


const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    padding: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  sideBarSpacer: {
    marginLeft: 240
  },
  main: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(7)
    }
  }
}));


const Home = () => {
  const classes = useStyles();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const shouldSidebarOpen = isDesktop ? true : sideBarOpen;

  const handleSidebarOpen = () => {
    setSideBarOpen(true);
  };

  const handleSidebarClose = () => {
    setSideBarOpen(false);
  };

  const uid = useSelector(state => state.firebase.auth.uid);

  useFirestoreConnect([
    {
      collection: 'vehicles',
      where: [['creator', '==', uid], ['active', '==', true]],
      storeAs: 'myVehicles'
    },
    {
      collection: 'vehicles',
      where: [['sharedWith', 'array-contains', uid], ['active', '==', true]],
      storeAs: 'vehiclesSharedWithMe'
    }
  ]);

  return (
    <div className={clsx(classes.container, { [classes.sideBarSpacer]: isDesktop })}>
      <TopBar onSidebarOpen={handleSidebarOpen} />
      <SideBar variant={isDesktop ? 'persistent' : 'temporary'} open={shouldSidebarOpen} onClose={handleSidebarClose} />
      <Container component="main" maxWidth="md" className={classes.main} >
        <BackNavigation></BackNavigation>
        <Route exact path="/" component={VehicleLists} />
        <Route exact path="/vehicle" component={Vehicle} />
        <Route exact path="/profile" component={Profile} />
      </Container>
      <Footer />
    </div>
  );
}


export default Home;
