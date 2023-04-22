import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA90KQnIZLAsGEBNH0eqjM76cBtSXQL-bg',
  authDomain: 'course3-task1.firebaseapp.com',
  projectId: 'course3-task1',
  storageBucket: 'course3-task1.appspot.com',
  messagingSenderId: '879068318540',
  appId: '1:879068318540:web:ae76de37bc6bcaedcd1de9'
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()

export const firebaseSignOut = () => signOut(auth)
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(app), new GoogleAuthProvider())
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export default app
