'use strict';
const dailyWeatherSchema = require('./validator/schema/dailyWeather')
const validation = require('./validator/validator')
const {dayWeatherControllerSymbol}=require('../../../config/constant').CONTROLLER
const Dependencies= require('../../../../interface/DI/initiateDependencies');
const dayWeatherController=Dependencies[dayWeatherControllerSymbol]

const express = require('express');
const router = express.Router();



router.post(
    '/scrap',
    validation.body(dailyWeatherSchema.scrap),
    dayWeatherController.scrapUrls
)

router.get(
    '/report',
    validation.query(dailyWeatherSchema.report),
    dayWeatherController.getDailyWeatherReport
)


module.exports = router;
