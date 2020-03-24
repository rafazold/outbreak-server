const csv = require('csvtojson');
const request=require('request');
const datesRange = require('./dateRange');
const mongoose = require('mongoose');
const Country = mongoose.model('Country');
//TODO: add models/index then instead of req.body can add the actual object.


const getDataFromWeb = (dataType, statObj, datesRange) => {
    // const today = Date.now();
    // const dates = dateRange(today, -90);
    // console.log(dates)

    const url = () => {
        switch(dataType) {
            case 'Infected':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
            case 'Casualties':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
            case 'Recovered':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv';
        }
    };
    const makeItemObject = (result, statObj, ) => {
        const datesObj = {};

        for (let [key, value] of Object.entries(result)) {
            if (!datesObj[key]) {
                if (
                    key !== 'Province/State' &&
                    key !== 'Country/Region' &&
                    key !== 'Lat' &&
                    key !== 'Long' &&
                    key !== datesRange[key]

                ) {
                    // console.log('key: ', key, 'range: ', datesRange[key], 'eval: ', key!==datesRange[key] )

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

const buildDataObj  = (datesRange) => {
    let statsObj = {};

    return getDataFromWeb('Infected', statsObj, datesRange)
        .then(() => getDataFromWeb('Casualties', statsObj, datesRange))
            .then(() => getDataFromWeb('Recovered', statsObj, datesRange))
}

const formatForDb = (datesRange) => {
    const allDays = buildDataObj(datesRange)
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