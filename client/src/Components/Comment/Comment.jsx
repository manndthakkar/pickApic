import React from 'react'
import { AccountCircle, Delete } from '@mui/icons-material'
import './Comment.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentPost } from '../../Actions/Post'
import { getMyPosts, getPosts } from '../../Actions/User'
import { toast } from 'react-toastify'

const Comment = ({commenterID, commenterName, commenterPicture, postID, comment, commentID, _isCurrCommentUserAccount}) => {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()

  const deleteCommHandler = async () => {
    await dispatch(deleteCommentPost(postID, commentID));
    if(_isCurrCommentUserAccount){
      dispatch(getMyPosts());
    } else {
      await dispatch(getPosts());
    }
    toast.success("Comment Deleted")
  }

  return (
    !commenterID ? null : 
    <div className='commentUser'>
        <Link to = {`/user/profile/${commenterID}`} className='user' key = {commenterID}>
            { commenterPicture !== 'nil' ? <img src={commenterPicture} alt = {commenterName} /> : <AccountCircle />}
            <h4 className='likeUserName' style={{color: "rgba(240, 84, 84, 0.5)"}}>{commenterName}</h4>
        </Link>

        {user ? (_isCurrCommentUserAccount || commenterID === user._id) ? <Button onClick={() => deleteCommHandler()}><Delete /></Button> : null : null}
        <h5>{comment}</h5>
    </div>
  )
}

export default Comment