const mongoose = require('mongoose');

mongoose.model('Story', {
    source: {
        id: String,
        name: String
    },
    author: String,
    title: {
        type: String,
        require: true,
        validate(value) {
            return value.length > 6;
        }
    },
    description: String,
    url: {
        type: String,
        require: true,
        validate(value) {
            return value.length > 6;
        }
    },
    urlToImage: {
        type: String,
        require: true,
        validate(value) {
            return value.length > 6;
        }
    },
    publishedAt: Date,
    content: String,
    domain: {
        type: String,
        require: true,
        validate(value) {
            return value.length > 6;
        }
    },
    created: {
        type: Date,
        default: Date.now
    }

});