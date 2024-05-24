import { NextRequest } from 'next/server';
import responseHandler from '@/lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { eventValidationSchema } from '@/utils/joiSchema';
import { createOpportunity } from '@/services/backend/opportunityServices';

/**
 * @swagger
 * /api/opportunity:
 *   post:
 *     summary: Create a new opportunity
 *     description: Endpoint to create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event
 *               createdBy:
 *                 type: string
 *                 description: The creator of the event
 *               description:
 *                 type: string
 *                 description: The description of the event
 *               eventDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date of the event
 *               eventTime:
 *                 type: string
 *                 format: date-time
 *                 description: The time of the event
 *               frequency:
 *                 type: string
 *                 description: The frequency of the event
 *               opportuntyType:
 *                 type: string
 *                 description: The type of opportunity
 *               organizationId:
 *                 type: string
 *                 description: The ID of the organization
 *               imageLink:
 *                 type: string
 *                 description: The link to the event image
 *               activities:
 *                 type: string
 *                 description: Activities related to the event
 *               registrationType:
 *                 type: string
 *                 description: Type of registration for the event
 *               registrationWebsiteLink:
 *                 type: string
 *                 description: The link for event registration
 *               location:
 *                 type: string
 *                 description: The location of the event
 *               volunteerRequirements:
 *                 type: string
 *                 description: Requirements for volunteers at the event
 *     responses:
 *       '201':
 *         description: Opportunity created Successfully.
 *       '403':
 *         description: Opportunity already exists.
 *       '500':
 *         description: Error while creating opportunity.
 */

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    const {
      name,
      createdBy,
      description,
      eventDate,
      frequency,
      opportuntyType,
      organizationId,
      imageLink,
    } = reqBody;
    const { error } = eventValidationSchema.validate({
      name,
      description,
      eventDate,
      frequency,
      opportuntyType,
      organizationId,
      imageLink,
    });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    const opportunitiesRef = collection(db, 'opportunities');
    const q = query(
      opportunitiesRef,
      where('lowercaseName', '==', name.toLowerCase().trim()),
      where('createdBy', '==', createdBy),
    );

    const existedOpportunity = await getDocs(q);
    if (!existedOpportunity.empty) {
      const response = responseHandler(
        403,
        false,
        null,
        'Opportunity already exists.',
      );
      return response;
    }
    const response = await createOpportunity(reqBody);
    return response;
  } catch (error) {
    console.log(error, 'error');

    const response = responseHandler(
      500,
      false,
      null,
      'Error while creating opportunity',
    );
    return response;
  }
}
