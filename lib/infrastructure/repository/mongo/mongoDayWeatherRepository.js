'use strict';
const dayWheatherRepository = require('../../../application/domain/weather/dayWheatherRepository');
const mongo = require('../../orm/mongo/mongoDriver')
const {validator,dayWeatherCollection}= require('../../orm/mongo/migrations')


module.exports = class extends dayWheatherRepository {

    constructor(dayWeatherEntity) {
        super()
        this.dayWeatherEntity=dayWeatherEntity
        this.bulkUpdate=this.bulkUpdate.bind(this)
        this.bulkInsert=this.bulkInsert.bind(this)
        this.read=this.read.bind(this)
        this.collection='dayWeathers'

    }

    async bulkInsert(weatherData,dbName) {

        console.log({dbName})
        let {validInput}=await this.bulkInsertGenerator(weatherData)
        let dayWeatherSchema =await mongo().collection(dbName,this.collection)
        return await dayWeatherSchema.bulkWrite(validInput)

    }
    async bulkUpdate(weatherDetails,dbName) {


        let {validInput}=await this.bulkUpdateDetails(weatherDetails)
        let dayWeatherSchema =await mongo().collection(dbName,this.collection)
        return await dayWeatherSchema.bulkWrite(validInput)

    }
    async bulkInsertGenerator(weatherData) {
        let validInput=[]

        for(let data of weatherData){

                let validated=await validator(
                    {
                        date:data.date,
                        link:data.link,
                        highTemp:data.highTemp,
                        lowTemp:data.lowTemp,
                        dayWeatherDetails:data.dayWeatherDetails,
                        nightWeatherDetails:data.nightWeatherDetails,
                        deletedAt:data.deletedAt,
                        createdAt:data.createdAt,
                        updatedAt:data.updatedAt,

                    },dayWeatherCollection)
                let updateOne={
                    updateOne:{
                        filter:{date:validated.date},
                        update:[{$set: {
                                date:validated.date,
                                link:validated.link,
                                highTemp:validated.highTemp,
                                lowTemp:validated.lowTemp,
                                dayWeatherDetails:validated.dayWeatherDetails,
                                nightWeatherDetails:validated.nightWeatherDetails,
                                deletedAt:{$cond:[ { $not: ["$deletedAt"] }, validated.deletedAt, "$deletedAt" ]},
                                createdAt:{$cond:[ { $not: ["$createdAt"] }, validated.createdAt, "$createdAt" ]},
                                updatedAt:{$cond:[ { $not: ["$updatedAt"] }, validated.updatedAt, "$updatedAt" ]},
                            }}],
                        upsert:true
                    }
                }
                validInput.push(updateOne)

        }
        return({validInput})
    }
    async bulkUpdateDetails(weatherDetails) {
        let validInput=[]

        for(let data of weatherDetails){


                let updateOne={
                    updateOne:{
                        filter:{link:data.link},
                        update:[{$set: {
                                dayWeatherDetails:data.dayWeatherDetails,
                                nightWeatherDetails:data.nightWeatherDetails,

                            }}],
                    }
                }
                validInput.push(updateOne)

        }
        return({validInput})
    }
    async read(startDate,endDate,dbName) {

        let dayWeatherSchema =await mongo().collection(dbName,this.collection)
        let dayWeatherReports= await dayWeatherSchema.find({date:{$gte:new Date(startDate),$lte:new Date(endDate)}},{link:0}).sort({date:-1}).toArray()
        return dayWeatherReports
    }


}
