import { OrgDetails } from '@/interface/organization';
import { userDetail } from '@/interface/user';

export const resetGlobalState: userDetail = {
  username: '',
  fullName: '',
  email: '',
  location: '',
  isGoogleAuth: false,
  isAppleAuth: false,
  isEmailAuth: false,
  status: true,
};

export const defaultUserOrgDetail: OrgDetails[] = [];
