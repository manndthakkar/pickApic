import axios from "axios"

export const likePost = (id) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "likeRequest"
        })  
        const {data} = await axios.get(`https://pickapicstayconnected.herokuapp.com/feed/${id}`)
        // Redux: 
        dispatch({
            type: "likeSuccess",
            payload: data.message,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "likeFailure",
            payload: error.response.data.message, 
        })
    }
}

export const commentPost = (id, comment) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "commentRequest"
        })  

        const {data} = await axios.post(`https://pickapicstayconnected.herokuapp.com/feed/post/comments/${id}`, {comment}, {headers: {"Content-Type": "application/json"}})
        // Redux: 
        dispatch({
            type: "commentSuccess",
            payload: data.message,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "commentFailure",
            payload: error.response.data.message, 
        })
    }
}

export const deleteCommentPost = (id, commID) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "deleteCommentRequest"
        })  

        const { data } = await axios.delete(`https://pickapicstayconnected.herokuapp.com/feed/post/comments/${id}`, {
            data: { commID },
          });
          
        // Redux: 
        dispatch({
            type: "deleteCommentSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "deleteCommentFailure",
            payload: error.response.data.message, 
        })
    }
}


export const addNewPost = (title, text, img) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "addPostRequest"
        })  

        if(!img) img = false

        const { data } = await axios.post("https://pickapicstayconnected.herokuapp.com/feed/upload", {
            title, text, img
          }, {headers: { "Content-Type" : "application/json" }});
          
        // Redux: 
        dispatch({
            type: "addPostSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "addPostFailure",
            payload: error.response.data.message, 
        })
    }
}

export const updatePost = (title, caption, id) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "updatePostRequest"
        })  

        const { data } = await axios.put(`https://pickapicstayconnected.herokuapp.com/feed/:${id}`, {
            title, caption
          }, {headers: { "Content-Type" : "application/json" }});
          
        // Redux: 
        dispatch({
            type: "updatePostSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "updatePostFailure",
            payload: error.response.data.message, 
        })
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        // Redux: 
        dispatch({
            type: "deletePostRequest"
        })  

        const { data } = await axios.delete(`https://pickapicstayconnected.herokuapp.com/feed/${id}`);
          
        // Redux: 
        dispatch({
            type: "deletePostSuccess",
            payload: data,
        })
        
    } catch (error) {
        // Redux: 
        dispatch({
            type: "deletePostFailure",
            payload: error.response.data.message, 
        })
    }
}