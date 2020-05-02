import { combineReducers } from "redux";
import auth from "./auth";
import vehicles from "./vehicles";
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
  auth,
  vehicles,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
