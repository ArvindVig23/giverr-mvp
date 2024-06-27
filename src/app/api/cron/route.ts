// import { db } from '@/firebase/config';
import { CRON_SECRET } from '@/constants/constants';
import responseHandler from '@/lib/responseHandler';
import { sendEmail } from '@/services/backend/emailService';
import { compileEmailTemplate } from '@/services/backend/handlebars';
import { updateOpportunityTemplate } from '@/utils/templates/opportunityUpdates';
import { NextRequest } from 'next/server';
// import {
//   formatUtcToReadable,
//   getNotificationSettingsById,
//   getOppMembersList,
// } from '@/services/backend/commonServices';
// import { sendEmail } from '@/services/backend/emailService';
// import { compileEmailTemplate } from '@/services/backend/handlebars';
// import {
//   currentUtcDate,
//   getOpportunityById,
//   getUserDetailsById,
// } from '@/services/backend/opportunityServices';
// import { subscribeEventDetailsTemplate } from '@/utils/templates/subscribeEventDetailsTemplate';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import moment from 'moment-timezone';

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    console.log('Inside the cron job');
    if (req.headers.get('Authorization') !== `Bearer ${CRON_SECRET}`) {
      const response = responseHandler(
        401,
        false,
        null,
        'Unauthorized in running cron',
      );
      return response;
    }
    const emailData = {
      name: 'test',
    };
    const template = compileEmailTemplate(updateOpportunityTemplate, emailData);
    await sendEmail(
      'giverr.platform@gmail.com',
      'Opportunity updated',
      'Opportunity updated',
      template,
    );

    // const oppCommitmentQuery = query(
    //   collection(db, 'opportunityCommitment'),
    //   where('frequency', '!=', 'ONETIME'),
    //   where('endDate', '>=', currentUtcDate),
    // );
    // const querySnapshot = await getDocs(oppCommitmentQuery);

    // if (querySnapshot.size > 0) {
    //   const emailPromises = querySnapshot.docs.map(async (doc) => {
    //     const data = doc.data();
    //     const opportunityDetails = await getOpportunityById(data.opportunityId);
    //     if (!opportunityDetails) {
    //       return;
    //     }
    //     const selectedDate = moment(data.selectedDate);
    //     let endDate = moment(data.endDate);

    //     // Set to start of day for accurate comparison
    //     const today = moment().startOf('day');
    //     const selectedStartOfDay = selectedDate.clone().startOf('day');
    //     const endStartOfDay = endDate.clone().startOf('day');

    //     let shouldSendEmail = false;

    //     if (
    //       selectedStartOfDay.isSameOrBefore(today) &&
    //       endStartOfDay.isSameOrAfter(today)
    //     ) {
    //       switch (data.frequency.toLowerCase()) {
    //         case 'daily':
    //           shouldSendEmail = true;
    //           break;
    //         case 'weekly':
    //           if (today.diff(selectedStartOfDay, 'days') % 7 === 0) {
    //             shouldSendEmail = true;
    //           }
    //           break;
    //         case 'monthly':
    //           if (
    //             today.date() === selectedStartOfDay.date() &&
    //             today.month() !== selectedStartOfDay.month()
    //           ) {
    //             shouldSendEmail = true;
    //           }
    //           break;
    //         case 'yearly':
    //           if (
    //             today.date() === selectedStartOfDay.date() &&
    //             today.month() === selectedStartOfDay.month() &&
    //             today.year() !== selectedStartOfDay.year()
    //           ) {
    //             shouldSendEmail = true;
    //           }
    //           break;
    //       }
    //     }

    //     if (shouldSendEmail) {
    //       const getMembersList = await getOppMembersList(data.opportunityId);

    //       // userDetails in below array of object
    //       const usersWithemail = await Promise.all(
    //         getMembersList.map(async (member: any) => {
    //           // member's details
    //           const notificatinDetails: any = await getNotificationSettingsById(
    //             member.userId,
    //           );

    //           if (
    //             notificatinDetails.allowUpdates &&
    //             notificatinDetails.allowVolunteeringUpdates
    //           ) {
    //             const userDetails = await getUserDetailsById(member.userId);
    //             return userDetails;
    //           }
    //         }),
    //       );
    //       const emailData = {
    //         name: opportunityDetails.name,
    //         description: opportunityDetails.description,
    //         activities: opportunityDetails.activities,
    //         volunteerRequirements: opportunityDetails.volunteerRequirements,
    //         eventDate: formatUtcToReadable(opportunityDetails.selectedDate),
    //       };
    //       // filter null, undefined fallsy values;
    //       const filterUserWithEmail = usersWithemail.filter((user) => user);
    //       await Promise.all(
    //         filterUserWithEmail.map(async (user) => {
    //           // send Email
    //           const template = compileEmailTemplate(
    //             subscribeEventDetailsTemplate,
    //             emailData,
    //           );
    //           await sendEmail(
    //             user.email,
    //             'Details of subscribed Opportunity',
    //             'Details of subscribed Opportunity',
    //             template,
    //           );
    //         }),
    //       );
    //     }
    //     return doc;
    //   });

    //   await Promise.all(emailPromises);
    // }

    const response = responseHandler(200, false, null, 'Cron run successfully');
    return response;
  } catch (error) {
    console.log(error, 'Error in running cron');
    const response = responseHandler(500, false, null, 'Error in running cron');
    return response;
  }
}
