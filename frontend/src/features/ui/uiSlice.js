import {createSlice} from '@reduxjs/toolkit';
import {getProtocols, getProtocolById, createProtocol, deleteProtocol, updateProtocol} from '../protocols/protocolSlice';
import {getArticles, createArticle, deleteArticle} from '../articles/articleSlice';
import {register, login, logout} from '../auth/authSlice';

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProtocols.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArticles.fulfilled && getProtocols.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getProtocols.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProtocolById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProtocolById.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getProtocolById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createProtocol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProtocol.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createProtocol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProtocol.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProtocol.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
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
            })
            .addCase(deleteProtocol.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getArticles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteArticle.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const {reset} = uiSlice.actions;
export default uiSlice.reducer;