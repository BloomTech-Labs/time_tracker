import axios from 'axios';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
const backend = process.env.BASE_URL || 'http://localhost:5000';

export const signUp = ({ name, email, password, type }) => {
  return dispatch => {
    if (type === 'client') {
      axios
        .post(`${backend}/client`, { name, email, password })
        .then(({ data }) => {
          dispatch({ type: SIGNUP, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`${backend}/vendor`, { name, email, password })
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
        .post(`${backend}/client/login`, { email, password })
        .then(({ data }) => {
          dispatch({ type: LOGIN, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`${backend}/vendor/login`, { email, password })
        .then(({ data }) => {
          dispatch({ type: LOGIN, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};
