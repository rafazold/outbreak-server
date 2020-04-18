const mongoose = require('mongoose');

mongoose.model('Story', {
    source: {
        id: String,
        name: String
    },
    author: String,
    title: String,
    description: String,
    url: {
        type: String,
        require: true,
        validate(value) {
            return value.length > 6;
        }
    },
    urlToImage: String,
    publishedAt: Date,
    content: String,
    created: {
        type: Date,
        default: Date.now
    }

});