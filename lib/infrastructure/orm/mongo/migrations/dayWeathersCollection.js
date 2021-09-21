const joi = require("joi");
module.exports=joi.object().keys({

  link:joi.string().allow(''),
  date:joi.date().iso().required(),
  highTemp:joi.number().required(),
  lowTemp:joi.number().required(),
  dayWeatherDetails:joi.object().allow(''),
  nightWeatherDetails:joi.object().allow(''),
  deletedAt:joi.date().iso().allow(null),//in case of soft delete
  createdAt:joi.date().iso().default(new Date().toISOString()),
  updatedAt:joi.date().iso().default(new Date().toISOString()),

})