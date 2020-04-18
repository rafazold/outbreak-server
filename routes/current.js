const mongoose = require('mongoose');
const Current = mongoose.model('Current');
const {getYesterdayData} = require("../utils/current");




function currentRoutes(app) {
    app
        .get('/api/current/update', getYesterdayData, (req, res) => {
            const current = new Current(req.yesterdayData)
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
}

module.exports = currentRoutes;