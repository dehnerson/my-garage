import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createFirestoreInstance, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase';
import fbConfig from "./config/fbConfig";

const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}))));

const rrfProps = {
      firebase: fbConfig,
      config: {},
      dispatch: store.dispatch,
      createFirestoreInstance // <- needed if using firestore
    }

function Root() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <App />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default Root;
