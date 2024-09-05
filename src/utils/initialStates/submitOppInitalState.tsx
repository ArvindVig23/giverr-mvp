import { CreateOppDetails } from '@/interface/opportunity';

export const submitEventState: CreateOppDetails = {
  imageLink: '',
  createdBy: '',
  name: '',
  opportunityType: '',
  description: '',
  activities: '',
  volunteerRequirements: '',
  thumbnailFile: null,
  virtualLocationLink: '',
  physicalLocations: [
    {
      address: '',
      city: '',
      province: '',
      postalCode: '',
      locationName: '',
      lat: null,
      long: null,
    },
  ],
  registrationType: 'GIVER_PLATFORM',
  registrationWebsiteLink: '',
  spots: '',
  selectedDate: '',
  type: '',
  minHour: '',
  maxHour: '',
  startTime: '',
  endTime: '',
  endDate: '',
  maxAccessStep: 1,
  locationType: 'PHYSICAL',
  organizationId: '',
  frequency: '',
  commitment: '',
};
