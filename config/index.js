const config = {
    mongoUri : process.env.MONGODB_URI || 'mongodb://heroku_fb71lpdv:fu1q76eh26v4j2s3tuvpk962ki@ds139960.mlab.com:39960/heroku_fb71lpdv',
    port: process.env.PORT || 4000,
    newsApiKey: '65dada377a964d1ea4e91f8241e77c0a',
};

module.exports = config;