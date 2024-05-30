import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import {
  addToWishlist,
  getOrgDetailsById,
  getWishlistWithUser,
  removeFromWishlist,
} from '@/services/backend/opportunityServices';
import { oppIdSchema } from '@/utils/joiSchema';
import {
  collection,
  getDocs,
  orderBy,
  query,
  startAfter,
  where,
  limit as firestoreLimit,
  doc,
  getDoc,
} from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { oppId } = reqBody;
    //  oppId validations
    const { error } = oppIdSchema.validate({ oppId });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    // logged in user
    const userDetails = getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;
    // check if user already have this in wishlist
    const wishlist = await getWishlistWithUser(oppId, id);
    if (wishlist) {
      const removeResponse = removeFromWishlist(oppId, id);
      return removeResponse;
    }
    const addInWishlist = await addToWishlist(oppId, id);
    return addInWishlist;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error while adding opportunity to wishlist',
    );
    return response;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = +(searchParams.get('page') || '1');
    const limit = +(searchParams.get('limit') || '20');
    const userDetailCookie = getUserDetailsCookie();
    const convertString = JSON.parse(userDetailCookie.value);
    const { id } = convertString;
    let wishlistQuery = query(
      collection(db, 'userWishList'),
      orderBy('createdAt', 'desc'),
      where('userId', '==', id),
    );
    const totalSnapshot = await getDocs(wishlistQuery);
    const totalRecords = totalSnapshot.size;

    let wishlistSnapshot;
    if (page === 1) {
      wishlistSnapshot = await getDocs(
        query(wishlistQuery, firestoreLimit(limit)),
      );
    } else {
      const previousPageSnapshot = await getDocs(
        query(wishlistQuery, firestoreLimit((page - 1) * limit)),
      );
      const lastVisible =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

      wishlistSnapshot = await getDocs(
        query(wishlistQuery, startAfter(lastVisible), firestoreLimit(limit)),
      );
    }

    const opportunitiesPromises = wishlistSnapshot.docs.map(async (docs) => {
      const wishlistData = docs.data();
      const oppId = wishlistData.opportunityId;
      // get opportunity
      const opportunitiesRef = collection(db, 'opportunities');
      const docRef = doc(opportunitiesRef, oppId);
      const docSnap = await getDoc(docRef);
      const opportunityData: any = docSnap.data();
      if (opportunityData) {
        opportunityData.id = oppId;
        opportunityData.isWishlist = true;
        if (opportunityData.organizationId) {
          const orgDetails = await getOrgDetailsById(
            opportunityData.organizationId,
          );
          opportunityData.organizationDetails = orgDetails;
        }
      }
      return opportunityData;
    });
    const opportunities = await Promise.all(opportunitiesPromises);
    const response = responseHandler(
      200,
      true,
      { opportunities, totalRecords, page, limit },
      'Wishlist fetched Successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'error in fetching the wishlist');

    const response = responseHandler(
      500,
      false,
      null,
      'Error in fetching the wishlist',
    );
    return response;
  }
}
