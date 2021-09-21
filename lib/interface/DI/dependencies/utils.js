const {scrapHandlerSymbol}= require('../../../infrastructure/config/constant').UTILS
const cheerioScrapHandler= require('../../../infrastructure/utils/scraper/cheerioScrapHandler')


module.exports=(diContainer)=> {

    diContainer.constructor(scrapHandlerSymbol, {dependency:[],conn:cheerioScrapHandler});

}



