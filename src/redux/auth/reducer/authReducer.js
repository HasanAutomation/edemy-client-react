import { SIGN_IN, SIGN_OUT } from '../constants/auth';
import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
  user: null,
  authenticated: false,
  prevLocation: null,
  currentLocation: null,
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
