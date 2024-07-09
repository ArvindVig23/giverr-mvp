export interface OrgDetails {
  id?: string;
  createdBy?: string;
  status?: boolean;
  avatarLink?: string;
  name?: string;
  username?: string;
  website?: string;
  createdAt?: string; // as we are converting the date to string
  updatedAt?: string; // as we are converting the date to string
  members?: any[];
}

// org type options
export type OptionType = {
  value: string;
  label: string;
};

//
export interface MyorganizationProps {
  showModal: boolean;
  setShowModal: Function;
  inviteMembersModal: boolean;
  setInviteMembersModal: Function;
}

export interface MemberProps {
  inviteMembersModal: boolean;
  setInviteMembersModal: Function;
}
