import { collection, addDoc, updateDoc, doc, getDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import app, { db } from './firebase'

const collectionName = 'comments'
const collectionURLs = 'photos'

export const auth = getAuth(app)
export const getAllDocs = () => getDocs(collection(db, collectionName))
export const getOneDoc = (id) => getDoc(doc(db, collectionName, id))
export const setDoc = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields)
export const newOneDoc = (newOneDoc) =>
  addDoc(collection(db, collectionName), newOneDoc)
export const firebaseSignOut = () => {
  if (window.confirm('Do you really want to LogOut?')) {
    signOut(auth)
  }
}
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(app), new GoogleAuthProvider())
}
export const deleteOneDoc = async (id) => {
  if (window.confirm('Do you really want to delete?')) {
    try {
      await deleteDoc(doc(db, collectionName, id))
    } catch (err) {
      alert(err)
    }
  }
}
// URLs
export const getAllURLs = () => getDocs(collection(db, collectionURLs))
export const newOneURL = (newOneDoc) =>
  addDoc(collection(db, collectionURLs), newOneDoc)
export const setURLs = (id, updatedFields) =>
  updateDoc(doc(db, collectionURLs, id), updatedFields)
// Firebase Storage

// Create a root reference
export const storage = getStorage()
