'use strict';

module.exports=class {

    constructor(dayWeatherScraperService) {

        this.dayWeatherScraperService=dayWeatherScraperService
        this.scrapUrls=this.scrapUrls.bind(this)
        this.getDailyWeatherReport=this.getDailyWeatherReport.bind(this)

    }


    async scrapUrls(req, res, next){
        try {
             let result=await this.dayWeatherScraperService.scrapUrls(
                req.body.url,
                req.dbName
            )
            res.json({...req.json,
                message:'scraped successfully'
            }
            );

        } catch (e) {

            next(e)

        }


    }
    async getDailyWeatherReport(req, res, next){
        try {

             let reports=await this.dayWeatherScraperService.getDailyWeatherReport(
                req.query.startDate,
                req.query.endDate,
                req.dbName
            )
            res.json({...req.json,
                data:{
                    reports
                }
            });

        } catch (e) {

            next(e)

        }


    }




}


