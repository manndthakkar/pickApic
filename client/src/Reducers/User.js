import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    isAuth: false
}

export const userReducer = createReducer(initialState, {

    LoginRequest: (state) => { state.loading = true; },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload
        state.isAuth = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false;
    },

    RegisterRequest: (state) => { state.loading = true; },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false;
    },

    LoadUserRequest: (state) => { state.loading = true; },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false;
    }, 
    getPostsClearError: (state) => {
        state.error = null;
    },

    LogoutUserRequest: (state) => { state.loading = true; },
    LogoutUserSuccess: (state, action) => { 
        state.loading = false;
        state.user = null; 
        state.isAuth = false;
    },
    LogoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = true;
    }, 

    DeleteUserRequest: (state) => { state.loading = true; },
    DeleteUserSuccess: (state, action) => { 
        state.loading = false;
        state.user = null; 
        state.isAuth = false;
    },
    DeleteUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = true;
    }, 


    clearError: (state) => {
        state.error = null;
    },
})

export const getPostsReducer = createReducer({}, {
    getPostsRequest: (state) => { state.loading = true; },
    getPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    getPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getPostsClearError: (state) => {
        state.error = null;
    },
})


export const getUsersReducer = createReducer({}, {
    getUsersRequest: (state) => { state.loading = true; },
    getUsersSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    getUsersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getUsersClearError: (state) => {
        state.error = null;
    },
})

export const getUserReducer = createReducer({}, {
    getUserRequest: (state) => { state.loading = true; },
    getUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    getUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getUserClearError: (state) => {
        state.error = null;
    },
})

export const getUserPostsReducer = createReducer({}, {
    getUserPostsRequest: (state) => { state.loading = true; },
    getUserPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    getUserPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    getUserPostsClearError: (state) => {
        state.error = null;
    },
})