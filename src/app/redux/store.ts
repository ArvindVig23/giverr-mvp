import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from './slices/userDetailSlice';
export const store = configureStore({
  reducer: { userDetailReducer },
});
