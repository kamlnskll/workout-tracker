// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
export const app = initializeApp({
  apiKey: 'AIzaSyCTfcFvfWFzPPhQt_AtjXtT8hVQtnfxI8Y',
  authDomain: 'workout-tracker-3fde8.firebaseapp.com',
  projectId: 'workout-tracker-3fde8',
  storageBucket: 'workout-tracker-3fde8.appspot.com',
  messagingSenderId: '595389313577',
  appId: '1:595389313577:web:661398daabf862bffea238',
  measurementId: 'G-PFB19SGQBT',
})

export const analytics = getAnalytics(app)
// Initialize Firebase Auth and get reference to service

export const auth = getAuth(app)
