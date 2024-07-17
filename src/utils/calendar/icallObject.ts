import { combineDateAndTime } from '@/services/backend/commonServices';
import { ICalCalendar, ICalEventData } from 'ical-generator';
import moment from 'moment-timezone';

interface EventDetails {
  name: string;
  startDate: string;
  startTime: string;
  description: string;
  summary: string;
  timeZoneSettings?: any;
  maxHour: string;
}

export function getIcalObjectInstance({
  startDate,
  startTime,
  description,
  summary,
  timeZoneSettings,
  maxHour,
}: EventDetails): any {
  try {
    const cal = new ICalCalendar();

    const timezone = timeZoneSettings?.selectedTimeZone || moment.tz.guess();
    const dateTime: any = combineDateAndTime(startDate, startTime, timezone);
    console.log(dateTime, 'time');

    let endDateTime;
    const dateTimeMomentObject = moment.tz(
      combineDateAndTime(startDate, startTime, timezone),
      timezone,
    );
    if (maxHour) {
      endDateTime = dateTimeMomentObject.clone().add(maxHour, 'hours');
    } else {
      endDateTime = dateTimeMomentObject.clone().add(1, 'hour');
    }
    console.log(dateTime, 'dateTime');

    const eventData: ICalEventData = {
      start: dateTime,
      end: endDateTime.toDate(),
      description: description,
      summary: summary,
      // timezone: timezone,
    };

    cal.createEvent(eventData);

    return cal;
  } catch (error) {
    console.error('Error in iCal generation:', error);
  }
}
