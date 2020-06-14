import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import TokenContext from "./TokenContext";
import { useHistory } from "react-router-dom";

/*NavBar: renders navbar on every page, depending on logged in status of user*/
function NavBar({currentUser, setCurrentUser}) {
  const {setToken} = useContext(TokenContext);
  const history = useHistory();

// upon logout, clears localStorage, resets token state (context) and redirects
//back to homepage via history
  function handleLogout(){
    window.localStorage.clear();
    setToken("");
    setCurrentUser({});
    console.log("localStorage is:", localStorage);
    history.push('/');
  }

//authenticates which navbar to render based on token state
  if(currentUser.username){
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink exact to="/companies">Companies</NavLink></li>
        <li><NavLink exact to="/jobs">Jobs</NavLink></li>
        <li><NavLink exact to="/profile">Profile</NavLink></li>
        <li><NavLink exact to="/" onClick={handleLogout} >LogOut</NavLink></li>
      </ul>
    </nav>
  )
  } else {
  return(
    <nav>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink exact to="/login">Log In</NavLink></li>
      </ul>
    </nav>
  )
  }

}

export default NavBar