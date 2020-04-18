const api = require('covidapi');

const getYesterdayData = async (req, res, next) => {
    const yesterday = api.yesterday.all()
        // .then()
    req.yesterdayData = await yesterday;
    next()
}

module.exports = {getYesterdayData}