import axios from 'axios';

const API_URL = '/api/articles/';

const getArticles = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const getArticleById = async (articleId) => {
    const response = await axios.get(API_URL+articleId);
    return response.data;
}

const createArticle = async (articleData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, articleData, config);

    return response.data;
}

const deleteArticle = async (articleId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+articleId, config);

    return response.data;
}

const articleService = {
    getArticles,
    getArticleById,
    createArticle,
    deleteArticle,
    
}

export default articleService;