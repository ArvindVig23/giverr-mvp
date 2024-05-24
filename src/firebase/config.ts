import {
  DATABASE_URL,
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
} from '@/constants/constants';
import { getStorage } from '@firebase/storage';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function transformFirebaseConfig(data: any): any {
  const transformedData: any = {};

  for (const key in data) {
    // eslint-disable-next-line
    if (data.hasOwnProperty(key)) {
      let value = data[key]?.replace(/"/g, '').trim();
      if (value?.endsWith(',')) {
        value = value?.slice(0, -1);
      }
      transformedData[key] = value;
    }
  }

  return transformedData;
}

const firebaseConfig = transformFirebaseConfig({
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
  DATABASE_URL: DATABASE_URL,
});

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
