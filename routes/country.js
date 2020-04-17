const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const {getDataFromWeb} = require('../utils/update');
const datesRange = require('../utils/dateRange');
const {buildDataObj, formatForDb} = require('../utils/update');



function countryRoutes(app) {
    app
        .get('/api/update', datesRange, (req, res) => {
            console.log(req.dates)
            formatForDb(req.dates)
                .then((x) => {
                    res.json(x).end( )
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
}

module.exports = countryRoutes;

