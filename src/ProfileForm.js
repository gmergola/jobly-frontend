import React, { useState } from 'react';
import defaultPhoto from './images/default-user-photo.png';
import Alert from './Alert';
import JoblyApi from "./HelperApi";
import './ProfileForm.css';
import LoadingSpinner from './LoadingSpinner';

/**ProfileForm: Edits a user's information as long as the password is correct */
function ProfileForm({ currentUser, setCurrentUser}) {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const INITIAL_FORM_DATA = {
    first_name: currentUser?.first_name || "",
    last_name: currentUser?.last_name || "",
    email: currentUser?.email || "",
    photo_url: currentUser?.photo_url || "",
    username: currentUser?.username,
    password: "",
  }
  const [formData, setFormData] = useState({...INITIAL_FORM_DATA});


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
      errors: []
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let profileData = {
      first_name: formData.first_name || undefined,
      last_name: formData.last_name || undefined,
      email: formData.email || undefined,
      photo_url: formData.photo_url || undefined,
      password: formData.password
    };

    let username = formData.username;
    let editedUser;

    try {
      editedUser = await JoblyApi.updateProfile(username, profileData);
    } catch (errors) {
      setErrorMessage(errors);
      return;
    }
    setFormData(f => ({ ...f, password: "" }));
    setErrorMessage([]);
    setCurrentUser(editedUser);
    setSubmitted(true);
  }

  return (
    !currentUser.first_name ? <LoadingSpinner /> :
    <div className="Profile-container">
      <div>
        <h1 className="Profile-username">{currentUser?.username}</h1>
        <p>User's name: {currentUser?.first_name} {currentUser?.last_name}</p>
        {currentUser?.photo_url ? <img className="Profile-photo" src={currentUser?.photo_url} alt="default" /> :
          <img className="Profile-photo" src={defaultPhoto} alt="default" />}
      </div>
      <br />
      <div>
        <br />
        <h3>Edit your profile information</h3>
        <h4><i>Please enter your password to edit successfully</i></h4>

        <div ><Alert type="danger" message={errorMessage} /></div>
        {submitted && <Alert type="success" message={['Profile Successfully updated']} />}

        <form className="form-group" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">First Name </span>
            </div>
            <input className="Profile-input" onChange={handleChange} value={formData.first_name} name="first_name"></input>
          </div>
          <br />
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Last Name </span>
            </div>
            <input className="Profile-input" onChange={handleChange} value={formData.last_name} name="last_name"></input>
          </div>
          <br />
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Email </span>
            </div>
            <input className="Profile-input" onChange={handleChange} value={formData.email} name="email"></input>
          </div>
          <br />
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Password </span>
            </div>
            <input className="Profile-input" type="password" onChange={handleChange} value={formData.password} name="password"></input>
          </div>
          <br />
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Photo URL </span>
            </div>
            <input className="Profile-input" onChange={handleChange} value={formData.photo_url} name="photo_url"></input>
          </div>
          <br />
          <button className="ProfileForm-button btn btn-info" type="submit">Save</button>
        </form>
      </div>
    </div>
  )

}

export default ProfileForm;