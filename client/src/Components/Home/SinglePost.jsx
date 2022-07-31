import React from 'react';
import './SinglePost.css'
import { Link, useParams } from 'react-router-dom';

import {AccountCircle, FavoriteBorder, ChatBubble, DeleteOutline, MoreHoriz, Favorite} from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { commentPost, likePost, updatePost, deletePost } from '../../Actions/Post';

import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { getMyPosts, getOtherUserPosts, getPosts, getUsers, loadUser } from '../../Actions/User';
import Comment from '../Comment/Comment';
import { toast } from 'react-toastify';


export const Post = ({
  postID, title, text, picture, likes = [], comments = [], ownerID, ownerPicture, ownerName, _currUserAccount = false, _delete = false, curr_page = 'home'}
) => {

  const [like, setLike] = useState(false);
  const [likedToggle, setLikedToggle] = useState(false);
  const [commtVal, setCommVal] = useState("");
  const [commToggle, setCommToggle] = useState(false);
  const [updPostToggle, setUpdPostToggle] = useState(false);

  const [newTitle, setNewTitle] = useState(title);
  const [newCaption, setNewCaption] = useState(text);

  const dispatch = useDispatch();

  let currLikeLength = likes.length;
  const params = useParams();

  const handleLike = async () => {

    await dispatch(likePost(postID))

    if(curr_page === 'home'){
      dispatch(getPosts());
    }
    else if(curr_page === 'me'){
      dispatch(getMyPosts());
    }
    else if(curr_page === 'other'){
      dispatch(getOtherUserPosts(params.id))
    }
    else if(curr_page === 'none'){
      toast.warning('Please Sign in First')
    }
  }

  const commentHandler = async (e) => {
    e.preventDefault();
    
    await dispatch(commentPost(postID, commtVal));
    setCommVal("");

    if(curr_page === 'home'){
      dispatch(getPosts());
    }
    else if(curr_page === 'me'){
      dispatch(getMyPosts());
    }
    else if(curr_page === 'other'){
      dispatch(getOtherUserPosts(params.id))
    }
    else if(curr_page === 'none'){
      toast.warning('Please Sign in First')
    }
  }

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    await dispatch(updatePost(newTitle, newCaption, postID));
    if(_currUserAccount){
      dispatch(getMyPosts());
    } else {
      dispatch(getPosts());
    }
    toast.success("Post Updated!")
  }
  
  const handleDeletePost = async () => {
    toast.success("Post Deleted")
    await dispatch(deletePost(postID));
    dispatch(getMyPosts());
    dispatch(getUsers());
    dispatch(loadUser());
  }

  let { user } = useSelector(state => state.user);
  if(!user) user = "x"
  useEffect(() => {
    if(user) {likes.forEach(x => {
      if(x._id === user._id){
        setLike(true)
      }
    })
  }}, [likes, user, dispatch]);

  return <div className='Post'>
      <div className="details">
          <Link to = {`/user/profile/${ownerID}`} className='user'>
            {ownerPicture !== 'nil' ? <img src={ownerPicture} alt = {ownerName} className='userImage'/> : <AccountCircle />}
            <h4 style={{"color": "white"}}>{ownerName}</h4>
          </Link>
          {_currUserAccount ? <Button onClick={() => setUpdPostToggle(!updPostToggle)}><MoreHoriz /></Button> : null}
      </div>

      <div className="postTitle"><h1>{title}</h1></div>
      {picture && <img src={picture} alt = {title} />}
      <div className="text"><h2>{text}</h2></div>

        <div>
          <Button onClick={handleLike}>
            {like? <Favorite /> : <FavoriteBorder />}
          </Button>
          <button onClick={() => setLikedToggle(!likedToggle)}>
            <h5 id="LikesLengthText">{currLikeLength} {currLikeLength !== 1 ? " Likes" : " Like"}</h5>
          </button>
        </div>

        <Button className='chatBubble' onClick={() => setCommToggle(!commToggle)}><ChatBubble /></Button>
        <button onClick={() => setCommToggle(!commToggle)}>
          <h5>{comments.length} {comments.length !== 1 ? " Comments" : " Comment"}</h5>
        </button>


      {_delete ? <div className='deletePost'>
            <Button className='child' onClick={handleDeletePost}><DeleteOutline /></Button>
            <h5 className='child'>Delete Post</h5>
                </div> : null}



      <Dialog open={likedToggle} onClose={() => setLikedToggle(!likedToggle)}>
        <div className="DialogBox">
          {currLikeLength > 0 ? <h1>Likes</h1> : <h1>No Likes</h1>}

          {likes.map(curr_like => (
            // ADD pfp ON TOP. do {let pfp = ""} on top and {pfp = <Link>} over here
            // pfp = "https://pbs.twimg.com/profile_images/864282616597405701/M-FEJMZ0_400x400.jpg",
            !curr_like._id ? null :
            <Link to = {`/user/profile/${curr_like._id}`} className='user' key = {curr_like._id}>
              {curr_like.profile_picture.url !== 'nil' ? <img src={curr_like.profile_picture.url} alt = {curr_like.name} /> : <AccountCircle />}
              <h4 className='likeUserName'style={{color: "rgba(240, 84, 84, 0.5)"}}>{curr_like.name}</h4>
            </Link>
          ))}
        </div>
      </Dialog>

      <Dialog open={commToggle} onClose={() => setCommToggle(!commToggle)}>
        <div className="DialogBox">
          <h1>Comments</h1>

          <form className="commForm" onSubmit={commentHandler}>
            <input type="text" value={commtVal} onChange={(e) => setCommVal(e.target.value)} placeholder='Add A New Comment' required/>
            <button type="submit" variant='contained' className='commentAddSubmit'>Add</button>
          </form>

          {comments[0] ? (comments.slice(0).reverse().map((comment) => (!comment.author._id ? null : <Comment 
            commenterID = {comment.author._id} commenterName={comment.author.name} commenterPicture={comment.author.profile_picture.url} 
            postID = {postID} comment = {comment.comments} commentID = {comment._id} key={comment._id} _isCurrCommentUserAccount={_currUserAccount}
          />))) : (<h4>No Comments Yet</h4>)}

        </div>
      </Dialog>


      <Dialog open={updPostToggle} onClose={() => setUpdPostToggle(!updPostToggle)}>
        <div className="DialogBox">
          <h1>Edit Your Post</h1>

          <form className="updForm" onSubmit={handleUpdatePost}>
            
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Add A New Comment' required/>
            <input type="text" value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder='Add A New Comment' required/>

            <button type="submit">Update</button>
          </form>

        </div>
      </Dialog>
      
  </div>;
};

export default Post

