import axios from 'axios';
import {
  CREATE_PROFILE,
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from './types';
import { setAlert } from './alert';

// Create profile

export const createProfile = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/profile', formData);
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Profile Created', 'Success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'Danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get current user profiles

export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get profile by id

export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Update profile

export const updateProfile = (formData, id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/${id}`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Profile Updated', 'Success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'Danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete profile

export const deleteProfile = (id, history) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this profile?')) {
    try {
      await axios.delete(`/api/profile/${id}`);

      dispatch({
        type: CLEAR_PROFILE,
      });

      history.push('/dashboard');

      dispatch(setAlert('Profile Removed', 'Danger'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

// Upload photo

export const uploadPhoto = (id, photo) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/${id}/photo`, photo);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete photo

export const deletePhoto = (id, photoId) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this photo?')) {
    try {
      const res = await axios.delete(`/api/profile/${id}/${photoId}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert('Photo Removed', 'Danger'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
