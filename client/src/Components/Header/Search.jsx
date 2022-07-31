import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Actions/User";
import ListUser from '../Profile/ListUser'
import "./Search.css";

const Search = () => {
  const [name, setName] = React.useState("");

  const { user } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch(); 
  const submitHandler = (e) => { 
    e.preventDefault();
    dispatch(getUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <h3>
          Search Someone...
        </h3>

        <input type="text" value={name} placeholder="Enter Name" 
          onChange={(e) => setName(e.target.value)}
        />

        <button className="button"  type="submit">
          Search
        </button>

        <div className="searchResults">
          {user &&
            user.map((curr_user) => (
              <ListUser
                key={curr_user._id}
                id={curr_user._id}
                name={curr_user.name}
                pfp={curr_user.profile_picture.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;