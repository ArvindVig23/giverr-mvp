import { EventList } from '@/interface/opportunity';
import { createSlice } from '@reduxjs/toolkit';

const initialState: EventList[] = [];
export const eventList = createSlice({
  name: 'eventList',
  initialState: initialState,
  reducers: {
    updateEventDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateEventDetails } = eventList.actions;
export default eventList.reducer;
