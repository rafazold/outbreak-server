const csv = require('csvtojson');
const request=require('request');
const dateRange = require('./dateRange');
const mongoose = require('mongoose');
//TODO: add models/index then instead of req.body can add the actual object.


const getDataFromWeb = (dataType, statObj) => {
    // const today = Date.now();
    // const dates = dateRange(today, -90);
    // console.log(dates)

    const url = () => {
        switch(dataType) {
            case 'Infected':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';
            case 'Casualties':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv';
            case 'Recovered':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv';
        }
    };
    const makeItemObject = (result, statObj) => {
        for (let [key, value] of Object.entries(result)) {
            if (
                key !== 'Province/State' &&
                key !== 'Country/Region' &&
                key !== 'Lat' &&
                key !== 'Long'
            ) {

                if (!statObj[key]) {
                    statObj[key] = {};
                }

                statObj[key]['date'] = new Date(key);

                if (!statObj[key]['country']){
                    statObj[key]['country'] = {};
                }
                if (!statObj[key]['country'][result['Country/Region']]) {
                    statObj[key]['country'][result['Country/Region']] = {}
                }

                if (!statObj[key][`total${dataType}`]) {
                    statObj[key][`total${dataType}`] = 0;
                }

                statObj[key]['country'][result['Country/Region']]['name'] = result['Country/Region'];
                statObj[key]['country'][result['Country/Region']][`${dataType}`] = parseInt(value);


                statObj[key][`total${dataType}`] += parseInt(value);
            }
        }
    }

    return csv({
        delimiter: [","],
    })
        .fromStream(request.get(url()))
        .subscribe((result) => {
            makeItemObject(result, statObj)
            })
        // .then(test => console.log('kkkkk', dataType, statObj ))
        .then(() => statObj );
};

const buildDataObj  = () => {
    let statsObj = {};

    return getDataFromWeb('Infected', statsObj)
        .then(() => getDataFromWeb('Casualties', statsObj))
            .then(() => getDataFromWeb('Recovered', statsObj))
}

const formatForDb = () => {
    const allDays = buildDataObj()
        .then((obj) => Object.values(obj))
        .then(arr => arr.map((country) => {
            country.country = Object.values(country.country)
            return country
        }
        ))
    return allDays
}

const insertToDb = (arr) => {
    return (formatForDb())
}

module.exports = {
    getDataFromWeb,
    buildDataObj,
    formatForDb,
    insertToDb
}