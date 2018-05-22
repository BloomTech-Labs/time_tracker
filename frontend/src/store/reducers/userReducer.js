import { SIGNUP } from '../action/userActions';

const initialState = {
  user: '',
  signedUp: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      console.log(action.payload);
      return { ...state, signedUp: true };
    default:
      return state;
  }
};
