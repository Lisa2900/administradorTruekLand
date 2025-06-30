// Alternative Firebase configuration approach
// This file provides a fallback if environment variables are not loading properly

export const firebaseConfigFromEnv = () => {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAHQRBnXFeyGOqqrslQNwYE4mhQANjbhrU",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "truekland-6ea20.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "truekland-6ea20",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "truekland-6ea20.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "931792877390",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:931792877390:web:0442eb9939b36b97f3501f",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-PFSYJXHNF6",
  }
}

export const firebaseConfigStatic = {
  apiKey: "AIzaSyAHQRBnXFeyGOqqrslQNwYE4mhQANjbhrU",
  authDomain: "truekland-6ea20.firebaseapp.com",
  projectId: "truekland-6ea20",
  storageBucket: "truekland-6ea20.appspot.com",
  messagingSenderId: "931792877390",
  appId: "1:931792877390:web:0442eb9939b36b97f3501f",
  measurementId: "G-PFSYJXHNF6",
}
