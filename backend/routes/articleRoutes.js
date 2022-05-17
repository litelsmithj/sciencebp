const express = require('express');
const router = express.Router();
const { getArticles, setArticle, updateArticle, deleteArticle, getArticleById } = require('../controllers/articleController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getArticles).post(protect, setArticle);

router.route('/:id').get(getArticleById).put(protect, updateArticle).delete(protect, deleteArticle);

module.exports = router;