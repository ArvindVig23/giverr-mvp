export interface EventFormModalProps {
  showModal?: boolean;
  setShowModal?: any;
  thumbnailFile?: any; // You can replace `any` with the appropriate type if known
  setThumbnailFile?: any;
  fileError?: string;
  setFileError?: any;
  thumbnailUrl?: string;
  setThumbnailUrl?: any;
  handleFormSubmit?: any;
}

export interface Dropdown {
  label: string;
  value: string;
}

export interface EventList {
  id: 'string';
  name: 'string';
}

export interface CurrentPage {
  currrentPage?: number;
  setCurrentPage?: any;
}

export interface OpportunityDetail {
  opportunityDetail?: any;
  setOpportunityDetail?: any;
}

export interface SimilarInterest {
  similarInterest?: any;
  setSimilarInterest?: any;
}

export interface OpportunityCardProps {
  opportunity: any;
  addRemoveWishlist?: any;
}

export interface OpportunityDetails {
  activities: string;
  createdAt: string;
  createdBy: string;
  description: string;
  eventDate: string;
  frequency: string;
  id: string;
  imageLink: string;
  isWishlist: boolean;
  location: string;
  lowercaseName: string;
  name: string;
  opportunityType: string;
  organization: string | null;
  organizationId: string;
  registrationType: string;
  registrationWebsiteLink: string;
  status: string;
  updatedAt: string;
  volunteerRequirements: string;
}

export interface CreateOppDetails {
  id?: string;
  imageLink?: string;
  createdBy: string;
  name: string;
  opportunityType: string;
  description: string;
  activities: string;
  volunteerRequirements: string;
  thumbnailFile?: File | null;
  virtualLocationLink: '';
  physicalLocations: Location[];
  registrationType: string;
  registrationWebsiteLink: string;
  spots: string;
  selectedDate: string | null;
  type: string;
  minHour: string;
  maxHour: string;
  startTime: string;
  endTime: string;
  endDate: string;
  maxAccessStep?: number;
  locationType: string;
  organizationId: string;
  frequency: string;
  commitment: string;
  commitmentId?: string;
}

export interface Location {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  id?: string;
  locationName: string;
  lat: null | number;
  long: null | number;
}
export interface CreateEventStep2Form {
  physicalLocations: Location[];
  locationType: string;
  virtualLocationLink: string;
}

export interface SearchParam {
  key: string;
  value: string;
}

export interface OppIdProps {
  oppId: string;
}
