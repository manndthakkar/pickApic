import React, { useEffect } from 'react';
import { ListUser } from './ListUser'
import "./Main.css";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Actions/User';
import Loading from '../Loading/Loading';
import UserProf from './UserProf';
import Register from './Register';

export const Profile = () => {

      const dispatch = useDispatch();
      useEffect(() => {
            dispatch(getUsers());
      }, [dispatch])
      const { loading: userLoad, user } = useSelector(state => state.allUsers);
      const {isAuth} = useSelector(state => state.user);


  return(userLoad ? <Loading /> : <div className='users'>

      <div className="profileleft">{isAuth ? <UserProf /> : <Register />}</div>
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

  </div>)
};

export default Profile

