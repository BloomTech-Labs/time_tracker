import { SIGNUP, LOGIN, ADD_CLIENT } from '../action/userActions';

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
      return {
        ...state,
        loggedIn: true,
        signedUp: false,
        user: action.payload._id
      };
    case ADD_CLIENT:
      return { ...state };
    default:
      return state;
  }
};
