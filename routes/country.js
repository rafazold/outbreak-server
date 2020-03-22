const mongoose = require('mongoose');
const {getDataFromWeb} = require('../utils/update');
const {buildData} = require('../utils/update');

// const Country = mongoose.model('Country');

const getData = async () =>
    await getDataFromWeb('casualties');

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
            // Country
            console.log('hello world')
            getData().then((x) => res.json(x).end())
            //TODO: build dates arr and leave only the ones to change
            // TODO: add to obj full data
            // TODO: add to DB

        })
}

module.exports = countryRoutes;

