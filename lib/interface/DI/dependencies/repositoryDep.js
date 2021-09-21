const {dayWeatherRepositorySymbol}= require('../../../infrastructure/config/constant').REPOSITORY
const {dayWeatherEntitySymbol}= require('../../../infrastructure/config/constant').ENTITY
const constants = require("../../../infrastructure/config/constant");
const {
    mongoDayWeatherRepository,
} = require('../../../infrastructure/repository/mongo')

module.exports=(diContainer)=>{


    switch (process.env.DB_DIALECT){

        case constants.SUPPORTED_DATABASE.MONGO:
            diContainer.constructor(dayWeatherRepositorySymbol, {dependency:[dayWeatherEntitySymbol],conn:mongoDayWeatherRepository});
            break;
        default:



    }



}



