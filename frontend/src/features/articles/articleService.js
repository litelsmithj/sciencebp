import axios from 'axios';

const API_URL = '/api/articles/';

const getArticles = async () => {
    const response = await axios.get(API_URL);
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

const deleteArticle = async (protocolId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+protocolId, config);

    return response.data;
}

const articleService = {
    getArticles,
    createArticle,
    deleteArticle,
    
}

export default articleService;