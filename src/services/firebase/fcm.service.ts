import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
import { firebaseApp } from '@/services/firebase/firebase';

export const initFcm = async (onForegroundMessage: (payload: unknown) => void) => {
  const supported = await isSupported();

  if (!supported) {
    return null;
  }

  const messaging = getMessaging(firebaseApp);

  onMessage(messaging, onForegroundMessage);

  return getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  });
};
