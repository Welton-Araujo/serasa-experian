import { body } from 'express-validator';

export const postValidations = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('authorId').isInt().withMessage('Author ID must be an integer'),
];