const mongoose = require('mongoose');
const {mongoUri} = require('../config');

mongoose
    .connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(() => process.exit(1));

require('./country');
require('./story');
require('./current');
require('./source');