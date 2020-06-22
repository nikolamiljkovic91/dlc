import { GET_USER, CLEAR_USER, USER_ERROR } from '../actions/types';

const initialState = {
  loading: true,
  user: null,
  users: [],
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        loading: false,
        user: null,
      };
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        errors: payload,
      };
    default:
      return state;
  }
};
