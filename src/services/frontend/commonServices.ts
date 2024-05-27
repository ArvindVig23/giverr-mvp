import moment from 'moment-timezone';

export const getFormattedLocalTime = (utcTimeString: string) => {
  const userLocalZone = moment.tz.guess();
  const utcTime = moment.utc(utcTimeString);
  const userLocalTime = utcTime.clone().tz(userLocalZone);
  const formattedLocalTime = userLocalTime.format('MMM D, YYYY [at] HH:mm');

  return formattedLocalTime;
};

export const encodeUrl = (str: string) => {
  if (!str) {
    return '';
  }
  const newString = str.replace(/\//g, '%2F');
  return newString;
};
