import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import articleService from './articleService';

const initialState = {
    articles: []
}

export const getArticles = createAsyncThunk('articles/getAll', async (_, thunkAPI)=> {
    try {
        return await articleService.getArticles();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const createArticle = createAsyncThunk('article/create', async (articleData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await articleService.createArticle(articleData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteArticle = createAsyncThunk('article/delete', async (protocolId, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await articleService.deleteArticle(protocolId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        resetArticles: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticles.fulfilled, (state, action) => {
                state.articles = action.payload;
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.articles.push(action.payload);
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.articles = state.articles.filter((article) => article._id !== action.payload.id);
            })
    }
});

export const {resetArticles} = articleSlice.actions;
export default articleSlice.reducer;