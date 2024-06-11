import { db } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { cookies } from 'next/headers';

export const getUserDetailsCookie = () => {
  const cookieStore = cookies();
  const userDetailCookie: any = cookieStore.get('userDetails');
  if (!userDetailCookie) {
    return null;
  } else {
    return userDetailCookie;
  }
};

export const getMemberTokenDetailsById = async (
  memberId: String,
  orgId: String,
) => {
  const usersRef = collection(db, 'organizationMemberInviteToken');
  const findMemberQuery = query(
    usersRef,
    where('memberId', '==', memberId),
    where('organizationId', '==', orgId),
  );
  const memberTokenDetails = await getDocs(findMemberQuery);

  if (memberTokenDetails.size === 0) {
    return null;
  } else {
    const member = memberTokenDetails.docs[0];
    return member.data();
  }
};
