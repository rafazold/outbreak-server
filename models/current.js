const mongoose = require('mongoose');

mongoose.model('Current', {
    created: {
        type: Date,
        default: Date.now
    },
    updated: Number,
    cases: Number,
    todayCases: Number,
    deaths: Number,
    todayDeaths: Number,
    recovered: Number,
    active: Number,
    critical: Number,
    casesPerOneMillion: Number,
    deathsPerOneMillion: Number,
    tests: Number,
    testsPerOneMillion: Number,
    continent: String,
    affectedCountries: Number
});