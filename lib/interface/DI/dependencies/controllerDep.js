const {dayWeatherControllerSymbol}= require('../../../infrastructure/config/constant').CONTROLLER
const {dayWeatherScraperServiceSymbol}= require('../../../infrastructure/config/constant').SERVICE
const {expressDayWeatherController}= require('../../../infrastructure/express/controllers/weather')

module.exports=(diContainer)=> {

    diContainer.constructor(dayWeatherControllerSymbol, {dependency:[dayWeatherScraperServiceSymbol],conn:expressDayWeatherController});
}



