import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import protocolService from './protocolService';

const initialState = {
    protocols: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
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
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProtocols.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProtocols.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.protocols = action.payload;
            })
            .addCase(getProtocols.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProtocolById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProtocolById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.protocols = action.payload;
            })
            .addCase(getProtocolById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createProtocol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProtocol.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.protocols.push(action.payload);
            })
            .addCase(createProtocol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProtocol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProtocol.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.protocols = action.payload;
            })
            .addCase(updateProtocol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteProtocol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProtocol.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.protocols = state.protocols.filter(
                    (protocol) => protocol._id !== action.payload.id);
            })
            .addCase(deleteProtocol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const {reset} = protocolSlice.actions;
export default protocolSlice.reducer;