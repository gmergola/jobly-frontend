import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from "./HelperApi";
import { useHistory } from "react-router-dom";
import TokenContext from "./TokenContext";
import Alert from './Alert';
import "./login.css";
import blueLines from './images/blue-lines.gif';

/**LoginSignupForm:  parent component of alert, child component of homepage,routes
 * renders forms, sends request, receives token or error based on response,
 * authenticates user or Alerts user to error, redirects to company page upon login
*/
function LoginSignupForm() {
  const history = useHistory();
  const initialData = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: ''
  }
  const [hideLogin, setHideLogin] = useState('Hidden');
  const [hideSignup, setHideSignup] = useState('Hidden');
  const [formData, setFormData] = useState({ ...initialData });
  const [logginIn, setlogginIn] = useState(false);
  const [signingUp, setsigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const { setToken } = useContext(TokenContext);


  /*registerOrLogin: invokes login/register requests (depending on which form is submitted)
    then resets submit click states, and hides error messages if exposed
  */
  useEffect(function registerOrLogin() {

    /*logIn: uses login request method, sets token state with response, saves token in
    localStorage, redirects to companies once logged in via history */
    async function logIn() {

      try {
        let response = await JoblyApi.login(formData);
        window.localStorage.setItem('token', response);
        window.localStorage.setItem('username', formData.username);
        setToken(response);
        history.push("/companies");
      }
      catch (err) {
        setErrorMessage(messages=>([
          ...messages, ...err
        ]));
        console.error(err);
      }


    }

    /*signup: uses register request method, sets token state with response, saves token in
    localStorage, redirects to companies once logged in via history */
    async function signUp() {

      try {
        let response = await JoblyApi.signup(formData);
        window.localStorage.setItem('token', response);
        window.localStorage.setItem('username', formData.username);
        setToken(response);
        history.push("/companies");
      } catch (err) {
        setErrorMessage(messages=>([
          ...messages, ...err
        ]));
        console.error(err);
      }

    }


    if (logginIn) {
      logIn();
      setlogginIn(false);
      setFormData(initialData);
      setErrorMessage([]);


    }
    else if (signingUp) {
      signUp();
      setsigningUp(false);
      setFormData(initialData);
      setErrorMessage([]);

    }


  }, [signingUp, logginIn, formData, initialData, setToken, history])


  function handleSubmitSignUp(evt) {
    evt.preventDefault();
    setsigningUp(true);
  }

  function handleSubmitLogin(evt) {
    evt.preventDefault();
    setlogginIn(true);
    console.log("login", localStorage);

  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  //toggles our register/login forms to view the appropriate form
  function handleRegisterButton() {
    setHideLogin("Hidden");
    setHideSignup("");
  }
  function handleLoginButton() {
    setHideLogin("");
    setHideSignup("Hidden");
  }

  return (
    <div className="Login-container">
      <div ><Alert errors={errorMessage} /></div>
      {!window.localStorage.getItem("token") ?
      <div>
      <button className="login-signup-btn btn btn-primary" onClick={handleLoginButton}>Login</button>
      <br />
      <button className="login-signup-btn btn btn-secondary" onClick={handleRegisterButton}>Register</button>
      </div>
      :
      <img src={blueLines} alt="lines"/>}
      <br />
      <br />
      <form className={`"loginForm" "form-group" ${hideLogin}`} onSubmit={handleSubmitLogin}>
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
          <input className="form-control" onChange={handleChange} value={formData.password} name="password"></input>
        </div>
        <br />
        <button className="login-btn btn btn-primary" type="submit">Submit</button>
      </form>


      <form className={`"signUpForm" ${hideSignup}`} onSubmit={handleSubmitSignUp}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">First and last name</span>
          </div>
          <input className="form-control" onChange={handleChange} value={formData.first_name} name="first_name"></input><br />
          <input className="form-control" onChange={handleChange} value={formData.last_name} name="last_name"></input><br />
        </div>
        <br />

        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Email</span>
          </div>
          <input className="form-control" onChange={handleChange} value={formData.email} name="email"></input>
        </div>
        <br />

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
          <input className="form-control" onChange={handleChange} value={formData.password} name="password"></input>
        </div>
        <button className="signup-btn btn btn-secondary" type="submit">Submit</button>
      </form>
    </div>
  )

}

export default LoginSignupForm;