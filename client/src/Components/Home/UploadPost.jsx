import React, { useState } from 'react'
import './UploadPost.css'
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from '../../Actions/Post';
import { toast } from 'react-toastify';
import { getPosts } from '../../Actions/User';


const UploadPost = () => {

  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const {loading} = useSelector(state => state.post)
  const dispatch = useDispatch();
  
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

  const formHandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addNewPost(title, caption, img));
    dispatch(getPosts());
    if(!img){
      toast.warning("Image Missing")
    }
    else{
      toast.success("Posted")
    }
  }

  return (
    <div className='UploadPost'>
      <form className="uploadPostForm" onSubmit={formHandleSubmit}>
        <h3>Add a New Post</h3>
        <input type="text" placeholder='Enter a Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder='Add a Caption' value={caption} onChange={(e) => setCaption(e.target.value)}/>

        <input type="file" id="file" accept="image/*" onChange={imageHandler}/>
        {img && <img src = {img} alt = "New Post"/>}
        {img ? <label htmlFor="file">Change picture</label> : <label htmlFor="file">Add a picture</label>}
        
        {loading ? <button disabled>Posting...</button> : <button type="submit">Post</button>}

      </form>


   
    </div>
  )
}

export default UploadPost