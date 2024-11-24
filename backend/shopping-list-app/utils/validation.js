const Joi = require('joi');

exports.validateShoppingList = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    ownerId: Joi.string().required(),
    members: Joi.array().items(Joi.string())
  });
  return schema.validate(data);
};
