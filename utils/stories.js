const {newsApiKey} = require('../config');
const NewsAPI = require('newsapi');
const mongoose = require('mongoose');
const Story = mongoose.model('Story');
const Source = mongoose.model('Source');

const getStorySources = async (req, res, next) => {
    const newsapi = new NewsAPI(newsApiKey);
    const sources = newsapi.v2.sources({
        q: 'COVID',
        language: 'en'
    })
        .then(categories => {
            console.log('cat','categories')
            return categories
        })
        .catch(err => res.status(500).json({message: "server error"}).end() )
    req.categories = await sources;
// TODO: add this to stories endpoint
    next()
}

const getStoriesFromWeb = async (req, res, next) => {
    const newsapi = new NewsAPI(newsApiKey);
    const stories = newsapi.v2.everything({
        q: 'COVID',
        language: 'en',
        sources: `
        abc-news,
        bbc-news,
        bloomberg,
        business-insider,
        cnbc,
        cnn,
        financial-post,
        fox-news,
        google-news,
        google-news-au,g
        google-news-ca,
        google-news-in,
        google-news-uk,
        independent,
        mashable,
        medical-news-today,
        msnbc,
        nbc-news,
        news24,
        new-scientist,
        politico,
        reuters,
        the-wall-street-journal,
        the-washington-post,
        the-washington-times,
        time,
        usa-today
        `,
        pageSize: 100,
        sortBy: 'relevancy'
    })
        .then(stories => {
            return stories
        })
        .catch(err => res.status(500).json({message: "server error"}).end() )
    req.stories = await stories;

    next()
}

const addStoriesToDb = async (req, res, stories) => {
    req.storiesAdded = [];
    const checkAndAddArticle = async (article) => {
        const addStory = Story.exists({ url: article.url })
            .then(articleExists => {
                console.log('article exists: ', articleExists)
                if (
                    !articleExists
                    && article.url
                    && article.urlToImage
                    && article.title
                    && article.description
                //    TODO: validation in model
                ) {
                    console.log('Story to add: ', article.title);
                    Source.findOne({id: article.source.id})
                        .then(articleSource => {
                            console.log('articleSource', 'articleSource')
                            const artWithDomain = article;
                            artWithDomain.source.domain = articleSource.url;
                            console.log('artWithDomain:', 'artWithDomain')
                            return artWithDomain
                        })
                        .then(completeArticle => {
                            const story = new Story(completeArticle)
                            story.save()
                                .then(added => req.storiesAdded.push(added))
                                .catch((err) => res.json({message:'article not added'}))
                        })
                        .catch((err) => res.json(err))
                }
            })
            .catch(err => console.log(err))
        return await addStory
    }
    for (const story of stories) {
        await checkAndAddArticle(story)
    }
}

module.exports = {getStorySources, getStoriesFromWeb, addStoriesToDb};