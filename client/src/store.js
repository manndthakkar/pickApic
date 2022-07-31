import {configureStore} from "@reduxjs/toolkit";
import { getMyPostsReducer, postReducer } from "./Reducers/Post";
import {getPostsReducer, getUserPostsReducer, getUserReducer, getUsersReducer, userReducer} from "./Reducers/User"

const store = configureStore({
    reducer: {
        user: userReducer ,
        allPosts: getPostsReducer,  
        allUsers: getUsersReducer,
        post: postReducer,
        myPosts: getMyPostsReducer,
        userProfile: getUserReducer,
        userPosts: getUserPostsReducer,
    }
})

export default store;  