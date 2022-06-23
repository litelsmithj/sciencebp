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

export const trackerExists = createAsyncThunk('tracker/exists', async(trackerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await trackerService.trackerExists(trackerData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const trackerWeekExists = createAsyncThunk('tracker/WeekExists', async(trackerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await trackerService.trackerWeekExists(trackerData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const addTrackerWeek = createAsyncThunk('tracker/addWeek', async(trackerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await trackerService.addTrackerWeek(trackerData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateTracker = createAsyncThunk('tracker/update', async(trackerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await trackerService.updateTracker(trackerData, token);
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
            .addCase(updateTracker.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(updateTracker.fulfilled, (state, action) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                state.trackers = action.payload;
            })
            .addCase(updateTracker.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
            .addCase(addTrackerWeek.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(addTrackerWeek.fulfilled, (state, action) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                state.trackers = action.payload;
            })
            .addCase(addTrackerWeek.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
            .addCase(trackerExists.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(trackerExists.fulfilled, (state) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                // No push to trackers for this slice
            })
            .addCase(trackerExists.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
            .addCase(trackerWeekExists.pending, (state) => {
                state.trackersLoading = true;
            })
            .addCase(trackerWeekExists.fulfilled, (state) => {
                state.trackersLoading = false;
                state.trackersSuccess = true;
                // No push to trackers for this slice
            })
            .addCase(trackerWeekExists.rejected, (state, action) => {
                state.trackersLoading = false;
                state.trackersError = true;
                state.trackersMessage = action.payload;
            })
    }
});

export const {resetTrackers} = trackerSlice.actions;
export default trackerSlice.reducer;