import React, { useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom';

import {HomeRounded, SearchRounded, PersonRounded} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Dialog } from '@mui/material';
import Search from './Search';

import logo from './pickApic.png'


const Header = () => {
  const [currScreen, setCurrScreen] = useState(window.location.pathname);
  const [postToggle, setPostToggle] = useState(false);


  const {isAuth} = useSelector(state => state.user);
  return <div className='header'>
    <div className="img">
      <Link to="/" onClick={()=>setCurrScreen('/')}>
        <img src={logo} width={168} height={52.8} margin={50} alt='pickApic'/>
      </Link>
    </div>

    <Link to="/" onClick={()=>setCurrScreen('/')}>
      {currScreen === '/' ? <HomeRounded style={{ color: "#121212" }}/> : <HomeRounded/>}
    </Link>
    
    <button onClick={()=>setPostToggle(!postToggle)}>
      {currScreen === '/search' ? <SearchRounded style={{ color: "#121212" }}/> : <SearchRounded/>}
    </button>

    <Link to="/profile" onClick={()=>setCurrScreen("/profile")}>
      {currScreen === '/profile' ? <PersonRounded style={{ color: "#121212" }}/> : !isAuth? <PersonRounded style={{ color: "#30475E" }}/> : <PersonRounded/>}
    </Link>

    <Dialog open={postToggle} onClose={() => setPostToggle(!postToggle)}>
      <div className="searchDialogBox">
            
            <Search />

        </div>
    </Dialog>

  </div>
}

export default Header