import { SIGN_IN, SIGN_OUT } from '../constants/auth';

const initialState = {
  user: null,
  authenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        authenticated: true,
        user: {
          email: action.payload.email,
          photoURL: action.payload.photoURL || '/user.png',
          displayName: action.payload.displayName,
          uid: action.payload.uid,
        },
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
