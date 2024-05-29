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

export const schemaWithOptionalFields = Joi.object({
  email: Joi.string().email().trim().messages({
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

export const eventValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Event Name must be a string',
    'string.required': 'Event Name is required',
  }),

  description: Joi.string()
    .allow(null, '')
    .optional()
    .messages({ 'string.base': 'Description must be a string' }),

  eventDate: Joi.string().isoDate().required().messages({
    'string.base': 'EventDate  must be a string',
    'string.required': 'Event Date  is required',
  }),

  frequency: Joi.string().allow(null, '').required().messages({
    'string.base': 'Frequency must be a string',
    'string.required': 'Frequency is required',
  }),

  opportunityType: Joi.string().allow(null, '').required().messages({
    'string.base': 'opportunityType must be a string',
    'string.required': 'opportunityType is required',
  }),

  organizationId: Joi.string().allow(null, '').required().messages({
    'string.base': 'Opportunty Name must be a string',
    'string.required': 'Opportunty Name is required',
  }),
  imageLink: Joi.string().allow(null, '').required().messages({
    'string.base': 'Image url must be a string',
    'string.required': 'Image url is required',
  }),
}).options({ abortEarly: false });

export const joinOppSchema = Joi.object({
  oppId: Joi.string().required().messages({
    'string.base': 'Opportunity must be a string',
    'string.required': 'Opportunity is required',
  }),
});
