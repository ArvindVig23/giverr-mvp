import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  getOpportunityTypeById,
  getOrgDetailsById,
} from '@/services/backend/opportunityServices';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id }: any = params;
    const opportunitiesRef = collection(db, 'opportunities');
    const docRef = doc(opportunitiesRef, id);
    const docSnap = await getDoc(docRef);
    const opportunityData: any = docSnap.data();
    if (!opportunityData) {
      const response = responseHandler(
        404,
        false,
        null,
        'Opportunity not found',
      );
      return response;
    }
    const foundOppId = docSnap.id;

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

    //  get the similar interests
    const getSilimarTypeQuery = query(
      opportunitiesRef,
      where('opportunityType', '==', opportunityData.opportunityType),
      where('status', '==', 'APPROVED'),
      limit(10),
    );
    const getSimilarInterests = await getDocs(getSilimarTypeQuery);

    let opportunities: any[] = [];
    if (getSimilarInterests.size > 0) {
      let opportunitiesPromises = getSimilarInterests.docs.map(async (docs) => {
        const opportunityData = docs.data();

        if (docs.id !== foundOppId) {
          const organizationId = opportunityData.organizationId;
          if (organizationId) {
            const organizationDocRef = doc(
              collection(db, 'organizations'),
              organizationId,
            );

            const organizationSnapshot = await getDoc(organizationDocRef);

            if (organizationSnapshot) {
              const orgData = organizationSnapshot.data();
              opportunityData.organization = orgData;
            } else {
              opportunityData.organization = null;
            }
          } else {
            opportunityData.organization = null;
          }

          return opportunityData;
        }
      });
      opportunities = await Promise.all(opportunitiesPromises);
    }
    const filteredOpportunities = opportunities.filter((opportunity) =>
      Boolean(opportunity),
    );

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
