const mongoose = require('mongoose');
const {getStorySources, getStoriesFromWeb, addStoriesToDb} = require('../utils/stories');
const Story = mongoose.model('Story');
const storyRoutes = (app) => {
    app
        .get('/api/news/update', getStoriesFromWeb, (req, res) => {
            const stories = req.stories.articles;
            // let storiesAdded = [];
            // const checkAndAddArticle = async (article) => {
            //     const addStory = Story.exists({ url: article.url })
            //         .then(articleExists => {
            //             if (!articleExists) {
            //                 const story = new Story(article)
            //                 story.save()
            //                     .then(added => storiesAdded.push(added))
            //                     .catch((err) => res.json({message:'article not added'}))
            //             }
            //         })
            //         .catch(err => console.log(err))
            //     return await addStory
            // }
            // const addStories = async () => {
            //     for (const story of stories) {
            //         await checkAndAddArticle(story)
            //     }
            // }
            addStoriesToDb(req, res, stories)

            // req.categories.sources.forEach(x => console.log(`name: ${x.name} : id: ${x.id}`))
                .then(() => res.json(req.storiesAdded).end())
        })
        .get('/api/news/sources', getStorySources, (req, res) => {
            console.log('req.categories')
            req.categories.sources.forEach(x => console.log(`name: ${x.name} : id: ${x.id}`))
            res.json(req.categories.sources).end()
        })
    // .then((cat) => res.json(cat).end())
}

module.exports = storyRoutes;