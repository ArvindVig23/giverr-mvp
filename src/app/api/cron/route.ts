import responseHandler from '@/lib/responseHandler';

export async function GET() {
  try {
    console.log('Inside the cron job to send the email');
    const response = responseHandler(200, false, null, 'Cron run successfully');
    return response;
  } catch (error) {
    console.log(error, 'Error in running cron');

    const response = responseHandler(500, false, null, 'Error in running cron');
    return response;
  }
}
