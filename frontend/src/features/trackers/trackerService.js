import axios from 'axios';

const API_URL = '/api/trackers/';

const createTracker = async(trackerData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, trackerData, config);

    return response.data;
};

const getTrackers = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

const trackerService = {
    createTracker,
    getTrackers,

}

export default trackerService;