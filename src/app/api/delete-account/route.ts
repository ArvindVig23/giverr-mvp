import {
  collection,
  doc,
  writeBatch,
  query,
  where,
  getDocs,
} from 'firebase/firestore'; // Import necessary functions
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import { db } from '@/firebase/config';

export async function DELETE() {
  try {
    // Remove data from all tables
    const userDetails = await getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;
    // Remove cookies
    const userRef = doc(collection(db, 'users'), id);
    const userWishListRef = collection(db, 'userWishList');
    const userSettingsRef = collection(db, 'userSettings');
    const organizationsRef = collection(db, 'organizations');
    const organizationMembersRef = collection(db, 'organizationMembers');
    const organizationMemberInviteTokenRef = collection(
      db,
      'organizationMemberInviteToken',
    );
    const opportunitiesRef = collection(db, 'opportunities');
    const opportunityMembersRef = collection(db, 'opportunityMembers');

    // Begin batch operation
    const batch = writeBatch(db);

    // Delete user document
    batch.delete(userRef);

    // Delete documents from userWishList
    const userWishListQuery = query(userWishListRef, where('userId', '==', id));
    const userWishListSnapshot = await getDocs(userWishListQuery);
    userWishListSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Delete documents from userSettings
    const userSettingsQuery = query(userSettingsRef, where('userId', '==', id));
    const userSettingsSnapshot = await getDocs(userSettingsQuery);
    userSettingsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Delete documents from organizations
    const organizationsQuery = query(
      organizationsRef,
      where('createdBy', '==', id),
    );
    const organizationsSnapshot = await getDocs(organizationsQuery);
    const organizationIds: any[] = []; // Array to store organization IDs
    organizationsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
      console.log(doc.id);

      organizationIds.push(doc.id);
    });

    if (organizationIds.length > 0) {
      // Delete documents from organizationMembers
      const organizationMembersQuery = query(
        organizationMembersRef,
        where('organizationId', 'in', organizationIds),
      );
      const organizationMembersSnapshot = await getDocs(
        organizationMembersQuery,
      );
      organizationMembersSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Delete documents from organizationMemberInviteToken
      const organizationMemberInviteTokenQuery = query(
        organizationMemberInviteTokenRef,
        where('organizationId', 'in', organizationIds),
      );
      const organizationMemberInviteTokenSnapshot = await getDocs(
        organizationMemberInviteTokenQuery,
      );
      organizationMemberInviteTokenSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    }
    // Delete documents from opportunities
    const opportunitiesQuery = query(
      opportunitiesRef,
      where('createdBy', '==', id),
    );
    const opportunitiesSnapshot = await getDocs(opportunitiesQuery);
    opportunitiesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Delete documents from opportunityMembers
    const opportunityMembersQuery = query(
      opportunityMembersRef,
      where('userId', '==', id),
    );
    const opportunityMembersSnapshot = await getDocs(opportunityMembersQuery);
    opportunityMembersSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Commit batch operation
    await batch.commit();
    const response = responseHandler(
      200,
      true,
      null,
      'User deleted successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in deleting organization member');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in deleting User.',
    );
    return response;
  }
}
