import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from './slices/userDetailSlice';
import eventListReducer from './slices/eventType';
export const store = configureStore({
  reducer: { userDetailReducer, eventListReducer },
});
