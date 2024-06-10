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

export const removeMemberApi = async (memberId: string, orgId: string) => {
  try {
    const response: any = await callApi(
      `/member?memberId=${memberId}&orgId=${orgId}`,
      'delete',
    );
    return response;
  } catch (error: any) {
    console.log(error, 'Error in removing member');
    throw error.data;
  }
};

export const sendInvite = async (data: any) => {
  try {
    const response: any = await callApi(`/invite-members`, 'post', data);
    return response;
  } catch (error: any) {
    console.log(error, 'Error in removing member');
    throw error.data;
  }
};
