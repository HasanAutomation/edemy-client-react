import { SET_PRE_AUTH, SET_USER_DATA, SIGN_OUT } from '../constants/auth';

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function setPreAuth(data) {
  return {
    type: SET_PRE_AUTH,
    payload: data,
  };
}

export function setUserData(data) {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
}
