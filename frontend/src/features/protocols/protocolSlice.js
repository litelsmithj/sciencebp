import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import protocolService from './protocolService';

const initialState = {
    protocols: []
}

export const getProtocols = createAsyncThunk('protocols/getAll', async (_, thunkAPI) => {
    try {
        return await protocolService.getProtocols();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const getProtocolById = createAsyncThunk('protocol/getOne', async(protocolId, thunkAPI) => {
    try {
        return await protocolService.getProtocolById(protocolId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const createProtocol = createAsyncThunk('protocol/create', async (protocolData, thunkAPI) => {
    try {
        const token  = thunkAPI.getState().auth.user.token;
        return await protocolService.createProtocol(protocolData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateProtocol = createAsyncThunk('protocol/update', async (protocolData, thunkAPI) => {
    try {
        const token  = thunkAPI.getState().auth.user.token;
        return await protocolService.updateProtocol(protocolData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteProtocol = createAsyncThunk('protocol/delete', async (protocolId, thunkAPI) => {
    try {
        const token  = thunkAPI.getState().auth.user.token;
        return await protocolService.deleteProtocol(protocolId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const protocolSlice = createSlice({
    name: 'protocol',
    initialState,
    reducers: {
        resetProtocols: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProtocols.fulfilled, (state, action) => {
                state.protocols = action.payload;
            })
            .addCase(getProtocolById.fulfilled, (state, action) => {
                state.protocols = action.payload;
            })
            .addCase(createProtocol.fulfilled, (state, action) => {
                state.protocols.push(action.payload);
            })
            .addCase(updateProtocol.fulfilled, (state, action) => {
                state.protocols = action.payload;
            })
            .addCase(deleteProtocol.fulfilled, (state, action) => {
                state.protocols = state.protocols.filter(
                    (protocol) => protocol._id !== action.payload.id);
            })
    }
});

export const {resetProtocols} = protocolSlice.actions;
export default protocolSlice.reducer;