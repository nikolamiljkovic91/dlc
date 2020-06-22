import { GET_USER, USER_ERROR } from './types';
import axios from 'axios';

// Get user by id

export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
