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
    return [];
  } else {
    const catSubscribePromises = querySnapshot.docs.map(async (docs) => {
      const allData = docs.data();
      const catData = {
        id: docs.id,
        opportunityTypeData: null,
        opportunityTypeId: allData.opportunityTypeId,
      };
      const opportunityTypeId = allData.opportunityTypeId;
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

// get notification setting with user id
export const getNotificationSettingsById = async (userId: string) => {
  const userSettingsRef = collection(db, 'userNotificationSettings');
  const querySnapshot = await getDocs(
    query(userSettingsRef, where('userId', '==', userId)),
  );
  if (querySnapshot.size === 0) {
    return null;
  } else {
    const member = querySnapshot.docs[0];
    return member.data();
  }
};

// get all the users subscription setting except the user created the event
export const getAllUsersSubscribeForOppType = async (
  matchArrayOfOppTypeId: string[],
  userId: string,
) => {
  const userSettingsRef = collection(db, 'userCategorySubscription');
  const querySnapshot = await getDocs(
    query(
      userSettingsRef,
      where('opportunityTypeId', 'in', matchArrayOfOppTypeId),
      where('userId', '!=', userId),
    ),
  );
  if (querySnapshot.size === 0) {
    return [];
  } else {
    return querySnapshot.docs.map((doc) => doc.data());
  }
};

// get timezone as per user id
export const getTimeZoneSettingAsPerUser = async (userId: string) => {
  const settingsRef = collection(db, 'userSettings');
  const querySnapshot = await getDocs(
    query(settingsRef, where('userId', '==', userId)),
  );
  if (querySnapshot.size === 0) {
    return null;
  } else {
    const settingsDoc = querySnapshot.docs[0];
    const settingData: any = settingsDoc.data();
    // get only fields that are important
    const data = {
      id: settingsDoc.id,
      autoTimeZone: settingData.autoTimeZone,
      selectedTimeZone: settingData.selectedTimeZone,
      istwentyFourHourTimeFormat: settingData.istwentyFourHourTimeFormat,
      isDayMonthYearDateFormat: settingData.isDayMonthYearDateFormat,
      userId,
    };

    return data;
  }
};
