import callApi from './callApiService';

export const createSubscribeCat = async (data: any) => {
  try {
    const response = await callApi('/notification-settings', 'post', data);
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const deleteSubscribeCat = async (id: string) => {
  try {
    const response = await callApi(
      `/notification-settings?opportunityTypeId=${id}`,
      'delete',
    );
    return response.data;
  } catch (error: any) {
    throw error.data;
  }
};
