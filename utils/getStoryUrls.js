const mongoose = require('mongoose');
const Story = mongoose.model('Story');


const getStoryUrls = async (req, res, next) => {
    const urls= Story.distinct('url')
        .then(urlsArr => {
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
    req.urls = await urls;

    next()
}

module.exports = datesRange;


// // request a weekday along with a long date
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// console.log(date.toLocaleString('en-US', options));
// // → "Donnerstag, 20. Dezember 2012"