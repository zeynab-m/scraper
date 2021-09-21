const {dayWeatherEntitySymbol}= require('../../../infrastructure/config/constant').ENTITY
const {dayWeatherEntity}= require('../../../application/domain/weather/dayWeatherEntity')


module.exports=(diContainer)=> {

    diContainer.constructor(dayWeatherEntitySymbol, {dependency:[],conn:dayWeatherEntity});
}



