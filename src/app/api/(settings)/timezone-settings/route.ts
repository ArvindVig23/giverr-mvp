import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  getUserDetailsCookie,
  setUserDetailsCookie,
} from '@/services/backend/commonServices';
import { userSettingsSchema } from '@/utils/joiSchema';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {
      autoTimeZone,
      istwentyFourHourTimeFormat,
      isDayMonthYearDateFormat,
      id,
      timezone,
    } = reqBody;
    const { error } = userSettingsSchema.validate(
      {
        autoTimeZone,
        istwentyFourHourTimeFormat,
        isDayMonthYearDateFormat,
        id,
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
    const settingsRef = collection(db, 'userSettings');
    const docRef = doc(settingsRef, id);
    const docSnap = await getDoc(docRef);
    const settingData: any = docSnap.data();

    if (!settingData) {
      const response = responseHandler(
        404,
        false,
        null,
        'User setting not found',
      );
      return response;
    }
    let selectedTimeZone = '';
    let selectedTimeZoneInMilisecond = 0;
    if (!autoTimeZone) {
      if (timezone) {
        selectedTimeZone = timezone.value;
        selectedTimeZoneInMilisecond = timezone.offset;
      } else {
        selectedTimeZone = 'Africa/Abidjan';
        selectedTimeZoneInMilisecond = 0;
      }
    }
    if (autoTimeZone) {
      selectedTimeZone = '';
      selectedTimeZoneInMilisecond = 0;
    }

    await updateDoc(doc(db, 'userSettings', id), {
      autoTimeZone,
      istwentyFourHourTimeFormat,
      isDayMonthYearDateFormat,
      selectedTimeZone,
      selectedTimeZoneInMilisecond: selectedTimeZoneInMilisecond || 0,
    });
    const userDetails = await getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);

    const updatedCookies = {
      ...convertString,
      timeZoneSettings: {
        ...convertString.timeZoneSettings,
        autoTimeZone,
        istwentyFourHourTimeFormat,
        isDayMonthYearDateFormat,
        selectedTimeZone,
        selectedTimeZoneInMilisecond,
      },
    };

    setUserDetailsCookie(updatedCookies);
    const response = responseHandler(
      200,
      true,
      {
        id,
        autoTimeZone,
        istwentyFourHourTimeFormat,
        isDayMonthYearDateFormat,
        selectedTimeZone,
        selectedTimeZoneInMilisecond,
      },
      'User timezone settings updated successfully.',
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
