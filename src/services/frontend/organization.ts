import { OrgDetails } from '@/interface/organization';
import callApi from './callApiService';

export const createOrg = async (data: OrgDetails) => {
  try {
    const response: any = await callApi(`/organization`, 'post', data);
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const getOrgDetail = async () => {
  try {
    const response: any = await callApi(`/organization`);
    return response.data;
  } catch (error: any) {
    throw error.data;
  }
};
