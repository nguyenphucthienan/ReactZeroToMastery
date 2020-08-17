import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
  apiKey: "AIzaSyDi-5gsg19wSui5VObYFpk_nAP7YmBgXuc",
  authDomain: "crwn-clothing-firebase.firebaseapp.com",
  databaseURL: "https://crwn-clothing-firebase.firebaseio.com",
  projectId: "crwn-clothing-firebase",
  storageBucket: "crwn-clothing-firebase.appspot.com",
  messagingSenderId: "375496616443",
  appId: "1:375496616443:web:82ca4b0144f431dbf9035e",
  measurementId: "G-JRF9YWG6MT"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
