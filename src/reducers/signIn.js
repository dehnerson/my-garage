import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE
} from "../actions/signIn";

export default (
  state = {
    isSigningIn: false,
    signInError: null,
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
    default:
      return state;
  }
};
