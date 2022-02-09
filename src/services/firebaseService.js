import firebase from './firebase';

export async function signUpUserWithEmail(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    return await result.user.updateProfile({ displayName: creds.displayName });
  } catch (err) {
    throw err;
  }
}

export async function signInWithEmail(creds) {
  await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
}

export async function signOut() {
  await firebase.auth().signOut();
}
