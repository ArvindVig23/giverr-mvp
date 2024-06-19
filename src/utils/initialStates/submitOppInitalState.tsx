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
  physicalLocations: [{ address: '', city: '', province: '', postalCode: '' }],
  registrationType: '1',
  registrationWebsiteLink: '',
  spots: 0,
  selectedDate: '',
};
