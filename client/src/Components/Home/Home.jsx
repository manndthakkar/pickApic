import React, { useEffect } from 'react';
import {Post} from './SinglePost';
import ListUser from '../Profile/ListUser';
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUsers } from '../../Actions/User';
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify';
import UploadPost from './UploadPost';

export const Home = () => {
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch])

  const {isAuth} = useSelector(state => state.user)
  const {postError, message} = useSelector((state) => state.post);
  const {loading, posts} = useSelector(state => state.allPosts);
  const { loading: userLoad, user } = useSelector(state => state.allUsers);

  useEffect(() => {
    if(postError){
      toast.warning(postError)
      dispatch({type: "clearError"})
    } 
    if(message) {
      toast.success(message)
      dispatch({type: "clearMessage"})
    }
  }, [postError, message, dispatch])

  

  return (
    ( loading || userLoad )? <Loading /> : (
      <div className="home">

        <div className="profileleft">
          {isAuth ? <UploadPost />: null}
          {posts ? (
            posts.map((post) => (
              <Post 
                    // TO Implement
                    // picture={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}`
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
                    curr_page={isAuth ? 'home' : 'none'}
                    />
            ))
          ) : null}
          

          
        </div>
        <div className="profileright">
              <div className="profileRightInner">
                  <h3>Other Users</h3>
                  {user ? user.map((curr_user) => (
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

    </div>
    )
  )
};

export default Home

