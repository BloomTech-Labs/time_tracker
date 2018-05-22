import axios from 'axios';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signUp = ({ name, email, password, type }) => {
  return dispatch => {
    if (type === 'client') {
      axios
        .post('/client', { name, email, password })
        .then(({ data }) => {
          dispatch({ type: SIGNUP, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post('/vendor', { name, email, password })
        .then(({ data }) => {
          dispatch({ type: SIGNUP, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const logIn = ({ email, password, type }) => {
  return dispatch => {
    if (type === 'client') {
      axios
        .post('/client/login', { email, password })
        .then(({ data }) => {
          dispatch({ type: LOGIN, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post('/vendor/login', { email, password })
        .then(({ data }) => {
          dispatch({ type: LOGIN, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};
