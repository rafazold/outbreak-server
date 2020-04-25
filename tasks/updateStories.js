const {newsApiKey} = require('../config');
const NewsAPI = require('newsapi');
const mongoose = require('mongoose');
require("../models");
const Story = mongoose.model('Story');
const moment = require('moment');
//

//
//
const getStoriesFromWeb = async () => {
    const newsapi = new NewsAPI(newsApiKey);
    const today = moment().format('YYYY-MM-DD');
    const stories = newsapi.v2.everything({
        q: 'COVID',
        language: 'en',
        from: '2020-04-19',
        // from: today,
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
        .catch(console.log)
    return await stories;
}

const checkAndAddArticle = async (article, storiesAdded) => {
    const addStory = Story.exists({ url: article.url })
        .then(articleExists => {
            if (
                articleExists
                && article.url
                && article.urlToImage
                && article.title
                && article.description
            ) {
                const story = new Story(article)
                story.save()
                    .then(added => storiesAdded.push(added))
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    return await addStory
}

const addStories = async (stories) => {
    const storiesAdded = [];
    for (const story of stories) {
        await checkAndAddArticle(story, storiesAdded)
    }
    return storiesAdded
}

//
getStoriesFromWeb()
    .then(stories => addStories(stories.articles))
    .then(added => console.log("articles added: ", added))
    .then(() => mongoose.disconnect())
    .catch(err => console.log(err))