export const SET_ADD_FIELDS_REQUEST = "SET_ADD_FIELDS_REQUEST";
export const SET_ADD_FIELDS_SUCCESS = "SET_ADD_FIELDS_SUCCESS";
export const SET_ADD_FIELDS_ERROR = "SET_ADD_FIELDS_ERROR";


export const updateFieldsAdd = (fieldsAdd) => {

    return (dispatch, _getState, { getFirebase }) => {
        dispatch({ type: SET_ADD_FIELDS_REQUEST });

        const fb = getFirebase();

        fb.firestore().collection("fields").doc(fb.auth().currentUser.uid).set({ areas: fieldsAdd }).then(() =>
            dispatch({ type: SET_ADD_FIELDS_SUCCESS })
        ).catch((error) =>
            dispatch({ type: SET_ADD_FIELDS_ERROR, error })
        );
    }
}