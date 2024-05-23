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
