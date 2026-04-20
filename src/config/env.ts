const required = (value: string | undefined, fallback = '') => value ?? fallback;

export const env = {
  apiBaseUrl: required(import.meta.env.VITE_API_BASE_URL, 'http://localhost:3000'),
  socketUrl: required(import.meta.env.VITE_SOCKET_URL, 'http://localhost:3000'),
  authSecret: required(import.meta.env.VITE_AUTH_SECRET, 'naseeb-dashboard-secret'),
  firebaseApiKey: required(import.meta.env.VITE_FIREBASE_API_KEY),
  firebaseAuthDomain: required(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  firebaseProjectId: required(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  firebaseStorageBucket: required(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  firebaseMessagingSenderId: required(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  firebaseAppId: required(import.meta.env.VITE_FIREBASE_APP_ID),
  firebaseVapidKey: required(import.meta.env.VITE_FIREBASE_VAPID_KEY),
};
