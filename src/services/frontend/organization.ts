import { OrgDetails } from '@/interface/organization';
import callApi from './callApiService';
import { updateOrganizationList } from '@/app/redux/slices/organizationSlice';

export const createOrg = async (data: OrgDetails) => {
  try {
    const response: any = await callApi(`/organization`, 'post', data);
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const getOrganizationList = async (
  dispatch: any,
  currentPage: number,
  searchText: string,
) => {
  try {
    const orgsList = await callApi(
      `/organization/get-all?page=${currentPage}&searchText=${searchText}`,
      'get',
    );
    dispatch(updateOrganizationList(orgsList.data));
    return orgsList;
  } catch (error) {
    console.log(error, 'error in getting the organization list');
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

export const updateOrg = async (formData: OrgDetails) => {
  try {
    const response: any = await callApi(`/organization`, 'put', formData);
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const deleteOrg = async (id: string) => {
  try {
    const response: any = await callApi(`/organization?orgId=${id}`, 'delete');
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

//  get the list of org members of and pending invites

export const getOrgInvitesAndMemberOf = async () => {
  try {
    const response: any = await callApi(`/organization-invites`);
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const updateOrgInviteStatus = async (status: string, token: string) => {
  try {
    const response: any = await callApi(
      `/org-invite-update?status=${status}&token=${token}`,
    );
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const switchToOrganisation = async (loginAsOrg: boolean) => {
  try {
    const response: any = await callApi(
      `/switch-organization?loginAsOrg=${loginAsOrg}`,
    );
    return response;
  } catch (error: any) {
    throw error.data;
  }
};
