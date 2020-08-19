import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDi-5gsg19wSui5VObYFpk_nAP7YmBgXuc',
  authDomain: 'crwn-clothing-firebase.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-firebase.firebaseio.com',
  projectId: 'crwn-clothing-firebase',
  storageBucket: 'crwn-clothing-firebase.appspot.com',
  messagingSenderId: '375496616443',
  appId: '1:375496616443:web:82ca4b0144f431dbf9035e',
  measurementId: 'G-JRF9YWG6MT'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log.log('Error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(object => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, object);
  });

  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
