import { SearchParam } from '@/interface/opportunity';
import { OrgDetails } from '@/interface/organization';
import { commitmentOptions } from '@/utils/staticDropdown/dropdownOptions';
import moment from 'moment-timezone';
export const getFormattedLocalTime = (utcTimeString: string, cookies: any) => {
  if (Object.keys(cookies).length > 0) {
    const timeZoneSettings = cookies.userDetails.timeZoneSettings;
    const dateFormat = timeZoneSettings.isDayMonthYearDateFormat
      ? 'DD MMMM, YYYY'
      : 'MMMM DD, YYYY';
    const timeFormat = timeZoneSettings.istwentyFourHourTimeFormat
      ? 'HH:mm'
      : 'h:mm A';
    const selectedTimeZone = timeZoneSettings.selectedTimeZone;

    // Convert UTC time string to moment object
    const utcTime = moment.utc(utcTimeString);
    let time = null;
    if (selectedTimeZone) {
      time = moment(utcTime)
        .tz(selectedTimeZone)
        .format(`${dateFormat} [at] ${timeFormat}`);
      return time;
    } else {
      const userLocalZone = moment.tz.guess();
      const utcTime = moment.utc(utcTimeString);
      const userLocalTime = utcTime.clone().tz(userLocalZone);
      const formattedLocalTime = userLocalTime.format(
        `${dateFormat} [at] ${timeFormat}`,
      );
      return formattedLocalTime;
    }
  } else {
    const userLocalZone = moment.tz.guess();
    const utcTime = moment.utc(utcTimeString);
    const userLocalTime = utcTime.clone().tz(userLocalZone);
    const formattedLocalTime = userLocalTime.format('MMM D, YYYY [at] HH:mm');

    return formattedLocalTime;
  }
};

