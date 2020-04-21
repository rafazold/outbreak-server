const mongoose = require('mongoose');
const Current = mongoose.model('Current');
const {getYesterdayData, getCurrentCountries} = require("../utils/current");

function currentRoutes(app) {
    app
        .get('/api/start', (req, res) => {
            res.json({message: "server is running"})
        })

        .get('/api/current/update', getYesterdayData, getCurrentCountries, (req, res) => {
            const currentData = req.yesterdayData;
            currentData.countries = req.countryData
            const current = new Current(currentData)
            Current.exists({ updated: req.yesterdayData.updated})
                .then(isUpdated => {
                    if(!isUpdated) {
                        current.save()
                            .then(current => res.json(current).end())
                    } else {
                        res.json({message: "current stats are up to date"}).end()
                    }
                })
                .catch(err => res.status(400).json({message: "current not updated", error: err}).end())
        })

        .get('/api/current', (req, res) => {
            Current
                .find({})
                .limit(1)
                .sort({$natural:-1})
                .then(currentStats => res.json(currentStats).end())
                .catch(() => res.status(400).end())
        })

        .get('/api/current/lastupdate', (req, res) => {
            Current
                .find({})
                .limit(1)
                .sort({$natural:1})
                .then(latest => res.json(latest[0].created).end())
                .catch(() => res.status(400).end())
        })

        .get('/api/current/test', getCurrentCountries, (req, res) => {
            res.json(req.countryData).end()

        })
}

module.exports = currentRoutes;