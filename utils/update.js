const csv = require('csvtojson');
const request=require('request');
const dateRange = require('./dateRange');
const mongoose = require('mongoose');
//TODO: add models/index then instead of req.body can add the actual object.
let statObj = {
    totalInfected: 0,
    totalCasualties: 0,
    totalRecovered: 0,
};


const getDataFromWeb = (dataType) => {
    // const today = Date.now();
    // const dates = dateRange(today, -90);
    // console.log(dates)

    const url = () => {
        switch(dataType) {
            case 'infected':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';
            case 'casualties':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv';
            case 'recovered':
                return 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv';
        }
    };

    return csv({
        delimiter: [","],
    })
        .fromStream(request.get(url()))
        .subscribe((result) => {
                for (let [key, value] of Object.entries(result)) {
                    if (
                        key !== 'Province/State' &&
                        key !== 'Country/Region' &&
                        key !== 'Lat' &&
                        key !== 'Long'
                    ) {
                        if (!statObj[key]) {
                            statObj[key] = {};
                            statObj[key]['country'] = [];
                            statObj[key][`total${dataType}`] = 0;
                        }

                        statObj[key]['date'] = new Date(key);
                        statObj[key]['country'].push({
                            name: result['Country/Region'],
                            [`${dataType}`]: parseInt(value)
                        })
                        statObj[key][`total${dataType}`] += parseInt(value);
                    }
                }
            return result
            }
            )
        .then(test => console.log('kkkkk', dataType ))
        .then(() => statObj );


};

const buildData = async (dataTypes) => {
    await getDataFromWeb(dataTypes[0])
    // console.log(statObj)
    // getDataFromWeb(dataTypes[1])
    // console.log(statObj)
    // getDataFromWeb(dataTypes[2])
    // console.log(statObj)
    // .then(() => getDataFromWeb(dataTypes[1])
        //     .then(() => getDataFromWeb(dataTypes[2])))
        // .then(() => obj)
        

}

module.exports = {
    getDataFromWeb,
    buildData
};