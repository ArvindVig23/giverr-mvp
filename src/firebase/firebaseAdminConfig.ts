import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string),
    ),
    databaseURL: process.env.DATABASE_URL,
  });
}

export default admin;
