import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCb3mhhuUs0R8grg_8n3BfDbNubfxeoD9E',
  authDomain: 'edemy-b30c5.firebaseapp.com',
  projectId: 'edemy-b30c5',
  storageBucket: 'edemy-b30c5.appspot.com',
  messagingSenderId: '847020556634',
  appId: '1:847020556634:web:d0ca69616245d5ce913363',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
