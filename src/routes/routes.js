import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
export const Router = (props) => {
  const { routes, defaultRoute } = props;
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => {
          const { component: RouteComponent, exact, path } = route;
          return <Route
            exact={exact}
            key={index}
            path={path}
            render={() => <RouteComponent {...props} {...route} />}
          />;
        })}
        <Redirect to={defaultRoute} />
      </Switch>
    </BrowserRouter>
  );
};
