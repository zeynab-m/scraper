const express = require('express');
const router = express.Router();
const dailyWeather = require('./v1/dailyWeather');


router.use('/api/v1/daily/weather', dailyWeather);



module.exports = router;
