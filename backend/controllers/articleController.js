const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel');

// @desc Get articles
// @route GET /api/articles
// @access private
const getArticles = asyncHandler(async(req, res) => {
    const articles = await Article.find();
    res.status(200).json(articles);
});

// @desc Get article by id
// @route GET /api/articles/:id
// @access private
const getArticleById = asyncHandler(async(req, res) => {
    const article = await Article.findById(req.params.id);

    if (!article) {
        res.status(400);
        throw new Error("Article not found");
    }

    res.status(200).json(article);
});

// @desc Set article
// @route POST /api/articles
// @access private
const setArticle = asyncHandler(async(req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error("Please enter a title");
    }

    const article = await Article.create({
        title: req.body.title
    });

    res.status(200).json(article);
});

// @desc Update article
// @route PUT /api/articles/:id
// @access private
const updateArticle = asyncHandler(async(req, res) => {
    const article = await Article.findById(req.params.id);

    if (!article) {
        res.status(400);
        throw new Error("Article not found");
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(200).json(updatedArticle);
});

// @desc Delete article
// @route DELETE /api/articles/:id
// @access private
const deleteArticle = asyncHandler(async(req, res) => {
    const article = await Article.findById(req.params.id);

    if (!article) {
        res.status(400);
        throw new Error("Article not found");
    }

    await article.deleteOne();

    res.status(200).json({ messsage: `Delete article of ${req.params.id}`});
});

module.exports = {
    getArticles,
    getArticleById,
    setArticle,
    updateArticle,
    deleteArticle
}


