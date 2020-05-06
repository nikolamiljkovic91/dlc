import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

// Get auth user

export const getAuthUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// Register User

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users', formData);

    localStorage.setItem('token', res.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Sign In User

export const signIn = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Logout

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
