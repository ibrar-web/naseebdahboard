import { initializeApp, getApps } from 'firebase/app';
import { env } from '@/config/env';

// Shared Firebase app for FCM only. Admin data does not live in Firebase.
const firebaseConfig = {
  apiKey: env.firebaseApiKey,
  authDomain: env.firebaseAuthDomain,
  projectId: env.firebaseProjectId,
  storageBucket: env.firebaseStorageBucket,
  messagingSenderId: env.firebaseMessagingSenderId,
  appId: env.firebaseAppId,
};

export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
