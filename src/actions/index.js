import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
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
        // - redirect to the route '/feature' - programmatic navigation
        browserHistory.push('/feature');
      })
      .catch(() => {
        // if req bad:
        // - show error to user now
        dispatch(authError('Bad Login Info'));
      });
  }
}

// add separate action creator for errors
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
