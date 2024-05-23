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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  DATABASE_URL: process.env.DATABASE_URL,
});

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
