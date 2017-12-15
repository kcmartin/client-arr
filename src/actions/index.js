import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser ({ email, password }) {
  // redux thunk allows action creator to return a function
  return function(dispatch) {
    // submit em/pw to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      // javascript promises
      .then(response => {
        // if req good:
        // - update state to show user is authenticated
        dispatch({ type: AUTH_USER });
        // - save JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect user to the route '/feature'
        // programmatic navigation, swap views
        browserHistory.push('/feature');
      })
      // fail case
      .catch(() => {
        // if req bad:
        // - show error to user now
        dispatch(authError('Incorrect Login'));
      });
  }
}

// action creator for new user signup
export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      // fail case - fix error dispatch
      .catch(({response}) => dispatch(authError(response.data.error)));
  }
}

// add separate action creator for errors
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}



// get rid of saved token and set user to unauth
export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}
