import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import TokenContext from "./TokenContext";
import CurrentUserContext from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import j from './images/j.jpg';

/*NavBar: renders navbar on every page, depending on logged in status of user*/
function NavBar() {
  const { setToken } = useContext(TokenContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  /**handleLogout: clears localStorage
   * resets token state (context)
   * redirects back to homepage via history
   */
  function handleLogout() {
    window.localStorage.clear();
    setToken("");
    setCurrentUser({});
    console.log("localStorage is:", localStorage);
    history.push('/');
  }

  // currentUser?.username ? "" : " disabled" authenticates which navbar to render based on token state
  return (
    <nav className="navbar navbar-expand">
      <NavLink className="navbar-jobly" exact to="/"><b><img className="NavBar-j" src={j} alt="j"></img>obly</b></NavLink>
      <div>
        <div className="navbar-nav">
          <NavLink className={`nav-item nav-link${currentUser?.username ? "" : " disabled"}`} exact to="/companies"><b>Companies</b></NavLink>
          <NavLink className={`nav-item nav-link${currentUser?.username ? "" : " disabled"}`} exact to="/jobs"><b>Jobs</b></NavLink>
          <NavLink className={`nav-item nav-link${currentUser?.username ? "" : " disabled"}`} exact to="/profile"><b>Profile</b></NavLink>
          <NavLink className={`nav-item nav-link${currentUser?.username ? "" : " disabled"}`} exact to="/logout" onClick={handleLogout} ><b>Log out</b></NavLink>
          <NavLink className={`nav-item nav-link${currentUser?.username ? " disabled" : ""}`} exact to="/login"><b>Log In • Sign Up</b></NavLink>
        </div>
      </div>
    </nav>
  )
  // navbar-brand
}


export default NavBar;