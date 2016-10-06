import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signinUser ({ email, password }) {
  // redux thunk allows action creator to return a function
  return function(dispatch) {
    // submit em/pw to server
    axios.post(`${ROOT_URL}/signin`, { email, password });
    
    // if req good:
    // - update state to show user is authenticated
    // - save JWT token
    // - redirect to the route '/feature'

    // if req bad:
    // - show error to user
  }
}
