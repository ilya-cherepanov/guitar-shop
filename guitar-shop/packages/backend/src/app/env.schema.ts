import * as Joi from 'joi';


export default Joi.object({
  JWT_SECRET: Joi
    .string()
    .required(),
  UPLOAD_FILES_DIR: Joi
    .string()
    .required(),
  MAIL_SMTP_HOST: Joi
    .string()
    .required(),
  MAIL_SMTP_PORT: Joi
    .number()
    .port()
    .required(),
  MAIL_SMTP_USER: Joi
    .string()
    .required(),
  MAIL_SMTP_USER_PASSWORD: Joi
    .string()
    .required(),
  MAIL_FROM: Joi
    .string()
    .required(),
  FRONTEND_URL: Joi
    .string()
    .required(),
});
