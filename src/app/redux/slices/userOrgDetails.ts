import { OrgDetails } from '@/interface/organization';
import { defaultUserOrgDetail } from '@/utils/initialStates/userInitialStates';
import { createSlice } from '@reduxjs/toolkit';

const initialState: OrgDetails = defaultUserOrgDetail;
export const userOrgDetail = createSlice({
  name: 'eventList',
  initialState: initialState,
  reducers: {
    updateOrgDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateOrgDetails } = userOrgDetail.actions;
export default userOrgDetail.reducer;
