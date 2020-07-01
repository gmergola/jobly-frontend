import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import "./login.css";

/**LoginSignupForm: Shows login or signup form depending on which button was clicked */
function LoginSignupForm() {
  const [formToShow, setFormToShow] = useState('');

  return (
      <div className="Login-container">
        {!window.localStorage.getItem("token") ?
          <div>
            <button className="login-signup-btn btn btn-primary" onClick={() => setFormToShow('login')}>Login</button>
            <br />
            <button className="login-signup-btn btn btn-secondary" onClick={() => setFormToShow('signup')}>Register</button>
          </div>
          :
          null}
        <br />
        <br />
        {formToShow === 'login' ? <LoginForm /> : null}

        {formToShow === 'signup' ? <SignupForm /> : null}

      </div>
  );
}

export default LoginSignupForm;