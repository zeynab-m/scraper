const {dayWeatherScraperServiceSymbol}= require('../../../infrastructure/config/constant').SERVICE
const {dayWeatherRepositorySymbol}= require('../../../infrastructure/config/constant').REPOSITORY
const {dayWeatherEntitySymbol}= require('../../../infrastructure/config/constant').ENTITY
const {scrapHandlerSymbol}= require('../../../infrastructure/config/constant').UTILS
const {dayWeatherScraperService}= require('../../../application/use_case/dayWeatherScraper')


module.exports=(diContainer)=> {

    diContainer.constructor(dayWeatherScraperServiceSymbol, {dependency:[scrapHandlerSymbol,dayWeatherRepositorySymbol,dayWeatherEntitySymbol],conn:dayWeatherScraperService});

}



