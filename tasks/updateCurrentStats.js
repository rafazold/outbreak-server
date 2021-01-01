const mongoose = require('mongoose');
require("../models");
const Current = mongoose.model('Current');
// const {getYesterdayData, getCurrentCountries} = require("../utils/current");
const api = require('covidapi');



const getYesterdayTotals = async () => {
    const yesterday = api.yesterday.all()
    return await yesterday;
}

const getCurrentCountries = async () => {
    const currentData = api.yesterday.countries({sort:'cases'})
    return await currentData;
}

const getStats = () => {
    const totals = getYesterdayTotals();
    const countryData = getCurrentCountries();
    return Promise.all([totals, countryData])
        .then(dataArr => {
            let total = dataArr[0];
            total.countries = dataArr[1];
            return total
        })
}

const addStats = async  (currentStats) => {
    const addToDb = Current.exists({updated: currentStats.updated})
        .then(exists => {
            if(!exists) {
                const current = new Current(currentStats)
                return current.save()
                    .then(saved => console.log(`DB totals updated time: ${saved.updated.toLocaleString(
                        'en-US', {
                            year: '2-digit',
                            month: 'numeric',
                            day: 'numeric'})}`))
                    .catch(err => console.log(err))
            } else {
                console.log({message: 'Hooray!, stats are up to date, no action is needed'})
            }
        })
        .catch(err => console.log(err))
    return await addToDb;
}

getStats()
    .then(currentStats => addStats(currentStats))
    .then(() => mongoose.disconnect())
    .catch(err => console.log(err))