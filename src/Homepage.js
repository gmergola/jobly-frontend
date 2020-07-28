import React from 'react';
import './HomePage.css';
import j from './images/j.jpg';

function HomePage(){
  return(
    <div className="Home-container">
      <h1 className="Home-title">Welcome to Jobly!</h1>
      <img className="HomePage-j" src={j} alt="j"/>
      <div className="description"><i>•Find and apply to the <b>Job</b> of your dreams•</i></div>
    </div>
  )

}

export default HomePage