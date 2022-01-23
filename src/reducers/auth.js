import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from "../actions/auth";
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "../actions/auth";
import { SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE } from "../actions/auth";

export default (
    state = {
        isSigningIn: false,
        signInError: null,
        isSigningUp: false,
        signUpError: null,
        isSigningOut: false,
        signOutError: null,
    },
    action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {
                ...state,
                isSigningIn: true,
                signInError: null
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isSigningIn: false,
                signInError: null
            };
        case SIGNIN_FAILURE:
            return {
                ...state,
                isSigningIn: false,
                signInError: action.error
            };

        case SIGNUP_REQUEST:
            return {
                ...state,
                isSigningUp: true,
                signUpError: null
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSigningUp: false,
                signUpError: null
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                isSigningUp: false,
                signUpError: action.error
            };

        case SIGNOUT_REQUEST:
            return {
                ...state,
                isSigningOut: true,
                signOutError: null
            };
        case SIGNOUT_SUCCESS:
            return {
                ...state,
                isSigningOut: false,
                signOutError: null
            };
        case SIGNOUT_FAILURE:
            return {
                ...state,
                isSigningOut: false,
                signOutError: action.error
            };
        default:
            return state;
    }
};
