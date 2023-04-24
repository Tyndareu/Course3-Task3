import { collection, addDoc, updateDoc, doc, getDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app, { db } from './firebase'

const collectionName = 'comments'

export const getComments = () => getDocs(collection(db, collectionName))
export const getComment = (id) => getDoc(doc(db, collectionName, id))

export const setData = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields)

export const newComment = (newComment) =>
  addDoc(collection(db, collectionName), newComment)

export const firebaseSignOut = () => {
  if (window.confirm('Do you really want to LogOut?')) {
    signOut(auth)
  }
}
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(app), new GoogleAuthProvider())
}
export const auth = getAuth(app)

export const deleteComment = (id) => {
  if (window.confirm('Do you really want to delete?')) {
    deleteDoc(doc(db, collectionName, id))
  }
}
