import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  getNotificationSettings,
  getSubscribeCategorySettings,
  getUserDetailsCookie,
  setUserDetailsCookie,
} from '@/services/backend/commonServices';
import { currentUtcDate } from '@/services/backend/opportunityServices';
import { notificationSettingSchema, oppTypeIdSchema } from '@/utils/joiSchema';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { NextRequest } from 'next/server';

//  using put to update the radio button notification settings
export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { allowUpdates, acceptSubmission, allowVolunteeringUpdates } =
      reqBody;
    const { error } = notificationSettingSchema.validate(
      {
        allowUpdates,
        acceptSubmission,
        allowVolunteeringUpdates,
      },
      { abortEarly: false },
    );
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    const userDetails = await getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString.notificationSetting;
    await updateDoc(doc(db, 'userNotificationSettings', id), {
      allowUpdates,
      acceptSubmission,
      allowVolunteeringUpdates,
    });
    //  update the cookies as well
    const updatedCookies = {
      ...convertString,
      notificationSetting: {
        ...convertString.notificationSetting,
        allowUpdates,
        acceptSubmission,
        allowVolunteeringUpdates,
      },
    };
    setUserDetailsCookie(updatedCookies);
    const response = responseHandler(
      200,
      true,
      { allowUpdates, acceptSubmission, allowVolunteeringUpdates },
      'Notification setting updated successfully.',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in updating Users settings');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in updating notification settings.',
    );
    return response;
  }
}

// POST method we are using to create the records
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { opportunityTypeId } = reqBody;
    const { error } = oppTypeIdSchema.validate({ opportunityTypeId });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    const userDetails = getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;
    if (opportunityTypeId === '0') {
      const userSettingsRef = collection(db, 'userCategorySubscription');
      const batch = writeBatch(db);
      const userSettingsQuery = query(
        userSettingsRef,
        where('userId', '==', id),
      );
      const userSettingsSnapshot = await getDocs(userSettingsQuery);
      userSettingsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
    await addDoc(collection(db, 'userCategorySubscription'), {
      userId: id,
      opportunityTypeId,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });

    // to set the updated categories in cookies
    const categorySubscribe = await getSubscribeCategorySettings(id);
    //  update the cookies as well
    const updatedCookies = {
      ...convertString,
      categorySubscribe,
    };
    setUserDetailsCookie(updatedCookies);
    const response = responseHandler(
      200,
      true,
      categorySubscribe,
      'Notification setting updated successfully.',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in updating subscribe category');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in updating notification settings.',
    );
    return response;
  }
}

// remove subscribed category category

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const opportunityTypeId: any = searchParams.get('opportunityTypeId');

    const { error } = oppTypeIdSchema.validate({ opportunityTypeId });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    const userDetails = getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;
    if (opportunityTypeId === '0') {
      const userSettingsRef = collection(db, 'userCategorySubscription');
      const batch = writeBatch(db);
      const userSettingsQuery = query(
        userSettingsRef,
        where('userId', '==', id),
      );
      const userSettingsSnapshot = await getDocs(userSettingsQuery);
      userSettingsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      // to set the updated categories in cookies
      const categorySubscribe = await getSubscribeCategorySettings(id);
      //  update the cookies as well
      const updatedCookies = {
        ...convertString,
        categorySubscribe,
      };
      setUserDetailsCookie(updatedCookies);
      const response = responseHandler(
        200,
        true,
        categorySubscribe,
        'Notification setting updated successfully.',
      );
      return response;
    }
    const categoryRef = collection(db, 'userCategorySubscription');
    const q = query(
      categoryRef,
      where('opportunityTypeId', '==', opportunityTypeId),
      where('userId', '==', id),
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const response = responseHandler(
        404,
        false,
        null,
        'Subscribe Category not found',
      );
      return response;
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // to set the updated categories in cookies
    const categorySubscribe = await getSubscribeCategorySettings(id);
    //  update the cookies as well
    const updatedCookies = {
      ...convertString,
      categorySubscribe,
    };
    setUserDetailsCookie(updatedCookies);
    const response = responseHandler(
      200,
      true,
      categorySubscribe,
      'Notification setting updated successfully.',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in Removing subscribe category');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in updating notification settings.',
    );
    return response;
  }
}

//  get the notification settings on the basis of logged in user
export async function GET() {
  try {
    const userDetails = await getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;
    const notificationSetting = await getNotificationSettings(id);
    console.log(notificationSetting, 'notificationSetting');

    const response = responseHandler(
      200,
      false,
      notificationSetting,
      'Notification settings fetched successfully.',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in Removing getting notification settings');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in getting notification settings',
    );
    return response;
  }
}
