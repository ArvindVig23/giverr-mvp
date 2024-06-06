import Handlebars from 'handlebars';
import { getFormattedLocalTime } from '@/services/frontend/commonServices';

export function compileEmailTemplate(
  templateString: string,
  data: any,
): string {
  try {
    const template = Handlebars.compile(templateString);
    return template(data);
  } catch (error) {
    console.log(error);
    return ''; // Return an empty string in case of an error
  }
}

Handlebars.registerHelper('formatDate', function (eventDate) {
  return getFormattedLocalTime(eventDate);
});
