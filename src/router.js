import React, { Suspense, lazy } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routeConfig from './config/config';
import { PageLoading } from '@/components';

const { routes } = routeConfig;

function BasicRouter() {
  const renderRoute = (routesConfig) => {
    return <Switch>
      {
        routesConfig.map((item, index) => {
          const Comp = lazy(() => import('.' + item.component));
          return <Route exact={item.exact} key={index} path={item.path}>
            <Comp>
              {
                item.routes && renderRoute(item.routes)
              }
            </Comp>
          </Route>;
        })
      }
    </Switch>;
  };

  return <Router>
    <Suspense fallback={<PageLoading/>}>
      {
        renderRoute(routes)
      }
    </Suspense>
  </Router>;
}

export default BasicRouter;
