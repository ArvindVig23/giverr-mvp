export const emailregex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,3}$/;

export const passwordValidationPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export const userNameRegex = /^(?=.*[a-zA-Z\d])(?!.*\s)[a-zA-Z\d@$!%*?&]{4,}$/;

export const fullNameregex = /^\s*(?=.{3,}$)[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)?\s*$/;

export const min4CharWithoutSpace = /^(.*\S.*){4,}$/;

export const websiteLinkRegex =
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
