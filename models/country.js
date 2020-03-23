const mongoose = require('mongoose');

mongoose.model('Country', {
    date: {
        type: Date,
        default: Date.now
    },
    totalInfected: Number,
    totalCasualties: Number,
    totalRecovered: Number,
    country: [{
        name: String,
        infected: Number,
        casualties: Number,
        recovered: Number,
    }]
});