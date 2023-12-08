const { Router } = require('express');
const articlecontroller = require('../controllers/article.js');
const articlerouter = Router();

articlerouter.get('/', articlecontroller.findAllArticles);
articlerouter.get('/:keyword', articlecontroller.getArticlesByKeyword);
articlerouter.post('/', articlecontroller.addNewArticle);
articlerouter.get('/user/:username', articlecontroller.getArticlesByUserTopics);
articlerouter.route("/updateArticle").put(articlecontroller.updateArticle);

module.exports = articlerouter;