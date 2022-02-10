import { SIGN_IN, SIGN_OUT } from '../constants/auth';

const initialState = {
  user: null,
  authenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      const {
        user: { email, photoURL, displayName, uid },
        token,
      } = action.payload;
      return {
        ...state,
        authenticated: true,
        user: {
          email: email,
          photoURL: photoURL || '/user.png',
          displayName: displayName,
          uid: uid,
          token,
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
