import React, { useEffect } from 'react';
import "./Login.css";
import {Link} from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../Actions/User';
import { toast } from 'react-toastify';

export const Login = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const { user, error} = useSelector(state => state.user);

  const loginHandler = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, pass))
  }

  useEffect(() => {
    if(error){
      toast.warning(error)
      dispatch({type: "clearError"})
    } 
    if(user) {
      toast.success("Logged in!")
      dispatch({type: "clearMessage"})
    }
  }, [error, dispatch, user])

  return <div className='login'>

      <form className='form' onSubmit={loginHandler}>
          <h2><span className='signIn'>Sign In</span> to Share Posts, and Like and Comment on other's posts</h2>
          <input type="email" placeholder='Email' required value = {email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' required value = {pass} onChange={(e)=>setPass(e.target.value)}/>
          
          <button type='submit'>Sign In</button>
          <Link to='/profile'>
              <h5>New Here? Sign Up!</h5>
          </Link>
      </form>

  </div>;
};

export default Login

