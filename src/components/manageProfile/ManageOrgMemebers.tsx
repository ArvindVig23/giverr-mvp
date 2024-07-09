import React from 'react';
import Members from './Members';
import { MemberProps } from '@/interface/organization';

const ManageOrgMemebers: React.FC<MemberProps> = ({
  inviteMembersModal,
  setInviteMembersModal,
}) => {
  return (
    <div>
      <Members
        inviteMembersModal={inviteMembersModal}
        setInviteMembersModal={setInviteMembersModal}
      />
    </div>
  );
};

export default ManageOrgMemebers;
