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
            return result
            }
            )
        .then(test => console.log('kkkkk', dataType, statObj ))
        .then(() => statObj );


};

const buildData  = () => {
    let statsObj = {};
    // return Promise.all([getDataFromWeb('Infected'), getDataFromWeb('Casualties'), getDataFromWeb('Recovered')])
        // .then(([inf, cas, rec]) => console.log('iiiiiiiiiii', inf['3/21/20'].country, 'cccccccccccc', cas['3/21/20'].country, 'rrrrrrrrrrrrrr', rec['3/21/20'].country))
        // .then(a => a)

    return getDataFromWeb('Infected', statsObj)
        .then(() => getDataFromWeb('Casualties', statsObj))
            .then(() => getDataFromWeb('Recovered', statsObj))


}
module.exports = {
    getDataFromWeb,
    buildData
}