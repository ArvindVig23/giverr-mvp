import { CreateOppDetails } from '@/interface/opportunity';
import { submitEventState } from '@/utils/initialStates/submitOppInitalState';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CreateOppDetails = submitEventState;

export const submitOpp = createSlice({
  name: 'SubmitOpp',
  initialState: initialState,
  reducers: {
    updateSubmitOppDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateSubmitOppDetails } = submitOpp.actions;
export default submitOpp.reducer;
