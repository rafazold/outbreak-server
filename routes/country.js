const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const {getDataFromWeb} = require('../utils/update');
const datesRangeInDb = require('../utils/dateRangeInDb');
const {getYesterdayData} = require("../utils/current");
const {buildDataObj, formatForDb} = require('../utils/update');




function countryRoutes(app) {
    app
        .get('/api/update', datesRangeInDb, (req, res) => {
            console.log(req.datesInDb)
            formatForDb(req.datesInDb)
                .then(updated => {
                    res.json(updated).end()
                    // Country.collection.insertMany(x)
                    //     .then(inserted => res.json(inserted).end())
                    //     .catch(err => res.status(400).json({message: "can't update stats"}).end())
                })
                .catch(err => res.status(400).json({message: "can't update stats"}).end())
        })

        .get('/api/countries/total', (req, res) => {
            Country
                .aggregate(
                    [
                        {
                            '$sort': {
                                'date': -1
                            }
                        }, {
                        '$limit': 1
                    }
                    ]
                )
                .then((x) => res.json(x).end())
        })

        .get('/api/countries/test', datesRangeInDb, (req, res) => {
            res.json(req.yesterdayData).end()
        })
}

module.exports = countryRoutes;

