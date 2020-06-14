import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import LoginSignupForm from "./LoginSignupForm";
import NavBar from "./NavBar";
import PrivateRoutes from "./PrivateRoutes";
import TokenContext from "./TokenContext";
import JoblyApi from "./HelperApi";
import './Routes.css';



/*Routes: handles our navigation to components
Switch handles our routes, Nav bar shows up on each page */
function Routes() {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(function getUser() {
    async function fetchCurrentUser() {
      try {
        let username = window.localStorage.getItem('username');
        if (username !== null) {
          let response = await JoblyApi.getCurrentUser(username);
          setCurrentUser(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchCurrentUser();
  }, [token]);

  return (
    <div className="container">
      <TokenContext.Provider value={{ token, setToken }}>
        <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/login">
            <LoginSignupForm currentUser={currentUser}/>
          </Route>
          {!!window.localStorage.getItem("token") &&
            <PrivateRoutes
              currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          <Redirect to="/" />
        </Switch>
      </TokenContext.Provider>
    </div>
  );

}

export default Routes;