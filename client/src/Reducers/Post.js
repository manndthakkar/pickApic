import { createReducer } from "@reduxjs/toolkit";

export const postReducer = createReducer({}, {
    likeRequest: (state) => { state.loading = true; },
    likeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    likeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    commentRequest: (state) => { state.loading = true; },
    commentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    commentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteCommentRequest: (state) => { state.loading = true; },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    addPostRequest: (state) => { state.loading = true; },
    addPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updatePostRequest: (state) => { state.loading = true; },
    updatePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updatePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deletePostRequest: (state) => { state.loading = true; },
    deletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateProfileRequest: (state) => { state.loading = true; },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
})

export const getMyPostsReducer = createReducer({}, {
    getMyPostsRequest: (state) => { state.loading = true; },
    getMyPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    getMyPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    },
})