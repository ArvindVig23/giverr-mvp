export const emailregex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,3}$/;

export const passwordValidationPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export const userNameRegex = /^(?=.*[a-zA-Z\d])(?!.*\s)[a-zA-Z\d@$!%*?&]{4,}$/;

export const fullNameregex = /^(?=.{3,}$)[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)?$/;
