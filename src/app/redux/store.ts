import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from './slices/userDetailSlice';
import eventListReducer from './slices/eventType';
import organizationReducer from './slices/organizationSlice';
import loaderReducer from './slices/loaderSlice';
import userOrgReducer from './slices/userOrgDetails';
import opportunityReducer from './slices/opportunitySlice';
import submitOppReducer from './slices/submitOpportunity';
export const store = configureStore({
  reducer: {
    userDetailReducer,
    eventListReducer,
    organizationReducer,
    loaderReducer,
    userOrgReducer,
    opportunityReducer,
    submitOppReducer,
  },
});
