

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import myConfig from './myConfig'


firebase.initializeApp(myConfig.firebaseConfig);


export default firebase
