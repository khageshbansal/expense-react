import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBG0YW4TEX79NL8kcrR_BDKVCOocGXULcY',
  authDomain: 'react-ecom-7c787.firebaseapp.com',
  databaseURL: 'https://react-ecom-7c787-default-rtdb.firebaseio.com',
  projectId: 'react-ecom-7c787',
  storageBucket: 'react-ecom-7c787.appspot.com',
  messagingSenderId: '487909690371',
  appId: '1:487909690371:web:73ffdd959d43da41839236',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
