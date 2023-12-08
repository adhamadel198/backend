const articleservice = require('../services/article');
const userModel = require('../models/usermodel');

const findAllArticles = async (req, res) => {
    try {
      const articles = await articleservice.findAllArticles();
      res.status(200).json({ articles });
    } catch (err) {
      console.error('Error fetching articles:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  

const getArticlesByKeyword = async (req, res) => {
    const keyword = req.params.keyword;

    try {
        let articles;
        if (keyword === 'all') {
            articles = await articleservice.findAllArticles();
        } else {
            articles = await articleservice.getArticlesByKeyword(keyword);
        }

        return res.status(200).send({
            articles,
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message,
        });
    }
};

const addNewArticle =async(req,res) => {
    const articleinfo={
        description: req.body.description,
        publishdate: req.body.publishdate,
        keyword: req.body.keyword,
        imgurl: req.body.imgurl
    };
    try{
        const createdarticle = await articleservice.addNewArticle(articleinfo);
        return res.status(201).send({
            msg: 'article created successfully',
            articleid: createdarticle._id
        });
    }catch(err){
        return res.status(500).send({
            error: err.message
        });
    };
}

const getArticlesByUserTopics = async (req, res) => {
    try {
      const username = req.params.username;
  
      
      const user = await userModel.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userTopics = user.topic || [];
  
      
      const articles = await articleservice.getArticlesByKeyword({ $in: userTopics });
  
      res.status(200).json({ articles });
    } catch (error) {
      console.error('Error retrieving articles by user topics:', error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    findAllArticles,
    getArticlesByKeyword,
    addNewArticle,
    getArticlesByUserTopics
};