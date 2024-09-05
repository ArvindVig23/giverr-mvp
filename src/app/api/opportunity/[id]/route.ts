import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  getNotificationSettingsById,
  getUserDetailsCookie,
} from '@/services/backend/commonServices';
import { sendEmail } from '@/services/backend/emailService';
import { compileEmailTemplate } from '@/services/backend/handlebars';
import {
  currentUtcDate,
  getOppCommitmentByOppId,
  getOpportunityLocationsByOppId,
  getOpportunityTypeById,
  getOrgDetailsById,
  getUserDetailsById,
  getWishlistWithUser,
} from '@/services/backend/opportunityServices';
import { eventValidationSchema } from '@/utils/joiSchema';
import { deleteOpportunityTemplate } from '@/utils/templates/deleteOpportunity';
import { updateOpportunityTemplate } from '@/utils/templates/opportunityUpdates';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  try {
    const cookieStore = cookies();
    const userDetailCookie: any = cookieStore.get('userDetails');

    const { id }: any = params;
    const opportunitiesRef = collection(db, 'opportunities');
    const docRef = doc(opportunitiesRef, id);
    const docSnap = await getDoc(docRef);
    const opportunityData: any = docSnap.data();
    const loggedInUser = getUserDetailsCookie();
    if (
      !opportunityData ||
      (!loggedInUser && opportunityData.status !== 'APPROVED')
    ) {
      const response = responseHandler(
        404,
        false,
        null,
        'Opportunity not found',
      );
      return response;
    }

    const foundOppId = docSnap.id;
    opportunityData.id = foundOppId;
    // get opportunityType details
    if (opportunityData.opportunityType) {
      const oppTypeDetail = await getOpportunityTypeById(
        opportunityData.opportunityType,
      );
      opportunityData.opportunityData = oppTypeDetail;
    }

    // get organization detail
    if (opportunityData.organizationId) {
      const orgDetails = await getOrgDetailsById(
        opportunityData.organizationId,
      );
      opportunityData.organizationDetails = orgDetails;
    }
    // get the locations list if virtual location link is not there
    opportunityData.physicalLocations = [];
    if (!opportunityData.virtualLocationLink) {
      opportunityData.physicalLocations =
        await getOpportunityLocationsByOppId(id);
    }

    // get volunteer list
    let oppVolunteers: any[] = [];
    if (opportunityData.registrationType === 'GIVER_PLATFORM') {
      const oppVolunteersQuery = query(
        collection(db, 'opportunityMembers'),
        where('opportunityId', '==', foundOppId),
      );
      const oppVolunteersSnapShot = await getDocs(oppVolunteersQuery);
      oppVolunteers = await Promise.all(
        oppVolunteersSnapShot.docs.map(async (volDoc) => {
          const volunteer = volDoc.data();
          const userDetails = await getUserDetailsById(volunteer.userId);
          return userDetails;
        }),
      );
    }

    opportunityData.volunteer = oppVolunteers;

    // get the commitment data of the  opportunity
    const commitmentDetails = await getOppCommitmentByOppId(id);
    if (commitmentDetails) {
      const {
        commitmentId,
        commitment,
        frequency,
        selectedDate,
        opportunityId,
        startTime,
        endTime,
        minHour,
        type,
        maxHour,
        endDate,
      }: any = commitmentDetails;
      Object.assign(opportunityData, {
        commitmentId,
        commitment,
        frequency,
        selectedDate,
        opportunityId,
        startTime,
        endTime,
        minHour,
        type,
        maxHour,
        endDate,
      });
    }

    //  get the similar interests
    const getSilimarTypeQuery = query(
      opportunitiesRef,
      where('opportunityType', '==', opportunityData.opportunityType),
      where('status', '==', 'APPROVED'),
      limit(10),
    );
    const getSimilarInterests = await getDocs(getSilimarTypeQuery);
    let opportunitiesPromises: Promise<any>[] = [];

    if (getSimilarInterests.size > 0) {
      opportunitiesPromises = getSimilarInterests.docs.map(async (docs) => {
        if (docs.id === id) {
          return null;
        }
        const opportunityData = docs.data();
        opportunityData.id = docs.id;
        const organizationId = opportunityData.organizationId;

        // Fetch organization data using a separate query (for complex data)
        if (organizationId) {
          const organizationDocRef = doc(
            collection(db, 'organizations'),
            organizationId,
          );

          const organizationSnapshot = await getDoc(organizationDocRef);

          if (organizationSnapshot.exists()) {
            const orgData = organizationSnapshot.data();
            opportunityData.organization = orgData;
          } else {
            opportunityData.organization = null;
          }
        } else {
          opportunityData.organization = null;
        }

        let oppLocation: any[] = [];
        // fetching opportunity location if virtual link is not present
        if (!opportunityData.virtualLocationLink?.length) {
          const oppLocationQuery = query(
            collection(db, 'opportunityLocations'),
            where('opportunityId', '==', docs.id),
          );
          const oppLocationSnapShot = await getDocs(oppLocationQuery);
          if (!oppLocationSnapShot.empty) {
            oppLocationSnapShot.docs.forEach((doc: any) => {
              const location = doc.data();
              location.id = doc.id;
              oppLocation.push(location);
            });
          }
        }

        // fetching opportunity commitment
        let oppCommitments: any[] = [];
        const oppCommitmentQuery = query(
          collection(db, 'opportunityCommitment'),
          where('opportunityId', '==', docs.id),
        );
        const oppCommitmentSnapShot = await getDocs(oppCommitmentQuery);
        if (!oppCommitmentSnapShot.empty) {
          oppCommitmentSnapShot.docs.forEach((doc: any) => {
            const commitment = doc.data();
            commitment.id = doc.id;
            oppCommitments.push(commitment);
          });
        }

        // fetching volunteers for opportunity only if registration type is GIVER_PLATFORM
        let oppVolunteers: any[] = [];
        if (opportunityData.registrationType === 'GIVER_PLATFORM') {
          const oppVolunteersQuery = query(
            collection(db, 'opportunityMembers'),
            where('opportunityId', '==', docs.id),
          );
          const oppVolunteersSnapShot = await getDocs(oppVolunteersQuery);
          oppVolunteers = await Promise.all(
            oppVolunteersSnapShot.docs.map(async (volDoc) => {
              const volunteer = volDoc.data();
              const userDetails = await getUserDetailsById(volunteer.userId);
              return userDetails;
            }),
          );
        }

        // get the wishlist details
        opportunityData.isWishlist = false;
        if (userDetailCookie) {
          const convertString = JSON.parse(userDetailCookie.value);
          const { id } = convertString;
          const checkIsWishlist = await getWishlistWithUser(docs.id, id);
          opportunityData.isWishlist = checkIsWishlist;
        }
        opportunityData.commitment = oppCommitments;
        opportunityData.location = oppLocation;
        opportunityData.volunteers = oppVolunteers;
        return opportunityData;
      });
    }

    const similarOpportunities = await Promise.all(opportunitiesPromises);
    const filteredOpportunities = similarOpportunities.filter((opp) => opp);
    //  check if user already joined the opportunity
    if (userDetailCookie) {
      const convertString = JSON.parse(userDetailCookie.value);
      const userId = convertString.id;
      const oppMemberRef = collection(db, 'opportunityMembers');
      const findUser = query(
        oppMemberRef,
        where('opportunityId', '==', id),
        where('userId', '==', userId),
      );
      const alreadyAppliedUser = await getDocs(findUser);
      opportunityData.alreadyJoined = !alreadyAppliedUser.empty;
      const isWhishList = await getWishlistWithUser(opportunityData.id, userId);
      opportunityData.isWishlist = isWhishList;
    } else {
      opportunityData.alreadyJoined = true;
      opportunityData.isWishlist = false;
    }
    const response = responseHandler(
      200,
      false,
      { opportunityData, similarOpportunity: filteredOpportunities },
      'Opportunity Details Fetched successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in fetching the opportunity details');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in fetching opportunitiy details',
    );
    return response;
  }
}

