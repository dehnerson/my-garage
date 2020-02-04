import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Home from "./components/Home";
import SignIn from "./components/SignIn";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <ProtectedRoute exact path="/" component={Home}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}/>
        <Route path="/signIn" component={SignIn} />
      </Switch>
    </ThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !state.firebase.auth.isEmpty,
    isVerifying: !state.firebase.auth.isLoaded
  };
}

export default connect(mapStateToProps)(App);
