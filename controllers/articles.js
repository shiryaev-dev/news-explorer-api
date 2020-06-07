const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const { articleForbiddenMessage, articleNotFoundMessage } = require('../messages/messages');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .populate('owner')
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .orFail(new NotFoundError(articleNotFoundMessage))
    .then((article) => {
      if ((article.owner._id).equals(req.user._id) !== true) {
        throw new ForbiddenError(articleForbiddenMessage);
      }
      return Article.deleteOne(article)
        .then(() => res.send({ data: article }));
    })
    .catch(next);
};
