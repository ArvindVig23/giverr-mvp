import { createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;
export const loader = createSlice({
  name: 'eventList',
  initialState: initialState,
  reducers: {
    setLoader: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoader } = loader.actions;
export default loader.reducer;
