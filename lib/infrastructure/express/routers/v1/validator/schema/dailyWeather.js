const joi=require('joi')

module.exports.scrap=joi.object().keys({
    url: joi.string().required(),

})
module.exports.report=joi.object().keys({
    startDate: joi.date().iso().required(),
    endDate: joi.date().iso().required(),

})

