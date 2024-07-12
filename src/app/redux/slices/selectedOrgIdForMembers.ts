import { createSlice } from '@reduxjs/toolkit';

const initialState: string = '';
export const selectedOrgIdForMembers = createSlice({
  name: 'selectedOrgIdForMembers',
  initialState: initialState,
  reducers: {
    updateSelectedOrgIdForMembers: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateSelectedOrgIdForMembers } =
  selectedOrgIdForMembers.actions;
export default selectedOrgIdForMembers.reducer;
