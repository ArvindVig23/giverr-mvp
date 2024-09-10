import Joi from 'joi';
import { min4CharWithoutSpace, websiteLinkRegex } from './regex';

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

  frequency: Joi.string().allow(null, '').required().messages({
    'string.base': 'Frequency must be a string',
    'string.required': 'Frequency is required',
  }),

  opportunityType: Joi.string().allow(null, '').required().messages({
    'string.base': 'opportunityType must be a string',
    'string.required': 'opportunityType is required',
  }),

  imageLink: Joi.string().allow(null, '').required().messages({
    'string.base': 'Image url must be a string',
    'string.required': 'Image url is required',
  }),
  activities: Joi.string().allow(null, '').messages({
    'string.base': 'Activities must be a string',
  }),
  volunteerRequirements: Joi.string().allow(null, '').messages({
    'string.base': 'Volunteer Requirement must be a string',
  }),
  createdBy: Joi.string().allow(null, '').messages({
    'string.base': 'Created By must be a string',
  }),
  locationType: Joi.string().allow(null, '').messages({
    'string.base': 'Location must be a string',
  }),
  virtualLocationLink: Joi.string().allow(null, '').messages({
    'string.base': 'Virtual Location must be a string',
  }),
  selectedDate: Joi.string().allow(null, '').messages({
    'string.base': 'Selected Date must be a string',
  }),
}).options({ abortEarly: false });

export const oppIdSchema = Joi.object({
  oppId: Joi.string().required().messages({
    'string.base': 'Opportunity must be a string',
    'string.required': 'Opportunity is required',
  }),
});

export const fullNameSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .allow('')
    .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .required()
    .messages({
      'string.base': 'Only Alphabets are allowed in fullName',
      'string.pattern':
        'Full Name should not contain number or special characters.',
      'string.required': 'Organization name is required',
    }),
});

export const organizationSchema = Joi.object({
  name: Joi.string().trim().pattern(min4CharWithoutSpace).messages({
    'string.base': 'Only Alphabets are allowed in Organization name',
    'string.pattern':
      'Organization Name should not contain number or special characters.',
  }),
  username: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+-]+$/)
    .messages({
      'string.required': 'Username is required',
      'string.pattern':
        'Username should contain alphabets, numbers and special characters only.',
    }),
  website: Joi.string().trim().pattern(websiteLinkRegex).messages({
    'string.base': 'Website url must be a string',
    'string.pattern': 'Enter valid website url',
  }),
  orgId: Joi.string().messages({
    'string.base': 'Organization id must be a string',
    'string.required': 'Organization is required',
  }),
});

export const orgIdSchema = Joi.object({
  orgId: Joi.string().required().messages({
    'string.base': 'Organization Id must be a string',
    'string.required': 'Organization Id is required',
  }),
});

export const orgIdAndMemberSchema = Joi.object({
  orgId: Joi.string().required().messages({
    'string.base': 'Organization Id must be a string',
    'string.required': 'Organization Id is required',
  }),
  memberId: Joi.string().required().messages({
    'string.base': 'Member Id must be a string',
    'string.required': 'Member Id is required',
  }),
});

export const orgIdAndUserIdSchema = Joi.object({
  orgId: Joi.string().required().messages({
    'string.base': 'Organization Id must be a string',
    'string.required': 'Organization Id is required',
  }),
  userId: Joi.string().required().messages({
    'string.base': 'User Id must be a string',
    'string.required': 'User Id is required',
  }),
});

export const notificationSettingSchema = Joi.object({
  allowUpdates: Joi.boolean().required(),
  acceptSubmission: Joi.boolean().required(),
  allowVolunteeringUpdates: Joi.boolean().required(),
});

export const oppTypeIdSchema = Joi.object({
  opportunityTypeId: Joi.string().required().messages({
    'string.base': 'Pooprtunity Type Id must be a string',
    'string.required': 'Pooprtunity Type Id is required',
  }),
});

export const userSettingsSchema = Joi.object({
  autoTimeZone: Joi.boolean().required(),
  istwentyFourHourTimeFormat: Joi.boolean().required(),
  isDayMonthYearDateFormat: Joi.boolean().required(),
  id: Joi.string().required().messages({
    'string.base': 'User settings id must be a string',
    'string.required': 'User settings Id is required',
  }),
});

export const contactUsSchema = Joi.object({
  fullName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .messages({
      'string.empty': 'Full Name is required',
      'string.pattern.base':
        'Full Name should only contain alphabets and spaces',
    }),
  email: Joi.string().email().required().trim().messages({
    'string.empty': 'Email is required',
    'string.email': 'Enter a valid email',
  }),
  phone: Joi.string().required().trim().messages({
    'string.empty': 'Phone number is required',
  }),
  message: Joi.string().required().trim().messages({
    'string.empty': 'Message is required',
  }),
});
