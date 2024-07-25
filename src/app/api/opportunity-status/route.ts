import { TOKEN_SECRET } from '@/constants/constants';
import responseHandler from '@/lib/responseHandler';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import {
  getAllUsersSubscribeForOppType,
  getNotificationSettingsById,
} from '@/services/backend/commonServices';
import {
  getUserDetailsById,
  sendEmailsForSubscribeCatUser,
} from '@/services/backend/opportunityServices';
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token: any = searchParams.get('token');
    const status = searchParams.get('status');
    if (!token || !status) {
      const response = responseHandler(
        400,
        false,
        null,
        'Invalid approval request',
      );
      return response;
    }
    try {
      const decodedToken = verify(token, TOKEN_SECRET!) as {
        expiration: number;
        opportunityId: string;
      };

      // Check if token is expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.expiration < currentTimestamp) {
        const response = responseHandler(
          400,
          false,
          null,
          'Approval link is expired',
        );
        return response;
      }

      // Token is valid, decode opportunityId
      const opportunityId = decodedToken.opportunityId;
      const opportunitiesRef = collection(db, 'opportunities');
      const docRef = doc(opportunitiesRef, opportunityId);
      const docSnap = await getDoc(docRef);
      const opportunityData: any = docSnap.data();
      console.log(opportunityData, 'opportunityData');

      if (!opportunityData) {
        const response = responseHandler(
          404,
          false,
          null,
          'Opportunity not found',
        );
        return response;
      }
      // prevent admin from updating status more than once
      if (opportunityData.status !== 'PENDING') {
        const response = responseHandler(
          400,
          false,
          null,
          'Approval link is expired',
        );
        return response;
      }
      const updatedData = { ...opportunityData, status }; // Efficiently merge data
      await updateDoc(docRef, updatedData);

      // send email to the user who have subscribe for this category or to all category
      const matchArrayOfOppTypeId = ['0', opportunityData.opportunityType];
      const usersSubscribeForOppType = await getAllUsersSubscribeForOppType(
        matchArrayOfOppTypeId,
        opportunityData.createdBy,
      );

      if (usersSubscribeForOppType.length > 0) {
        const userIdsWithUpdatesAllowed = await Promise.all(
          usersSubscribeForOppType.map(async (user) => {
            const userId = user.userId;
            const notificationSettings =
              await getNotificationSettingsById(userId);

            if (notificationSettings && notificationSettings.allowUpdates) {
              return userId;
            } else {
              return null;
            }
          }),
        );

        // Filter out null values
        const filteredUserIds = userIdsWithUpdatesAllowed.filter(
          (userId) => userId !== null,
        );
        console.log(filteredUserIds, 'filteredUserIds');

        if (filteredUserIds.length > 0) {
          const userEmails = await Promise.all(
            filteredUserIds.map(async (userId) => {
              const userDetails = await getUserDetailsById(userId);
              return userDetails ? userDetails.email : null;
            }),
          );

          // Filter out null values
          const filteredUserEmails = userEmails.filter(
            (email) => email !== null,
          );
          const emailsString = filteredUserEmails.join();
          console.log(emailsString, 'emailString');
          await sendEmailsForSubscribeCatUser(opportunityData, emailsString);
        }
      }

      const message =
        status === 'APPROVED'
          ? 'Opportunity status updated to Approved'
          : 'Opportunity status updated to Rejected';
      const response = responseHandler(200, true, null, message);
      return response;
    } catch (err) {
      console.log(err, 'erri');
      // Token verification failed
      const response = responseHandler(
        400,
        false,
        null,
        'Invalid approval request',
      );
      return response;
    }
  } catch (error) {
    console.log(error, 'Error in updating the status');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in updating the status',
    );
    return response;
  }
}
