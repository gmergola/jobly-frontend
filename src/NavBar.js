import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import TokenContext from "./TokenContext";
import { useHistory } from "react-router-dom";

/*NavBar: renders navbar on every page, depending on logged in status of user*/
function NavBar({ currentUser, setCurrentUser }) {
  const { setToken } = useContext(TokenContext);
  const history = useHistory();

  // upon logout, clears localStorage, resets token state (context) and redirects
  //back to homepage via history
  function handleLogout() {
    window.localStorage.clear();
    setToken("");
    setCurrentUser({});
    console.log("localStorage is:", localStorage);
    history.push('/');
  }

  //authenticates which navbar to render based on token state
  if (currentUser.username) {
    return (
      <nav>
        <ul>
          <li><NavLink exact to="/"><b>Home</b></NavLink></li>
          <li><NavLink exact to="/companies"><b>Companies</b></NavLink></li>
          <li><NavLink exact to="/jobs"><b>Jobs</b></NavLink></li>
          <li><NavLink exact to="/profile"><b>Profile</b></NavLink></li>
          <li><NavLink exact to="/" onClick={handleLogout} ><b>LogOut</b></NavLink></li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav>
        <ul>
          <li><NavLink exact to="/"><b>Home</b></NavLink></li>
          <li><NavLink exact to="/login"><b>Log In</b></NavLink></li>
        </ul>
      </nav>
    )
  }

}

export default NavBar;