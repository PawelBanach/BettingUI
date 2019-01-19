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
      return <Component profile={ profile }/>
    }} />
  );
}

export default SecuredRoute;