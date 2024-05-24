import { collection, getDocs, query, where } from 'firebase/firestore';
import responseHandler from '../../../lib/responseHandler';
import { db } from '@/firebase/config';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const userDetailCookie: any = cookieStore.get('userDetails');
    const convertString = JSON.parse(userDetailCookie.value);

    const { id } = convertString;

    const organizationsRef = collection(db, 'organizations');
    const queryWhereCondition = query(
      organizationsRef,
      where('createdBy', '==', id),
    );
    const querySnapshot = await getDocs(queryWhereCondition);

    const organizations: any = [];
    querySnapshot.forEach((doc) => {
      const organizationData = doc.data();
      organizationData.id = doc.id;
      organizations.push(organizationData);
    });

    const response = responseHandler(
      200,
      true,
      organizations,
      'Organizations fetched successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'error');

    const response = responseHandler(
      500,
      false,
      null,
      'Error while fetching organization',
    );
    return response;
  }
}
