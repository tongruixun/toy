import React, { Suspense, lazy } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { PageLoading } from '@/components';

const routes = [
  {
    title: '主页',
    path: '/',
    component: '/page/home',
    icon: 'home',
    exact: true,
  }, {
    title: '前端技术',
    path: '/frontEnd',
    icon: 'FE',
    component: '/page/frontEnd',
    routes: [
      {
        title: '全文',
        path: '/frontEnd/postDetail/:id',
        icon: 'FE',
        component: '/page/frontEnd/postDetail',
      }, {
        title: '总览',
        path: '/frontEnd',
        icon: 'FE',
        component: '/page/frontEnd/overview',
      }
    ]
  }, {
    title: 'ABOUT',
    path: '/about',
    icon: 'aboutme',
    component: '/page/about',
    exact: true,
  }, {
    path: '*',
    component: '/layout/404'
  }
];

function BasicRouter() {
  const renderRoute = (routesConfig) => {
    return <Switch>
      {
        routesConfig.map((item) => {
          const Comp = lazy(() => import('.' + item.component));
          return <Route exact={item.exact} key={item.path} path={item.path}>
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
