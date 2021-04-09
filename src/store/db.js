import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "firebase apiKey",
    authDomain: "firebase authDomain",
    projectId: "firebase projectId",
    storageBucket: "firebase storageBucket",
    messagingSenderId: "firebase messagingSenderId",
    appId: "firebase appId"
}

const db = firebase.initializeApp(config);
export default db;

