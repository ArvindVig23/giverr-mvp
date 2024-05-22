import { createSlice } from '@reduxjs/toolkit';

const initialState: any = [];
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
