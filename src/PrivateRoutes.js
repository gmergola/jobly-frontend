import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import ProfileForm from "./ProfileForm";

/**PrivateRoutes: Renders routes
 * that can only be seen when user is logged in
 * when token is in local ctorage
 */
function PrivateRoutes({ currentUser, setCurrentUser }) {
  return (
    <>
      <Switch>
        <Route exact path="/companies">
          <CompanyList />
        </Route>
        <Route exact path="/companies/:name">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList />
        </Route>
        <Route exact path="/profile">
          <ProfileForm setCurrentUser={setCurrentUser} currentUser={currentUser} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default PrivateRoutes;