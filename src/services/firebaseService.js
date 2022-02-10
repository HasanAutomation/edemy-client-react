import usersApi from '../api/users';
import constants from '../utils/constant';
import firebase from './firebase';

export async function signUpUserWithEmail(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    await result.user.updateProfile({ displayName: creds.displayName });
    const { token } = await result.user.getIdTokenResult();
    // set the token in local storage
    localStorage.setItem(constants.TOKEN_KEY, token);
    //  Make backend request to create the User
    return await usersApi.createUser(creds);
  } catch (err) {
    throw err;
  }
}

export async function signInWithEmail(creds) {
  const result = await firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
  // const { token } = await result.user.getIdTokenResult();
  // localStorage.setItem(constants.TOKEN_KEY, token);
}

export async function signOut() {
  await firebase.auth().signOut();
}
