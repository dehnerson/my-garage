export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILLURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const SIGNOUT_REQUEST = "SIGNOUT_REQUEST";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNOUT_FAILURE = "SIGNOUT_FAILLURE";

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

const handleSetAvatarImage = (firebase, uid, avatarImage) => {
    firebase.storage().ref().child("users/" + uid + "/images/" + avatarImage.name).put(avatarImage).then((uploadSnapshot) => {
        uploadSnapshot.ref.getDownloadURL().then((url) => {
            firebase.firestore().collection("users").doc(uid).update({ avatarUrl: url }).then(() => {

            }).catch((error) => {

            })
        }).catch(error => {

        });
    }).catch((error) => {

    })
}

export const signUp = (credentials, profile, avatarImage) => {
    return (dispatch, _getState, { getFirebase }) => {
        dispatch({ type: SIGNUP_REQUEST });

        const firebase = getFirebase();

        profile.email = credentials.email;

        firebase.createUser(credentials, profile).then(() => {
            dispatch({ type: SIGNUP_SUCCESS });

            if (avatarImage) {
                handleSetAvatarImage(firebase, firebase.auth().currentUser.uid, avatarImage);
            }
        }).catch((error) => {
            dispatch({ type: SIGNUP_FAILURE, error });
        });
    }
}

export const signOut = () => {
    return (dispatch, _getState, { getFirebase }) => {
        dispatch({ type: SIGNOUT_REQUEST });

        getFirebase().auth().signOut().then(() => {
            dispatch({ type: SIGNOUT_SUCCESS });
        }).catch((error) => {
            dispatch({ type: SIGNOUT_FAILURE, error });
        });
    }
}
