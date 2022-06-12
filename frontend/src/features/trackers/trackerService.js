import axios from 'axios';

const API_URL = '/api/trackers/';
const PROTO_API_URL = '/api/protocols/';

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

const getProtocolTrackerByUser = async(protocolId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(PROTO_API_URL+protocolId+'/tracker', config);

    return response.data;
}

const addOne = async(trackerId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL+trackerId, {}, config);

    return response.data;
}

const trackerService = {
    createTracker,
    getTrackers,
    getProtocolTrackerByUser,
    addOne,

}

export default trackerService;