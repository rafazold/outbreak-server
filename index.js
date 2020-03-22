const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const getDataFromWeb = require('./utils/update');
const {port} = require('./config');
const app = express();


app.use(express.static('public'));

app.use(morgan('combined'));
app.use(cors({
    origin: true,
    credentials: true
}));
// url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-12-2020.csv';


app.use(bodyParser.json());



const confirmedArr = async () =>
    await getDataFromWeb('TimelineConfirmed');



require('./routes/country')(app);

app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).send('Something broke!') })

app.listen(port, () => console.log(`App listening on port ${port}!`));

// console.log('aaaaa',confirmedArr, 'YOOOOOO');

// async function confirmedArr() {
//     const arr = await dataFromWeb('TimelineConfirmed');
//     console.log('arr', arr)
//     return arr
// }

// confirmedArr().then((x) => console.log('finished', x))