import {
  SET_PRE_AUTH,
  SET_USER_DATA,
  SIGN_IN,
  SIGN_OUT,
} from '../constants/auth';
import firebase from '../../../services/firebase';
import { APP_LOADED, APP_LOADED_STARTED } from '../../async/asyncReducer';
import usersApi from '../../../api/users';
import { toast } from 'react-toastify';
import constants from '../../../utils/constant';

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

export function verifyUser() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          dispatch({ type: APP_LOADED_STARTED });
          setTimeout(async () => {
            const resultToken = await user.getIdTokenResult();
            localStorage.setItem(constants.TOKEN_KEY, resultToken.token);
            const result = await usersApi.currentUser();

            await dispatch(
              signInUser({
                user: {
                  ...user,
                  ...result.data.data.user,
                },
                token: resultToken.token,
              })
            );
            dispatch({ type: APP_LOADED });
          }, 1000);
        } catch (err) {
          err.response.data.errors.forEach(err => {
            toast.error(err.error);
          });
          dispatch({ type: APP_LOADED });
        }
      } else {
        dispatch(signOut());
        localStorage.removeItem(constants.TOKEN_KEY);
        dispatch({ type: APP_LOADED });
      }
    });
  };
}
