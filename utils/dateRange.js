const mongoose = require('mongoose');
const Country = mongoose.model('Country');


const datesRange = async (req, res, next) => {
    const dates = Country.distinct('date')
        .then(datesArr => {
            let datesObj = {};
            datesArr.forEach(date => {
                const myDate = date.toLocaleString(
                    'en-US', {
                        year: '2-digit',
                        month: 'numeric',
                        day: 'numeric'});
                datesObj[myDate] = myDate
            })
            return datesObj
        })
        .catch(err => res.status(500).json({message: "server error"}).end())
    req.dates = await dates;

    next()
}

module.exports = datesRange;


// // request a weekday along with a long date
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// console.log(date.toLocaleString('en-US', options));
// // → "Donnerstag, 20. Dezember 2012"