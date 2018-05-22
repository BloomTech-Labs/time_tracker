import { SIGNUP, LOGIN } from '../action/userActions';

const initialState = {
  user: '',
  signedUp: false,
  loggedIn: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, signedUp: true };
    case LOGIN:
      return {...state, loggedIn: true, signedUp: false };
    default:
      return state;
  }
};
