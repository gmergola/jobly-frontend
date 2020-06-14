import React from 'react';
import LoginSignupForm from "./LoginSignupForm";
import './HomePage.css';

function HomePage(){
  return(
    <div>
      <h1 className="Home-title">Welcome to Jobly!</h1>
      <h6 className="description text-muted">A place you can find and apply to the job of your dreams...</h6>
      <LoginSignupForm />
    </div>
  )

}

export default HomePage