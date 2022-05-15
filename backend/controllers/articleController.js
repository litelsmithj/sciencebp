const asyncHandler = require('express-async-handler');

// @desc Get articles
// @route GET /api/articles
// @access private
const getArticles = asyncHandler(async(req, res) => {
    res.status(200).json({ messsage: 'Get articles'});
});

// @desc Get article by id
// @route GET /api/articles/:id
// @access private
const getArticleById = asyncHandler(async(req, res) => {
    res.status(200).json({ messsage: `Get article of ${req.params.id}`});
});

// @desc Set article
// @route POST /api/articles
// @access private
const setArticle = asyncHandler(async(req, res) => {
    res.status(200).json({ messsage: 'Set article'});
});

// @desc Update article
// @route PUT /api/articles/:id
// @access private
const updateArticle = asyncHandler(async(req, res) => {
    res.status(200).json({ messsage: `Update article of ${req.params.id}`});
});

// @desc Delete article
// @route DELETE /api/articles/:id
// @access private
const deleteArticle = asyncHandler(async(req, res) => {
    res.status(200).json({ messsage: `Delete article of ${req.params.id}`});
});

module.exports = {
    getArticles,
    getArticleById,
    setArticle,
    updateArticle,
    deleteArticle
}


