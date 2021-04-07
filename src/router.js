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
    routes: [
      {
        title: '数据管理',
        path: '/about/page',
        component: '/page/about/page',
        routes: [
          {
            title: '功能测试',
            path: '/about/page/loading',
            component: '/page/about/FunctionTest'
          },
          {
            title: '数据录入',
            path: '/about/page/dataEnter',
            component: '/page/about/DataEnter',
          },
          {
            title: '角色管理',
            path: '/about/page/role',
            component: '/page/about/Role',
          },{
            title: '首页',
            path: '/about/page',
            component: '/page/about/Role',
          },
        ]
      },
      {
        title: '登录',
        path: '/about',
        component: '/page/about/Login',
      },
    ]
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
