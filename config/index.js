const config = {
    mongoUri : process.env.MONGODB_URI || 'mongodb://heroku_fb71lpdv:fu1q76eh26v4j2s3tuvpk962ki@ds139960.mlab.com:39960/heroku_fb71lpdv',
    port: process.env.PORT || 4000,
};

module.exports = config;