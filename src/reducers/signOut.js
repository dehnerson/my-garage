import {
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE
} from "../actions/signOut";

export default (
  state = {
    isSigningOut: false,
    signOutError: null,
  },
  action) => {
  switch (action.type) {
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
