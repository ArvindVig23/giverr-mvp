import { db } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const checkDuplicateWithEmail = async (
  userId: string,
  email: string,
) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email.toLowerCase()));
  const querySnapshot = await getDocs(q);
  let isDuplicate = false;
  querySnapshot.forEach((doc) => {
    if (doc.id !== userId) {
      isDuplicate = true;
    }
  });
  return isDuplicate;
};

export const checkDuplicateWithUsername = async (
  userId: string,
  username: string,
) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username.toLowerCase()));
  const querySnapshot = await getDocs(q);
  let isDuplicate = false;
  querySnapshot.forEach((doc) => {
    if (doc.id !== userId) {
      isDuplicate = true;
    }
  });
  return isDuplicate;
};
