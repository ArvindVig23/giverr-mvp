import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  getUserDetailsCookie,
  setUserDetailsCookie,
} from '@/services/backend/commonServices';
import { booleanSchema } from '@/utils/joiSchema';
import { doc, updateDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { allowUpdates, acceptSubmission, allowVolunteeringUpdates } =
      reqBody;
    const { error } = booleanSchema.validate(
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
    console.log(allowUpdates, acceptSubmission, allowVolunteeringUpdates);

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
