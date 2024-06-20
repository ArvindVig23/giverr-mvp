export interface userDetail {
  username?: string;
  fullName?: string;
  email: string | null;
  location?: string;
  isGoogleAuth?: boolean;
  isAppleAuth?: boolean;
  isEmailAuth?: boolean;
  status?: boolean;
}

export interface UserDetailsCookies {
  email?: string;
  id?: string;
  username?: string;
  profileUrl?: string;
  fullName?: string;
  notificationSetting?: any;
  categorySubscribe?: any;
  timeZoneSettings?: any;
  loginAsOrg: boolean;
}

export interface TimezoneOptions {
  label?: string;
  value?: String;
  offset?: number;
}
