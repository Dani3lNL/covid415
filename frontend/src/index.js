import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

import Root from './components/root';
import configureStore from './store/store';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    // jwt_decode parses users session token
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    const preloadedState = {
      session:
        { isAuthenticated: true, user: decodedUser }
    };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      // window.location.href = '/login'; // TODO might change to no redirect
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});