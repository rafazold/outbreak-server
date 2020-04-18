const mongoose = require('mongoose');
const {getStorySources, getStoriesFromWeb, addStoriesToDb} = require('../utils/stories');
const Story = mongoose.model('Story');
const storyRoutes = (app) => {
    app
        .get('/api/news/update', getStoriesFromWeb, (req, res) => {
            const stories = req.stories.articles;
            addStoriesToDb(req, res, stories)
                .then(() => res.json(req.storiesAdded).end())
                .catch(() => res.status(400).end())
        })
        .get('/api/news/sources', getStorySources, (req, res) => {
            console.log('req.categories')
            req.categories.sources.forEach(x => console.log(`name: ${x.name} : id: ${x.id}`))
            res.json(req.categories.sources).end()
                .catch(() => res.status(400).end())
        })
        .get('/api/news/lastUpdate', (req, res) => {
            Story
                .find({})
                .limit(1)
                .sort({$natural:-1})
                .then(latestStory => res.json(latestStory[0].created).end())
                .catch(() => res.status(400).end())
        })
        .get('/api/news', (req, res) => {
            Story
                .find({"source.id": {$ne: 'mashable'}})
                .sort('-created')
                .limit(Number(req.query.limit || 12))
                .skip(Number(req.query.skip * 12 || 0))
                .then(result => res.json(result).end())
                .catch(() => res.status(400).end())
        })
}

module.exports = storyRoutes;

