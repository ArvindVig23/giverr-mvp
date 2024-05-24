import {
  DATABASE_URL,
  FIREBASE_SERVICE_ACCOUNT_KEY,
} from '@/constants/constants';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY as string),
    ),
    databaseURL: DATABASE_URL,
  });
}

export default admin;
