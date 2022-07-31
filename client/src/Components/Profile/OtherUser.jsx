import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getOtherUser, getOtherUserPosts, getUsers } from '../../Actions/User';
import Post from '../Home/SinglePost';
import Loading from '../Loading/Loading';
import { AccountCircle } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import ListUser from './ListUser';
import './OtherUser.css'

export const OtherUser = () => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
      dispatch(getOtherUser(params.id));
      dispatch(getOtherUserPosts(params.id))
      dispatch(getUsers())
    }, [dispatch, params])


    
    const {user, loading: userLoading} = useSelector((state) => state.userProfile);
    const {posts, loading: postsLoading} = useSelector((state) => state.userPosts)
    const {user: users } = useSelector(state => state.allUsers);

    const {error: postMessageError, message} = useSelector((state) => state.post);

    useEffect(() => {
        if(postMessageError){
          toast.warning(postMessageError)
          dispatch({type: "clearError"})
        } 
        if(message) {
          toast.success(message)
          dispatch({type: "clearMessage"})
        }
      }, [postMessageError, message, dispatch])

      useEffect(() => {
        dispatch(getOtherUserPosts(params.id))
      }, [dispatch, params])


  const postLengthMoreThanZero = posts && posts.length > 0;


  return (( postsLoading ||  userLoading || !user || !posts) ? <Loading /> : 
  <div className='OtherUser'>

    <div className="profileleft"><div className="info">
      <div className="imgInfo">{user.profile_picture.url !== 'nil' ? <img src = {user.profile_picture.url} alt={user.name}/> : <AccountCircle />} </div>
      <h4 className='smallText'>Name: </h4>
      <h1 className='text'>{user.name}</h1>
      {user.posts.length === 0 ? <h1 className='text'>No Posts Yet</h1> : user.posts.length === 1 ? <h1 className='text'>1 Post</h1> : <h1 className='text'>{user.posts.length} Posts</h1>}

    </div>

    
 
    <div className="userPosts">
    {postLengthMoreThanZero ? (
      posts.map((post) => (
        <Post 
            ownerPicture = {post.author.profile_picture.url} 
            key = {post._id}
            picture={post.picture.url}
            postID = {post._id}
            title = {post.title}
            text = {post.text} 
            likes = {post.likes}
            comments = {post.comments}
            ownerID = {post.author._id}
            ownerName = {post.author.name}
            _currUserAccount =  {false}
            _delete = {false}
            curr_page='other'
            />
      ))
    ) : null}
    </div></div>

    <div className="profileright">
              <div className="profileRightInner">
                  <h3>Other Users</h3>
                  {users ? users.map((curr_user) => (
                    <ListUser 
                              pfp = {curr_user.profile_picture.url}
                              id = {curr_user._id}
                              key = {curr_user._id}
                              name = {curr_user.name}  
                              className = "likesUser"   
                    />
                  )) : null}
              </div>
    </div>


  </div>)
};

export default OtherUser

