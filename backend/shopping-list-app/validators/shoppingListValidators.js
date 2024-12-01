const { body, param } = require('express-validator');

exports.validateCreate = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('ownerId').isString().notEmpty().withMessage('OwnerId is required'),
];

exports.validateUpdate = [
  param('id').isString().notEmpty().withMessage('Invalid list ID'),
  body('name').optional().isString().notEmpty().withMessage('Name must be a non-empty string'),
];
