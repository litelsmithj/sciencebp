const express = require('express');
const router = express.Router();
const { getArticles, setArticle, updateArticle, deleteArticle, getArticleById } = require('../controllers/articleController');

router.route('/').get(getArticles).post(setArticle);

router.route('/:id').get(getArticleById).put(updateArticle).delete(deleteArticle);

module.exports = router;