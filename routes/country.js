const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const {getDataFromWeb} = require('../utils/update');

const {buildDataObj, formatForDb, insertToDb} = require('../utils/update');



// const getData = async () =>
//     await buildData(['casualties', 'infected', 'recovered']);



// const countryRoutes = (app) => {
//     app
//         .get('/api/update', (req, res) => {
//             // Country
//             getData().then((x) => console.log('finished', x))
//
//         })
// }

function countryRoutes(app) {
    app
        .get('/api/update', (req, res) => {
            // const country = new Country()
            // buildDataObj().then((x) => res.json(x).end())
            //     // .then((countryObj) => console.log(countryObj))
            // // country.insertMany(req.country)
            // //         .then((x) => res.json(x).end())
            // console.log('FINISHED')
            // //TODO: build dates arr and leave only the ones to change
            // // TODO: add to obj full data
            // // TODO: add to DB
            console.log('hello world')
            formatForDb()
                .then((x) => {
                    const country = new Country()
                    Country.collection.insertMany(x)
                        .then(inserted => res.json(inserted).end())
                })


        })
}

module.exports = countryRoutes;

