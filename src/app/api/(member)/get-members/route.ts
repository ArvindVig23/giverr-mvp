import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword');
    const usersRef = collection(db, 'users');
    let fullNameQuery, usernameQuery;

    if (keyword) {
      fullNameQuery = query(
        usersRef,
        where('fullName', '>=', keyword),
        where('fullName', '<', keyword + '\uf8ff'),
      );
      usernameQuery = query(
        usersRef,
        where('username', '>=', keyword),
        where('username', '<', keyword + '\uf8ff'),
      );
    } else {
      fullNameQuery = query(usersRef, limit(10));
      usernameQuery = query(usersRef, limit(10));
    }

    const [fullNameSnapshot, usernameSnapshot] = await Promise.all([
      getDocs(fullNameQuery),
      getDocs(usernameQuery),
    ]);

    // Combine results on the client-side
    const fullNameResults: any = fullNameSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const usernameResults: any = usernameSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const combinedResults = [...fullNameResults, ...usernameResults];

    const uniqueUsersMap = new Map();

    combinedResults.forEach((user) => {
      if (!uniqueUsersMap.has(user.id)) {
        uniqueUsersMap.set(user.id, user);
      }
    });

    const users = Array.from(uniqueUsersMap.values());

    const response = responseHandler(
      200,
      false,
      users,
      'Members fetched successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in fetching the members');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in fetching members',
    );
    return response;
  }
}
