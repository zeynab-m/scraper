'use strict';


const errors = require('../../domain/utils/errors');

module.exports=class {


    constructor(scrapHandler,dayWeatherRepository,dayWeatherEntity) {

        this.dayWeatherRepository=dayWeatherRepository;
        this.dayWeatherEntity=dayWeatherEntity;
        this.scrapHandler=scrapHandler;
        this.scrapUrls=this.scrapUrls.bind(this);
        this.getDailyWeatherReport=this.getDailyWeatherReport.bind(this);

    }
    async  scrapUrls(urls,dbName){

        let {daysWeather,links}=await this.scrapHandler.ScrapUrl(urls)
        await this.dayWeatherRepository.bulkInsert(daysWeather,dbName)
        let dayDetails=await this.scrapHandler.getDayDetail(links)
        await this.dayWeatherRepository.bulkUpdate(dayDetails,dbName)


    }
    async  getDailyWeatherReport(startDate,endDate,dbName){

        let reports=await this.dayWeatherRepository.read(startDate,endDate,dbName)

        return(reports)

    }




}
