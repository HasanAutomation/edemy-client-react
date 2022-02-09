import { SIGN_IN, SIGN_OUT } from '../constants/auth';
import firebase from '../../../services/firebase';
import { APP_LOADED } from '../../async/asyncReducer';

export function signInUser(payload) {
  return {
    type: SIGN_IN,
    payload,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function verifyUser() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(signInUser(user));
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOut());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}
