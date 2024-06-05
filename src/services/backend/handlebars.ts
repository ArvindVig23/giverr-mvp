import fs from 'fs';
import Handlebars from 'handlebars';
import { getFormattedLocalTime } from '@/services/frontend/commonServices';

export function compileEmailTemplate(templatePath: string, data: any): string {
  try {
    const templateFile = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateFile);
    return template(data);
  } catch (error) {
    console.log(error);
    return ''; // Return an empty string in case of an error
  }
}

Handlebars.registerHelper('formatDate', function (eventDate) {
  return getFormattedLocalTime(eventDate);
});
