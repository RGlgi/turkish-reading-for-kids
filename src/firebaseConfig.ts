// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCbrXOd8_inqFNugJ9z74u88eq0G1J7tzk',
  authDomain: 'turkce-okuyorum.firebaseapp.com',
  projectId: 'turkce-okuyorum',
  storageBucket: 'turkce-okuyorum.firebasestorage.app',
  messagingSenderId: '939411033356',
  appId: '1:939411033356:web:1d8d5d85d3467bbec1cd29',
  measurementId: 'G-WN13LV6V28',
}
const app = initializeApp(firebaseConfig)
// Initialize Firebase
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
