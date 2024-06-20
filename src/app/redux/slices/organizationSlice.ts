import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  organizations: [],
  totalRecords: 0,
  page: 1,
  limit: 20,
};
export const organizationList = createSlice({
  name: 'eventList',
  initialState: initialState,
  reducers: {
    updateOrganizationList: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateOrganizationList } = organizationList.actions;
export default organizationList.reducer;
