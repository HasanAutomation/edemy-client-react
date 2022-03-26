import {
  SET_PRE_AUTH,
  SET_USER_DATA,
  SIGN_IN,
  SIGN_OUT,
} from '../constants/auth';
import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
  user: null,
  authenticated: false,
  prevLocation: null,
  currentLocation: null,
  preAuth: {
    hash: '',
    email: '',
  },
  authUser: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      const {
        user: { email, photoURL, displayName, uid, role, name, _id, courses },
        token,
      } = action.payload;
      return {
        ...state,
        authenticated: true,
        user: {
          email: email,
          photoURL: photoURL || '/user.png',
          displayName: displayName || name,
          uid: uid,
          _id,
          role,
          token,
          courses,
        },
      };
    case SET_PRE_AUTH:
      return {
        ...state,
        preAuth: {
          ...state.preAuth,
          ...action.payload,
        },
      };
    case SET_USER_DATA:
      return {
        ...state,
        authenticated: true,
        authUser: action.payload,
        preAuth: {
          ...state.preAuth,
          hash: '',
        },
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        prevLocation: state.currentLocation,
        currentLocation: action.payload.location,
      };
    default:
      return state;
  }
}
