import { OpportunityDetails } from '@/interface/opportunity';
import { createSlice } from '@reduxjs/toolkit';

const initialState: OpportunityDetails = {
  activities: '',
  createdAt: '',
  createdBy: '',
  description: '',
  eventDate: '',
  frequency: '',
  id: '',
  imageLink: '',
  isWishlist: false,
  location: '',
  lowercaseName: '',
  name: '',
  opportunityType: '',
  organization: '',
  organizationId: '',
  registrationType: '',
  registrationWebsiteLink: '',
  status: '',
  updatedAt: '',
  volunteerRequirements: '',
};

export const opportunity = createSlice({
  name: 'OpportunityDetails',
  initialState: initialState,
  reducers: {
    updateOpportunityList: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateOpportunityList } = opportunity.actions;
export default opportunity.reducer;
