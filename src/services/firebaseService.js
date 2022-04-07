import firebase from './firebase';

export function uploadToFirebase(filename, file, userId) {
  const storageRef = firebase.storage().ref();
  return storageRef.child(`/${userId}/media/${filename}`).put(file);
}

export function deleteFromFirebase(filename, userId) {
  const storageRef = firebase.storage().ref();
  const mediaRef = storageRef.child(`/${userId}/media/${filename}`);
  return mediaRef.delete();
}
