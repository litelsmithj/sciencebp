import axios from 'axios';

const API_URL = '/api/protocols/';

const createProtocol = async (protocolData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, protocolData, config);

    return response.data;
}

const getProtocols = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const deleteProtocol = async (protocolId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + protocolId, config);

    return response.data;
}

const protocolService = {
    getProtocols,
    createProtocol,
    deleteProtocol
};

export default protocolService;