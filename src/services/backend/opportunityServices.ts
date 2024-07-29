import { ADMIN_EMAIL, DOMAIN_URL, TOKEN_SECRET } from '@/constants/constants';
import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import { sendEmail } from './emailService';
import { compileEmailTemplate } from './handlebars';
import { approveEvent } from '@/utils/templates/approveEvent';
import { volunteerEmailTemplate } from '@/utils/templates/volunteerEmailTemplate';
import {
  combineDateAndTime,
  formatUtcToReadable,
  getFormattedLocalTimeBackend,
  getNotificationSettingsById,
  getUserDetailsCookie,
} from './commonServices';
import { eventAddedToSubscribeCat } from '@/utils/templates/eventAddedToSubscribeCat';
import { Location } from '@/interface/opportunity';
import { getIcalObjectInstance } from '@/utils/calendar/icallObject';
import * as geofire from 'geofire-common';
//  current date to utc format
export const currentUtcDate = moment().tz('UTC').toDate().toISOString();

// create opportunity
export const createOpportunity = async (opportunity: any) => {
  try {
    const {
      name,
      description,
      activities,
      volunteerRequirements,
      opportunityType,
      createdBy,
      organizationId,
      locationType,
      virtualLocationLink,
      physicalLocations,
      selectedDate,
      minHour,
      maxHour,
      startTime,
      endTime,
      endDate,
      frequency,
      type,
      registrationType,
      registrationWebsiteLink,
      spots,
      imageLink,
      commitment,
    } = opportunity;
    const batch = writeBatch(db);

    // Add opportunity document
    const opportunityRef = doc(collection(db, 'opportunities'));
    batch.set(opportunityRef, {
      name: name.trim(),
      registrationType,
      spots,
      description,
      activities,
      volunteerRequirements,
      registrationWebsiteLink,
      organizationId,
      opportunityType,
      virtualLocationLink,
      createdBy,
      imageLink,
      status: 'PENDING',
      lowercaseName: name.toLowerCase().trim(),
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });

    // Add opportunity commitment document
    const opportunityCommitmentRef = doc(
      collection(db, 'opportunityCommitment'),
    );
    batch.set(opportunityCommitmentRef, {
      opportunityId: opportunityRef.id,
      type,
      selectedDate,
      endDate,
      minHour,
      maxHour,
      startTime,
      endTime,
      frequency,
      commitment,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
    // Add physical locations (if applicable)
    if (locationType === 'PHYSICAL' && physicalLocations.length > 0) {
      const locationPromises = physicalLocations.map(
        async (location: Location) => {
          const opportunityLocationRef = doc(
            collection(db, 'opportunityLocations'),
          );
          batch.set(opportunityLocationRef, {
            opportunityId: opportunityRef.id,
            address: location.address,
            city: location.city,
            province: location.province,
            postalCode: location.postalCode,
            lat: location.lat,
            long: location.long,
            geoHash:
              location.lat && location.long
                ? geofire.geohashForLocation([
                    location.lat || 0,
                    location.long || 0,
                  ])
                : null,
            createdAt: currentUtcDate,
            updatedAt: currentUtcDate,
          });
        },
      );

      await Promise.all(locationPromises);
    }

    // Commit the batch
    await batch.commit();

    await sendEmailForApproval(
      name,
      description,
      frequency,
      activities,
      volunteerRequirements,
      selectedDate,
      virtualLocationLink,
      opportunityRef.id,
      organizationId,
      opportunityType,
      createdBy,
    );
    const response = responseHandler(
      200,
      true,
      null,
      'Opportunity submitted and sent for the approval.',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating new opportunity.',
    );
    return response;
  }
};

export const getOpportunityTypeById = async (id: any) => {
  const opportunityTypesRef = collection(db, 'opportunityTypes');
  const docRef = doc(opportunityTypesRef, id);
  const docSnap = await getDoc(docRef);
  const opportunityTypeData: any = docSnap.data();
  if (!opportunityTypeData) {
    return null;
  } else {
    return opportunityTypeData;
  }
};

export const getOrgDetailsById = async (id: any) => {
  const organizationsRef = collection(db, 'organizations');

  const docRef = doc(organizationsRef, id);
  const docSnap = await getDoc(docRef);
  const orgData: any = docSnap.data();
  if (!orgData) {
    return null;
  } else {
    return orgData;
  }
};

export const getUserDetailsById = async (id: any) => {
  const userRef = collection(db, 'users');

  const docRef = doc(userRef, id);
  const docSnap = await getDoc(docRef);
  const orgData: any = docSnap.data();
  if (!orgData) {
    return null;
  } else {
    orgData.id = docSnap.id;
    return orgData;
  }
};

export const getOpportunityById = async (id: any) => {
  const opportunitiesRef = collection(db, 'opportunities');
  const docRef = doc(opportunitiesRef, id);
  const docSnap = await getDoc(docRef);
  const opportunityData: any = docSnap.data();

  if (!opportunityData || opportunityData.status !== 'APPROVED') {
    return null;
  } else {
    return opportunityData;
  }
};

export const sendEmailForApproval = async (
  name?: string,
  description?: string,
  frequency?: string,
  activities?: string,
  volunteerRequirements?: string,
  eventDate?: string,
  location?: string,
  opportunityId?: string,
  organizationId?: string,
  opportunityType?: string,
  createdBy?: string,
) => {
  try {
    const token = jwt.sign({ opportunityId }, TOKEN_SECRET!, {
      expiresIn: '1w',
    });
    const approvalUrl = `${DOMAIN_URL}/api/opportunity-status?token=${token}&status=APPROVED`;
    const rejectUrl = `${DOMAIN_URL}/api/opportunity-status?token=${token}&status=REJECTED`;
    // convert to local time string
    const userDetail = await getUserDetailsCookie();
    const convertString = JSON.parse(userDetail.value);

    const time = getFormattedLocalTimeBackend(eventDate!, convertString);

    // gett org details
    let org = '';
    if (organizationId) {
      const organization = await getOrgDetailsById(organizationId);
      org = organization.name;
    }

    // get opp type
    let oppType = '';
    if (opportunityType) {
      const opportunity = await getOpportunityTypeById(opportunityType);
      oppType = opportunity.name;
    }
    let userEmail = '';
    if (createdBy) {
      const user = await getUserDetailsById(createdBy);
      userEmail = user ? user.email : '';
    }
    const emailData = {
      name,
      description,
      frequency,
      activities,
      eventDate: time,
      location,
      approvalUrl,
      rejectUrl,
      volunteerRequirements,
      organizationName: org,
      oppType,
      email: userEmail || org,
    };
    const template = compileEmailTemplate(approveEvent, emailData);
    await sendEmail(
      ADMIN_EMAIL!,
      'Post Approval Required',
      'Post Approval Required',
      template,
    );
  } catch (error) {
    console.log(error, 'error in sending email for approval');
  }
};

// join opportunity
export const joinOpportunity = async (
  oppId: string,
  id: string,
  email: string,
) => {
  try {
    const getEventDetails = await getOppWithCommitments(oppId);
    await addDoc(collection(db, 'opportunityMembers'), {
      userId: id,
      opportunityId: oppId,
    });
    const getNotificationSetting: any = await getNotificationSettingsById(id);
    if (getNotificationSetting && getNotificationSetting.allowUpdates) {
      const dateTime = combineDateAndTime(
        getEventDetails.commitment.selectedDate,
        getEventDetails.commitment.startTime,
      );
      const emailData = {
        name: getEventDetails.name,
        description: getEventDetails.description,
        eventDate: formatUtcToReadable(dateTime),
      };
      const template = compileEmailTemplate(volunteerEmailTemplate, emailData);

      const calendarObject = getIcalObjectInstance({
        name: getEventDetails.name,
        startDate: getEventDetails.commitment.selectedDate,
        startTime: getEventDetails.commitment.startTime,
        maxHour: getEventDetails.commitment.maxHour,
        description: getEventDetails.description,
        summary: getEventDetails.description,
      });
      console.log(calendarObject, 'calendarObject');

      await sendEmail(
        email,
        'Welcome aboard, Volunteer!',
        'Welcome aboard, Volunteer!',
        template,
        calendarObject,
      );
    }

    const response = responseHandler(
      200,
      true,
      null,
      'Thank you for Joining the event',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in join Opp function');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in Joining the event',
    );
    return response;
  }
};

export const getWishlistWithUser = async (oppId: string, userId: string) => {
  const wishlistRef = collection(db, 'userWishList');
  const q = query(
    wishlistRef,
    where('opportunityId', '==', oppId),
    where('userId', '==', userId),
  );
  const wishListRecord = await getDocs(q);
  return !wishListRecord.empty;
};

export const addToWishlist = async (oppId: string, id: string) => {
  try {
    await addDoc(collection(db, 'userWishList'), {
      opportunityId: oppId,
      userId: id,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
    const response = responseHandler(
      200,
      true,
      { opportunityId: oppId, isWishlist: true },
      'Opportunity added to wishlist',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error while adding opportunity to wishlist',
    );
    return response;
  }
};

export const removeFromWishlist = async (oppId: string, id: string) => {
  try {
    // Construct a query to find the specific wishlist item
    const q = query(
      collection(db, 'userWishList'),
      where('opportunityId', '==', oppId),
      where('userId', '==', id),
    );
    // Get the document snapshot (if it exists)
    const querySnapshot = await getDocs(q);
    // Found the wishlist item, delete it
    const doc = querySnapshot.docs[0];
    await deleteDoc(doc.ref);
    const response = responseHandler(
      200,
      true,
      { opportunityId: oppId, isWishlist: false },
      'Opportunity removed from wishlist',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error while removing opportunity from wishlist',
    );
    return response;
  }
};

export const sendEmailsForSubscribeCatUser = async (
  data: any,
  emailsString: string,
) => {
  try {
    const userDetail = await getUserDetailsCookie();
    const convertString = userDetail ? JSON.parse(userDetail.value) : null;
    const time = getFormattedLocalTimeBackend(data.eventDate, convertString);
    let org = '';
    if (data.organizationId) {
      const organization = await getOrgDetailsById(data.organizationId);
      org = organization.name;
    }
    let oppType = '';
    if (data.opportunityType) {
      const opportunity = await getOpportunityTypeById(data.opportunityType);
      oppType = opportunity.name;
    }
    let userEmail = '';
    if (data.createdBy) {
      const user = await getUserDetailsById(data.createdBy);
      userEmail = user.email;
    }
    const emailData = {
      name: data.name,
      description: data.description,
      frequency: data.frequency,
      activities: data.activities,
      eventDate: time,
      location: data.location,
      volunteerRequirements: data.volunteerRequirements,
      organizationName: org,
      email: userEmail,
      oppType,
    };
    const template = compileEmailTemplate(eventAddedToSubscribeCat, emailData);
    await sendEmail(
      emailsString,
      'Event Added to your subscribe category',
      'Event Added to your subscribe category',
      template,
    );
  } catch (error) {
    console.log(error, 'Error in sending email to subscribed users');
  }
};

// get locations list on the basis of organization id

export const getOpportunityLocationsByOppId = async (oppId: string) => {
  const opportunityLocationsRef = collection(db, 'opportunityLocations');
  const opportunityQuery = query(
    opportunityLocationsRef,
    where('opportunityId', '==', oppId),
  );
  try {
    const querySnapshot = await getDocs(opportunityQuery);
    if (querySnapshot.empty) {
      return []; // Return an empty array if no documents found
    } else {
      const opportunityLocations: any = [];
      querySnapshot.forEach((doc) => {
        opportunityLocations.push({ ...doc.data(), id: doc.id });
      });
      return opportunityLocations;
    }
  } catch (error) {
    console.log(error, 'Error in fetching the opp locations');
    const response = responseHandler(
      500,
      false,
      null,
      'Error fetching the opportunity data',
    );
    throw response;
  }
};

//  get opportunity commitment by id
export const getOppCommitmentByOppId = async (oppId: string) => {
  const oppCommitmentRef = collection(db, 'opportunityCommitment');
  const oppCommitmentQuery = query(
    oppCommitmentRef,
    where('opportunityId', '==', oppId),
  );
  const commitmentDetails = await getDocs(oppCommitmentQuery);

  if (commitmentDetails.size === 0) {
    return null;
  } else {
    const commitment = commitmentDetails.docs[0];
    return {
      commitmentId: commitment.id,
      ...commitment.data(),
    };
  }
};

export const getOppWithCommitments = async (id: string) => {
  const opportunity = await getOpportunityById(id);
  if (opportunity) {
    opportunity.commitment = await getOppCommitmentByOppId(id);
  }
  return opportunity;
};
