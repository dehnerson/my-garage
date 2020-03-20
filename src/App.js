import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import de from "./translations/de.json";
import en from "./translations/en.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      common: en
    },
    de: {
      common: de
    },
  },
  defaultNS: 'common'
});

const App = (props) => {
  const { isAuthenticated, isVerifying } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18next}>
        <Router>
          <Switch>
            <Route exact path="/signIn" component={SignIn} />
            <ProtectedRoute path="/" component={Home}
              isAuthenticated={isAuthenticated}
              isVerifying={isVerifying} />
          </Switch>
        </Router>
      </I18nextProvider>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !state.firebase.auth.isEmpty,
    isVerifying: !state.firebase.auth.isLoaded
  };
}

export default connect(mapStateToProps)(App);
