import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import {
  addToWishlist,
  getWishlistWithUser,
  removeFromWishlist,
} from '@/services/backend/opportunityServices';
import { oppIdSchema } from '@/utils/joiSchema';
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
