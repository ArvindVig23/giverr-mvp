import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { deleteInviteUser } from '@/services/backend/organization';
import { orgIdAndMemberSchema } from '@/utils/joiSchema';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId: any = searchParams.get('orgId');
    const memberId: any = searchParams.get('memberId');
    const { error } = orgIdAndMemberSchema.validate({ orgId, memberId });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    // get org member details
    const organizationRef = collection(db, 'organizationMembers');
    const orgQuery = query(
      organizationRef,
      where('organizationId', '==', orgId),
    );
    const orgMemberSnapshot = await getDocs(orgQuery);

    let orgMemberDoc;
    orgMemberSnapshot.forEach((doc) => {
      if (doc.id === memberId) {
        orgMemberDoc = doc.ref;
      }
    });

    if (!orgMemberDoc) {
      const response = responseHandler(
        404,
        false,
        null,
        'Organization member does not exist',
      );
      return response;
    }

    // Delete the org member document
    await deleteDoc(orgMemberDoc);
    //  delete the associated records for token as well
    await deleteInviteUser(orgId, memberId);
    const response = responseHandler(
      200,
      true,
      null,
      'Member deleted successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in deleting organization member');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in deleting organizationMember.',
    );
    return response;
  }
}
