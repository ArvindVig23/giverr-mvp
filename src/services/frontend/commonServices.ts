import moment from 'moment-timezone';
export const getFormattedLocalTime = (utcTimeString: string, cookies: any) => {
  if (Object.keys(cookies).length > 0) {
    console.log(cookies.userDetails, 'cookies.userDetails');
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
  step: string,
) => {
  const current = new URLSearchParams(searchParams.toString());
  current.set('submit-event', 'true');
  current.set('step', step);
  const search = current.toString();
  const query = search ? `?${search}` : '';
  router.push(`${pathname}${query}`);
};
