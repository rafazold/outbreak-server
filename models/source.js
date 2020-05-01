const mongoose = require('mongoose');

mongoose.model('Source', {
    id: String,
    name: String,
    description: String,
    url: String,
    category: String,
    language: String,
    country: String,
    created: {
        type: Date,
        default: Date.now
    }
});