// delete opportunity
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { id }: any = params;
    const opportunitiesRef = collection(db, 'opportunities');
    const docRef = doc(opportunitiesRef, id);
    const docSnap = await getDoc(docRef);
    const opportunityData: any = docSnap.data();
    const loggedInUser = getUserDetailsCookie();
    if (
      !opportunityData ||
      (!loggedInUser && opportunityData.status !== 'APPROVED')
    ) {
      const response = responseHandler(
        404,
        false,
        null,
        'Opportunity not found',
      );
      return response;
    }

    const batch = writeBatch(db);

    // Delete the opportunity
    batch.delete(docRef);

    // Delete related records from opportunityLocations
    const locationsQuery = query(
      collection(db, 'opportunityLocations'),
      where('opportunityId', '==', id),
    );
    const locationsSnapshot = await getDocs(locationsQuery);
    locationsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Delete related records from opportunityCommitment
    const commitmentQuery = query(
      collection(db, 'opportunityCommitment'),
      where('opportunityId', '==', id),
    );
    const commitmentSnapshot = await getDocs(commitmentQuery);
    commitmentSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Commit the batch
    await batch.commit();
    // sending emails to volunteers
    const emailPromises: Promise<any>[] = [];
    const oppVolunteersQuery = query(
      collection(db, 'opportunityMembers'),
      where('opportunityId', '==', id),
    );
    const oppVolunteersSnapShot = await getDocs(oppVolunteersQuery);
    const volunteersData = await Promise.all(
      oppVolunteersSnapShot.docs.map(async (volDoc) => {
        const volunteer = volDoc.data();
        const userDetails = await getUserDetailsById(volunteer.userId);
        const notificationDetails = await getNotificationSettingsById(
          volunteer.userId,
        );
        return {
          ...userDetails,
          notificationDetails,
        };
      }),
    );
    volunteersData.forEach((volunteer: any) => {
      if (
        volunteer?.notificationDetails &&
        volunteer?.notificationDetails?.allowUpdates &&
        volunteer?.notificationDetails?.allowVolunteeringUpdates
      ) {
        const template = compileEmailTemplate(
          deleteOpportunityTemplate,
          opportunityData,
        );
        emailPromises.push(
          sendEmail(
            volunteer.email,
            'Opportunity updated',
            'Opportunity updated',
            template,
          ),
        );
      }
    });
    await Promise.all(emailPromises);

    const response = responseHandler(
      200,
      false,
      null,
      'Opportunity delete successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in deleting Opportunity');

    const response = responseHandler(
      500,
      false,
      null,
      'Error in deleting Opportunity',
    );
    return response;
  }
}

