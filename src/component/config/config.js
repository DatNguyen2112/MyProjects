import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB6FKEtg5TT0cMBWlSpMtSpdByVVbspYkk",
    authDomain: "cloudstore-ae09c.firebaseapp.com",
    projectId: "cloudstore-ae09c",
    storageBucket: "cloudstore-ae09c.appspot.com",
    messagingSenderId: "296450232213",
    appId: "1:296450232213:web:7e233bb0a7c137c03db09c"
};
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, db, storage}