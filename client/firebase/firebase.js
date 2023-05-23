import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Initialize Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyCTfcFvfWFzPPhQt_AtjXtT8hVQtnfxI8Y',
  authDomain: 'workout-tracker-3fde8.firebaseapp.com',
  projectId: 'workout-tracker-3fde8',
  storageBucket: 'workout-tracker-3fde8.appspot.com',
  messagingSenderId: '595389313577',
  appId: '1:595389313577:web:f9ed943ce66d5876fea238',
  measurementId: 'G-BSLSE0KHSW',
}

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const database = getFirestore(app)
export const storage = getStorage(app)