export const encodeUrl = (str: string) => {
  if (!str) {
    return '';
  }
  const newString = str.replace(/\//g, '%2F');
  return newString;
};

// debounce
export const debounce = (func: any, delay = 5000) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

//  create the option
export const createValueForDropdown = (timeZone: string, value: number) => {
  if (!timeZone) {
    return null;
  }
  return { label: timeZone, value: timeZone, offset: value };
};

// export update searchparams for create event
export const updateSearchParams = (
  searchParams: URLSearchParams,
  pathname: string,
  router: any,
  params: SearchParam[],
) => {
  const current = new URLSearchParams(searchParams.toString());
  current.set('submit-event', 'true');

  params.forEach((param) => {
    current.set(param.key, param.value);
  });

  const search = current.toString();
  const query = search ? `?${search}` : '';
  router.push(`${pathname}${query}`);
};

//  for the opportunity detail page date & time
export const convertToLocalDateWithDay = (
  utcTimeString: string,
  cookies: any,
) => {
  if (Object.keys(cookies).length > 0) {
    const timeZoneSettings = cookies.userDetails.timeZoneSettings;
    const dateFormat = timeZoneSettings.isDayMonthYearDateFormat
      ? 'DD MMMM, YYYY'
      : 'MMMM DD, YYYY';
    const selectedTimeZone = timeZoneSettings.selectedTimeZone;

    // Convert UTC time string to moment object
    const utcTime = moment.utc(utcTimeString);
    let time = null;
    if (selectedTimeZone) {
      time = moment(utcTime).tz(selectedTimeZone).format(`dddd, ${dateFormat}`);
      return time;
    } else {
      const userLocalZone = moment.tz.guess();
      const utcTime = moment.utc(utcTimeString);
      const userLocalTime = utcTime.clone().tz(userLocalZone);
      const formattedLocalTime = userLocalTime.format(`dddd, ${dateFormat}`);
      return formattedLocalTime;
    }
  } else {
    const userLocalZone = moment.tz.guess();
    const utcTime = moment.utc(utcTimeString);
    const userLocalTime = utcTime.clone().tz(userLocalZone);
    const formattedLocalTime = userLocalTime.format('dddd, MMM D, YYYY');

    return formattedLocalTime;
  }
};

// get the local time range for start time & end time  from the utc
export const getLocalTimeRangeForDetail = (
  utcTimeString: string,
  cookies: any,
  needTimezone: boolean,
) => {
  if (Object.keys(cookies).length > 0) {
    const timeZoneSettings = cookies.userDetails.timeZoneSettings;
    const timeFormat = timeZoneSettings.istwentyFourHourTimeFormat
      ? `HH:mm ${needTimezone ? 'z' : ''}`
      : `h:mm A ${needTimezone ? 'z' : ''}`;
    const selectedTimeZone = timeZoneSettings.selectedTimeZone;

    // Convert UTC time string to moment object
    const utcTime = moment.utc(utcTimeString);
    let time = null;
    if (selectedTimeZone) {
      time = moment(utcTime).tz(selectedTimeZone).format(`${timeFormat}`);
      return time;
    } else {
      const userLocalZone = moment.tz.guess();
      const utcTime = moment.utc(utcTimeString);
      const userLocalTime = utcTime.clone().tz(userLocalZone);
      const formattedLocalTime = userLocalTime.format(`${timeFormat}`);
      return formattedLocalTime;
    }
  } else {
    const userLocalZone = moment.tz.guess();
    const utcTime = moment.utc(utcTimeString);
    const userLocalTime = utcTime.clone().tz(userLocalZone);
    const formattedLocalTime = userLocalTime.format(
      `HH:mm ${needTimezone ? 'z' : ''}`,
    );

    return formattedLocalTime;
  }
};

// find the commitment label
export const findCommitment = (value: string) => {
  const option = commitmentOptions.find((option) => option.value === value);
  return option ? option.label : null;
};

// random color
export const pickColor = (): string => {
  let previousColor: string | null = null;
  const colors = [
    'bg-[#FF97B5]',
    'bg-[#0B9EDE]',
    'bg-[#0B9EDE]',
    'bg-[#FF532D]',
    'bg-[#FFC430]',
    'bg-[#7FE548]',
  ];

  let availableColors = colors.filter((color) => color !== previousColor);

  if (availableColors.length === 0) {
    availableColors = [...colors];
  }

  const randomIndex = Math.floor(Math.random() * availableColors.length);
  const selectedColor = availableColors[randomIndex];

  previousColor = selectedColor;
  return selectedColor;
};

//calculate end date on the basis of commitment
export const calculateEndDate = (
  selectedDate: string,
  commitment: string,
): moment.Moment | '' => {
  const startDate = moment(selectedDate);
  const date = startDate.clone();
  switch (commitment) {
    case '3months':
      return date.add(3, 'months');
    case '6months':
      return date.add(6, 'months');
    case '12months':
      return date.add(1, 'year');
    case '24months':
      return date.add(2, 'years');
    default:
      return '';
  }
};

export const currentUtcDateFrontend = moment().tz('UTC').toDate().toISOString();

//  conver time & date format for the event card
export const eventCardDateTime = (
  utcDateString: string,
  utcStartTimeString: string,
  cookies: any,
) => {
  if (Object.keys(cookies).length > 0) {
    const timeZoneSettings = cookies.userDetails.timeZoneSettings;
    const dateFormat = timeZoneSettings.isDayMonthYearDateFormat
      ? 'DD MMMM, YYYY'
      : 'MMMM DD, YYYY';
    const timeFormat = timeZoneSettings.istwentyFourHourTimeFormat
      ? 'HH:mm'
      : 'h:mm A';
    const selectedTimeZone = timeZoneSettings.selectedTimeZone;

    // Convert UTC time string to moment object
    const utcDate = moment.utc(utcDateString);

    const utcStartTime = utcStartTimeString
      ? moment.utc(utcStartTimeString)
      : moment.utc(utcDateString);
    let date = null;
    let startTime = null;
    if (selectedTimeZone) {
      date = moment(utcDate).tz(selectedTimeZone).format(`${dateFormat}`);
      startTime = moment(utcStartTime)
        .tz(selectedTimeZone)
        .format(`${timeFormat}`);
      return `${date} at ${startTime}`;
    } else {
      const userLocalZone = moment.tz.guess();
      const utcDate = moment.utc(utcDateString);
      const startTime = utcStartTimeString
        ? moment.utc(utcStartTimeString)
        : moment.utc(utcDateString);

      const userLocalDate = utcDate
        .clone()
        .tz(userLocalZone)
        .format(`${dateFormat}`);
      const userLocalTime = startTime
        .clone()
        .tz(userLocalZone)
        .format(`${timeFormat}`);

      return `${userLocalDate} at ${userLocalTime}`;
    }
  } else {
    const userLocalZone = moment.tz.guess();
    const utcDate = moment.utc(utcDateString);
    const startTime = moment.utc(utcStartTimeString);
    const userLocalDate = utcDate
      .clone()
      .tz(userLocalZone)
      .format(`MMM D, YYYY`);
    const userLocalTime = startTime.clone().tz(userLocalZone).format(`HH:mm`);

    return `${userLocalDate} at ${userLocalTime}`;
  }
};

// Common server that will return the org details if user logged in with the organization

export const getLoggedInOrgFromCookies = (
  orgIdFromCookies: string,
  userOrgList: OrgDetails[],
) => {
  if (orgIdFromCookies) {
    const orgDetails = userOrgList.find(
      (org: any) => org.id === orgIdFromCookies,
    );

    return orgDetails;
  } else {
    return null;
  }
};

//  find the index of the organizations from the global state
export const getTheIndexOfOrg = (id: string, userOrgList: OrgDetails[]) => {
  const index = userOrgList.findIndex((org: any) => org.id === id);
  return index;
};

export const calculateCenter = (locations: any) => {
  let totalLat = 0;
  let totalLng = 0;
  let validLocationCount = 0;

  // Check if locations have valid lat and lng properties
  locations.forEach((location: any) => {
    if (location.lat && location.long) {
      totalLat += location.lat;
      totalLng += location.long;
      validLocationCount++;
    }
  });

  // Handle empty list of valid locations
  if (validLocationCount === 0) {
    return { lat: 45.52159, lng: -73.5619 };
  }

  // Calculate average latitude and longitude
  const centerLat = totalLat / validLocationCount;
  const centerLng = totalLng / validLocationCount;

  return { lat: centerLat, lng: centerLng };
};

//  set lat long to the search params
// export update searchparams for create event
export const addLatLngParams = (
  searchParams: URLSearchParams,
  pathname: string,
  router: any,
  params: SearchParam[],
) => {
  const current = new URLSearchParams(searchParams.toString());
  params.forEach((param) => {
    current.set(param.key, param.value);
  });

  const search = current.toString();
  const query = search ? `?${search}` : '';
  router.push(`${pathname}${query}`);
};

export const replaceFromJson = (
  jsonData: any,
  fieldToReplaced: any,
  replacedWith: any,
) => {
  const processedData = JSON.stringify(jsonData).replace(
    fieldToReplaced,
    replacedWith,
  );
  const finalPrivacyPolicyData = JSON.parse(processedData);
  return finalPrivacyPolicyData;
};
