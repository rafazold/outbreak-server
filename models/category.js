const mongoose = require('mongoose');

mongoose.model('category', {
    id: String,
    name: String,
    description: String,
    url: String,
    category: String,
    language: String,
    country: String,
});