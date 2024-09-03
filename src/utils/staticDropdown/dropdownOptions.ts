import { Dropdown } from '@/interface/opportunity';

export const eventFrequency: Dropdown[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

export const commitmentOptions: Dropdown[] = [
  { label: '3 months', value: '3months' },
  { label: '6 months', value: '6months' },
  { label: '12 months', value: '12months' },
  { label: '24 months', value: '24months' },
];

export const provincesOptions: Dropdown[] = [
  { label: 'Alberta', value: 'alberta' },
  { label: 'British Columbia', value: 'british_columbia' },
  { label: 'Manitoba', value: 'manitoba' },
  { label: 'New Brunswick', value: 'new_brunswick' },
  { label: 'Newfoundland and Labrador', value: 'newfoundland_and_labrador' },
  { label: 'Northwest Territories', value: 'northwest_territories' },
  { label: 'Nova Scotia', value: 'nova_scotia' },
  { label: 'Nunavut', value: 'nunavut' },
  { label: 'Ontario', value: 'ontario' },
  { label: 'Prince Edward Island', value: 'prince_edward_island' },
  { label: 'Quebec', value: 'quebec' },
  { label: 'Saskatchewan', value: 'saskatchewan' },
  { label: 'Yukon', value: 'yukon' },
];
