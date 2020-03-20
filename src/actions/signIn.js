export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILLURE";

export const signIn = (credentials) => {
  return (dispatch, _getState, { getFirebase }) => {
    dispatch({ type: SIGNIN_REQUEST });

    getFirebase().login(credentials).then(() => {
      dispatch({ type: SIGNIN_SUCCESS });
    }).catch((error) => {
      dispatch({ type: SIGNIN_FAILURE, error });
    });
  }
}

export const signInWithGoogle = () => {
  return (dispatch, _getState, { getFirebase }) => {
    dispatch({ type: SIGNIN_REQUEST });

    getFirebase().login({ provider: 'google', type: 'popup' }).then(() => {
      dispatch({ type: SIGNIN_SUCCESS });
    }).catch((error) => {
      dispatch({ type: SIGNIN_FAILURE, error });
    });
  }
}
