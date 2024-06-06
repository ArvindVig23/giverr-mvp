import callApi from './callApiService';

export const getMembersList = async (keyword: String) => {
  try {
    const response: any = await callApi(`/get-members?keyword=${keyword}`);
    return response.data;
  } catch (error: any) {
    console.log(error, 'Error in getting members');
    throw error.data;
  }
};
