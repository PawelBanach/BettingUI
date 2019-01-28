import React from 'react';
import { Route } from 'react-router-dom';

function SecuredRoute(props) {
  const {component: Component, path, auth} = props;
  return (
    <Route exact path={path} render={() => {
      if (!auth.isAuthenticated()) {
        auth.renewSession();
        return <div>Not authorized</div>;
      }
      const profile = auth.getProfile();
      const accessToken = auth.getAccessToken();
      const idToken = auth.getIdToken();

      return <Component profile={ profile } accessToken={ accessToken } />
    }} />
  );
}

export default SecuredRoute;