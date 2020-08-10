export const SET_ADD_FIELDS_REQUEST = "SET_ADD_FIELDS_REQUEST";
export const SET_ADD_FIELDS_SUCCESS = "SET_ADD_FIELDS_SUCCESS";
export const SET_ADD_FIELDS_ERROR = "SET_ADD_FIELDS_ERROR";


export const updateAddFields = (addFields) => {

    return (dispatch, _getState, { getFirebase }) => {
        dispatch({ type: SET_ADD_FIELDS_REQUEST });

        const fb = getFirebase();

        if (addFields) {
            fb.firestore().collection("addFields").doc(fb.auth().currentUser.uid).set(addFields).then(() =>
                dispatch({ type: SET_ADD_FIELDS_SUCCESS })
            ).catch((error) =>
                dispatch({ type: SET_ADD_FIELDS_ERROR, error })
            );
        }
    }
}