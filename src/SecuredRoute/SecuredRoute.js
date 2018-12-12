import React from 'react';
import { Route } from 'react-router-dom';

function SecuredRoute(props) {
  const {component: Component, path, auth} = props;
  return (
    <Route path={path} render={() => {
      if (!auth.isAuthenticated()) {
        auth.renewSession();
        return <div>Not authorized</div>;
      }
      return <Component />
    }} />
  );
}

export default SecuredRoute;