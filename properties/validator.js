const Joi = require("joi");
const { PROPERTY_COLORS } = require("../util/CONSTANTS");

const createPropertyValidator = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    imgUrl: Joi.string().required(),
    colorGroup: Joi.string()
      .valid(...PROPERTY_COLORS)
      .required(),
  });
  return schema.validate(body);
};

module.exports = {
  createPropertyValidator,
};
