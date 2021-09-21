const joi=require('joi')
const validate=require('../validator/validator').validate

const dayWeatherSchema=joi.object().keys({
    link:joi.string().allow(''),
    date:joi.date().iso().required(),
    highTemp:joi.number().required(),
    lowTemp:joi.number().required(),
    dayWeatherDetails:joi.object().default(''),
    nightWeatherDetails:joi.object().default(''),
    deletedAt:joi.date().iso().allow(null),//in case of soft delete
    createdAt:joi.date().iso().default(new Date().toISOString()),
    updatedAt:joi.date().iso().default(new Date().toISOString()),
})


class dayWeatherEntity {

     setDayWeather(input){

            let validInput= validate(input,dayWeatherSchema)
            let dayWeatherObject={

                link: validInput.link,
                date: validInput.date,
                lowTemp: validInput.lowTemp,
                highTemp: validInput.highTemp,
                dayWeatherDetails: validInput.dayWeatherDetails,
                nightWeatherDetails:validInput.nightWeatherDetails,
                deletedAt:validInput.deletedAt,
                createdAt:validInput.createdAt,
                updatedAt:validInput.updatedAt,
            }

        return dayWeatherObject

    }


}
module.exports={
    dayWeatherEntity
}
