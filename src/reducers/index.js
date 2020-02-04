import { combineReducers } from "redux";
import signIn from "./signIn";
import signOut from "./signOut";
import vehicles from "./vehicles";
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
  signIn,
  signOut,
  vehicles,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
