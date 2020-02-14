import firebase from 'firebase/app';


export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILLURE";

export const signIn = (credentials) => {
  return (dispatch, _getState, {getFirebase}) => {
    dispatch({ type: SIGNIN_REQUEST });

    getFirebase().auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
      dispatch({ type: SIGNIN_SUCCESS });
    }).catch((error) => {
      dispatch({ type: SIGNIN_FAILURE, error });
    });
  }
}

export const signInWithGoogle = () => {
  return (dispatch, _getState, {getFirebase}) => {
    dispatch({ type: SIGNIN_REQUEST });

    console.log(getFirebase().auth);
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);

    getFirebase().auth().signInWithPopup(provider).then(() => {
      dispatch({ type: SIGNIN_SUCCESS });
    }).catch((error) => {
      dispatch({ type: SIGNIN_FAILURE, error });
    });
  }
}
