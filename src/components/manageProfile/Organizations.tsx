import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import {
  getOrgInvitesAndMemberOf,
  updateOrgInviteStatus,
} from '@/services/frontend/organization';
import DisplayMemberItem from '../common/organization/DisplayMemberItem';
import { removeMemberApi } from '@/services/frontend/memberService';

const Organizations: React.FC = () => {
  const [refetchList, setRefetchList] = useState<boolean>(false);
  const [memberOfOrgList, setMemberOfOrgList] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const dispach = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispach(setLoader(true));
        const getList = await getOrgInvitesAndMemberOf();

        if (getList.data) {
          const approvedRecords = getList.data.filter(
            (record: any) => record.status === 'APPROVED',
          );
          const pendingRecords = getList.data.filter(
            (record: any) => record.status === 'PENDING',
          );
          setMemberOfOrgList(approvedRecords);
          setPendingRequests(pendingRecords);
        }
        dispach(setLoader(false));
      } catch (error: any) {
        dispach(setLoader(false));
        const { message } = error;
        sweetAlertToast('error', message);
      }
    })();
    // eslint-disable-next-line
  }, [refetchList]);

  const updateInviteStatus = async (status: string, token: string) => {
    try {
      dispach(setLoader(true));
      const response = await updateOrgInviteStatus(status, token);
      console.log(response, 'response');
      const { message } = response;
      sweetAlertToast('success', message, 1000);
      setRefetchList(!refetchList);
      dispach(setLoader(false));
    } catch (error: any) {
      dispach(setLoader(false));
      const { message } = error;
      sweetAlertToast('error', message);
    }
  };

  const dispatch = useDispatch();
  const leave = async (removeMemberId: string, orgId: string) => {
    try {
      dispatch(setLoader(true));
      await removeMemberApi(removeMemberId, orgId);
      sweetAlertToast('success', 'Leave successfully submitted', 1000);
      setRefetchList(!refetchList);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error;
      sweetAlertToast('error', message);
    }
  };
  return (
    <div className="w-full">
      <h3 className="text-[20px] md:text-[32px] font-medium mb-5 mt-0 leading-[36px] text-center md:text-left   border-b-[0.5px] border-[#E6E3D6] py-4 md:py-0 md:border-none">
        Organizations
      </h3>
      <div className="px-4 md:p-0">
        {memberOfOrgList.length > 0 ? (
          <>
            <p className="m-0 text-[#24181B80]">
              You are a member of the following organizations
            </p>
            {memberOfOrgList.map((orgMember) => (
              <div
                key={orgMember.id}
                className="inline-flex w-full items-center gap-4 justify-between mt-5"
              >
                <DisplayMemberItem orgMember={orgMember} />
                <button
                  onClick={() => leave(orgMember.id, orgMember.organizationId)}
                  type="button"
                  className="text-base h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-2xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
                >
                  Leave
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="flex w-full justify-center md:justify-between gap-3 items-center text-center md:text-left fit-screen">
            <div>
              <span className="text-[#24181B] text-base">
                There are no organizations to display
              </span>
              <p className="text-[#24181B80] text-base m-0">
                You are not a member of any organization{' '}
              </p>
            </div>
          </div>
        )}

        <hr className="my-[40px] md:my-[60px] border-[#E6E3D6] md:block hidden"></hr>

        {pendingRequests.length > 0 ? (
          <div className="flex w-full flex-col gap-5">
            <h4 className="w-full text-[#24181B] text-2xl font-medium">
              Pending invites
            </h4>
            <div className="w-full">
              {pendingRequests.map((pendingRequest) => (
                <div
                  key={pendingRequest.id}
                  className="flex py-5 items-center gap-3 border-b border-[#E6E3D6]"
                >
                  <DisplayMemberItem orgMember={pendingRequest} />

                  <div className="ml-auto flex gap-2 items-center">
                    <button
                      onClick={() => {
                        updateInviteStatus(
                          'REJECTED',
                          pendingRequest.tokenDetails.token,
                        );
                      }}
                      type="button"
                      className="text-base  w-full h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-2xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
                    >
                      Ignore
                    </button>
                    <button
                      onClick={() => {
                        updateInviteStatus(
                          'APPROVED',
                          pendingRequest.tokenDetails.token,
                        );
                      }}
                      type="button"
                      className="text-base  w-full h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Organizations;
