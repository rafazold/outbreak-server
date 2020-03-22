const
    Moment = require("moment"),
    MomentRange = require("moment-range"),
    moment = MomentRange.extendMoment(Moment); /*add plugin to moment instance*/

const dateRange = (start, days) => {
    let
        end = moment(start).add(days, 'day'),
        range = moment.rangeFromInterval('day', days, start),
        array = Array.from(range.by("days")); /*days, hours, years, etc.*/
    const datesArr = array.map(m => m.format("M/DD/YY"));
    return datesArr;
}


module.exports = dateRange;