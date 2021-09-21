const {dayWeatherControllerSymbol}= require('../../infrastructure/config/constant').CONTROLLER
const {dayWeatherRepositorySymbol}= require('../../infrastructure/config/constant').REPOSITORY
const {scrapHandlerSymbol}= require('../../infrastructure/config/constant').UTILS


const diContainer = require('./createContainer')

let dependencies={}
dependencies[scrapHandlerSymbol]=diContainer.get(scrapHandlerSymbol)
dependencies[dayWeatherControllerSymbol]=diContainer.get(dayWeatherControllerSymbol)
dependencies[dayWeatherRepositorySymbol]=diContainer.get(dayWeatherRepositorySymbol)

module.exports=dependencies