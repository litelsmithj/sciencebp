import axios from 'axios';

const API_URL = '/api/articles/';
const PROTO_API_URL = '/api/protocols/';

const getArticles = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

const getArticlesByProtocol = async (protocolId) => {
    const response = await axios.get(PROTO_API_URL+protocolId+'/articles');
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

const updateArticle = async (articleData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL+articleData._id, articleData, config);

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
    getArticlesByProtocol,
    createArticle,
    updateArticle,
    deleteArticle,
    
}

export default articleService;