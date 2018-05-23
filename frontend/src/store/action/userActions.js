import axios from 'axios';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const ADD_CLIENT = 'ADD_CLIENT';

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
          window.localStorage.setItem('Authorization', data.token);
          console.log(window.localStorage.getItem('Authorization'));
          dispatch({ type: LOGIN, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`${backend}/vendor/login`, { email, password })
        .then(({ data }) => {
          window.localStorage.setItem('Authorization', data.token);
          dispatch({ type: LOGIN, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const addClient = (email, _id) => {
  return dispatch => {
    console.log({ email });
    axios
      .put(`${backend}/vendor/client/add`, { email, _id })
      .then(({ data }) => {
        dispatch({ type: ADD_CLIENT });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
