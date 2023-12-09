const Article = require('../models/article');


const findAllArticles = async () => {
    return await Article.find();
};


const getArticlesByKeyword = async (keyword) => {
    return await Article.find({ keyword });
};


const addNewArticle = async (articleInfo) => {
    const newArticle = new Article(articleInfo);
    return await newArticle.save();
};

const getArticlesByTopic = async (topics) => {
    return await Article.find({ keyword: { $in: topics } });
};

const getArticlesByPublisherId = async (publisherId) => {
    return await Article.find({ publisherId });
};

module.exports = {
    findAllArticles,
    getArticlesByKeyword,
    addNewArticle,
    getArticlesByTopic,
    getArticlesByPublisherId
};
