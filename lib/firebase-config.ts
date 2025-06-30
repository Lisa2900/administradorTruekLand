import { initializeApp, getApps, getApp } from "firebase/app"
import { checkEnvironmentVariables, checkOptionalEnvironmentVariables } from "./env-check"

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAHQRBnXFeyGOqqrslQNwYE4mhQANjbhrU",
  authDomain: "truekland-6ea20.firebaseapp.com",
  projectId: "truekland-6ea20",
  storageBucket: "truekland-6ea20.appspot.com",
  messagingSenderId: "931792877390",
  appId: "1:931792877390:web:0442eb9939b36b97f3501f",
  measurementId: "G-PFSYJXHNF6",
}

// Initialize Firebase only if it hasn't been initialized yet
function initializeFirebase() {
  try {
    // Check if Firebase app is already initialized
    if (getApps().length === 0) {
      console.log('🔥 Initializing Firebase...');
      return initializeApp(firebaseConfig);
    } else {
      console.log('� Firebase already initialized');
      return getApp();
    }
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error);
    throw error;
  }
}

// Export the initialized app
export const app = initializeFirebase()
