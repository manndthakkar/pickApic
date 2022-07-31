import { Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changePassword, changeProfilePicture, deleteUser, getMyPosts, getUsers, loadUser, logoutUser, updateEmail, updateName } from '../../Actions/User';
import Post from '../Home/SinglePost';
import Loading from '../Loading/Loading';
import { AccountCircle } from '@mui/icons-material';
import './UserProf.css'

export const UserProf = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch])

  const {error: postError, message, loading} = useSelector((state) => state.post);
  const {postsLoading, posts} = useSelector(state => state.myPosts);
  const {userLoading, user} = useSelector(state => state.user)


  const [logoutToggle, setLogoutToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const [editToggle, setEditToggle] = useState(false);
  const [nameToggle, setNameToggle] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);
  const [passToggle, setPassToggle] = useState(false);
  const [imgToggle, setImgToggle] = useState(false);

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [img, setImg] = useState(null);

  

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
  

  const postLengthMoreThanZero = posts && posts.length > 0;

  const logoutHandler = async () => {
    await dispatch(logoutUser())
    toast.success("Logged out!")
  }

  const deleteHandler = async () => {
    dispatch(deleteUser())
    dispatch(logoutUser())
    dispatch(loadUser())
    toast.success("Profile Deleted Successfully")
  }

  const handleChangeName = async (e) => {
    e.preventDefault();
    toast.success("Name Changed")
    await(dispatch(updateName(newName)))
    dispatch(loadUser())
    dispatch(getUsers());
    setNameToggle(false)
    setEditToggle(false)
  }

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    toast.success("Email Changed")
    await(dispatch(updateEmail(newEmail)))
    dispatch(loadUser())
    dispatch(getUsers());
    setEmailToggle(false)
    setEditToggle(false)
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    await(dispatch(changePassword(oldPass, newPass)))
    dispatch(loadUser())
    dispatch(getUsers());
    setPassToggle(false)
    setEditToggle(false)
    toast.success("Password Updated")
  }

  const handleChangeProfilePicture = async (e) => {
    e.preventDefault();
    toast.success("Profile Picture Changed")
    await(dispatch(changeProfilePicture(img)))
    dispatch(loadUser())
    dispatch(getUsers());
    setPassToggle(false)
    setEditToggle(false)
  }

  const imageHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    }
  }


  return (( postsLoading ||  userLoading ) ? <Loading /> : 
  <div className='UserProf'>

    <div className="info">
      <div className="imgInfo">{user.profile_picture.url !== 'nil' ? <img src = {user.profile_picture.url} alt={user.name}/> : <AccountCircle />} </div>
      <h4 className='smallText'>Name: </h4>
      <h1 className='text'>{user.name}</h1>
      <h4 className='smallText'>Email: </h4>
      <h1 className='text'>{user.email}</h1>
      <h1 className='text'>{user.posts.length} {user.posts.length !== 1 ? "Posts" : "Post"}</h1>

      <div className="infoButtons">
        <button className='commentAddSubmit' onClick={() => setEditToggle(!editToggle)}>Edit Profile</button>
        <button className='commentAddSubmit' onClick={() => setLogoutToggle(!logoutToggle)}>Logout</button>
        <button className='commentAddSubmit' onClick={() => setDeleteToggle(!deleteToggle)}>Delete your Profile</button>

      </div>
    </div>

    
 
    <div className="userPosts">

    {postLengthMoreThanZero ? <h1 className='postsText'>Posts</h1> : <h1 className='postsText'>No Posts Yet</h1>}
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
            _currUserAccount =  {true}
            _delete = {true}
            curr_page = 'me'
            />
      ))
    ) : null}
    </div>


    <Dialog open={logoutToggle} onClose={() => setLogoutToggle(!logoutToggle)}>
        <div className="logDelete">
          <h1>Are You sure you want to Logout ?</h1>
          <button onClick={logoutHandler}>Logout</button>
        </div>
    </Dialog>

    <Dialog open={deleteToggle} onClose={() => setDeleteToggle(!deleteToggle)}>
        <div className="logDelete">
          <h1>Are You sure you want to Delete you Profile ?</h1>
          {!loading ? <button onClick={deleteHandler}>DELETE</button> : <button disabled>DELETING YOUR PROFILE</button>}
        </div>
    </Dialog>

    <Dialog open={editToggle} onClose={() => setEditToggle(!editToggle)}>
        <div className="DialogBoxAll">
          <h1>Change your...</h1>
          <button onClick={() => setNameToggle(!nameToggle)}>Name?</button>
          <button onClick={() => setEmailToggle(!emailToggle)}>Email?</button>
          <button onClick={() => setPassToggle(!passToggle)}>Password?</button>
          <button onClick={() => setImgToggle(!imgToggle)}>Profile Picture?</button>
        </div>
    </Dialog>
    
    <Dialog open={nameToggle} onClose={() => setNameToggle(!nameToggle)}>
        <div className="DialogBox">
          <h1>Change your Name</h1>
          <form className="updForm" onSubmit={handleChangeName}>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder='Enter a new name' required/>
            <button type="submit">Update</button>
          </form>
        </div>
    </Dialog>

    <Dialog open={emailToggle} onClose={() => setEmailToggle(!emailToggle)}>
        <div className="DialogBox">
          <h1>Change your Email</h1>
          <form className="updForm" onSubmit={handleChangeEmail}>
            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder='Enter a new Email' required/>
            <button type="submit">Update</button>
          </form>
        </div>
    </Dialog>

    <Dialog open={passToggle} onClose={() => setPassToggle(!passToggle)}>
        <div className="DialogBox">
          <h1>Change your Password</h1>
          <form className="updForm" onSubmit={handleChangePassword}>
            <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder='Old Password...' required/>
            <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder='New Password...' required/>
            <button type="submit">Update</button>
          </form>
        </div>
    </Dialog>

    <Dialog open={imgToggle} onClose={() => setImgToggle(!imgToggle)}>
        <div className="DialogBox">
          <h1>Change your Profile Picture</h1>
          <form className="updFormAll" onSubmit={handleChangeProfilePicture}>
            <input type="file" id="file" accept="image/*" onChange={imageHandler}/>
            {img && <img src = {img} alt = "New Post"/>}
            {img ? <label htmlFor="file">Change picture</label> : <label htmlFor="file">Add a profile picture</label>}

            {img ? <button type="submit">Update</button> : null}
          </form>
        </div>
    </Dialog>


  </div>)
};

export default UserProf

