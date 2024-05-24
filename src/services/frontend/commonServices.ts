'use client';
// import { app } from '@/firebase/config';
// import { getDownloadURL, getStorage, ref } from '@firebase/storage';
import moment from 'moment-timezone';

// export const getImageUrl = async (imageName: string) => {
//   const storage = getStorage(app);
//   const imageRef = ref(storage, imageName);

//   try {
//     const url = await getDownloadURL(imageRef);
//     console.log(url);

//     return url;
//   } catch (error) {
//     console.error('Error getting image URL:', error);
//     return null;
//   }
// };

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
