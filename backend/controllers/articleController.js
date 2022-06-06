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

// @desc Get articles by protocol
// @route GET /api/articles
// @access public
const getArticlesByProtocol = asyncHandler(async(req, res) => {
    if (!req.body.protocol) {
        res.status(400);
        throw new Error("No protocol given");
    }

    const articles = await Article.find({protocol: req.body.protocol});
    res.status(200).json(articles);
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
        body: req.body.body,
        author: req.user.id,
        protocol: (req.body.protocol? req.body.protocol : null)
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

    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (article.author.toString() !== req.user.id) {
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
    
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (article.author.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await article.deleteOne();

    res.status(200).json({id: req.params.id});
});

module.exports = {
    getArticles,
    getArticleById,
    getArticlesByProtocol,
    setArticle,
    updateArticle,
    deleteArticle
}


