const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel');
const User = require('../models/userModel');

// @desc Get articles
// @route GET /api/articles
// @access public
const getArticles = asyncHandler(async(req, res) => {
    const articles = await Article.find();
    res.status(200).json(articles);
});

// @desc Get article by id
// @route GET /api/articles/:id
// @access public
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
        title: req.body.title,
        user: req.user.id
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

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (article.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
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

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (article.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
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


