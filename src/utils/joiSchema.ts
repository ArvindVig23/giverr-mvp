import Joi from 'joi';

export const schema = Joi.object({
  fullName: Joi.string()
    .trim()
    .allow('')
    .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .messages({
      'string.base': 'Only Alphabets are allowed in fullName',
      'string.pattern':
        'Full Name should not contain number or special characters.',
    }),
  email: Joi.string().email().required().trim().messages({
    'string.empty': 'Email is required',
    'string.email': 'Enter a valid email',
  }),
  username: Joi.string()
    .allow('')
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+-]+$/)
    .messages({
      'string.pattern':
        'Username should contain alphabets, numbers and special characters only.',
    }),
});
