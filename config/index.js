const config = {
    mongoUri : process.env.MONGODB_URI || 'mongodb+srv://rafa2020:ekhEKRcX76NjiFY5@covid.tcu8r.mongodb.net/covid?retryWrites=true&w=majority',
    port: process.env.PORT || 4000,
    newsApiKey: '65dada377a964d1ea4e91f8241e77c0a',
};

module.exports = config;