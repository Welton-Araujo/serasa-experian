import { body } from 'express-validator';

export const metadataValidations = [
  body('keywords').isArray().withMessage('Keywords must be an array'),
  body('keywords.*').isString().withMessage('Each keyword must be a string'),
];