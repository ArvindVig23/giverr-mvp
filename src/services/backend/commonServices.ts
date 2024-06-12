import { db } from '@/firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
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

//  get the notification settings details with user id
export const getNotificationSettings = async (userId: string) => {
  const notificationRef = collection(db, 'userNotificationSettings');
  const querySnapshot = await getDocs(
    query(notificationRef, where('userId', '==', userId)),
  );
  if (querySnapshot.size === 0) {
    return null;
  } else {
    const memberDoc = querySnapshot.docs[0];
    const notificationSettingData: any = memberDoc.data();
    // get only fields that are important
    const data = {
      id: memberDoc.id,
      allowUpdates: notificationSettingData.allowUpdates,
      acceptSubmission: notificationSettingData.acceptSubmission,
      allowVolunteeringUpdates:
        notificationSettingData.allowVolunteeringUpdates,
    };
    console.log(data, 'data');

    return data;
  }
};
// get the category subscribe details on the basis of user ID
export const getSubscribeCategorySettings = async (userId: string) => {
  const catSubscribeRef = collection(db, 'userCategorySubscription');
  const querySnapshot = await getDocs(
    query(catSubscribeRef, where('userId', '==', userId)),
  );
  if (querySnapshot.size === 0) {
    return null;
  } else {
    const catSubscribePromises = querySnapshot.docs.map(async (docs) => {
      const catData = docs.data();
      catData.id = docs.id;
      const opportunityTypeId = catData.opportunityTypeId;
      catData.opportunityTypeData = null;
      // Option 1: Fetch organization data using a separate query (for complex data)
      if (opportunityTypeId !== '0') {
        const oppCatDetails = await getOppTypeDetails(opportunityTypeId);
        if (oppCatDetails) {
          catData.opportunityTypeData = oppCatDetails;
        }
      }
      return catData;
    });
    const catSubscribed = await Promise.all(catSubscribePromises);
    return catSubscribed;
  }
};

// get opportunity type details on the basis of ID
export const getOppTypeDetails = async (oppTypeId: string) => {
  const oppTyprRef = collection(db, 'opportunityTypes');

  const docRef = doc(oppTyprRef, oppTypeId);
  const docSnap = await getDoc(docRef);
  const oppTypeData: any = docSnap.data();
  if (!oppTypeData) {
    return null;
  } else {
    return oppTypeData;
  }
};

// set userDetails cookie
export const setUserDetailsCookie = (updatedCookies: any) => {
  cookies().set({
    name: 'userDetails',
    value: JSON.stringify(updatedCookies),
  });
};
