'use strict';
const scrapHandler = require('../../../application/domain/utils/scrapHandler');
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');


module.exports = class extends scrapHandler {

    constructor() {
        super()
    }

    async ScrapUrl(url) {

        let responses = await this.fetchData([url])
        responses = responses[0]

        const html = responses.data;
        const $ = cheerio.load(html);
        const {daysWeather, links, year} = this.getTableData($)

        return ({daysWeather, links, year})

    }

    async fetchData(urls) {
        let requests = urls.map(url => axios.get(url))
        let response = await axios.all(requests).then(axios.spread((...responses) => {
            return responses
        })).catch(errors => {
            console.log({errors})
            throw new Error('error in fetching')
        })
        return (response)
    }

    async getDayDetail(links) {

        let details = await this.fetchData(links)
        let data = details.map(detail => {
            const html = detail.data;
            const $ = cheerio.load(html);
            let dayWeatherDetails
            let nightWeatherDetails
            const halfDay = $('.content-module')
            let items = halfDay.find('.half-day-card')
            items.each(function () {
                let time = $(this).find('h2').text()
                let items = $(this).find('.panel-item')
                let det = {
                    description: $(this).find('.phrase').text()
                }
                items.each(function (x) {
                    let value = $(this).find('.value').text()
                    let key = $(this).text().split(value)[0].split(' ').join('_')
                    det[`${key}`] = value

                })
                time === 'Day' ? dayWeatherDetails = det : nightWeatherDetails = det

            })
            return ({link: detail.config.url, dayWeatherDetails, nightWeatherDetails})
        })
        return data

    }

    getTableData($) {

        let daysWeather = [];

        const links = [];
        const statsTable = $('.monthly-daypanel');
        const {month, year} = this.getDate($)

        statsTable.each(function () {

            let day = $(this).find('.date').text().trim();
            let date = moment([year, month, day]).format("YYYY-MM-DDT00:00:00.000[Z]")
            $(this).attr('href') ? links.push(`https://www.accuweather.com/${$(this).attr('href')}`) : ''
            daysWeather.push({
                link: $(this).attr('href') ? `https://www.accuweather.com/${$(this).attr('href')}` : '',
                date: date,
                day: day,
                highTemp: parseInt($(this).find('.high').text()) || 0,
                lowTemp: parseInt($(this).find('.low').text()) || 0,
                dayWeatherDetails: '',
                nightWeatherDetails: ''

            })

        })
        daysWeather = this.getCurrentMonthData(daysWeather)
        return ({daysWeather, links, year})

    }

    getCurrentMonthData(daysWeather) {

        let monthStart = daysWeather.findIndex(ele => ele.day === '1')
        let monthEnd = daysWeather.map(ele => ele.day === '1').lastIndexOf(true)
        daysWeather = daysWeather.slice(monthStart, monthEnd)

        return daysWeather
    }

    getDate($) {
        let month = 0;
        let year = 0;
        let date = $('.map-dropdown');
        date.each(function (index, value) {
            if (index === 0) {
                month = $(this).find('h2').text()
                month = moment().month(`${month}`).format("M") - 1;
            } else {
                year = $(this).find('h2').text()
            }

        });
        return ({month, year})
    }


}

// let scraper= new x()
// scraper.ScrapUrl(['https://www.accuweather.com/en/gb/london/ec4a-2/september-weather/328328'])