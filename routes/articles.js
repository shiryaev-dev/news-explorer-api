const articleRouter = require('express').Router();
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');
const { createArticleValidator, deleteArticleValidator } = require('../validators/article-validators');
const auth = require('../middlewares/auth');

articleRouter.post('/articles', auth, createArticleValidator, createArticle);
articleRouter.get('/articles', auth, getArticles);
articleRouter.delete('/articles/:articleId', auth, deleteArticleValidator, deleteArticle);

module.exports = articleRouter;
