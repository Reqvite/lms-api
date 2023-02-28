const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  authValidation: (req, res, next) => {
    const schema = Joi.object({
      fullname: Joi.string()
        .trim()
        .min(4)
        .max(100)
        .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄ]+\s[a-zA-Zа-яА-ЯіІїЇєЄ]+$/)
        .error(new ValidationError("Повне ім'я має містити ім'я та прізвище")),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().alphanum().min(6).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult?.error?.message) {
      next(new ValidationError(validationResult.error.message));
    }
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }

    next();
  },
};
