import React, { Fragment, Suspense } from 'react';
import { IRoutes } from './Routes.d';
import { Switch, Route } from 'react-router-dom';
import { routesConfig } from './routesConfig';
const renderRoutes: Function = (routes: IRoutes[]) => {
  return (
    <Switch>
      {routes &&
        routes.map((route: IRoutes, idx: number) => {
          const Layout = route.layout || Fragment;
          const Guard = route.guard || Fragment;
          const Component = route?.page || Fragment;
          return (
            <Route
              key={`routes-${idx}`}
              path={route.path}
              exact={route.exact}
              render={(props: Record<string, any>) => (
                <Guard>
                  <Layout>
                    {route.routes && route.routes.length > 0 ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
    </Switch>
  );
};

function Routes() {
  return (
    <Route
      render={({ location }) => (
        <Suspense fallback={<div />}>
          <Switch>{renderRoutes(routesConfig)}</Switch>
        </Suspense>
      )}
    />
  );
}

export default Routes;
