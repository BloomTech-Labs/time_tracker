import {
  SIGNUP,
  LOGIN,
  ADD_CLIENT,
  CHANGE_PASSWORD,
  PASSWORD_CHANGED
} from '../action/userActions';

const initialState = {
  user: '',
  userType: '',
  signedUp: false,
  loggedIn: false,
  changeSuccess: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, signedUp: true };
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        signedUp: false,
        user: action.payload._id,
        userType: action.userType
      };
    case ADD_CLIENT:
      return { ...state };
    case CHANGE_PASSWORD:
      return { ...state, changeSuccess: true };
    case PASSWORD_CHANGED:
      return { ...state, changeSuccess: false };
    default:
      return state;
  }
};
