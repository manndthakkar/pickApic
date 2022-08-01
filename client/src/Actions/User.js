import axios from "axios"

export const loginUser = (email, pass) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "LoginRequest"
        })
        // user/login and post request - API Call
        const {data} = await axios.post("/user/login", ({email: email, password: pass}), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        // Redux: 
        dispatch({
            type: "LoginSuccess",
            payload: data.user
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        })
    }
}

// If user is already logged in (in cookies)
export const loadUser = () => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "LoadUserRequest"
        })
        const {data} = await axios.get("/user/myprofile")
        
        // Redux: 
        dispatch({
            type: "LoadUserSuccess",
            payload: data
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message,
        })
    }
}

export const getPosts = () => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "getPostsRequest"
        })  
        const {data} = await axios.get("/feed/")
        
        // Redux: 
        dispatch({
            type: "getPostsSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "getPostsFailure",
            payload: error.response.data.message,
        })
    }
}

export const getUsers = (name = "") => async(dispatch) => {
    try {
        // Redux: 
        dispatch({ 
            type: "getUsersRequest"
        })  
        const {data} = await axios.get(`/user?name=${name}`)
        // Redux: 
        dispatch({
            type: "getUsersSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "getUsersFailure",
            payload: error.response.data.message,
        })
    }
}

export const getMyPosts = () => async(dispatch) => {
    try { 
        // Redux: 
        dispatch({
            type: "getMyPostsRequest"
        })  
        const {data} = await axios.get("/user/myprofile/posts")
        
        // Redux: 
        dispatch({
            type: "getMyPostsSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "getMyPostsFailure",
            payload: error.response.data.message,
        })
    }
}


export const logoutUser = () => async(dispatch) => {
    try {  
        // Redux: 
        dispatch({
            type: "LogoutUserRequest"
        })
        // user/login and post request - API Call
        const {data} = await axios.get("/user/logout")

        // Redux: 
        dispatch({
            type: "LogoutUserSuccess",
            payload: data
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message,
        })
    }
}

export const registerUser = (name, email, password, img) => async(dispatch) => {
    try {  
        // Redux: 
        dispatch({
            type: "RegisterRequest"
        })
        // user/login and post request - API Call
        const {data} = await axios.post("/user/register", ({name, email, password, img}), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        // Redux: 
        dispatch({
            type: "RegisterSuccess",
            payload: data.user
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message,
        })
    }
}

export const updateName = (name) => async(dispatch) => {
    try {  
        // Redux: 
        dispatch({
            type: "updateProfileRequest"
        })
        // user/login and post request - API Call
        const {data} = await axios.put("/user/upd/name", ({newName: name}), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        // Redux: 
        dispatch({
            type: "updateProfileSuccess",
            payload: data
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        })
    }
}

export const updateEmail = (email) => async(dispatch) => {
    try {  
        // Redux: 
        dispatch({
            type: "updateProfileRequest"
        })
        // user/login and post request - API Call
        const {data} = await axios.put("/user/upd/email", ({newEmail: email}), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        // Redux: 
        dispatch({
            type: "updateProfileSuccess",
            payload: data
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        })
    }
}

export const changePassword = (oldPass, newPass) => async(dispatch) => {
    try {  
        // Redux: 
        dispatch({
            type: "updateProfileRequest"
        })
        // user/login and post request - API Call
        const {data} = await axios.put("/user/upd/password", ({oldPass, newPass}), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        // Redux: 
        dispatch({
            type: "updateProfileSuccess",
            payload: data
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        })
    }
}


export const changeProfilePicture = (img) => async(dispatch) => {
    try {  
        // Redux: 
        dispatch({
            type: "updateProfileRequest"
        })
        // user/login and post request - API Call
        const {data} = await axios.put("/user/upd/img", ({img}), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(data)

        // Redux: 
        dispatch({
            type: "updateProfileSuccess",
            payload: data
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        })
    }
}


export const deleteUser = () => async(dispatch) => {
    try {  
        // Redux: 
        dispatch({
            type: "DeleteUserRequest"
        })
        // user/login and post request - API Call
        const {data} = await axios.delete("/user/delete/user")

        // Redux: 
        dispatch({  
            type: "DeleteUserSuccess",
            payload: data
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "DeleteUserFailure",
            payload: error.response.data.message,
        })
    }
}

export const getOtherUser = (id) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "getUserRequest"
        })  
        const {data} = await axios.get(`/user/profile/${id}`)
        // Redux: 
        dispatch({
            type: "getUserSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "getUserFailure",
            payload: error.response.data.message,
        })
    }
}

export const getOtherUserPosts = (id) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "getUserPostsRequest"
        })  
        const {data} = await axios.get(`/user/posts/${id}`)
        
        // Redux: 
        dispatch({
            type: "getUserPostsSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "getUserPostsFailure",
            payload: error.response.data.message,
        })
    }
}