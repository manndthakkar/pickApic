import React from 'react'
import './ListUser.css'
import {AccountCircle} from '@mui/icons-material';


export const ListUser = ({id, name, pfp}) => {
  return (
    <a href = {`/user/profile/${id}`} className='user' >
        { pfp !== 'nil' ? <img src={pfp} alt = {name} /> : <AccountCircle />}
        <h4>{name}</h4>
    </a>
    
  )
}

export default ListUser