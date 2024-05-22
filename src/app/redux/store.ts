import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from './slices/userDetailSlice';
import eventListReducer from './slices/eventType';
import organizationReducer from './slices/organizationSlice';
export const store = configureStore({
  reducer: { userDetailReducer, eventListReducer, organizationReducer },
});
