import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import trackerService from './trackerService';

const initialState = {
    trackers: [],
    trackersLoading: false,
    trackersError: false,
    trackersSuccess: false,
    trackersMessage: ''
};

export const getTrackers = createAsyncThunk('trackers/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await trackerService.getTrackers(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const getProtocolTrackerByUser = createAsyncThunk('ProtocolTracker/getByUser', async(protocolId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await trackerService.getProtocolTrackerByUser(protocolId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const addOne = createAsyncThunk('tracker/addOne', async(trackerId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await trackerService.addOne(trackerId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteTracker = createAsyncThunk('tracker/delete', () => {}); // No function, just add cases to clear trackers slice

export const createTracker = createAsyncThunk('tracker/create', async(trackerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await trackerService.createTracker(trackerData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {
        resetTrackers: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrackers.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(getTrackers.fulfilled, (state, action) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                state.trackers = action.payload;
            })
            .addCase(getTrackers.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
            .addCase(createTracker.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(createTracker.fulfilled, (state, action) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                // No push to trackers for this slice
            })
            .addCase(createTracker.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
            .addCase(getProtocolTrackerByUser.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(getProtocolTrackerByUser.fulfilled, (state, action) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                state.trackers = action.payload;
            })
            .addCase(getProtocolTrackerByUser.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
            .addCase(deleteTracker.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(deleteTracker.fulfilled, (state) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                state.trackers = []; // just clear
            })
            .addCase(deleteTracker.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
            .addCase(addOne.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(addOne.fulfilled, (state, action) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                state.trackers = action.payload;
            })
            .addCase(addOne.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
    }
});

export const {resetTrackers} = trackerSlice.actions;
export default trackerSlice.reducer;