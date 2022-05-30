import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import articleService from './articleService';

const initialState = {
    articles: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const getArticles = createAsyncThunk('articles/getAll', async (_, thunkAPI)=> {
    try {
        return await articleService.getArticles();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const getArticleById = createAsyncThunk('article/delete', async (articleId, thunkAPI)=> {
    try {
        return await articleService.getArticleById(articleId);
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

export const deleteArticle = createAsyncThunk('article/delete', async (articleId, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await articleService.deleteArticle(articleId, token);
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
            .addCase(getArticles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArticles.fulfilled, (state, action) => {
                state.articles = action.payload;
            })
            .addCase(getArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getArticleById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArticleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.articles = action.payload;
            })
            .addCase(getArticleById.rejected, (state, action) => {
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
                state.articles.push(action.payload);
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // .addCase(deleteArticle.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(deleteArticle.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.articles = state.articles.filter((article) => article._id !== action.payload.id);
            // })
            // .addCase(deleteArticle.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = action.payload;
            // })
    }
});

export const {resetArticles} = articleSlice.actions;
export default articleSlice.reducer;