// update opportunity

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id }: any = params;
    const opportunitiesRef = collection(db, 'opportunities');
    const docRef = doc(opportunitiesRef, id);
    const docSnap = await getDoc(docRef);
    const opportunityData: any = docSnap.data();
    const loggedInUser = getUserDetailsCookie();
    if (
      !opportunityData ||
      (!loggedInUser && opportunityData.status !== 'APPROVED')
    ) {
      const response = responseHandler(
        404,
        false,
        null,
        'Opportunity not found',
      );
      return response;
    }

    //  validations for field
    const reqBody: any = await req.json();

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
      commitmentId,
    } = reqBody;
    const { error } = eventValidationSchema.validate({
      name,
      description,
      activities,
      volunteerRequirements,
      opportunityType,
      createdBy,
      locationType,
      virtualLocationLink,
      selectedDate,
      imageLink,
      frequency,
    });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    const batch = writeBatch(db);

    // Update opportunity document
    batch.update(docRef, {
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
      locationType,
      imageLink,
      lowercaseName: name.toLowerCase().trim(),
      updatedAt: currentUtcDate,
    });

    // Update commitment document
    const commitmentRef = doc(db, 'opportunityCommitment', commitmentId);
    batch.update(commitmentRef, {
      opportunityId: id,
      type,
      selectedDate,
      endDate,
      minHour,
      maxHour,
      startTime,
      endTime,
      frequency,
      commitment,
      updatedAt: currentUtcDate,
    });

    // Handle locations
    if (virtualLocationLink) {
      const locationRef = collection(db, 'opportunityLocations');
      const q = query(locationRef, where('opportunityId', '==', id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    } else if (physicalLocations.length > 0) {
      // First Delete related records from opportunityLocations
      const locationsQuery = query(
        collection(db, 'opportunityLocations'),
        where('opportunityId', '==', id),
      );
      const locationsSnapshot = await getDocs(locationsQuery);
      locationsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      const opportunityLocationsRef = collection(db, 'opportunityLocations');

      for (const location of physicalLocations) {
        // Create new document
        const newLocationRef = doc(opportunityLocationsRef);
        batch.set(newLocationRef, {
          opportunityId: id,
          address: location.address,
          city: location.city,
          province: location.province,
          postalCode: location.postalCode,
          createdAt: currentUtcDate,
          updatedAt: currentUtcDate,
        });
      }
    }

    // Commit the batch
    await batch.commit();
    // sending emails to volunteers
    const emailPromises: Promise<any>[] = [];
    const oppVolunteersQuery = query(
      collection(db, 'opportunityMembers'),
      where('opportunityId', '==', id),
    );
    const oppVolunteersSnapShot = await getDocs(oppVolunteersQuery);
    const volunteersData = await Promise.all(
      oppVolunteersSnapShot.docs.map(async (volDoc) => {
        const volunteer = volDoc.data();
        const userDetails = await getUserDetailsById(volunteer.userId);
        const notificationDetails = await getNotificationSettingsById(
          volunteer.userId,
        );
        return {
          ...userDetails,
          notificationDetails,
        };
      }),
    );
    volunteersData.forEach((volunteer: any) => {
      if (
        volunteer?.notificationDetails &&
        volunteer?.notificationDetails?.allowUpdates &&
        volunteer?.notificationDetails?.allowVolunteeringUpdates
      ) {
        const template = compileEmailTemplate(
          updateOpportunityTemplate,
          opportunityData,
        );
        emailPromises.push(
          sendEmail(
            volunteer.email,
            'Opportunity updated',
            'Opportunity updated',
            template,
          ),
        );
      }
    });
    await Promise.all(emailPromises);

    const response = responseHandler(
      200,
      true,
      null,
      'Opportunity updated successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in updating Opportunity');

    const response = responseHandler(
      500,
      false,
      null,
      'Error in updating Opportunity',
    );
    return response;
  }
}
