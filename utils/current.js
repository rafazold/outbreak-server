const api = require('covidapi');

const getYesterdayData = async (req, res, next) => {
    const yesterday = api.yesterday.all()
        // .then()
    req.yesterdayData = await yesterday;
    next()
}

const getCurrentCountries = async (req, res, next) => {
    const currentData = api.yesterday.countries({sort:'cases'})
    // .then()
    req.countryData = await currentData;
    next()
}

module.exports = {getYesterdayData, getCurrentCountries}