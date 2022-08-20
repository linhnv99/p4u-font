import { BrowserRouter, Switch, Route } from "react-router-dom";

import Router from "./router";
import appRoutes from "./appRoutes";
import ProtectedRoute from "./ProtectedRoute";
import DefaultLayout from "../components/Layout/DefaultLayout";

const NotFound = () => {
  return <h1 className="text-center mt-5 ">Page not found</h1>;
};

const RouterContainer = () => {
  return (
    <BrowserRouter>
      <Switch>
        {appRoutes.map((route, key) => {
          const { path, exact, component: Component } = route;
          if (route.notProtected) {
            return (
              <Route
                key={key}
                exact={exact}
                path={path}
                render={(routerProps) => {
                  return (
                    <DefaultLayout {...routerProps}>
                      <Component {...routerProps} />
                    </DefaultLayout>
                  );
                }}
              />
            );
          }
          return (
            <ProtectedRoute
              key={key}
              path={path}
              exact={exact}
              component={Component}
              redirect={Router.login}
            />
          );
        })}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterContainer;
