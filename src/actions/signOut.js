
export const SIGNOUT_REQUEST = "SIGNOUT_REQUEST";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_FAILURE = "SIGNOUT_FAILLURE";


export const signOut = () => {
  return (dispatch, _getState, {getFirebase}) => {
    dispatch({ type: SIGNOUT_REQUEST });

    getFirebase().auth().signOut().then(() => {
      dispatch({ type: SIGNOUT_SUCCESS });
    }).catch((error) => {
      dispatch({ type: SIGNOUT_FAILURE, error });
    });
  }
}
