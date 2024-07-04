import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';
import { EVK, NODE_ENV } from './__helpers__';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    [EVK.NODE_ENV]: Joi.string()
      .required()
      .valid(...Object.values(NODE_ENV).filter((item) => isNaN(Number(item)))),
    [EVK.PORT]: Joi.number().required(),
    [EVK.DB_USERNAME]: Joi.string().required(),
    [EVK.DB_PASSSWORD]: Joi.string().required(),
    [EVK.DB_NAME]: Joi.string().required(),
    [EVK.RELEASE_VERSION]: Joi.string().required(),
    [EVK.PHOT_AI_API_KEY]: Joi.string().required(),
    [EVK.PHOT_AI_API_URL]: Joi.string().required()
  }),
};
