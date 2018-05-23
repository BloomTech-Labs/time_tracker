import {
  SIGNUP,
  LOGIN,
  ADD_CLIENT,
  CHANGE_PASSWORD,
  PASSWORD_CHANGED,
  GETTING_USER_INFO,
  GOT_USER_INFO
} from '../action/userActions';

const initialState = {
  user: '',
  userType: '',
  name: '',
  clients: [],
  email: '',
  hoursLogged: '',
  invoices: '',
  signedUp: false,
  loggedIn: false,
  changeSuccess: false,
  loading: false
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
      return { ...state, clients: action.payload.clients };
    case CHANGE_PASSWORD:
      return { ...state, changeSuccess: true };
    case PASSWORD_CHANGED:
      return { ...state, changeSuccess: false };
    case GETTING_USER_INFO:
      return { ...state, loading: true };
    case GOT_USER_INFO:
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        email: action.payload.email,
        clients: action.payload.clients,
        hoursLogged: action.payload.hoursLogged,
        invoices: action.payload.invoices
      };
    default:
      return state;
  }
};
