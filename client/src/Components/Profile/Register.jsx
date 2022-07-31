import React from 'react';
import "./Register.css";
import {Link} from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getUsers, loadUser, loginUser, registerUser } from '../../Actions/User';

export const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [img, setImg] = useState(null);
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
        await dispatch(registerUser(name, email, pass, img));
        await dispatch(loginUser(email, pass));
        dispatch(loadUser())
        dispatch(getUsers())
    }
    

  return <div className='register'>

      <form onSubmit={formHandleSubmit} className="registerUserForm">
          <h2><span className='signIn'>Sign Up</span> to Share Posts, and Like and Comment on other's posts</h2>

          <input type="file" id="file" accept="image/*" onChange={imageHandler}/>
          {img && <img src = {img} alt = "New Post"/>}
          {img ? <label htmlFor="file">Change picture</label> : <label htmlFor="file">Add a profile picture</label>}

          <input type="text" placeholder='Name' required value = {name} onChange={(e)=>setName(e.target.value)}/>
          <input type="email" placeholder='Email' required value = {email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' required value = {pass} onChange={(e)=>setPass(e.target.value)}/>
          
          <button type='submit'>Sign Up</button>
          <Link to='/login'>
              <h5>Already have an account? Sign in</h5>
          </Link>
      </form>

  </div>;
};

export default Register

