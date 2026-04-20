const required = (value: string | undefined, fallback = '') => value ?? fallback;

const mode = import.meta.env.MODE;
const isProduction = mode === 'production';

const modeValue = (developmentValue: string | undefined, productionValue: string | undefined, fallback = '') =>
  isProduction ? required(productionValue, fallback) : required(developmentValue, fallback);

export const env = {
  mode,
  isProduction,
  isDevelopment: !isProduction,
  appName: required(import.meta.env.VITE_APP_NAME, 'Naseeb AgriTech Admin'),
  apiBaseUrl: required(
    import.meta.env.VITE_API_BASE_URL,
    modeValue(import.meta.env.VITE_API_BASE_URL_DEVELOPMENT, import.meta.env.VITE_API_BASE_URL_PRODUCTION, 'http://localhost:3000'),
  ),
  socketUrl: required(
    import.meta.env.VITE_SOCKET_URL,
    modeValue(import.meta.env.VITE_SOCKET_URL_DEVELOPMENT, import.meta.env.VITE_SOCKET_URL_PRODUCTION, 'http://localhost:3000'),
  ),
  apiTimeoutMs: Number(required(import.meta.env.VITE_API_TIMEOUT_MS, '20000')),
  authSecret: required(import.meta.env.VITE_AUTH_SECRET, 'naseeb-dashboard-secret'),
  // Firebase is configured only for FCM push notifications.
  firebaseApiKey: required(import.meta.env.VITE_FIREBASE_API_KEY),
  firebaseAuthDomain: required(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  firebaseProjectId: required(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  firebaseStorageBucket: required(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  firebaseMessagingSenderId: required(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  firebaseAppId: required(import.meta.env.VITE_FIREBASE_APP_ID),
  firebaseVapidKey: required(import.meta.env.VITE_FIREBASE_VAPID_KEY),
};
