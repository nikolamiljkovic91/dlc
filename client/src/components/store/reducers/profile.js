import {
  GET_PROFILES,
  CREATE_PROFILE,
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  loading: true,
  profiles: [],
  profile: null,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case CREATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
};
