import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from "./HelperApi";
import { useHistory } from "react-router-dom";
import TokenContext from "./TokenContext";
import Alert from './Alert';
import "./login.css";

/**SignupForm: Authenticates a user that has just registered.
 * Throws errors passed to the Alert compnent if errors arise
*/
function SignupForm() {
  const history = useHistory();
  const initialData = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: ''
  }

  const [formData, setFormData] = useState({ ...initialData });
  const [signingUp, setsigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const { setToken } = useContext(TokenContext);

  useEffect(function registerOrLogin() {
    /*signup: uses register request method, sets token state with responseToken, saves token in
    localStorage, redirects to companies once logged in via history */
    async function signUp() {

      try {
        let responseToken = await JoblyApi.signup(formData);
        window.localStorage.setItem('token', responseToken);
        window.localStorage.setItem('username', formData.username);
        setToken(responseToken);
        history.push("/companies");
      } catch (err) {
        setErrorMessage(messages => ([
          ...messages, ...err
        ]));
        console.error(err);
      }
    }

    if (signingUp) {
      signUp();
      setsigningUp(false);
      setFormData(initialData);
      setErrorMessage([]);
    }


  }, [signingUp, formData, initialData, setToken, history]);

  function handleSubmitSignUp(evt) {
    evt.preventDefault();
    setsigningUp(true);
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
    showLoading && errorMessage.length === 0 ? <div className="loading-message" ><b>Thanks for making an account... Please wait while we load all companies</b></div> :
    <div className="Login-container">
      {errorMessage.length > 0 && <div className="alert alert-danger"><Alert type="danger" message={errorMessage} /></div>}
      <br />
      <br />
      <form className="signUpForm" onSubmit={handleSubmitSignUp}>
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
          <input type="password" className="form-control" onChange={handleChange} value={formData.password} name="password"></input>
        </div>
        <button className="signup-btn btn btn-secondary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;