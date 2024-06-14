import Handlebars from 'handlebars';

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
