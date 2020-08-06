import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from "./HelperApi";
import { useHistory } from "react-router-dom";
import TokenContext from "./TokenContext";
import Alert from './Alert';
import "./login.css";

/**LoginForm: renders form to login.
 * Authenticates user or throws error passed to the Alert component */
function LoginForm() {
  const history = useHistory();
  const initialData = {
    username: '',
    password: ''
  }

  const [formData, setFormData] = useState({ ...initialData });
  const [logginIn, setlogginIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const { setToken } = useContext(TokenContext);

  useEffect(function letsLogin() {

    /*logIn: uses login request method, sets token state with responseToken, saves token in
    localStorage, redirects to companies once logged in via function returned from the useHistory hook*/
    async function logIn() {

      try {
        let responseToken = await JoblyApi.login(formData);
        window.localStorage.setItem('token', responseToken);
        window.localStorage.setItem('username', formData.username);
        setToken(responseToken);
        history.push("/companies");
      }
      catch (err) {
        setErrorMessage(messages => ([
          ...messages, ...err
        ]));
      }


    }
    if (logginIn) {
      logIn();
      setlogginIn(false);
      setFormData(initialData);
      setErrorMessage([]);
    }
  }, [logginIn, formData, initialData, setToken, history])



  function handleSubmitLogin(evt) {
    evt.preventDefault();
    setlogginIn(true);
    setShowLoading(true);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  return (
    showLoading && errorMessage.length === 0 ? <div className="loading-message"><b>Thanks for logging in... Please wait while we load all companies</b></div> :
    <div className="Login-container">
      <div ><Alert errors={errorMessage} /></div>
      <br />
      <br />
      <form className="loginForm form-group" onSubmit={handleSubmitLogin}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Username</span>
          </div>
          <input className="form-control" onChange={handleChange} value={formData.username} name="username"></input>
        </div>
        <br />
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Password</span>
          </div>
          <input type="password" className="form-control" onChange={handleChange} value={formData.password} name="password"></input>
        </div>
        <br />
        <button className="login-btn btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginForm;