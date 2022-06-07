import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import articleService from './articleService';

const initialState = {
    articles: [],
    articlesLoading: false,
    articlesError: false,
    articlesSuccess: false,
    articlesMessage: ''
}

export const getArticles = createAsyncThunk('articles/getAll', async (_, thunkAPI)=> {
    try {
        return await articleService.getArticles();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const getArticlesByProtocol = createAsyncThunk('articles/getAllByProtocol', async (protocolId, thunkAPI)=> {
    try {
        return await articleService.getArticlesByProtocol(protocolId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const getArticleById = createAsyncThunk('article/getOne', async (articleId, thunkAPI)=> {
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

export const updateArticle = createAsyncThunk('article/update', async (articleData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await articleService.updateArticle(articleData, token);
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
                state.articlesLoading = true;
            })
            .addCase(getArticles.fulfilled, (state, action) => {
                state.articlesLoading = false;
                state.articlesSuccess = true;
                state.articles = action.payload;
            })
            .addCase(getArticles.rejected, (state, action) => {
                state.articlesLoading = false;
                state.articlesError = true;
                state.articlesMessage = action.payload;
            })
            .addCase(getArticleById.pending, (state) => {
                state.articlesLoading = true;
            })
            .addCase(getArticleById.fulfilled, (state, action) => {
                state.articlesLoading = false;
                state.articlesSuccess = true;
                state.articles = action.payload;
            })
            .addCase(getArticleById.rejected, (state, action) => {
                state.articlesLoading = false;
                state.articlesError = true;
                state.articlesMessage = action.payload;
            })
            .addCase(getArticlesByProtocol.pending, (state) => {
                state.articlesLoading = true;
            })
            .addCase(getArticlesByProtocol.fulfilled, (state, action) => {
                state.articlesLoading = false;
                state.articlesSuccess = true;
                state.articles = action.payload;
            })
            .addCase(getArticlesByProtocol.rejected, (state, action) => {
                state.articlesLoading = false;
                state.articlesError = true;
                state.articlesMessage = action.payload;
            })
            .addCase(createArticle.pending, (state) => {
                state.articlesLoading = true;
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                state.articlesLoading = false;
                state.articlesSuccess = true;
                state.articles.push(action.payload);
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.articlesLoading = false;
                state.articlesError = true;
                state.articlesMessage = action.payload;
            })
            .addCase(updateArticle.pending, (state) => {
                state.articlesLoading = true;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.articlesLoading = false;
                state.articlesSuccess = true;
                state.articles = action.payload;
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.articlesLoading = false;
                state.articlesError = true;
                state.message = action.payload;
            })
            .addCase(deleteArticle.pending, (state) => {
                state.articlesLoading = true;
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.articlesLoading = false;
                state.articlesSuccess = true;
                state.articles = state.articles.filter((article) => article._id !== action.payload.id);
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.articlesLoading = false;
                state.articlesError = true;
                state.articlesMessage = action.payload;
            })
    }
});

export const {resetArticles} = articleSlice.actions;
export default articleSlice.reducer;