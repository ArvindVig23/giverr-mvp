import { userDetail } from '@/interface/user';
import { createSlice } from '@reduxjs/toolkit';
const initialState: userDetail = {
  username: '',
  fullName: '',
  email: '',
  location: '',
  isGoogleAuth: false,
  isAppleAuth: false,
  isEmailAuth: false,
  status: true,
};
export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateUserDetails } = user.actions;
export default user.reducer;
